import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BestArtist = () => {
  const [bestArtist, setBestArtist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/bestArtist');
        if (!response.ok) {
          throw new Error('Failed to fetch artists');
        }
        const data = await response.json();
        setBestArtist(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching artists:', err);
        setError('Failed to load artists');
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  // Extract artist ID from item_name and handle navigation
  const handleArtistClick = (artist) => {
    // Extract the ID part after the slash
    const nameParts = artist.item_name.split('/');
    const artistId = nameParts.length > 1 ? nameParts[1].trim() : artist.id;
    
    navigate('/artists/showcase', {
      state: {
        artist: {
          ...artist,
          id: artistId // Use the extracted ID instead of the record ID
        },
        source: 'latestArtists'
      },
    });
  };

  if (loading) {
    return (
      <div className="bg-gray-100 py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary" />
          <span className="ml-2 text-sm sm:text-base text-gray-600">Loading best artists...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-8 sm:py-12 md:py-16">
      <h2 className="text-2xl sm:text-3xl font-normal mb-6 sm:mb-8 text-center text-gray-800 px-4">
        OUR BEST ARTISTS
      </h2>
      <div className="container mx-auto px-4 sm:ml-10">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={1.2}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            480: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 4.2,
              spaceBetween: 24,
            },
          }}
          className="pl-0 sm:pl-4"
        >
          {bestArtist.map((artist) => (
            <SwiperSlide 
              key={artist.id} 
              className="pb-8 pt-2"
            >
              <div 
                className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer h-full"
                onClick={() => handleArtistClick(artist)}
              >
                <div className="relative aspect-square">
                  <img
                    src={artist.item_data || '/api/placeholder/400/400'}
                    alt={artist.item_name.split('/')[0].trim()}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/400/400';
                    }}
                  />
                </div>
                
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">
                    {artist.item_name.split('/')[0].trim()}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-2">{artist.role}</p>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm sm:text-base text-primary font-medium">
                      {artist.experience} years exp.
                    </p>
                    {artist.performance_rating && (
                      <div className="flex items-center bg-gray-50 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-sm">
                        <span className="text-yellow-500">★</span>
                        <span className="ml-1 font-medium">
                          {artist.performance_rating}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {bestArtist.length === 0 && (
          <div className="text-center mt-6 sm:mt-8">
            <p className="text-gray-500 text-base sm:text-lg">
              No artists available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BestArtist;