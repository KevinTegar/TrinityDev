import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleKonsultasi = () => {
    const phoneNumber = '6289615219160';
    const message = 'Halo, saya tertarik untuk konsultasi pembuatan website. Boleh saya tanya-tanya lebih lanjut?';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Variants for Framer Motion animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="hero" id="hero">
      {/* Animated Background */}
      <div className="hero-background">
        <div 
          className="gradient-orb orb-1"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
        <div 
          className="gradient-orb orb-2"
          style={{
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`
          }}
        />
        <div 
          className="gradient-orb orb-3"
          style={{
            transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * -0.025}px)`
          }}
        />
        
        {/* Grid Pattern */}
        <div className="grid-pattern"></div>
        
        {/* Floating Particles */}
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>
      </div>
      
      <motion.div 
        className={`hero-content ${isLoaded ? 'loaded' : ''}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-text">
          <motion.div variants={itemVariants} className="hero-badge">
            <span className="badge-dot"></span>
            <span className="badge-text">🚀 Digital Agency Terpercaya</span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="hero-title">
            Kami Membantu Bisnis Anda
            <br />
            Tampil <span className="highlight-text">Profesional</span> di
            <br />
            <span className="gradient-text">Dunia Digital</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-subtitle">
            Spesialis pembuatan website modern dengan desain yang menarik, 
            performa tinggi, dan optimasi SEO untuk kesuksesan bisnis Anda.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Project Selesai</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Klien Puas</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-number">4.9/5</div>
              <div className="stat-label">Rating</div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="hero-buttons">
            <button className="btn btn-primary" onClick={handleKonsultasi}>
              <span>Konsultasi Gratis</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
            <button className="btn btn-outline" onClick={() => scrollToSection('portfolio')}>
              <span>Lihat Portfolio</span>
            </button>
          </motion.div>
        </div>

        <motion.div 
          className="hero-visual"
          variants={floatingVariants}
          animate="animate"
        >
          <div className="visual-container">
            {/* 3D Card Effect */}
            <div className="card-3d">
              <div className="card-inner">
                <div className="card-face card-front">
                  <div className="card-header">
                    <div className="card-dots">
                      <span className="dot red"></span>
                      <span className="dot yellow"></span>
                      <span className="dot green"></span>
                    </div>
                    <div className="card-title">Your Website</div>
                  </div>
                  <div className="card-body">
                    <div className="code-line"></div>
                    <div className="code-line short"></div>
                    <div className="code-line medium"></div>
                    <div className="preview-box">
                      <div className="preview-gradient"></div>
                    </div>
                    <div className="feature-grid">
                      <div className="feature-item">
                        <div className="feature-icon">🎨</div>
                        <div className="feature-text">Modern Design</div>
                      </div>
                      <div className="feature-item">
                        <div className="feature-icon">⚡</div>
                        <div className="feature-text">Fast Loading</div>
                      </div>
                      <div className="feature-item">
                        <div className="feature-icon">📱</div>
                        <div className="feature-text">Responsive</div>
                      </div>
                      <div className="feature-item">
                        <div className="feature-icon">🔍</div>
                        <div className="feature-text">SEO Ready</div>
                  </div>
                </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Tech Icons */}
            <div className="tech-icons">
              <motion.div 
                className="tech-icon"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0 }}
              >
                ⚛️
              </motion.div>
              <motion.div 
                className="tech-icon"
                animate={{ y: [-15, 15, -15] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              >
                🎨
              </motion.div>
              <motion.div 
                className="tech-icon"
                animate={{ y: [-12, 12, -12] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
              >
                ⚡
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span className="scroll-text">Scroll untuk melihat lebih</span>
      </motion.div>
    </section>
  );
};

export default Hero;
