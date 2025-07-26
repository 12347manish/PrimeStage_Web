import React, { useState, useEffect } from 'react';
import Header from './Header';
import NavigationMenu from './Navigartion_menu';
import HeroSection from './Video';
import FeaturedCategories from './categories';
import FeaturedArtists from './featured_carousel';
import FeaturedArtists2 from './featured_caraousel2';
import LatestArtists from './latest_artist';
import BestTeam from './BestTeam';
import BestArtist from './BestArtist';
import Footer from './footer';
// import MovingBoxes from './testimonials';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const triggerPoint = window.innerHeight * 0.4;
      const progress = Math.min(scrollPosition / triggerPoint, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // // Auto-advance slides
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % 5); // 5 is the number of featured artists
  //   }, 5000);

  //   return () => clearInterval(timer);
  // }, []);

  const mainLogoStyles = {
    transform: `
      translate(
        calc(-50% + ${scrollProgress * 0}px), 
        calc(-50% - ${scrollProgress * 20}vh)
      )
      scale(${1 - scrollProgress * 0.4}) 
    `,
    opacity: scrollProgress >= 0.95 ? 0 : 1,
    position: "fixed",
    top: "20%",
    left: "50%",
    zIndex: 40,
    transformOrigin: "center center",
    transition: "transform 0.1s linear, opacity 0.2s ease-in-out",
    willChange: "transform, opacity",
    whiteSpace: "nowrap",
    fontSize: "max(12vw, 100px)",
    letterSpacing: "0.1em",
    width: "100vw",
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        scrollProgress={scrollProgress} 
        setIsMenuOpen={setIsMenuOpen} 
      />

      <NavigationMenu 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />

      <HeroSection mainLogoStyles={mainLogoStyles} />

      <FeaturedCategories />

      <FeaturedArtists 
        // currentSlide={currentSlide} 
      />

      <LatestArtists />

      <FeaturedArtists2 
        // currentSlide={currentSlide} 
      />
      <BestTeam />
      <BestArtist/>
      {/* <MovingBoxes /> */}

      <Footer />
    </div>
  );
};

export default HomePage;

