// HeroSection.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as AlertDialog from "@radix-ui/react-alert-dialog";

const cities = [
  { name: 'Chandigarh', lat: 30.7333, lng: 76.7794 },
  { name: 'Mohali', lat: 30.7046, lng: 76.7179 },
  { name: 'Kharar', lat: 30.7460, lng: 76.6454 }
];

const SearchPlaceholder = () => {
  const terms = ['SINGER', 'DANCER', 'DJ', 'BANDS'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationState, setAnimationState] = useState('idle');

  useEffect(() => {
    const animationCycle = () => {
      setAnimationState('animating');
      setTimeout(() => {
        setAnimationState('idle');
        setCurrentIndex((prev) => (prev + 1) % terms.length);
      }, 500);
    };

    const interval = setInterval(animationCycle, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center">
      <span className="mr-1">Search</span>
      <span className="ml-1">For</span>
      <div className="relative w-24 h-8 overflow-hidden flex items-center">
        <div
          className={`absolute w-full text-center ${
            animationState === 'animating' ? 'animate-slideUpFadeOut' : ''
          }`}
        >
          {terms[currentIndex]}
        </div>

        <div
          className={`absolute w-full text-center ${
            animationState === 'animating' ? 'animate-slideUpFadeIn' : 'opacity-0'
          }`}
        >
          {terms[(currentIndex + 1) % terms.length]}
        </div>
      </div>
    </div>
  );
};

const HeroSection = ({ mainLogoStyles }) => {
  const [showCityDialog, setShowCityDialog] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  // Add reload detection
  useEffect(() => {
    window.onbeforeunload = function() {
      console.log("Page is attempting to reload!");
      console.log("Video element state:", videoRef.current ? 
        {
          readyState: videoRef.current.readyState,
          networkState: videoRef.current.networkState,
          error: videoRef.current.error
        } : "No video ref");
      return "Are you sure you want to leave?";
    };
    
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  // Video error handling
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      const handleVideoError = (e) => {
        console.error("Video error:", e);
        setVideoError(true);
      };
      
      const handleVideoLoad = () => {
        console.log("Video loaded successfully");
        setVideoLoaded(true);
      };
      
      videoElement.addEventListener('error', handleVideoError);
      videoElement.addEventListener('loadeddata', handleVideoLoad);
      
      return () => {
        videoElement.removeEventListener('error', handleVideoError);
        videoElement.removeEventListener('loadeddata', handleVideoLoad);
      };
    }
  }, [videoRef.current]);

  const handleSearch = async () => {
    if (!selectedCity) {
      setShowCityDialog(true);
      return;
    }

    if (!searchTerm.trim()) {
      setError('Please enter a search term');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/search/fetch-artists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: selectedCity.lat,
          lng: selectedCity.lng,
          skill: searchTerm
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch artists');
      }

      const data = await response.json();
      setArtists(data);
      navigate('/search', { state: { artists: data } });
    } catch (err) {
      setError(err.message);
      console.error('Error fetching artists:', err);
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setShowCityDialog(false);
  };

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {!videoError && (
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover"
          onError={(e) => {
            console.error("Video error in JSX:", e);
            setVideoError(true);
          }}
        >
          <source src="/7804233-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
      )}
      
      {/* Fallback if video fails */}
      {videoError && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900"></div>
      )}
      
      <div className="absolute inset-0 bg-black bg-opacity-40">
        <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center">
          {/* Updated title with better responsive sizing */}
          <div className="w-full text-center px-1">
            <h1 
              className="font-light text-white pointer-events-none text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl truncate"
              style={{
                ...mainLogoStyles,
                fontSize: 'clamp(3rem, 10vw, 10rem)',
                letterSpacing: '0.05em',
                width: '100%',
                maxWidth: '100%'
              }}
            >
              PRIMESTAGE
            </h1>
          </div>
          
          <div className="w-full max-w-3xl mt-16 sm:mt-24 md:mt-32">
            <div className="relative mt-24 sm:mt-32 md:mt-48">
              <div className="flex flex-wrap sm:flex-nowrap items-center mb-4">
                <button
                  onClick={() => setShowCityDialog(true)}
                  className="w-full sm:w-auto px-4 py-2 bg-white bg-opacity-90 text-gray-600 mr-0 sm:mr-2 mb-2 sm:mb-0 rounded-full"
                >
                  {selectedCity ? selectedCity.name : 'Select City'}
                </button>
                {error && <p className="text-red-500 text-sm w-full sm:w-auto">{error}</p>}
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder=""
                  className="w-full px-6 py-3 sm:py-4 bg-white bg-opacity-90 text-xl placeholder-gray-600 focus:outline-none rounded-full"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                {!searchTerm && (
                  <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-600 text-lg sm:text-xl pointer-events-none">
                    <SearchPlaceholder />
                  </div>
                )}
                <button
                  onClick={handleSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full"
                >
                  <Search className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog.Root open={showCityDialog} onOpenChange={setShowCityDialog}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <AlertDialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 sm:p-6 rounded-lg shadow-lg w-[90%] sm:w-96 max-w-md">
            <AlertDialog.Title className="text-lg font-semibold">Select your city</AlertDialog.Title>
            <div className="grid gap-2 mt-4">
              {cities.map((city) => (
                <button
                  key={city.name}
                  onClick={() => handleCitySelect(city)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded"
                >
                  {city.name}
                </button>
              ))}
            </div>
            <AlertDialog.Action asChild>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Close</button>
            </AlertDialog.Action>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
};

export default HeroSection;