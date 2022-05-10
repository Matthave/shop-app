import React from 'react';
import "./css/styles.min.css"
import Calendar from './components/Calendar/Calendar';

const App: React.FC = () => {
  return (
    <div className="App">
      <Calendar/>
    </div>
  );
}

export default App;
