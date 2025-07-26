import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, Clock, Info, MapPin, Navigation, X, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert';

const SoundDetails = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [fromTime, setFromTime] = useState('');
  const [toTime, setToTime] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [audienceSize, setAudienceSize] = useState('');
  const [hasSoundSystem, setHasSoundSystem] = useState(true);
  const [location, setLocation] = useState('');
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [isManualLocation, setIsManualLocation] = useState(false);
  const [name, setName] = useState('');

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
      }
    }
  }, [fromTime, toTime]);

  const handleLocationClick = () => {
    setShowLocationDialog(true);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
          setShowLocationDialog(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsManualLocation(true);
        }
      );
    } else {
      setIsManualLocation(true);
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
  
        <CardContent className=" mx-7 p-6 space-y-8">
          {/* Artist Info */}
<div className="flex flex-col sm:flex-row items-center sm:items-start gap-16 p-6 bg-gray-50 rounded-xl  sm:w-[100%]">
  {/* Profile Image Container */}
  <div className="w-50 h-48 rounded-xl overflow-hidden flex-shrink-0"> 
    <img 
      src="/images-2.jpeg" 
      alt="Artist" 
      className="w-full h-full object-cover"
    />
  </div>

  {/* Artist Details */}
  <div className="text-center sm:text-left mt-5">
    <h2 className="text-xl font-semibold text-gray-900">Artist Name</h2>
    <p className="text-lg font-normal mt-1">Singer</p>
    <p className="text-lg font-medium mt-1">Rating: 4.5/5</p>
    <p className="text-rose-600 text-lg font-medium mt-1">₹5,000 Per Hour</p>
    <p className="text-sm text-gray-600 ">(Includes all the Taxes)</p>
   
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


              {/* Name Input */}
              <input
                type="text"
                placeholder="Any message for the Artist (Optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none transition-colors"
              />
            </div>
  
            {/* Right Section: Date & Time */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Venue and Timings</h2>
              
              <div className="flex items-center border border-gray-200 rounded-xl p-4 mb-4 hover:border-rose-500 transition-colors">
                <span className="flex-grow">{selectedDate || 'Choose Event Date'}</span>
                <Calendar className="text-gray-400" />
              </div>
  
        
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  {/* From Time Input */}
  <div className="relative">
    <input
      type="time"
      placeholder="From"
      value={fromTime}
      onChange={(e) => setFromTime(e.target.value)}
      className="w-full p-3.5 border border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none transition-colors"
    />
    <Clock className="absolute right-4 top-3.5 text-gray-400" />
  </div>

  {/* To Time Input */}
  <div className="relative">
    <input
      type="time"
      placeholder="To"
      value={toTime}
      onChange={(e) => setToTime(e.target.value)}
      className="w-full p-3.5 border border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none transition-colors"
    />
    <Clock className="absolute right-4 top-3.5 text-gray-400" />
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

{/* Duration */}
<input
                type="text"
                placeholder="Duration of Event"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:border-rose-500 focus:ring-2 focus:ring-rose-200 focus:outline-none transition-colors"
              />

{/* Location Section */}
<div className="mt-4">
  <button
    onClick={handleLocationClick}
    className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-rose-500 transition-colors"
  >
    <span className="text-gray-600">{location || 'Select Location'}</span>
    <MapPin className="text-gray-400" />
  </button>
</div>
            </div>
          </div>


         {/* Submit Button */}
<button className="w-[50%] mx-auto bg-rose-600 hover:bg-rose-700 text-white py-3.5 rounded-xl font-semibold text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 block">
  Customize Sound System
</button>

  
          
  
          {/* Payment Section */}
          <div className="pt-10">
            <h2 className="text-xl font-semibold mb-1">Payment Information</h2>
            <div className="text-gray-400 mb-5">Doubts regarding Artist, Cancilation and Refunds refer to FAQ and Customer Support </div>
            
            <div className="space-y-4 bg-gray-50 p-6 rounded-xl">
              <div className="flex justify-between mr-20">
                <span className="text-gray-600">Total Price for the artist:</span>
                <span className="font-medium">₹5,000</span>
              </div>
  
              {hasSoundSystem && (
                <>
                  <div className="flex justify-between mr-20">
                    <span className="text-gray-600">Sound system price:</span>
                    <span className="font-medium">₹2,000</span>
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
                  <span>₹7,000</span>
                </div>
                <p className="text-sm text-gray-600 mt-1 mr-20">(Includes all taxes)</p>
              </div>
            </div>
          </div>
  
           {/* Submit Button */}
<button className="w-[70%] mx-auto bg-rose-600 hover:bg-rose-700 text-white py-3.5 rounded-xl font-semibold text-lg transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 block">
  Proceed to Payment
</button>

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
                  value={location}
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

export default SoundDetails;