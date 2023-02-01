import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import Landing from './Landing';

function App() {
  return (
    // <div className="App">
    //   <Landing />
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<p>login</p>} />
        <Route path="/dashboard" element={<p>dashboard</p>} />
        <Route path="/about" element={<p>about</p>} />
        <Route path="/creators" element={<p>creators</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
