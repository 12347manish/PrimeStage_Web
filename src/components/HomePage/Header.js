import React, { useState } from 'react';
import { Menu, Search, User } from 'lucide-react';
import NavigationMenu from './Navigartion_menu';
import ProfileMenu from './Profile_menu';

const Header = ({ scrollProgress }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const headerLogoStyles = {
    opacity: scrollProgress >= 0.95 ? 1 : 0,
    transition: 'opacity 0.2s ease-in-out'
  };

  const headerStyles = {
    backgroundColor: scrollProgress > 0.5 ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0)',
    transition: 'background-color 0.3s ease-in-out',
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 transition-colors duration-300" style={headerStyles}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button onClick={() => setIsMenuOpen(true)} className="p-2">
                <Menu className={`h-6 w-6 ${scrollProgress > 0.5 ? 'text-black' : 'text-white'}`} />
              </button>
              <button className="p-2">
                <Search className={`h-6 w-6 ${scrollProgress > 0.5 ? 'text-black' : 'text-white'}`} />
              </button>
            </div>
            
            <div className="text-center">
              <h1 
                className="font-semibold transition-all" 
                style={{ fontSize: '1.9rem', letterSpacing: '0.1rem', ...headerLogoStyles }}
              >
                PRIMESTAGE
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button onClick={() => setIsProfileOpen(true)} className="p-2">
                <User className={`h-6 w-6 ${scrollProgress > 0.5 ? 'text-black' : 'text-white'}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <NavigationMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <ProfileMenu isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} />
    </>
  );
};

export default Header;