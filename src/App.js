// Add this near the top of client/src/index.js (before any React imports)
// Your existing React imports and render code below...
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import SearchResults from './components/SearchResults/SearchResults'; // You'll need to update this path based on where you save the SearchResults component
import ArtistShowcase from './components/ArtistShowcase';
import BookingDetails from './components/Booking';
import { AuthProvider } from './context/AuthContext';
import CompanyPoliciesPage from './components/HomePage/comanyPolicy';
import TermAndCondition from './components/HomePage/termsAndCondition';
import RefundPolicy from './components/HomePage/refundPolicy';
import BookingsAndPerformancePage from './components/HomePage/Shipping_delivery';
import ContactUsPage from './components/HomePage/contact_us';
import  AllBookings from './components/all_bookings';
import  CustomizeSoundSystemPage from './components/sound_system';
import SoundDetails from './components/sound_booking';


window.onbeforeunload = function() {
  console.log("Page is attempting to reload!");
  return "Are you sure you want to leave?";
};

function App() {
  return (
     <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/artists/:id" element={<ArtistShowcase />} />
        <Route path="/artists/booking" element={<BookingDetails />} />
        <Route path="/company-policies" element={<CompanyPoliciesPage />} />
        <Route path="/term-conditions" element={< TermAndCondition />} />
        <Route path="/refund-policy" element={< RefundPolicy />} />
        <Route path="/Shipping-delivery" element={< BookingsAndPerformancePage/>} />
        <Route path="/contact-us" element={<ContactUsPage/>} />
        <Route path="/all-bookings" element={<AllBookings/>} />
        <Route path="/sound-system" element={<CustomizeSoundSystemPage/>} />
        <Route path="/sound-booking" element={<SoundDetails/>} />
      </Routes>
    </BrowserRouter>
     </AuthProvider>
  );
}

export default App;