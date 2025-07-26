import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, X } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { AuthContext } from '../context/AuthContext'; // You'll need to create this

const PhoneAuthModal = ({ artist, onClose }) => {
  const [step, setStep] = useState('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { user } = useAuth();


   // Add effect to close modal and redirect if user is already logged in
   useEffect(() => {
    if (user) {
      onClose();
      navigate('/artists/booking', {
        state: {
          artist,
          user
        }
      });
    }
  }, [user, navigate, artist, onClose]);

  // API configuration
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

  const validatePhone = (phone) => {
    return phone.length === 10 && /^\d+$/.test(phone);
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validatePhone(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    try {
      // Call the send OTP API
      const response = await axios.post(`${API_BASE_URL}/auth/send-otp`, {
        numbers: phoneNumber
      });

      if (response.data.message === 'OTP sent successfully') {
        setStep('otp');
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // In your frontend PhoneAuthModal.js
const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      // Verify OTP
      const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, {
        numbers: phoneNumber,
        otp: otp
      });

      if (response.data.message === 'OTP verified successfully') {
        try {
          // Make sure the property names match what the backend expects
          const userResponse = await axios.post(`${API_BASE_URL}/login/user`, {
            phone_number: phoneNumber,  // Make sure this matches the backend expected property name
            fcm_token: 'your-fcm-token' // Add your FCM token here
          });
          
          if (userResponse.data.message === 'loggedin and FCM token updated successfully.') {
            const userData = userResponse.data.user;
            const authToken = userResponse.data.token;
            login(userData, authToken);
            // login(userResponse.data.user);
            console.log('verified successfully mohit');
            navigate('/artists/booking', { 
              state: { 
                artist,
                user: userData
              }
            });

            
            console.log('verified successfully mohit2');
          }
        } catch (userErr) {
          // console.error('Login error:', userErr);
          setError(userErr.response?.data?.error || 'Error checking user status');
        }
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
};
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Book {artist.name}</h2>
          <p className="text-gray-600 mt-2">
            {step === 'phone' 
              ? 'Enter your phone number to continue' 
              : 'Enter the OTP sent to your phone'}
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {step === 'phone' ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                maxLength={10}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Sending OTP...' : 'Continue'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              maxLength={6}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PhoneAuthModal;