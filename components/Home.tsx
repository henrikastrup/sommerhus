import React from 'react';
import { Link } from 'react-router-dom';
import Card from './common/Card';
import Icon from './common/Icon';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-8 shadow-lg">
        <img 
          src="https://picsum.photos/1200/400?random=1" 
          alt="Sommerhus" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider">
            Velkommen til Sommerhuset
          </h1>
        </div>
      </div>
      
      <p className="text-lg text-brand-secondary max-w-2xl mx-auto mb-12">
        Vores fælles fristed. Her kan du booke dit ophold, efterlade en hilsen i gæstebogen og finde al nødvendig information for et behageligt besøg.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <HomeLink to="/booking" icon="calendar" title="Book en Uge" description="Se kalenderen og reserver dit ophold." />
        <HomeLink to="/guestbook" icon="book" title="Gæstebog" description="Læs og skriv hilsner fra de andre ejere." />
        <HomeLink to="/instructions" icon="wrench" title="Vejledninger" description="Guides til brug af husets udstyr." />
        <HomeLink to="/guides" icon="clipboard" title="Tjeklister" description="Procedurer for ankomst og afrejse." />
      </div>
    </div>
  );
};


interface HomeLinkProps {
    to: string;
    icon: string;
    title: string;
    description: string;
}

const HomeLink: React.FC<HomeLinkProps> = ({ to, icon, title, description }) => (
    <Link to={to} className="block group">
        <Card className="h-full transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl">
            <div className="flex flex-col items-center text-center">
                <div className="bg-brand-accent/10 p-4 rounded-full mb-4">
                    <Icon name={icon} className="w-8 h-8 text-brand-accent" />
                </div>
                <h3 className="text-xl font-bold text-brand-primary mb-2">{title}</h3>
                <p className="text-brand-secondary">{description}</p>
            </div>
        </Card>
    </Link>
);

export default Home;