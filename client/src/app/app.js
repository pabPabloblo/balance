import React from 'react';
import './app.css';
import Balance from './pages/balance';

const App = () => {
  document.title = 'Accounting Notebook';
  return (
    <div>
      <Balance />
    </div>
  );
}

export default App;
