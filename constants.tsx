import type { Owner, InstructionTopic, GuideTopic, Booking } from './types';
import React from 'react';

// Simplified owner names for calendar display
export const OWNERS: Owner[] = [
  { id: 'owner1', name: 'Hanne', color: 'bg-rose-300' },
  { id: 'owner2', name: 'Henrik', color: 'bg-sky-300' },
  { id: 'owner3', name: 'Birgit', color: 'bg-amber-300' },
];

const HOLIDAYS: { [year: number]: { [week: number]: string } } = {
  2025: {
    7: 'Vinterferie', 8: 'Vinterferie',
    16: 'Påske',
    22: 'Kr. Himmelfart',
    24: 'Pinse',
    42: 'Efterårsferie',
    52: 'Jul/Nytår',
  },
  2026: {
    7: 'Vinterferie', 8: 'Vinterferie',
    14: 'Påske',
    20: 'Kr. Himmelfart',
    21: 'Pinse',
    42: 'Efterårsferie',
    52: 'Jul/Nytår',
  },
  2027: {
    7: 'Vinterferie', 8: 'Vinterferie',
    13: 'Påske',
    18: 'Kr. Himmelfart',
    20: 'Pinse',
    42: 'Efterårsferie',
    52: 'Jul/Nytår',
  },
  2028: {
    7: 'Vinterferie', 8: 'Vinterferie',
    16: 'Påske',
    21: 'Kr. Himmelfart',
    23: 'Pinse',
    42: 'Efterårsferie',
    52: 'Jul/Nytår',
  },
};

const getOwnerForWeek = (globalWeek: number): string => {
    const ownerCycle = ['owner2', 'owner1', 'owner3']; // Henrik, Hanne, Birgit
    const cycleIndex = Math.floor((globalWeek - 1) / 2) % 3;
    return ownerCycle[cycleIndex];
};

const generatePreAllocationsForYear = (year: number): Booking[] => {
    const bookings: Booking[] = [];
    const yearHolidays = HOLIDAYS[year] || {};
    const startYear = 2025;
    const yearOffset = (year - startYear) * 52; 

    for (let week = 1; week <= 52; week++) {
        const globalWeek = yearOffset + week;
        const ownerId = getOwnerForWeek(globalWeek);
        const note = yearHolidays[week];
        
        const booking: Booking = {
            year,
            week,
            ownerId,
            isPreallocated: true,
        };
        if (note) {
            booking.note = note;
        }
        bookings.push(booking);
    }
    return bookings;
};

export const ALL_PRE_ALLOCATIONS: Booking[] = [
    ...generatePreAllocationsForYear(2025),
    ...generatePreAllocationsForYear(2026),
    ...generatePreAllocationsForYear(2027),
    ...generatePreAllocationsForYear(2028),
];


export const ICONS: { [key: string]: React.ReactNode } = {
  home: <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
  calendar: <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
  book: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.125 1.125 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />,
  wrench: <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.472-2.472a3.375 3.375 0 00-4.773-4.773L6.227 5.42a3.375 3.375 0 00-4.773 4.774l2.473 2.473" />,
  clipboard: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
  fire: <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.797z" />,
  tv: <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v1a1 1 0 001 1h4a1 1 0 001-1v-1m-6 0h6m-6 0H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2h-3m-6 0z" />,
  oven: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l-.36-9A1.5 1.5 0 013.375 5.25h17.25c.813 0 1.485.64 1.485 1.432l-.36 9.018a1.5 1.5 0 01-1.485 1.432H3.735a1.5 1.5 0 01-1.485-1.432zM3.75 10.5h16.5" />,
  wifi: <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.136 11.886a9.75 9.75 0 0113.728 0M2 8.732a15 15 0 0120 0" />,
  arrival: <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />,
  departure: <path strokeLinecap="round" strokeLinejoin="round" d="M13 16l4-4m0 0l-4-4m4 4H3m5 4v1a3 3 0 003 3h6a3 3 0 003-3V7a3 3 0 00-3-3H9a3 3 0 00-3 3v1" />,
  'lock-closed': <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
  key: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />,
  cart: <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.838-6.836a1.125 1.125 0 00-1.087-1.414H4.874c-.51 0-.962.343-1.087.835L2.25 3z" />,
  'shield-check': <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />,
};

export const INSTRUCTION_TOPICS: InstructionTopic[] = [
  { id: 'heater', title: 'Varmepumpe', icon: 'fire' },
  { id: 'internet', title: 'Internet & Wi-Fi', icon: 'wifi' },
  { id: 'monitoring', title: 'Overvågning', icon: 'shield-check' },
  { id: 'keys', title: 'Nøgler', icon: 'key' },
  { id: 'consumption', title: 'Forbrug', icon: 'cart' },
  { id: 'tv', title: 'TV', icon: 'tv' },
  { id: 'oven', title: 'Ovn', icon: 'oven' },
];

export const GUIDE_TOPICS: GuideTopic[] = [
  { id: 'arrival', title: 'Tjekliste ved Ankomst', icon: 'arrival' },
  { id: 'departure', title: 'Tjekliste ved Afrejse', icon: 'departure' },
];