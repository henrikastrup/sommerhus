import React, { useState, useCallback } from 'react';
import { INSTRUCTION_TOPICS } from '../constants';
import type { InstructionTopic } from '../types';
import { fetchContent } from '../services/contentService';
import Card from './common/Card';
import Icon from './common/Icon';

const Instructions: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTopicClick = useCallback((topicId: string) => {
    if (activeTopic === topicId) {
      setActiveTopic(null); // Close if already open
      return;
    }

    setActiveTopic(topicId);
    setIsLoading(true);
    fetchContent(topicId).then(data => {
      setContent(data);
      setIsLoading(false);
    });
  }, [activeTopic]);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Vejledninger til Huset</h2>
      <div className="space-y-4">
        {INSTRUCTION_TOPICS.map((topic: InstructionTopic) => (
          <InstructionItem
            key={topic.id}
            topic={topic}
            isActive={activeTopic === topic.id}
            onClick={handleTopicClick}
            content={activeTopic === topic.id ? content : ''}
            isLoading={isLoading && activeTopic === topic.id}
          />
        ))}
      </div>
    </div>
  );
};

interface InstructionItemProps {
  topic: InstructionTopic;
  isActive: boolean;
  onClick: (id: string) => void;
  content: string;
  isLoading: boolean;
}

const InstructionItem: React.FC<InstructionItemProps> = ({ topic, isActive, onClick, content, isLoading }) => {
  return (
    <Card className="!p-0 overflow-hidden">
      <button
        onClick={() => onClick(topic.id)}
        className="w-full flex justify-between items-center p-6 text-left"
      >
        <div className="flex items-center">
          <Icon name={topic.icon} className="w-8 h-8 text-brand-accent mr-4" />
          <span className="text-xl font-bold text-brand-primary">{topic.title}</span>
        </div>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isActive && (
        <div className="px-6 pb-6">
          <div className="border-t pt-4">
            {isLoading ? (
              <p className="text-brand-secondary">Indlæser...</p>
            ) : (
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

export default Instructions;