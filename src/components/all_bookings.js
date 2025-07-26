import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use useCallback to prevent recreation of this function on every render
  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      
      // Get user data from localStorage
      const userData = localStorage.getItem('user');
      
      if (!userData) {
        throw new Error('User data not found');
      }
      
      // Parse the JSON string
      let userObject;
      try {
        userObject = JSON.parse(userData);
      } catch (err) {
        throw new Error('Invalid user data format');
      }
      
      if (!userObject.id) {
        throw new Error('User ID not found');
      }
      
      // Use axios consistently instead of mixing fetch and axios
      const response = await axios.post('http://localhost:8000/api/allbookings', {
        userId: userObject.id
      });
      
      // Update state with the fetched data
      setBookings(response.data.bookings || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(err.message || 'Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array as we don't need to recreate this function

  useEffect(() => {
    // This will run only once when the component mounts
    fetchBookings();
    
    // Cleanup function to handle component unmounting
    return () => {
      // Cancel any pending requests if needed
    };
  }, [fetchBookings]);

  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        // Get auth token from localStorage
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          throw new Error('Authentication token not found');
        }
        
        // Make API call to delete the booking
        await axios.delete(`http://localhost:8000/api/bookings/${bookingId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Remove the booking from state
        setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
      } catch (err) {
        console.error('Error deleting booking:', err);
        alert(err.response?.data?.error || 'Failed to delete booking');
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to determine progress bar steps
  const getProgressSteps = (status) => {
    switch(status) {
      case "initiated":
        return 1;
      case "responded":
        return 2;
      case "completed":
        return 3;
      default:
        return 1;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
        <button 
          className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
          onClick={fetchBookings}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Bookings</h1>
        <Link 
          to="/bookings/new" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Booking
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center p-8 bg-gray-100 rounded">
          <p className="text-gray-600">No bookings found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map(booking => (
            <div 
              key={booking.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow flex h-96"
            >
              {/* Artist Image on the left - increased width */}
              <div className="w-80 h-full bg-gray-100 flex-shrink-0">
                <img 
                  src={booking.artistImage || "/default-artist-image.jpg"} 
                  alt={`${booking.artistName || 'Artist'}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-artist-image.jpg";
                  }}
                />
              </div>
              
              {/* Card Content */}
              <div className="flex-grow p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    {/* Left side - Artist & Skill info */}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-2xl">{booking.artistName || "Customer"}</h3>
                      </div>
                      <p className="text-base text-gray-600">{booking.artistSkill || "Performer"}</p>
                      <p className="mt-2 font-medium text-blue-600 text-lg">{booking.eventType || "Event"}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="text-base font-medium">{formatDate(booking.date)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="text-base font-medium">{booking.time || 'N/A'} {booking.duration ? `(${booking.duration} mins)` : ''}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payment</p>
                      <p className={`text-base font-medium ${
                        booking.paymentStatus === 'paid' ? 'text-green-600' :
                        booking.paymentStatus === 'unpaid' ? 'text-red-600' :
                        booking.paymentStatus === 'pending' ? 'text-yellow-600' :
                        booking.paymentStatus === 'refunded' ? 'text-blue-600' :
                        booking.paymentStatus === 'partial' ? 'text-orange-600' :
                        'text-gray-600'
                      }`}>
                        {booking.paymentStatus || 'Unknown'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Amount</p>
                      <p className="text-base font-medium">${booking.amount ? booking.amount.toFixed(2) : '0.00'}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-base text-gray-700">{booking.address || 'No address provided'}</p>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="border-t border-gray-200 pt-4">
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="relative pt-1">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex mb-2 items-center justify-between">
                            <div>
                              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                Progress
                              </span>
                            </div>
                          </div>
                          <div className="relative h-2 mb-4 text-xs flex rounded bg-gray-200">
                            <div style={{ width: `${(getProgressSteps(booking.status) / 3) * 100}%` }} 
                                className={`h-full rounded ${
                                  booking.status === "completed" ? "bg-green-500" : "bg-blue-500"
                                }`}>
                            </div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-600">
                            <div className={`${getProgressSteps(booking.status) >= 1 ? "font-semibold text-blue-600" : ""}`}>
                              Booking Initiated
                            </div>
                            <div className={`${getProgressSteps(booking.status) >= 2 ? "font-semibold text-blue-600" : ""}`}>
                              Artist Response
                            </div>
                            <div className={`${getProgressSteps(booking.status) >= 3 ? "font-semibold text-green-600" : ""}`}>
                              Event Completed
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Actions */}
                  <div className="flex justify-end space-x-2">
                    <Link 
                      to={`/bookings/${booking.id}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white text-sm py-1 px-4 rounded"
                    >
                      View
                    </Link>
                    <Link 
                      to={`/bookings/${booking.id}/edit`}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white text-sm py-1 px-4 rounded"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDeleteBooking(booking.id)}
                      className="bg-red-500 hover:bg-red-700 text-white text-sm py-1 px-4 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBookings;