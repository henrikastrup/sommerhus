import React, { useState, useEffect } from 'react';
import { GUIDE_TOPICS } from '../constants';
import type { GuideTopic } from '../types';
import { fetchContent } from '../services/contentService';
import Card from './common/Card';
import Icon from './common/Icon';

const Guides: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center mb-8">Ankomst- & Afrejsetjeklister</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {GUIDE_TOPICS.map(topic => (
          <GuideCard key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
};

interface GuideCardProps {
  topic: GuideTopic;
}

const GuideCard: React.FC<GuideCardProps> = ({ topic }) => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchContent(topic.id)
      .then(data => {
        setContent(data);
        setIsLoading(false);
      })
      .catch(() => {
        setContent('Kunne ikke indlæse indhold.');
        setIsLoading(false);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic.id]);

  return (
    <Card>
      <div className="flex items-center mb-4">
        <Icon name={topic.icon} className="w-8 h-8 text-brand-accent mr-4" />
        <h3 className="text-2xl font-bold">{topic.title}</h3>
      </div>
      {isLoading ? (
        <p className="text-brand-secondary">Indlæser...</p>
      ) : (
        <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: content.replace(/### (.*?)\n/g, '<h4>$1</h4>').replace(/\n/g, '<br />') }} />
      )}
    </Card>
  );
};

export default Guides;