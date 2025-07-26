

// Base URL configuration
const BASE_URL = 'http://localhost:8000/api/booking';

// Default headers for requests
const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

// Helper function to add auth token to headers when available
const getAuthHeaders = () => {
  const headers = { ...defaultHeaders };
  const token = localStorage.getItem('token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

// Helper function to handle fetch responses
const handleResponse = async (response) => {
  // Check if the response is ok (status in the range 200-299)
  if (!response.ok) {
    // Create an error object similar to Axios error format
    const error = new Error(`Request failed with status code ${response.status}`);
    error.name = 'FetchError';
    error.code = 'ERR_BAD_REQUEST';
    error.response = response;
    throw error;
  }
  
  return response.json();
};

// API service object
const apiService = {
  // Update user information
  updateUserInfo: async (userId, userData) => {
    try {
        console.log(userData);
      const response = await fetch(`${BASE_URL}/info/${userId}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify(userData)
      });
      
      const data = await handleResponse(response);
      console.log('User information updated successfully');
      return data;
    } catch (error) {
      console.error('Error updating user information:', error);
      throw error;
    }
  },

  // Create a new booking
  createBooking: async (bookingData) => {
    try {
      // Get user ID from localStorage
     
    //   const userData = localStorage.getItem('user');

    //   // Parse the JSON string
    //   const userObject = JSON.parse(userData);

    //   // Extract the ID
    //   const userId = userObject.id;
      
      // Prepare booking payload
      const payload = {
        ...bookingData,
        // Set artist_id or team_id based on isTeam flag
        artist_id: bookingData.isTeam === 'true' ? null : bookingData.artistId,
        team_id: bookingData.isTeam === 'true' ? bookingData.artistId : null
      };
      
      // Remove non-database fields
      delete payload.isTeam;
      delete payload.artistId;
      
      const response = await fetch(`${BASE_URL}/booking`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      
      const data = await handleResponse(response);
      
      // Store booking ID in localStorage for payment process
      if (data && data.id) {
        localStorage.setItem('booking_id', data.id.toString());
      }
      
      console.log('Booking created successfully');
      return data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Store payment details after successful payment
  storePaymentDetails: async (paymentDetails) => {
    try {
      // Get booking ID from localStorage
      const bookingId = localStorage.getItem('booking_id');
      
      // Prepare payment payload
      const payload = {
        ...paymentDetails,
        booking_id: bookingId
      };
      
      const response = await fetch(`${BASE_URL}/payment/success`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      
      const data = await handleResponse(response);
      console.log('Payment details stored successfully');
      return data;
    } catch (error) {
      console.error('Error storing payment details:', error);
      throw error;
    }
  }
};

export default apiService;