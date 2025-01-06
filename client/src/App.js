import React from 'react';
import ActivityFeed from './components/ActivityFeed/ActivityFeed';
import AppHeader from './components/AppHeader';
import './styles.css';

function App() {
  return (
    <div className="h-screen bg-slate-100">
      {/* Your content goes here */}
      <AppHeader />
      <ActivityFeed />
    </div>
  );
}

export default App;