import { AuthenticationForm } from './Login'
import Dashboard from './Dashboard';
import Landing from './Landing';
import Questionnaire from './Questionnaire';
import React from 'react';
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    
    
    <>
        
        <BrowserRouter>
        {window.location.href.split("/")[window.location.href.split("/").length - 1] !== "login" && <Navbar links={[{link : "google.com", label : "Home"}, {link : "facebook.com", label : "About"}, {link : "google2.com", label : "Link1"}]} />}
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<AuthenticationForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
        </Routes>
        </BrowserRouter>
    </>
    
  );
}

export default App;
