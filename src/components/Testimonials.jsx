import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Testimonials.css';

const Testimonials = () => {
  const [titleRef, titleVisible] = useScrollAnimation(0.2);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials = [
    {
      name: 'Budi Santoso',
      role: 'CEO',
      company: 'CoffeeSpace.id',
      photo: 'https://i.pravatar.cc/150?img=12',
      feedback: 'Website yang dibuat sangat profesional dan sesuai dengan visi brand kami. Tim sangat responsif dan membantu! Highly recommended untuk bisnis yang ingin go digital.',
      rating: 5
    },
    {
      name: 'Sarah Wijaya',
      role: 'Founder',
      company: 'BaliStay',
      photo: 'https://i.pravatar.cc/150?img=45',
      feedback: 'Proses pengerjaan cepat dan hasil melampaui ekspektasi. Sistem booking yang dibuat sangat user-friendly dan meningkatkan konversi kami hingga 150%.',
      rating: 5
    },
    {
      name: 'Ahmad Fauzi',
      role: 'Marketing Manager',
      company: 'TechServe',
      photo: 'https://i.pravatar.cc/150?img=33',
      feedback: 'Desain modern dan performa website sangat cepat. Traffic website kami meningkat 200% setelah redesign! Tim yang sangat profesional.',
      rating: 5
    },
    {
      name: 'Linda Kusuma',
      role: 'Owner',
      company: 'FreshMart',
      photo: 'https://i.pravatar.cc/150?img=47',
      feedback: 'E-commerce yang powerful dengan fitur lengkap. Support after-sales juga sangat membantu. Penjualan online kami meningkat drastis!',
      rating: 5
    },
    {
      name: 'Rudi Hartono',
      role: 'Director',
      company: 'BuildCo',
      photo: 'https://i.pravatar.cc/150?img=15',
      feedback: 'Portfolio website yang dibuat sangat memukau. Banyak klien baru yang datang setelah melihat website kami. Great work!',
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-container">
        <div 
          ref={titleRef}
          className={`testimonials-header ${titleVisible ? 'fade-up' : ''}`}
        >
          <span className="section-badge">Testimonial</span>
          <h2 className="section-title">
            Apa Kata <span className="gradient-text">Klien</span> Kami?
          </h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Kepercayaan dan kepuasan klien adalah prioritas utama kami.
            Berikut testimoni dari mereka yang telah mempercayai layanan kami.
          </p>
        </div>

        <div className="testimonials-carousel">
          <button 
            className="carousel-control prev" 
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <FiChevronLeft />
          </button>

          <div className="carousel-wrapper">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 }
                }}
                className="testimonial-card"
              >
                <div className="quote-decoration">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                    <path d="M20 40C20 28.954 28.954 20 40 20V40H20Z" fill="url(#quote-gradient)" opacity="0.2"/>
                    <path d="M60 40C60 28.954 68.954 20 80 20V40H60Z" fill="url(#quote-gradient)" opacity="0.2"/>
                    <defs>
                      <linearGradient id="quote-gradient" x1="20" y1="20" x2="80" y2="40">
                        <stop stopColor="var(--color-primary)" />
                        <stop offset="1" stopColor="var(--color-secondary)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="testimonial-content">
                  <div className="client-profile">
                    <div className="client-photo">
                      <img 
                        src={testimonials[currentSlide].photo} 
                        alt={testimonials[currentSlide].name}
                        loading="lazy"
                      />
                      <div className="photo-ring"></div>
                    </div>
                    <div className="client-info">
                      <h3 className="client-name">{testimonials[currentSlide].name}</h3>
                      <p className="client-role">
                        {testimonials[currentSlide].role} - {testimonials[currentSlide].company}
                      </p>
                    </div>
                  </div>

                  <div className="rating-stars">
                    {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <FiStar className="star filled" />
                      </motion.div>
                    ))}
                  </div>

                  <p className="testimonial-text">
                    "{testimonials[currentSlide].feedback}"
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button 
            className="carousel-control next" 
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <FiChevronRight />
          </button>
        </div>

        <div className="carousel-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
              }}
              aria-label={`Go to testimonial ${index + 1}`}
            >
              <span className="indicator-progress"></span>
            </button>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="trust-section">
        <div className="trust-stats">
          <div className="trust-stat">
            <div className="trust-number">100+</div>
            <div className="trust-label">Happy Clients</div>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-stat">
            <div className="trust-number">4.9/5</div>
            <div className="trust-label">Average Rating</div>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-stat">
            <div className="trust-number">98%</div>
            <div className="trust-label">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
