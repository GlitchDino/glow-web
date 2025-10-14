import React, { useRef } from 'react';
import './CardNav.css';

export interface CardNavProps {
  logo: string;
  logoAlt?: string;
  className?: string;
  baseColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = 'Logo',
  className = '',
  baseColor = '#fff',
  buttonBgColor,
  buttonTextColor
}) => {
  // Scroll function — identical to Home.tsx
  const handleScrollToJoin = () => {
    const joinSection = document.querySelector('#join-waitlist');
    if (joinSection) {
      joinSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav className="card-nav" style={{ backgroundColor: baseColor }}>
        <div className="card-nav-top">
          <div className="logo-container">
            <img src={logo} alt={logoAlt} className="logo" />
          </div>
          <button
            type="button"
            onClick={handleScrollToJoin}
            className="card-nav-cta-button"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            Waitlist
          </button>
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
