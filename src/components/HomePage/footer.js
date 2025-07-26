import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="container mx-auto px-2 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-medium mb-4">HELP</h4>
            <ul className="space-y-2">
              <li><a href="./contact-us" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">FAQs</a></li>
              <li><a href="./term-conditions" className="hover:underline">Terms & Conditions</a></li>
              <li><a href="./company-policies" className="hover:underline">Privacy Policy</a></li>
              <li><a href="./refund-policy" className="hover:underline">Cancellation and Refund </a></li>
              <li><a href="./Shipping-delivery" className="hover:underline">Shipping and Delivery </a></li>
              
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">SERVICES</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Singers</a></li>
              <li><a href="#" className="hover:underline">Sound System</a></li>
              <li><a href="#" className="hover:underline">Anchors</a></li>
              <li><a href="#" className="hover:underline">Dancers</a></li>
              <li><a href="#" className="hover:underline">Magicians</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">ARTIST REGISTRATION</h4>
            <ul className="space-y-2">
              <li><a href="https://primestage.in/" className="hover:underline">Register as Solo Artist</a></li>
              <li><a href="https://primestage.in/" className="hover:underline">Register as Team of Artists</a></li>
            
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">FOLLOW US</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Instagram</a></li>
              <li><a href="#" className="hover:underline">Facebook</a></li>
              <li><a href="#" className="hover:underline">Twitter</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mx-4"> {/* Added mx-4 for left and right spacing */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Company Address with Logo */}
            <div>
              {/* Logo */}
              <div className="mb-6"> {/* Logo container */}
                <img
                  src="/Screenshot 2025-02-16 at 12.20.51 PM.JPEG" // Replace with your logo path
                  alt="Company Logo"
                  className="h-12" // Adjust height as needed
                />
              </div>

              {/* Company Address */}
              <div className="space-y-3">
                <h4 className="font-medium mb-4">COMPANY ADDRESS</h4>
                <div className="flex items-start space-x-2 text-gray-600">
                  <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                  <p className="text-sm">
                    Salogra, Solan<br />
                    Himachal Pradesh, 173212 India
                
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="w-5 h-5" />
                  <p className="text-sm">+91 9588179288 / 8538948208</p>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-5 h-5" />
                  <p className="text-sm">support@primestage.in</p>
                </div>
              </div>
            </div>

            {/* Try Our App Section */}
            <div>
  <h4 className="font-medium mb-6 ">FOR BETTER EXPERIECNE TRY OUR APP</h4>
  <div className="flex flex-col space-y-2"> {/* Stack images vertically and add spacing between them */}
    {/* First Image - App Store */}
    <a
      href="https://primestage.in/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="/5a902db97f96951c82922874.png" // Replace with your App Store image path
        alt="Download on the App Store"
        style={{ width: '215px', height: '60px' }} // Set width and height in pixels
        className="cursor-pointer hover:opacity-80 transition-opacity ml-3" // Shift App Store image right
      />
    </a>
    {/* Second Image - Google Play */}
    <a
      href="https://primestage.in/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="/5a902dbf7f96951c82922875.png" // Replace with your Google Play image path
        alt="Get it on Google Play"
        style={{ width: '240px', height: '85px' }} // Set width and height in pixels
        className="cursor-pointer hover:opacity-80 transition-opacity"
      />
    </a>
  </div>
</div>

          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 py-4">
          <p className="text-sm text-gray-600 text-center">
            © {new Date().getFullYear()} PrimeStage Live Pvt Lmt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;