import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Pause, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeaturedArtists2 = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState([0]); // Only preload first slide
  const [isAutoplaying, setIsAutoplaying] = useState(true);
  const [isUserActive, setIsUserActive] = useState(true);
  const [error, setError] = useState('');
  
  const videoRefs = useRef({});
  const autoplayTimerRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const mediaCache = useRef(new Map());
  
  // Track network usage for debugging (remove in production)
  const networkUsageRef = useRef({
    requests: 0,
    bytesTransferred: 0
  });

  const featuredArtists = [
    {
      id: 1,
      name: "Infuse your gathering with the vocals of a premier singer.",
      media: {
        type: "image",
        url: "/music-of-dhwani-1.jpg"
      },
      category: "Singer"
    },
    {
      id: 2,
      name: "Treat your elite guests to culinary perfection.",
      media: {
        type: "video",
        url: "/7269180-uhd_3840_2160_25fps 2-2.mp4",
        thumbnail: "/fallback-2.jpg"
      },
      category: "Catering"
    },
    {
      id: 3,
      name: "Make your little one's birthday magical",
      media: {
        type: "image",
        url: "/2715fd5e2b75cf7ac53ba44d6abc4124.jpg"
      },
      category: "Magician"
    }
  ];

  // Reset user inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    
    setIsUserActive(true);
    
    // Set a new inactivity timer (2 minutes)
    inactivityTimerRef.current = setTimeout(() => {
      setIsUserActive(false);
      // Pause autoplay if user is inactive
      if (isAutoplaying) {
        setIsAutoplaying(false);
      }
    }, 120000); // 2 minutes
  };

  // Preload function to cache media resources
  const preloadMedia = (index) => {
    const artist = featuredArtists[index];
    const mediaType = artist.media.type;
    const mediaUrl = artist.media.url;
    const mediaId = `${artist.id}-${mediaType}`;

    // Skip if we've already cached this media item
    if (mediaCache.current.has(mediaId)) return;

    if (mediaType === "image") {
      const img = new Image();
      img.src = mediaUrl;
      img.onload = () => {
        mediaCache.current.set(mediaId, true);
        // For debugging only
        networkUsageRef.current.requests++;
      };
    } else if (mediaType === "video") {
      // For videos, we'll just preload the thumbnail
      const img = new Image();
      img.src = artist.media.thumbnail;
      img.onload = () => {
        mediaCache.current.set(`${artist.id}-thumbnail`, true);
        // For debugging only
        networkUsageRef.current.requests++;
      };
    }
  };

  // Setup event listeners for user activity
  useEffect(() => {
    const handleActivity = () => {
      resetInactivityTimer();
    };

    // Add event listeners for user activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    // Initialize inactivity timer
    resetInactivityTimer();

    return () => {
      // Clean up event listeners
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, []);

  // Auto-advance slides when autoplay is enabled
  useEffect(() => {
    if (isAutoplaying) {
      autoplayTimerRef.current = setInterval(() => {
        setCurrentSlide(prev => {
          const nextSlide = (prev + 1) % featuredArtists.length;
          // Preload the next slide's media
          if (!loadedSlides.includes(nextSlide)) {
            setLoadedSlides(current => [...current, nextSlide]);
            preloadMedia(nextSlide);
          }
          return nextSlide;
        });
      }, 5000);
    } else if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isAutoplaying]);

  // Initial preloading of first slide and next slide
  useEffect(() => {
    // Preload current slide
    preloadMedia(currentSlide);
    
    // Preload next slide
    const nextSlide = (currentSlide + 1) % featuredArtists.length;
    if (!loadedSlides.includes(nextSlide)) {
      setLoadedSlides(current => [...current, nextSlide]);
      preloadMedia(nextSlide);
    }
    
    // Setup visibility change detection to pause when tab is not visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is hidden, pause autoplay
        setIsAutoplaying(false);
        
        // Pause any playing videos
        const currentArtist = featuredArtists[currentSlide];
        if (currentArtist.media.type === "video") {
          const videoRef = videoRefs.current[currentArtist.id];
          if (videoRef && videoRef.current) {
            videoRef.current.pause();
          }
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Handle slide media and playback
  useEffect(() => {
    // Pause all videos
    Object.values(videoRefs.current).forEach(videoRef => {
      if (videoRef && videoRef.current) {
        videoRef.current.pause();
      }
    });

    // Play current video if it exists and autoplay is enabled
    const currentArtist = featuredArtists[currentSlide];
    if (currentArtist.media.type === "video" && isAutoplaying) {
      // Get reference and play if available
      const videoRef = videoRefs.current[currentArtist.id];
      if (videoRef && videoRef.current) {
        videoRef.current.currentTime = 0;
        // Try to play with a slight delay to ensure video is ready
        setTimeout(() => {
          if (videoRef.current && isAutoplaying) {
            videoRef.current.play().catch(e => {
              console.error("Error playing video:", e);
            });
          }
        }, 50);
      }
    }
    
    // Only preload next slide if autoplay is enabled
    if (isAutoplaying) {
      const nextSlide = (currentSlide + 1) % featuredArtists.length;
      if (!loadedSlides.includes(nextSlide)) {
        setLoadedSlides(current => [...current, nextSlide]);
        preloadMedia(nextSlide);
      }
    }
  }, [currentSlide, isAutoplaying]);

  const handleManualSlideChange = (index) => {
    // Reset activity timer when user interacts
    resetInactivityTimer();
    
    // Resume autoplay if it was paused due to inactivity
    if (!isAutoplaying) {
      setIsAutoplaying(true);
    }
    
    setCurrentSlide(index);
    
    // Make sure this slide is marked as loaded
    if (!loadedSlides.includes(index)) {
      setLoadedSlides(current => [...current, index]);
      preloadMedia(index);
    }
  };

  const toggleAutoplay = () => {
    setIsAutoplaying(prev => !prev);
    resetInactivityTimer();
  };

  // Function to handle search and navigation
  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch('http://localhost:8000/api/search/fetch-artists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: 30.7333,
          lng: 76.7794,
          skill: searchTerm
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch artists');
      }

      const data = await response.json();
      navigate('/search', { state: { artists: data, searchTerm } });
    } catch (err) {
      setError(err.message);
      console.error('Error fetching artists:', err);
    }
  };

  // Handle click on slide content
  const handleSlideClick = (artist) => {
    const searchTerm = artist.category;
    handleSearch(searchTerm);
  };

  return (
    <div className="pt-16">
      <div className="relative w-full aspect-[16/10] lg:aspect-[21/10] max-h-[85vh]">
        {featuredArtists.map((artist, index) => {
          // Only render if this is the current slide or the next slide (or previously loaded)
          const shouldRender = currentSlide === index || 
                              loadedSlides.includes(index);
          
          // Use proper loading strategy based on slide importance
          const isImportantSlide = currentSlide === index || 
                                  currentSlide === (index + 1) % featuredArtists.length;
          
          return (
            <div
              key={artist.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              onClick={currentSlide === index ? () => handleSlideClick(artist) : undefined}
              style={{ cursor: currentSlide === index ? 'pointer' : 'default' }}
            >
              {shouldRender && (
                <>
                  {artist.media.type === "video" ? (
                    <div className="relative w-full h-full">
                      {(() => {
                        if (!videoRefs.current[artist.id]) {
                          videoRefs.current[artist.id] = React.createRef();
                        }
                        return (
                          <video
                            ref={videoRefs.current[artist.id]}
                            className="w-full h-full object-cover"
                            loop
                            muted
                            playsInline
                            poster={artist.media.thumbnail}
                            preload={isImportantSlide ? "auto" : "none"}
                          >
                            <source src={artist.media.url} type="video/mp4" />
                          </video>
                        );
                      })()}
                    </div>
                  ) : (
                    <img
                      src={artist.media.url}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                      loading={isImportantSlide ? "eager" : "lazy"}
                    />
                  )}
                </>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30">
                <div className="container mx-auto px-4 h-full flex items-center">
                  <div className="text-white max-w-xl">
                    <h2 className="text-5xl font-light mb-4 tracking-wide">
                      {artist.name}
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                      {artist.category}
                    </p>
                    <button className="bg-white text-black px-8 py-3 flex items-center space-x-2 hover:bg-gray-100 transition-colors duration-300 rounded-sm">
                      <span className="font-medium">BOOK NOW</span>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Controls - Using stopPropagation to prevent click events from bubbling */}
        <div 
          className="absolute bottom-8 left-0 right-0 flex justify-between items-center px-4 z-20"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Autoplay control */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleAutoplay();
            }}
            className="bg-black/30 hover:bg-black/50 p-2 rounded-full text-white transition-colors"
            aria-label={isAutoplaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isAutoplaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          
          {/* Navigation Dots */}
          <div className="flex space-x-2">
            {featuredArtists.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  handleManualSlideChange(i);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentSlide === i 
                    ? 'bg-white w-6' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          
          {/* Empty div for layout balance */}
          <div className="w-9"></div>
        </div>
        
        {/* Inactive overlay */}
        {!isUserActive && !isAutoplaying && (
          <div 
            className="absolute inset-0 bg-black/60 flex items-center justify-center cursor-pointer z-30 transition-opacity duration-500"
            onClick={() => {
              setIsAutoplaying(true);
              resetInactivityTimer();
            }}
          >
            <div className="text-center text-white">
              <Play className="h-16 w-16 mx-auto mb-4" />
              <p className="text-xl">Slideshow paused due to inactivity</p>
              <p className="text-sm mt-2">Click anywhere to resume</p>
            </div>
          </div>
        )}
        
        {/* Error message */}
        {error && (
          <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white py-2 px-4 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedArtists2;