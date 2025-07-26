import React from 'react';
import { X, ChevronRight, HelpCircle, FileText, Shield, Users, MoreHorizontal, Music, UserPlus, Briefcase, Building, HandshakeIcon, PenSquare, IndianRupee } from 'lucide-react';

const NavigationMenu = ({ isMenuOpen, setIsMenuOpen }) => {
  const navigationItems = [
    "SINGER",
    "DJ",
    "BANDS",
    "ANCHOR",
    "INSTRUMENTALISTS",
    "MAGICIAN",
    "COMEDIAN",
    "DANCERS"
  ];

  const supportItems = [
    { text: "Customer Support", icon: HelpCircle },
    { text: "FAQ", icon: FileText },
    { text: "Terms & Conditions", icon: Shield, path:"./term-conditions" },
    { text: "Company Policies", icon: Users, path:"./company-policies" },
    { text: "Refund Policy", icon: IndianRupee , path:"./refund-policy"},
  ];

  const registrationItems = [
    { text: "Register as an Artist", icon: Music },
    { text: "Join as a Team of Artists", icon: UserPlus },
    // { text: "Business Opportunities", icon: Briefcase },
    // { text: "Corporate Partnerships", icon: Building },
    // { text: "Become a Partner", icon: HandshakeIcon },
  ];

  if (!isMenuOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/75 z-40 transition-opacity duration-300"
        onClick={() => setIsMenuOpen(false)}
      />
      
      {/* Navigation Menu */}
      <div className="fixed inset-y-0 left-0 w-[35%] bg-white z-50 overflow-y-auto shadow-lg">
        <div className="px-4 py-8">
          <div className="flex justify-end">
            <button onClick={() => setIsMenuOpen(false)} className="p-2">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-8">
            {/* Main Navigation */}
            {navigationItems.map((item, index) => (
              <div key={index} className="relative group">
                <a
                  href="#"
                  className="block py-4 pl-4 text-xl transition-all duration-300 group-hover:bg-gray-50 group-hover:pl-6"
                >
                  <div className="flex items-center justify-between pr-4">
                    <span className="relative">
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <ChevronRight className="opacity-0 transition-all duration-300 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-gray-400" />
                  </div>
                </a>
                <div className="absolute inset-0 bg-gray-50 transform scale-x-0 origin-left transition-transform duration-300 -z-10 group-hover:scale-x-100"></div>
              </div>
            ))}
            
            {/* First Divider */}
            <div className="h-px bg-gray-200 mx-4 mt-4 mb-4"></div>
            
            {/* Support Navigation */}
            <div className="px-4">
              {supportItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="relative group">
                    <a
                      href={item.path}
                      className="block py-3 text-gray-600 transition-all duration-300 group-hover:text-gray-900"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5" />
                        <span className="text-base relative">
                          {item.text}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>

            {/* Second Divider */}
            <div className="h-px bg-gray-200 mx-4 mt-4 mb-4"></div>

            {/* Registration Navigation */}
            <div className="px-4">
              {registrationItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="relative group">
                    <a
                      href="#"
                      className="block py-3 text-gray-600 transition-all duration-300 group-hover:text-gray-900"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-5 w-5" />
                        <span className="text-base relative">
                          {item.text}
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default NavigationMenu;