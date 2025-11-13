import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { motion } from 'framer-motion';
import { FiAward, FiUsers, FiTrendingUp, FiHeart } from 'react-icons/fi';
import './About.css';

const About = () => {
  const [titleRef, titleVisible] = useScrollAnimation(0.2);
  const [textRef, textVisible] = useScrollAnimation(0.2);
  const [cardsRef, cardsVisible] = useScrollAnimation(0.1);

  const features = [
    {
      icon: <FiAward />,
      title: 'Profesional & Berkualitas',
      desc: 'Tim expert dengan pengalaman 5+ tahun di industri web development',
      color: 'blue'
    },
    {
      icon: <FiUsers />,
      title: '100+ Klien Puas',
      desc: 'Dipercaya oleh berbagai bisnis dari startup hingga enterprise',
      color: 'green'
    },
    {
      icon: <FiTrendingUp />,
      title: 'Hasil Terukur',
      desc: 'Website yang terbukti meningkatkan konversi dan penjualan',
      color: 'orange'
    },
    {
      icon: <FiHeart />,
      title: 'Support 24/7',
      desc: 'Tim support kami siap membantu kapanpun Anda membutuhkan',
      color: 'red'
    }
  ];

  const milestones = [
    { year: '2020', title: 'Berdiri', desc: 'Memulai perjalanan digital agency', icon: '🚀' },
    { year: '2021', title: '50+ Klien', desc: 'Kepercayaan dari berbagai industri', icon: '🤝' },
    { year: '2022', title: 'Ekspansi Tim', desc: 'Menambah expert developer & designer', icon: '👥' },
    { year: '2023', title: '100+ Project', desc: 'Ratusan website sukses diluncurkan', icon: '🎯' },
    { year: '2024', title: 'Award Winner', desc: 'Penghargaan Best Digital Agency', icon: '🏆' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section className="about" id="about">
      <div className="about-container">
        <div 
          ref={titleRef} 
          className={`about-header ${titleVisible ? 'fade-up' : ''}`}
        >
          <span className="section-badge">Tentang Kami</span>
          <h2 className="section-title">
            Menghadirkan <span className="gradient-text">Solusi Digital</span>
            <br />
            Terbaik untuk Bisnis Anda
          </h2>
          <div className="title-underline"></div>
        </div>

        <div 
          ref={textRef}
          className={`about-description ${textVisible ? 'fade-up' : ''}`}
        >
          <p>
            Sejak <strong>2020</strong>, kami telah membantu lebih dari <strong>100 klien</strong> membangun 
            website profesional dengan desain modern, performa tinggi, dan hasil yang terukur.
          </p>
          <p>
            Kami percaya bahwa setiap bisnis berhak memiliki kehadiran digital yang kuat dan menarik. 
            Dengan tim expert developer, designer, dan digital marketer, kami menghadirkan solusi web yang 
            tidak hanya indah dipandang, tapi juga fungsional dan menguntungkan bisnis Anda.
          </p>
        </div>

        {/* Feature Cards */}
        <motion.div 
          ref={cardsRef}
          className="feature-cards"
          variants={containerVariants}
          initial="hidden"
          animate={cardsVisible ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className={`feature-card feature-card-${feature.color}`}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <div className="feature-card-icon">
                {feature.icon}
              </div>
              <h3 className="feature-card-title">{feature.title}</h3>
              <p className="feature-card-desc">{feature.desc}</p>
              <div className="feature-card-glow"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <div className="timeline-section">
          <h3 className="timeline-title">Perjalanan Kami</h3>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <motion.div 
                key={index} 
                className="timeline-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  ease: [0.4, 0, 0.2, 1]
                }}
              >
                <div className="timeline-icon">
                  <div className="icon-inner">
                    <span className="timeline-emoji">{milestone.icon}</span>
                    <span className="timeline-year">{milestone.year}</span>
                  </div>
                </div>
                <div className="timeline-content">
                  <h4>{milestone.title}</h4>
                  <p>{milestone.desc}</p>
                </div>
              </motion.div>
            ))}
            <div className="timeline-line"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
