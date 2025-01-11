import React from 'react';
import ActivityFeed from './components/ActivityFeed/ActivityFeed';
import AppHeader from './components/AppFooter';
import FAQSection from './components/FAQSection';
import './styles.css';

function App() {
  return (
    <div className="h-screen bg-slate-50 mx-auto flex flex-col items-center justify-start gap-16  ">
      {/* Your content goes here */}
      <ActivityFeed />
      <FAQSection /> 
      <AppHeader />
    </div>
  );
}

export default App;