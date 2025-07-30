import React, { useState } from 'react';
import type { GuestbookEntry } from '../types';
import Card from './common/Card';

interface GuestbookProps {
  entries: GuestbookEntry[];
  addEntry: (entry: Omit<GuestbookEntry, 'id' | 'date'>) => void;
}

const Guestbook: React.FC<GuestbookProps> = ({ entries, addEntry }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && message.trim()) {
      addEntry({ name, message });
      setName('');
      setMessage('');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Gæstebog</h2>
      
      <Card className="mb-8">
        <form onSubmit={handleSubmit}>
          <h3 className="text-xl font-bold mb-4">Skriv en Hilsen</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Dit Navn"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
              required
            />
            <textarea
              placeholder="Din besked..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md h-24 focus:ring-brand-accent focus:border-brand-accent"
              required
            />
          </div>
          <div className="mt-4 text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-brand-accent text-white rounded-md hover:bg-brand-accent-light transition-colors"
            >
              Send Besked
            </button>
          </div>
        </form>
      </Card>

      <div className="space-y-6">
        {entries.map(entry => (
          <Card key={entry.id}>
            <p className="text-brand-primary mb-4">"{entry.message}"</p>
            <div className="text-right text-sm text-brand-secondary">
              <p className="font-semibold">- {entry.name}</p>
              <p>{new Date(entry.date).toLocaleDateString()}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Guestbook;