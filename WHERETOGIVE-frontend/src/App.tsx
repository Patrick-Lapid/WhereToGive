import { AuthenticationForm } from './Login'
import Dashboard from './Dashboard';
import Landing from './Landing';
import Questionnaire from './Questionnaire';
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<AuthenticationForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
