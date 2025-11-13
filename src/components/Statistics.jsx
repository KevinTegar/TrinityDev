import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useCounter } from '../hooks/useCounter';
import './Statistics.css';

const Statistics = () => {
  const [statsRef, statsVisible] = useScrollAnimation(0.3);
  
  const websiteCount = useCounter(100, 2000, statsVisible);
  const clientCount = useCounter(50, 2000, statsVisible);
  const experienceCount = useCounter(5, 2000, statsVisible);

  const stats = [
    {
      value: websiteCount,
      suffix: '+',
      label: 'Website Completed'
    },
    {
      value: clientCount,
      suffix: '+',
      label: 'Client Puas'
    },
    {
      value: experienceCount,
      suffix: '',
      label: 'Tahun Pengalaman'
    },
    {
      value: '24/7',
      suffix: '',
      label: 'Support Aktif'
    }
  ];

  return (
    <section className="statistics">
      <div className="stats-background">
        <div className="wave wave-1"></div>
        <div className="wave wave-2"></div>
        <div className="wave wave-3"></div>
      </div>
      
      <div 
        ref={statsRef}
        className={`stats-container ${statsVisible ? 'visible' : ''}`}
      >
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="stat-card"
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <div className="stat-icon">
              {index === 0 && '🌐'}
              {index === 1 && '❤️'}
              {index === 2 && '⭐'}
              {index === 3 && '💬'}
            </div>
            <div className="stat-value">
              {stat.value}{stat.suffix}
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;


