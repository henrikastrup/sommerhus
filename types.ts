export interface Owner {
  id: string;
  name: string;
  color: string;
}

export interface Booking {
  week: number;
  year: number;
  ownerId: string;
  note?: string;
  isPreallocated?: boolean;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  date: string;
}

export interface InstructionTopic {
  id: 'heater' | 'tv' | 'oven' | 'internet' | 'keys' | 'consumption' | 'monitoring';
  title: string;
  icon: string;
}

export interface GuideTopic {
  id: 'arrival' | 'departure';
  title: string;
  icon: string;
}
