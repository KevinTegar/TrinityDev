import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import './ScrollToTop.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / windowHeight) * 100;

      setScrollProgress(scrollPercentage);
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const circumference = 2 * Math.PI * 22; // 22 is the radius

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="scroll-to-top"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }}
        >
          <motion.button
            className="scroll-button"
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            {/* Progress Circle */}
            <svg className="progress-ring" width="60" height="60">
              <circle
                className="progress-ring-background"
                cx="30"
                cy="30"
                r="22"
              />
              <circle
                className="progress-ring-progress"
                cx="30"
                cy="30"
                r="22"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: circumference - (scrollProgress / 100) * circumference,
                }}
              />
            </svg>
            
            {/* Arrow Icon */}
            <FiArrowUp className="scroll-icon" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;

