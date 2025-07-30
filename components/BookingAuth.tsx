import React, { useState } from 'react';
import Card from './common/Card';
import Icon from './common/Icon';

const CORRECT_CODE = '75220205';

interface BookingAuthProps {
  onAuthSuccess: () => void;
}

const BookingAuth: React.FC<BookingAuthProps> = ({ onAuthSuccess }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === CORRECT_CODE) {
      onAuthSuccess();
    } else {
      setError('Forkert kode. Prøv venligst igen.');
      setCode('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
        <Card>
          <div className="text-center mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-brand-accent/10">
                <Icon name="lock-closed" className="h-6 w-6 text-brand-accent" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-center text-brand-primary">Adgang Begrænset</h2>
            <p className="text-center text-brand-secondary mt-2">Indtast venligst adgangskoden til bookingkalenderen.</p>
          </div>
            <form onSubmit={handleSubmit} noValidate>
                <div className="space-y-4">
                    <label htmlFor="access-code" className="sr-only">Adgangskode</label>
                    <input
                        id="access-code"
                        type="password"
                        placeholder="••••••••"
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value);
                            if (error) setError('');
                        }}
                        className="w-full p-3 border border-gray-300 rounded-md text-center text-2xl tracking-widest font-mono focus:ring-brand-accent focus:border-brand-accent"
                        autoFocus
                    />
                    {error && <p className="text-red-500 text-sm text-center -mb-2">{error}</p>}
                </div>
                <div className="mt-6 text-center">
                    <button
                        type="submit"
                        className="w-full px-6 py-3 bg-brand-accent text-white font-semibold rounded-md hover:bg-brand-accent-light transition-colors disabled:bg-brand-secondary disabled:cursor-not-allowed"
                        disabled={!code.trim()}
                    >
                        Lås Op
                    </button>
                </div>
            </form>
        </Card>
    </div>
  );
};

export default BookingAuth;