import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    // Ensure minimum loading time
    const minLoadTime = setTimeout(() => {
      setLoadingProgress(100);
      clearInterval(interval);
      setTimeout(() => setIsLoading(false), 500);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(minLoadTime);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="loading-content">
            {/* Animated Logo */}
            <motion.div
              className="loading-logo"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <motion.div
                className="logo-icon"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                W
              </motion.div>
              <motion.h1
                className="logo-text"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                WebAgency
              </motion.h1>
              <motion.p
                className="loading-tagline"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Membangun Masa Depan Digital Anda
              </motion.p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              className="loading-progress-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className="progress-bar">
                <motion.div
                  className="progress-fill"
                  style={{ width: `${Math.min(loadingProgress, 100)}%` }}
                />
              </div>
              <p className="progress-text">{Math.floor(loadingProgress)}%</p>
            </motion.div>

            {/* Loading Dots */}
            <motion.div
              className="loading-dots"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="dot"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Background Effects */}
          <div className="loading-background">
            <div className="loading-orb loading-orb-1"></div>
            <div className="loading-orb loading-orb-2"></div>
            <div className="loading-grid"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;

