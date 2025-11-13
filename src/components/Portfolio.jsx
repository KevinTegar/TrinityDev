import { useMemo } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import CircularGallery from './CircularGallery';
import './Portfolio.css';

const PROJECTS = [
  {
    id: 1,
    name: 'Flashnet Company Profile',
    category: 'company-profile',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    tech: ['React', 'Tailwind', 'Node.js']
  },
  {
    id: 2,
    name: 'MixRadius Reseller System',
    category: 'web-app',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    tech: ['Vue.js', 'Laravel', 'MySQL']
  },
  {
    id: 3,
    name: 'Eureka English - Landing Page',
    category: 'landing-page',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=600&fit=crop',
    tech: ['HTML', 'CSS', 'JavaScript']
  },
  {
    id: 4,
    name: 'Balitripcenter V2',
    category: 'e-commerce',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
    tech: ['WordPress', 'WooCommerce']
  },
  {
    id: 5,
    name: 'Undangan Digital Premium',
    category: 'landing-page',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
    tech: ['React', 'GSAP', 'Firebase']
  },
  {
    id: 6,
    name: 'E-Commerce Fashion Store',
    category: 'e-commerce',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop',
    tech: ['Next.js', 'Stripe', 'MongoDB']
  },
  {
    id: 7,
    name: 'Corporate Website',
    category: 'company-profile',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    tech: ['React', 'Framer Motion']
  },
  {
    id: 8,
    name: 'Property Management App',
    category: 'web-app',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
    tech: ['React', 'Node.js', 'PostgreSQL']
  }
];

const Portfolio = () => {
  const [titleRef, titleVisible] = useScrollAnimation(0.2);

  const galleryItems = useMemo(
    () =>
      PROJECTS.map(project => ({
        image: project.image,
        text: project.name
      })),
    []
  );

  return (
    <section className="portfolio" id="portfolio">
      <div className="portfolio-container">
        <div 
          ref={titleRef}
          className={`portfolio-header ${titleVisible ? 'fade-up' : ''}`}
        >
          <span className="section-badge">Portfolio</span>
          <h2 className="section-title">
            Project <span className="gradient-text">Terbaik</span> Kami
          </h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Berikut adalah beberapa project website dan aplikasi yang telah kami selesaikan 
            dengan berbagai teknologi modern untuk berbagai industri
          </p>
        </div>

        {/* Portfolio Gallery */}
        {galleryItems.length > 0 ? (
          <div className="portfolio-gallery">
            <div className="portfolio-gallery-inner">
              <div className="portfolio-gallery-ogl">
                <CircularGallery
                  items={galleryItems}
                  bend={3}
                  textColor="#050505"
                  borderRadius={0.08}
                  scrollEase={0.04}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Portfolio;
