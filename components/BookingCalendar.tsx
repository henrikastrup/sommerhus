import React, { useState, useMemo } from 'react';
import type { Booking, Owner } from '../types';
import { OWNERS, ALL_PRE_ALLOCATIONS } from '../constants';
import Card from './common/Card';

interface BookingCalendarProps {
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
}

const WEEKS_IN_YEAR = 52;
const YEARS = [2025, 2026, 2027, 2028];

interface DisplayBooking {
    owner: Owner;
    note?: string;
    isPreallocated: boolean;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ bookings, addBooking }) => {
  const [selectedYear, setSelectedYear] = useState(YEARS[0]);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [selectedOwnerId, setSelectedOwnerId] = useState<string>(OWNERS[0].id);

  const displayMap = useMemo(() => {
    const map = new Map<number, DisplayBooking>();
    const ownerMap = new Map(OWNERS.map(o => [o.id, o]));

    // Filter allocations for the selected year
    const yearAllocations = ALL_PRE_ALLOCATIONS.filter(b => b.year === selectedYear);

    // 1. Add pre-allocations for the selected year
    yearAllocations.forEach(booking => {
        const owner = ownerMap.get(booking.ownerId);
        if (owner) {
            map.set(booking.week, {
                owner,
                note: booking.note,
                isPreallocated: true,
            });
        }
    });

    // 2. Add and overwrite with final bookings for the selected year
    bookings.forEach(booking => {
        if (booking.year === selectedYear) {
            const owner = ownerMap.get(booking.ownerId);
            if (owner) {
                map.set(booking.week, {
                    owner,
                    note: booking.note,
                    isPreallocated: false,
                });
            }
        }
    });

    return map;
  }, [bookings, selectedYear]);

  const handleWeekClick = (week: number) => {
    setSelectedWeek(week);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedWeek !== null) {
      addBooking({
        year: selectedYear,
        week: selectedWeek,
        ownerId: selectedOwnerId,
      });
      setSelectedWeek(null);
    }
  };

  const renderBookingModal = () => {
    if (selectedWeek === null) return null;

    const bookingInfo = displayMap.get(selectedWeek);
    const isAllocated = bookingInfo && bookingInfo.isPreallocated;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <form onSubmit={handleBookingSubmit}>
            <h3 className="text-2xl font-bold mb-4">Book Uge {selectedWeek}, {selectedYear}</h3>
            <p className="text-brand-secondary mb-4 -mt-2">
              {isAllocated 
                ? `Denne uge er tildelt ${bookingInfo.owner.name}. En ny booking vil overskrive dette.`
                : 'Denne uge er ledig.'
              }
            </p>
            <div className="mb-4">
              <label htmlFor="owner" className="block text-sm font-medium text-brand-secondary mb-1">
                Vælg Ejer
              </label>
              <select
                id="owner"
                value={selectedOwnerId}
                onChange={(e) => setSelectedOwnerId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-brand-accent focus:border-brand-accent"
              >
                {OWNERS.map(owner => (
                  <option key={owner.id} value={owner.id}>{owner.name}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setSelectedWeek(null)}
                className="px-4 py-2 bg-gray-200 text-brand-secondary rounded-md hover:bg-gray-300"
              >
                Annuller
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-brand-accent text-white rounded-md hover:bg-brand-accent-light"
              >
                Bekræft Booking
              </button>
            </div>
          </form>
        </Card>
      </div>
    );
  };

  return (
    <>
       <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-2 text-center">
        <h2 className="text-3xl font-bold">Bookingkalender</h2>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded-md text-xl font-bold focus:ring-brand-accent focus:border-brand-accent bg-white shadow-sm"
        >
          {YEARS.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <p className="text-center text-brand-secondary mb-8">Klik på en uge for at booke den. Forslagsuger er semitransparente.</p>
      
      <Card>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 lg:grid-cols-9 gap-2">
          {Array.from({ length: WEEKS_IN_YEAR }, (_, i) => i + 1).map(week => {
            const bookingInfo = displayMap.get(week);
            const isBooked = !!bookingInfo;

            const weekClasses = `
              h-24 flex flex-col items-center justify-center rounded-lg text-xs font-semibold
              cursor-pointer transition-all duration-200 border-2 p-1 text-center
              ${isBooked 
                ? `${bookingInfo.owner.color} text-gray-800 border-transparent ${bookingInfo.isPreallocated ? 'opacity-70 hover:opacity-100' : 'shadow-md'}`
                : 'bg-white hover:bg-brand-accent-light/30 hover:border-brand-accent border-gray-200'
              }
            `;

            return (
              <div key={week} className={weekClasses} onClick={() => handleWeekClick(week)}>
                <span className="font-bold text-lg">{week}</span>
                {bookingInfo && (
                    <>
                        <span className="mt-1 font-bold">{bookingInfo.owner.name}</span>
                        {bookingInfo.note && <span className="mt-1 text-xs italic">{bookingInfo.note}</span>}
                    </>
                )}
              </div>
            );
          })}
        </div>
      </Card>
      
      <div className="mt-8 flex justify-center flex-wrap gap-x-4 gap-y-2">
        {OWNERS.map(owner => (
          <div key={owner.id} className="flex items-center space-x-2">
            <div className={`w-4 h-4 rounded-full ${owner.color}`}></div>
            <span className="text-sm text-brand-secondary">{owner.name}</span>
          </div>
        ))}
         <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-lg bg-gray-200 opacity-70 border-2"></div>
            <span className="text-sm text-brand-secondary">Foreslået uge</span>
          </div>
      </div>

      {renderBookingModal()}
    </>
  );
};

export default BookingCalendar;