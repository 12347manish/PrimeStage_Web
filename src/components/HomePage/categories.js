import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/artists', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            throw new Error('Failed to fetch categories');
          }
      
          const data = await response.json();
          console.log(data);
          setCategories(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      
    fetchCategories();
  }, []);

  // Calculate pagination values
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCategories = categories.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of the categories section smoothly
    document.getElementById('categories-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCategoryClick = async (category) => {
    try {
      // Similar to handleSearch in HeroSection, but using category name as the search term
      const response = await fetch('http://localhost:8000/api/search/fetch-artists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          skill: category.item_name ,// Using category name as search term
          lat: 30.7333,
          lng: 76.7794,
          
          // Note: We don't have lat/lng here as in HeroSection, you might want to add city selection
          // or use a default location
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch artists');
      }

      const data = await response.json();
      // Navigate to search page with the fetched artists
      navigate('/search', { 
        state: { 
          artists: data,
          searchTerm: category.item_name
        } 
      });
    } catch (err) {
      console.error('Error fetching artists by category:', err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-normal mb-6 sm:mb-8">CATEGORIES</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((skeleton) => (
            <div key={skeleton} className="animate-pulse rounded-xl overflow-hidden">
              <div className="bg-gray-200 h-48 sm:h-64 rounded-xl"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div id="categories-section" className="container mx-auto px-4 py-8 sm:py-16">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-0">CATEGORIES</h2>
        <div className="text-xs sm:text-sm text-gray-600">
          Showing {startIndex + 1}-{Math.min(endIndex, categories.length)} of {categories.length}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        {currentCategories.map((category) => (
          <div 
            key={category.id} 
            className="relative group cursor-pointer rounded-xl overflow-hidden"
            onClick={() => handleCategoryClick(category)}
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={category.item_data}
                alt={category.item_name}
                className="w-full h-32 sm:h-64 object-cover"
                onError={(e) => {
                  e.target.alt = 'Placeholder';
                }}
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all">
              <div className="absolute bottom-2 sm:bottom-8 left-2 sm:left-8">
                <h3 className="text-white text-base sm:text-2xl font-light">{category.item_name}</h3>
                <button className="text-white flex items-center space-x-1 sm:space-x-2 mt-1 sm:mt-2">
                  <span className="text-xs sm:text-base">Discover</span>
                  <ChevronRight className="h-3 w-3 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 sm:mt-8 flex justify-center items-center space-x-2 sm:space-x-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1 sm:p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          
          <div className="flex space-x-1 sm:space-x-2 overflow-x-auto">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-base ${
                  currentPage === index + 1
                    ? 'bg-black text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-1 sm:p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FeaturedCategories;