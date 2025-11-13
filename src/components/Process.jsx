import { motion } from 'framer-motion';
import { FiMessageCircle, FiDollarSign, FiCode, FiZap, FiCheckCircle, FiHeadphones } from 'react-icons/fi';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import './Process.css';

const Process = () => {
  const [titleRef, titleVisible] = useScrollAnimation(0.2);
  const [servicesRef, servicesVisible] = useScrollAnimation(0.1);
  const [processRef, processVisible] = useScrollAnimation(0.1);

  const services = [
    {
      icon: <FiCode />,
      title: 'Web Development',
      desc: 'Website custom dengan teknologi modern, performa tinggi, dan SEO friendly',
      color: 'blue'
    },
    {
      icon: <FiZap />,
      title: 'Landing Page',
      desc: 'Landing page yang menarik dan optimized untuk konversi maksimal',
      color: 'green'
    },
    {
      icon: <FiCheckCircle />,
      title: 'E-Commerce',
      desc: 'Toko online lengkap dengan payment gateway dan manajemen produk',
      color: 'orange'
    },
    {
      icon: <FiHeadphones />,
      title: 'Maintenance & Support',
      desc: 'Dukungan teknis dan maintenance website untuk performa optimal',
      color: 'purple'
    }
  ];

  const steps = [
    {
      number: '01',
      icon: <FiMessageCircle />,
      title: 'Konsultasi Gratis',
      desc: 'Diskusikan kebutuhan dan impian bisnis Anda. Kami akan memberikan solusi terbaik yang sesuai dengan budget dan goals Anda.',
    },
    {
      number: '02',
      icon: <FiDollarSign />,
      title: 'Penawaran & DP',
      desc: 'Dapatkan penawaran transparan dengan sistem DP yang fleksibel. Tidak ada hidden cost, semua transparan dan terdokumentasi.',
    },
    {
      number: '03',
      icon: <FiCode />,
      title: 'Pengerjaan Project',
      desc: 'Tim expert kami mulai mengerjakan project dengan update progress berkala. Revisi unlimited hingga Anda puas.',
    },
    {
      number: '04',
      icon: <FiZap />,
      title: 'Testing & Launch',
      desc: 'Testing menyeluruh untuk memastikan semua fitur bekerja sempurna. Launch website Anda dengan percaya diri.',
    }
  ];

  const handleWhatsApp = () => {
    const phoneNumber = '6289615219160';
    const message = 'Halo, saya tertarik untuk konsultasi pembuatan website. Boleh saya tanya-tanya lebih lanjut?';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <section className="process" id="process">
      <div className="process-container">
        {/* Services Section */}
        <div 
          ref={titleRef}
          className={`section-header ${titleVisible ? 'fade-up' : ''}`}
        >
          <span className="section-badge">Layanan Kami</span>
          <h2 className="section-title">
            Solusi <span className="gradient-text">Digital</span> Terlengkap
          </h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Kami menyediakan berbagai layanan untuk membantu bisnis Anda berkembang di era digital
          </p>
        </div>

        <motion.div 
          ref={servicesRef}
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate={servicesVisible ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`service-card service-${service.color}`}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              <div className="service-icon-wrapper">
                <div className="service-icon">
                  {service.icon}
                </div>
                <div className="icon-glow"></div>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
              <div className="service-arrow">→</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Process Section */}
        <div className="process-section">
          <div
            ref={processRef}
            className={`section-header ${processVisible ? 'fade-up' : ''}`}
          >
            <span className="section-badge">Proses Kerja</span>
            <h2 className="section-title">
              Cara <span className="gradient-text">Memulai</span> Project
            </h2>
            <div className="title-underline"></div>
            <p className="section-subtitle">
              Proses yang simpel, transparan, dan efisien untuk kesuksesan project Anda
            </p>
          </div>

          <div className="process-stack-wrapper">
            <ScrollStack
              className="process-scroll-stack"
              itemDistance={120}
              itemStackDistance={60}
              baseScale={0.84}
              itemScale={0.04}
              stackPosition="25%"
              scaleEndPosition="12%"
              rotationAmount={0}
              blurAmount={3}
              useWindowScroll
            >
              {steps.map((step, index) => (
                <ScrollStackItem
                  key={step.number}
                  itemClassName="process-stack-card"
                >
                  <div className="process-stack-header">
                    <div className="stack-number">{step.number}</div>
                    <div className="stack-icon">{step.icon}</div>
                  </div>
                  <div className="process-stack-body">
                    <h3 className="stack-title">{step.title}</h3>
                    <p className="stack-desc">{step.desc}</p>
                  </div>
                  <div className="stack-footer">
                    <span className="stack-progress">
                      Langkah {index + 1} dari {steps.length}
                    </span>
                  </div>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="cta-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="cta-content">
            <h3 className="cta-title">Siap Wujudkan Website Impian Anda?</h3>
            <p className="cta-subtitle">
              Konsultasi gratis untuk mendiskusikan project Anda. 
              Dapatkan penawaran terbaik hari ini!
            </p>
            <motion.button 
              className="cta-button"
              onClick={handleWhatsApp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
              <span>Konsultasi Gratis Sekarang</span>
            </motion.button>
            <p className="cta-note">💬 Response time: ~10 menit | 📞 100% Gratis</p>
        </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
