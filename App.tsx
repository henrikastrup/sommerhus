import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BookingCalendar from './components/BookingCalendar';
import Guestbook from './components/Guestbook';
import Instructions from './components/Instructions';
import Guides from './components/Guides';
import BookingAuth from './components/BookingAuth';
import type { Booking, GuestbookEntry } from './types';

const App: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [guestbookEntries, setGuestbookEntries] = useState<GuestbookEntry[]>([
    {
      id: '1',
      name: 'Første Gæst',
      message: 'Havde en vidunderlig tid! Udsigten er fantastisk.',
      date: new Date().toISOString(),
    },
  ]);
  const [isBookingAuthenticated, setIsBookingAuthenticated] = useState(false);

  const addBooking = (booking: Booking) => {
    setBookings((prevBookings) => [...prevBookings, booking]);
  };

  const addGuestbookEntry = (entry: Omit<GuestbookEntry, 'id' | 'date'>) => {
    const newEntry: GuestbookEntry = {
      ...entry,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    setGuestbookEntries((prevEntries) => [newEntry, ...prevEntries]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/booking" 
            element={
              isBookingAuthenticated ? (
                <BookingCalendar bookings={bookings} addBooking={addBooking} />
              ) : (
                <BookingAuth onAuthSuccess={() => setIsBookingAuthenticated(true)} />
              )
            } 
          />
          <Route 
            path="/guestbook" 
            element={<Guestbook entries={guestbookEntries} addEntry={addGuestbookEntry} />} 
          />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/guides" element={<Guides />} />
        </Routes>
      </main>
      <footer className="text-center p-4 text-brand-secondary text-sm">
        <p>&copy; {new Date().getFullYear()} Familien Astrup. Alle rettigheder forbeholdes.</p>
      </footer>
    </div>
  );
};

export default App;