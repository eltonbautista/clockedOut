import React from 'react';
import './Styles/App.css';
import SignedOut from './Views/SignedOut';

const App: React.FC = function App() {

  return (
    <div className="App">
      <SignedOut />
    </div>
  );
}

export default App;
