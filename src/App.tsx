import React from 'react';
import { EventProvider } from './context/EventContext';
import { Dashboard } from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <EventProvider>
      <Dashboard />
    </EventProvider>
  );
};

export default App;
