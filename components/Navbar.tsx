import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from './common/Icon';

const navLinks = [
  { to: '/', text: 'Forside', icon: 'home' },
  { to: '/booking', text: 'Booking', icon: 'calendar' },
  { to: '/guestbook', text: 'Gæstebog', icon: 'book' },
  { to: '/instructions', text: 'Vejledninger', icon: 'wrench' },
  { to: '/guides', text: 'Tjeklister', icon: 'clipboard' },
];

const Navbar: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/" className="flex items-center space-x-2 text-xl font-bold text-brand-primary">
            <Icon name="home" className="w-7 h-7 text-brand-accent"/>
            <span>Familien Astrups Sommerhus</span>
          </NavLink>
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map(({ to, text, icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-brand-accent text-white'
                      : 'text-brand-secondary hover:bg-gray-200 hover:text-brand-primary'
                  }`
                }
              >
                <Icon name={icon} className="w-5 h-5 mr-2" />
                {text}
              </NavLink>
            ))}
          </div>
          {/* Mobile menu could be added here */}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;