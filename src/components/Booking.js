import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Info, MapPin, Navigation, X, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert';
import { useLocation, useNavigate  } from 'react-router-dom';
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import apiService from './bookingAPIservice';
// import { useLocation, useNavigate } from 'react-router-dom';

const BookingDetails = () => {
  // Get artist and user data from navigation state
  const location = useLocation();
  const { artist, user } = location.state || {};
  
const navigate = useNavigate();
  // Form state
  const [selectedDate, setSelectedDate] = useState(null);
  const [fromTime, setFromTime] = useState('09:00');
  const [toTime, setToTime] = useState('17:00');
  const [showFromClock, setShowFromClock] = useState(false);
  const [showToClock, setShowToClock] = useState(false);
  const [fromAmPm, setFromAmPm] = useState('AM');
  const [toAmPm, setToAmPm] = useState('PM');
  const [duration, setDuration] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [audienceSize, setAudienceSize] = useState('');
  const [hasSoundSystem, setHasSoundSystem] = useState(true);
  const [location_, setLocation] = useState('');
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [isManualLocation, setIsManualLocation] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [message, setMessage] = useState('');
  const [formattedAddress, setFormattedAddress] = useState('');

    const [_isLoading, setIsLoading] = useState(false);
    const [_error, setError] = useState('');
     const [isSearching, setIsSearching] = useState(false);

      const [firstName, setFirstName] = useState('');
  const [userInfoUpdated, setUserInfoUpdated] = useState(false);
  const [userInfoError, setUserInfoError] = useState('');
  // State for booking form
  const [bookingData, setBookingData] = useState({
    selectedDate: new Date(),
    booked_from: '',
    booked_to: '',
    duration: '',
    audience_size: '',
    location: '',
    latitude: '',
    longitude: '',
    special_request: '',
    category: '',
    total_amount: 0
  });
  const [bookingCreated, setBookingCreated] = useState(false);
  const [bookingError, setBookingError] = useState('');

  // State for payment information
  const [paymentData, setPaymentData] = useState({
    payment_id: '',
    order_id: '',
    signature: ''
  });
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  // Calculate total price based on artist's rate and duration
  const [totalHours, setTotalHours] = useState(0);
  const hourlyRate = artist?.price_per_hour || 5000;
  const soundSystemPrice = 2000;
  const totalArtistPrice = totalHours * hourlyRate;
  const totalPrice = hasSoundSystem ? totalArtistPrice + soundSystemPrice : totalArtistPrice;

  const { error, isLoading, Razorpay } = useRazorpay();
  // Convert string time (HH:MM) to hours and minutes considering AM/PM
  const parseTime = (timeString, amPm) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    let displayHours = hours;
    
    // Convert 24-hour format to 12-hour for display
    if (hours === 0) {
      displayHours = 12; // 12 AM
    } else if (hours > 12) {
      displayHours = hours - 12; // PM hours
    } else if (hours === 12) {
      displayHours = 12; // 12 PM
    }
    
    return { hours, minutes, displayHours };
  };

  // Convert hours, minutes, and AM/PM to 24-hour format string
  const formatTime = (hours, minutes, amPm) => {
    // Convert from 12-hour to 24-hour format for internal storage
    let adjustedHours = hours;
    
    if (amPm === 'PM' && hours < 12) {
      adjustedHours = hours + 12;
    } else if (amPm === 'AM' && hours === 12) {
      adjustedHours = 0;
    }
    
    return `${adjustedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };
  
  // Format time for display in input (keeps 24-hour format for the HTML input)
  const formatDisplayTime = (timeString, amPm) => {
    const { hours, minutes } = parseTime(timeString, amPm);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  // Toggle AM/PM for a time
  const toggleAmPm = (isFromTime) => {
    if (isFromTime) {
      const newAmPm = fromAmPm === 'AM' ? 'PM' : 'AM';
      setFromAmPm(newAmPm);
      
      // Update the time to reflect the AM/PM change
      const { hours, minutes } = parseTime(fromTime, fromAmPm);
      setFromTime(formatTime(hours % 12 || 12, minutes, newAmPm));
    } else {
      const newAmPm = toAmPm === 'AM' ? 'PM' : 'AM';
      setToAmPm(newAmPm);
      
      // Update the time to reflect the AM/PM change
      const { hours, minutes } = parseTime(toTime, toAmPm);
      setToTime(formatTime(hours % 12 || 12, minutes, newAmPm));
    }
  };

  // Handle clock face click for hour selection
  const handleClockHourClick = (isFromTime, hour) => {
    if (isFromTime) {
      const { minutes } = parseTime(fromTime, fromAmPm);
      setFromTime(formatTime(hour, minutes, fromAmPm));
    } else {
      const { minutes } = parseTime(toTime, toAmPm);
      setToTime(formatTime(hour, minutes, toAmPm));
    }
  };

  // Handle clock face click for minute selection
  const handleClockMinuteClick = (isFromTime, minute) => {
    if (isFromTime) {
      const { displayHours } = parseTime(fromTime, fromAmPm);
      setFromTime(formatTime(displayHours, minute, fromAmPm));
    } else {
      const { displayHours } = parseTime(toTime, toAmPm);
      setToTime(formatTime(displayHours, minute, toAmPm));
    }
  };

  // Handle direct input change
  const handleInputChange = (e, isFromTime) => {
    const value = e.target.value;
    if (isFromTime) {
      setFromTime(value);
      // Update AM/PM based on the time (if > 12, set to PM)
      const hours = parseInt(value.split(':')[0]);
      if (hours >= 12) {
        setFromAmPm('PM');
      } else {
        setFromAmPm('AM');
      }
    } else {
      setToTime(value);
      // Update AM/PM based on the time (if > 12, set to PM)
      const hours = parseInt(value.split(':')[0]);
      if (hours >= 12) {
        setToAmPm('PM');
      } else {
        setToAmPm('AM');
      }
    }
  };

  // Generate clock face dots for hours or minutes
  const renderClockFace = (isHours, isFromTime) => {
    const items = isHours ? 12 : 4; // 12 hours or 4 quarters (0, 15, 30, 45)
    const radius = 80;
    const clockDots = [];
    
    for (let i = 0; i < items; i++) {
      const value = isHours ? (i === 0 ? 12 : i) : i * 15;
      const angle = ((i / items) * 2 * Math.PI) - (Math.PI / 2);
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      
      // Get current selected hour/minute
      const currentTime = isFromTime ? fromTime : toTime;
      const amPm = isFromTime ? fromAmPm : toAmPm;
      const { displayHours, minutes } = parseTime(currentTime, amPm);
      
      // Check if this dot is selected
      const isSelected = isHours 
        ? displayHours === value
        : minutes === value;
      
      clockDots.push(
        <div
          key={i}
          className={`absolute rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-sm font-medium 
                     hover:bg-rose-100 transition-colors ${isSelected ? 'bg-rose-500 text-white' : 'bg-white'}`}
          style={{
            transform: `translate(${x}px, ${y}px)`,
            border: '1px solid rgb(229, 231, 235)'
          }}
          onClick={() => isHours 
            ? handleClockHourClick(isFromTime, value) 
            : handleClockMinuteClick(isFromTime, value)}
        >
          {value}
        </div>
      );
    }
    
    return clockDots;
  };

  // Render clock hand/arrow
  const renderClockHand = (isHours, isFromTime) => {
    const currentTime = isFromTime ? fromTime : toTime;
    const amPm = isFromTime ? fromAmPm : toAmPm;
    const { displayHours, minutes } = parseTime(currentTime, amPm);
    
    // Calculate angle for the hand
    let value = isHours ? displayHours : minutes;
    let totalItems = isHours ? 12 : 60;
    
    // Adjust for special cases in hours
    if (isHours && value === 12) value = 0;
    
    // Calculate angle (0 is at 12 o'clock position, and goes clockwise)
    const angle = ((value / totalItems) * 2 * Math.PI) - (Math.PI / 2);
    
    // Calculate end point of hand
    const length = 70; // length of the hand
    const x = length * Math.cos(angle);
    const y = length * Math.sin(angle);
    
    return (
      <div className="absolute w-full h-full flex items-center justify-center pointer-events-none">
        <div 
          className="absolute bg-rose-500"
          style={{
            width: '2px',
            height: `${length}px`,
            transformOrigin: 'bottom center',
            transform: `rotate(${angle + Math.PI/2}rad)`,
            bottom: '50%',
          }}
        />
      </div>
    );
  };

  // Clock widget component
  const ClockWidget = ({ isFromTime }) => {
    const [showHours, setShowHours] = useState(true);
    const currentAmPm = isFromTime ? fromAmPm : toAmPm;
    
    return (
      <div className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg p-4">
        <div className="flex justify-between mb-4">
          <div className="flex space-x-2">
            <button 
              className={`px-4 py-2 rounded-lg ${showHours ? 'bg-rose-100 text-rose-600' : 'hover:bg-gray-100'}`}
              onClick={() => setShowHours(true)}
            >
              Hours
            </button>
            <button 
              className={`px-4 py-2 rounded-lg ${!showHours ? 'bg-rose-100 text-rose-600' : 'hover:bg-gray-100'}`}
              onClick={() => setShowHours(false)}
            >
              Minutes
            </button>
          </div>
          <button 
            className={`px-4 py-2 rounded-lg border border-gray-200`}
            onClick={() => toggleAmPm(isFromTime)}
          >
            {currentAmPm}
          </button>
        </div>
        
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Clock face background */}
          <div className="absolute w-40 h-40 rounded-full bg-gray-50"></div>
          
          {/* Center dot */}
          <div className="absolute w-2 h-2 rounded-full bg-rose-500"></div>
          
          {/* Clock hand (arrow) */}
          {renderClockHand(showHours, isFromTime)}
          
          {/* Clock dots */}
          {renderClockFace(showHours, isFromTime)}
        </div>
        
        <div className="mt-4 flex justify-end">
          <button 
            className="px-4 py-2 text-sm font-medium text-white bg-rose-500 rounded-lg hover:bg-rose-600"
            onClick={() => isFromTime ? setShowFromClock(false) : setShowToClock(false)}
          >
            Done
          </button>
        </div>
      </div>
    );
  };

  // Format display time for interface (12-hour format with AM/PM)
  const getDisplayTime = (timeString, amPm) => {
    const { displayHours, minutes } = parseTime(timeString, amPm);
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${amPm}`;
  };

  const categories = [
    'Wedding',
    'Corporate Event',
    'Birthday Party',
    'Festival',
    'Concert'
  ];

  const audienceSizes = [
    '1-10',
    '1-30',
    '1-50',
    '1-70',
    '1-100',
    'More than 100',
    'More than 500'
  ];

  useEffect(() => {
    if (fromTime && toTime) {
      const from = new Date(`2000/01/01 ${fromTime}`);
      const to = new Date(`2000/01/01 ${toTime}`);
      
      if (!isNaN(from.getTime()) && !isNaN(to.getTime())) {
        const diff = to - from;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setDuration(`${hours} hours ${minutes} minutes`);
        setTotalHours(hours + (minutes / 60));
      }
    }
  }, [fromTime, toTime]);

  const handleSoundClick = () => {

    // setShowLocationDialog(true);
    console.log('mohit is here ');
    console.log(artist);
  };

  const handleLocationClick = () => {
    setShowLocationDialog(true);
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    setError('');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          
          setLocation(`${coords.latitude}, ${coords.longitude}`);
          
          // Convert coordinates to address using Nominatim
          try {
            const address = await convertCoordsToAddress(coords.latitude, coords.longitude);
            setFormattedAddress(address);
          } catch (err) {
            setError('Could not convert coordinates to address. Using raw coordinates instead.');
            console.error("Error converting coordinates:", err);
          }
          
          setIsLoading(false);
          setShowLocationDialog(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError('Could not access location. Please enter manually.');
          setIsLoading(false);
          setIsManualLocation(true);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setIsLoading(false);
      setIsManualLocation(true);
    }
  };

  // Convert coordinates to address using Nominatim API (reverse geocoding)
  const convertCoordsToAddress = async (latitude, longitude) => {
    try {
      // Use Nominatim OpenStreetMap API for reverse geocoding (coords to address)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
        {
          headers: {
            'Accept-Language': 'en', // Ensure English results
            'User-Agent': 'LocationPickerComponent/1.0' // Required by Nominatim usage policy
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
      
      const data = await response.json();
      
      if (data && data.display_name) {
        // Return the formatted address
        return data.display_name;
      } else {
        // If no results found, return the raw coordinates
        return `${latitude}, ${longitude}`;
      }
    } catch (error) {
      console.error('Error converting coordinates to address:', error);
      // Return raw coordinates if geocoding fails
      return `${latitude}, ${longitude}`;
    }
  };

  // Convert address to coordinates using Nominatim API (forward geocoding)
  const convertAddressToCoords = async (address) => {
    setIsSearching(true);
    
    try {
      // Use Nominatim OpenStreetMap API for forward geocoding (address to coords)
      const encodedAddress = encodeURIComponent(address);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=5`,
        {
          headers: {
            'Accept-Language': 'en', // Ensure English results
            'User-Agent': 'LocationPickerComponent/1.0' // Required by Nominatim usage policy
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        // Return search results
        return data.map(item => ({
          latitude: parseFloat(item.lat),
          longitude: parseFloat(item.lon),
          displayName: item.display_name,
          type: item.type,
          importance: item.importance
        }));
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error converting address to coordinates:', error);
      return [];
    } finally {
      setIsSearching(false);
    }
  };

  // Initialize Razorpay


  // Handle user info update
  const handleUpdateUserInfo = async (e) => {
    // e.preventDefault();
    setUserInfoError('');
    
    try {
      const userData = localStorage.getItem('user');

// Parse the JSON string
const userObject = JSON.parse(userData);

// Extract the ID
const userId = userObject.id;

console.log(userId);
      
      
      if (!userId) {
        setUserInfoError('User ID not found. Please login again.');
        return;
      }
      console.log(firstName);
      
      // Update user information
      await apiService.updateUserInfo(userId, { first_name: "mhoit" });
      setUserInfoUpdated(true);
    } catch (error) {
      setUserInfoError('Failed to update user information. Please try again.');
      console.error(error);
    }
  };

  // Handle booking creation
  const handleCreateBooking = async (e) => {
    // e.preventDefault();
    setBookingError('');
    const userData = localStorage.getItem('user');

      // Parse the JSON string
      const userObject = JSON.parse(userData);

      // Extract the ID
      const userId = userObject.id;
       const artistId = artist?.id;
       console.log(artist.id);
    
    // Form validation
    if (!name || !selectedDate || !fromTime || !toTime || !formattedAddress || !selectedCategory  || !audienceSize) {
      setBookingError("Please fill in all required fields");
      return;
    }
    
    try {

      const isTeam= artist.about_team ? 'true' : 'false';
      // Format booking data
      const formattedBookingData = {
        isTeam: isTeam ,
        user_id: userId,
        artistId ,
        booking_date: selectedDate instanceof Date 
    ? selectedDate.toISOString().split('T')[0] 
    : typeof selectedDate === 'string' 
      ? selectedDate 
      : new Date(selectedDate).toISOString().split('T')[0],
        booked_from: fromTime,
        booked_to: toTime,
        duration,
        audience_size: audienceSize,
        formattedAddress,
        special_request: message,
        category : selectedCategory,
        total_amount: totalPrice,
        status: 0,
        has_sound_system: hasSoundSystem
      };
      
      // Create booking
      await apiService.createBooking(formattedBookingData);
      setBookingCreated(true);
      
      // // Proceed to payment after booking is created
      // handleProceedToPayment();
    } catch (error) {
      setBookingError('Failed to create booking. Please try again.');
      console.error(error);
    }
  };

  // Handle payment with Razorpay
 // Frontend: Updated handleProceedToPayment function

// Client-side implementation for notifications in payment flow
const handleProceedToPayment = async () => {
  try {
    // Create booking details object
    const bookingDetails = {
      name,
      date: selectedDate,
      fromTime,
      toTime,
      duration,
      // category,
      audienceSize,
      location,
      hasSoundSystem,
      message,
      totalPrice
    };
    
    console.log("Proceeding to payment with details:", {
      artist,
      user,
      bookingDetails
    });
    
    // First, create an order on the server
    const response = await fetch('http://localhost:8000/api/payments/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        artist_id: artist?.id,
        user_id: user?.id,
        amount: totalPrice,
        booking_details: bookingDetails
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create order');
    }
    
    const orderData = await response.json();

    console.log(orderData);
    
    // Initialize Razorpay payment
    if (window.Razorpay) {
      const options = {
        key: orderData.key,
        amount: orderData.amount * 100, // Convert to paise
        currency: orderData.currency,
        name: `Booking for ${artist?.name || "Artist"}`,
        description: `Event booking on PrimeStage`,
        order_id: orderData.order_id, // Use the order_id from the server
        handler: async function(paymentResponse) {
          console.log("Payment successful:", paymentResponse);
          
          // Verify the payment on the server
          try {
            const verifyResponse = await fetch('http://localhost:8000/api/payments/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature
              }),
            });
            
            if (!verifyResponse.ok) {
              const verifyError = await verifyResponse.json();
              throw new Error(verifyError.error || 'Payment verification failed');
            }
            
            // Payment verified successfully
            handleUpdateUserInfo();
            
            // Create booking first
            const bookingResponse = await handleCreateBooking();
            
            // If booking creation was successful, send notification to the artist
            // if (bookingResponse && artist?.fcm_token) {
              try {
                console.log("Sending notification to artist with token:", artist.fcm_token);
                // Send notification to artist about new booking
                const notificationResponse = await fetch('http://localhost:8000/api/notifications/send-notification-artist', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    fcm_token: artist.fcm_token,
                    // type: 'new_booking',
                    status: false // false means new booking, not cancellation
                  }),
                });
                
                if (!notificationResponse.ok) {
                  const notificationError = await notificationResponse.json();
                  console.error('Failed to send notification to artist:', notificationError);
                } else {
                  console.log('Notification sent to artist successfully');
                }
              } catch (notificationError) {
                console.error('Error sending notification to artist:', notificationError);
                // Don't throw error here to avoid interrupting the payment flow
              }
            // } else {
            //   console.warn("Cannot send notification: missing artist FCM token or booking response");
            // }
            navigate('/all-bookings', {
        // state: {
        //   artist,
        //   user,
        // },
          });
            
            // alert("Payment Successful!");
            // Here you would typically navigate to a confirmation page
            // For example: navigate('/booking-confirmation', { state: { booking: bookingResponse } });
          } catch (error) {
            console.error("Payment verification error:", error);
            alert(`Payment verification failed: ${error.message}`);
          }
        },
        prefill: {
          name: user?.name || name,
          email: user?.email || "",
          contact: user?.phone || ""
        },
        notes: {
          booking_details: JSON.stringify(bookingDetails)
        },
        theme: {
          color: "#E11D48" // Matches your rose-600 button color
        }
      };
      
      // Create and open Razorpay payment window
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function(response) {
        console.error("Payment failed:", response.error);
        alert(`Payment failed: ${response.error.description}`);
      });
      rzp.open();
    } else {
      alert("Razorpay failed to load. Please try again later.");
    }
  } catch (error) {
    console.error("Error in payment process:", error);
    alert(`Payment initialization failed: ${error.message}`);
  }
};
  
  // Store payment details after successful payment
  const storePaymentDetails = async (paymentResponse) => {
    try {
      const paymentData = {
        payment_id: paymentResponse.razorpay_payment_id,
        order_id: paymentResponse.razorpay_order_id,
        signature: paymentResponse.razorpay_signature
      };
      
      await apiService.storePaymentDetails(paymentData);
      // Payment processed successfully
    } catch (error) {
      console.error('Failed to store payment details:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Card className="w-full mx-auto">
        <CardHeader className="p-6">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">Booking Details</h1>
          </div>
        </CardHeader>
  
        <CardContent className="mx-7 p-6 space-y-8">
          {/* Artist Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-16 p-6 bg-gray-50 rounded-xl sm:w-full">
            {/* Profile Image Container */}
            <div className="w-50 h-48 rounded-xl overflow-hidden flex-shrink-0"> 
              <img 
                src={artist?.profile_photo || "/images-2.jpeg"} 
                alt={artist?.name || "Artist"} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Artist Details */}
            <div className="text-center sm:text-left mt-5">
              <h2 className="text-xl font-semibold text-gray-900">{artist?.name || artist?.team_name || "Artist Name"}</h2>
              <p className="text-lg font-normal mt-1">{artist?.skill_category || "Singer"}</p>
              <p className="text-lg font-medium mt-1">Rating: {artist?.average_rating || "4.5"}/5</p>
              <p className="text-rose-600 text-lg font-medium mt-1">₹{artist?.price_per_hour || "5,000"} Per Hour</p>
              <p className="text-sm text-gray-600">(Includes all the Taxes)</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Section: Name, Event Type, Audience Size */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Event Details</h2>

              {/* Name Input */}
              <input
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none transition-colors"
              />

              {/* Event Category Dropdown */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none transition-colors appearance-none bg-white"
                >
                  <option value="">Select Event Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {/* Dropdown Icon */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>

              {/* Audience Size Dropdown */}
              <div className="relative">
                <select
                  value={audienceSize}
                  onChange={(e) => setAudienceSize(e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none transition-colors appearance-none bg-white"
                >
                  <option value="">Your Audience Size</option>
                  {audienceSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                {/* Dropdown Icon */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                  <ChevronDown className="w-5 h-5" />
                </div>
              </div>

              {/* Message Input */}
              <textarea
                placeholder="Any message for the Artist (Optional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none transition-colors"
                rows={3}
              />
            </div>
  
            {/* Right Section: Date & Time */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Venue and Timings</h2>
              
              <div className="flex items-center border border-gray-200 rounded-xl p-4 mb-4 hover:border-rose-500 transition-colors">
                <input
                  type="date"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="flex-grow border-none focus:outline-none bg-transparent"
                />
                <Calendar className="text-gray-400" />
              </div>
  
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* From Time Input */}
                 <div className="relative">
          <input
            type="time"
            placeholder="From"
            value={formatDisplayTime(fromTime, fromAmPm)}
            onChange={(e) => handleInputChange(e, true)}
            onClick={() => {
              setShowFromClock(true);
              setShowToClock(false);
            }}
            className="w-full p-3.5 border border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none transition-colors"
          />
          <div className="absolute right-12 top-3.5 text-sm font-medium text-gray-500">
            {fromAmPm}
          </div>
          <Clock className="absolute right-4 top-3.5 text-gray-400" />
          
          {showFromClock && (
            <ClockWidget isFromTime={true} />
          )}
        </div>
        
        {/* To Time Input */}
        <div className="relative">
          <input
            type="time"
            placeholder="To"
            value={formatDisplayTime(toTime, toAmPm)}
            onChange={(e) => handleInputChange(e, false)}
            onClick={() => {
              setShowToClock(true);
              setShowFromClock(false);
            }}
            className="w-full p-3.5 border border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none transition-colors"
          />
          <div className="absolute right-12 top-3.5 text-sm font-medium text-gray-500">
            {toAmPm}
          </div>
          <Clock className="absolute right-4 top-3.5 text-gray-400" />
          
          {showToClock && (
            <ClockWidget isFromTime={false} />
          )}
        </div>
              </div>

              {/* Duration Display */}
              {duration && (
                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-700">
                    <span className="font-medium">Duration:</span> {duration}
                  </p>
                </div>
              )}

              {/* Location Section */}
              <div className="mt-4">
                <button
                  onClick={handleLocationClick}
                  className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-rose-500 transition-colors"
                >
                  <span className="text-gray-600">{formattedAddress || 'Select Location'}</span>
                  <MapPin className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Sound System Button */}
          <button 
           onClick={handleSoundClick}
          className="w-1/2 mx-auto bg-rose-600 hover:bg-rose-700 text-white py-3.5 rounded-xl font-semibold text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 block">
            Customize Sound System
          </button>
          
          {/* Payment Section */}
          <div className="pt-10">
            <h2 className="text-xl font-semibold mb-1">Payment Information</h2>
            <div className="text-gray-400 mb-5">Doubts regarding Artist, Cancellation and Refunds refer to FAQ and Customer Support </div>
            
            <div className="space-y-4 bg-gray-50 p-6 rounded-xl">
              <div className="flex justify-between mr-20">
                <span className="text-gray-600">Total Price for the artist:</span>
                <span className="font-medium">₹{totalArtistPrice.toLocaleString()}</span>
              </div>
  
              {hasSoundSystem && (
                <>
                  <div className="flex justify-between mr-20">
                    <span className="text-gray-600">Sound system price:</span>
                    <span className="font-medium">₹{soundSystemPrice.toLocaleString()}</span>
                  </div>
                  <button className="flex items-center text-blue-600 hover:text-blue-700 transition-colors mr-20">
                    <span className="mr-2">See what's included</span>
                    <Info size={16} className="text-rose-500" />
                  </button>
                </>
              )}
  
              <div className="flex justify-between items-center text-sm mr-20">
                <span className="text-gray-600 italic">Have your own sound system?</span>
                <button 
                  onClick={() => setHasSoundSystem(!hasSoundSystem)}
                  className={`px-3 py-1 rounded-lg ${hasSoundSystem ? 'text-red-500 hover:text-red-600' : 'text-green-500 hover:text-green-600'} transition-colors`}
                >
                  {hasSoundSystem ? 'Remove' : 'Add'}
                </button>
              </div>
  
              <div className="border-t border-gray-200 pt-4 mt-4 mr-20">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount Payable:</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1 mr-20">(Includes all taxes)</p>
              </div>
            </div>
          </div>
  
          {/* Submit Button */}
          <button
        onClick={handleProceedToPayment}
        className="w-[70%] mx-auto bg-rose-600 hover:bg-rose-700 text-white py-3.5 rounded-xl font-semibold text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 block"
        disabled={isLoading}
      >
        {isLoading ? "Loading Payment..." : "Proceed to Payment"}
      </button>
      
      {error && (
        <p className="text-red-500 text-center mt-2">
          Error loading payment system: {error.message}
        </p>
      )}
        </CardContent>
      </Card>
  
      {/* Location Dialog */}
      {showLocationDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md bg-white rounded-xl overflow-hidden">
            <Alert className="m-0 rounded-none border-0">
              <div className="flex justify-between items-start mb-4">
                <AlertTitle className="text-lg">Choose Location Method</AlertTitle>
                <button 
                  onClick={() => setShowLocationDialog(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <AlertDescription className="space-y-4">
                <button
                  onClick={getCurrentLocation}
                  className="w-full flex items-center justify-center p-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Use Current Location
                </button>
                <button
                  onClick={() => {
                    setIsManualLocation(true);
                    setShowLocationDialog(false);
                  }}
                  className="w-full flex items-center justify-center p-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Enter Location Manually
                </button>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}
  
      {/* Manual Location Input */}
      {isManualLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md bg-white rounded-xl overflow-hidden">
            <Alert className="m-0 rounded-none border-0">
              <div className="flex justify-between items-start mb-4">
                <AlertTitle className="text-lg">Enter Location</AlertTitle>
                <button 
                  onClick={() => setIsManualLocation(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <AlertDescription className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter your location"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none transition-colors"
                  value={location_}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsManualLocation(false)}
                    className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setIsManualLocation(false)}
                    className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;