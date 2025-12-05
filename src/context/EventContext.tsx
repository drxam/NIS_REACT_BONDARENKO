import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EventContextType {
  events: string[];
  addEvent: (event: string) => void;
  clearEvents: () => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<string[]>([]);

  const addEvent = (event: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setEvents((prev) => [`[${timestamp}] ${event}`, ...prev]);
  };

  const clearEvents = () => {
    setEvents([]);
  };

  return (
    <EventContext.Provider value={{ events, addEvent, clearEvents }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within EventProvider');
  }
  return context;
};


