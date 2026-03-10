import React from 'react';
import './App.css';
import KanbanBoard from './components/KanbanBoard';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Мини канбан доска</h1>
      </header>
      <main className="app-main">
        <KanbanBoard />
      </main>
    </div>
  );
};

export default App;
