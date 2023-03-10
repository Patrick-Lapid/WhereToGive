import { AuthenticationForm } from './Login'
import Dashboard from './Dashboard';
import Landing from './Landing';
import Questionnaire from './Questionnaire';
import React from 'react';
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import CharityByCategory from './CharityByCategoryView';

function App() {
  return (
    <MantineProvider>
      <ModalsProvider>
        <div style={{backgroundColor:"rgb(246,246,246)"}}>
            <BrowserRouter>
            {window.location.href.split("/")[window.location.href.split("/").length - 1] !== "login" && <Navbar links={[{link : "google.com", label : "Home"}, {link : "facebook.com", label : "About"}, {link : "google2.com", label : "Link1"}]} />}
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<AuthenticationForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/questionnaire" element={<Questionnaire />} />
                <Route path="/charity" element={<CharityByCategory />} />
            </Routes>
            </BrowserRouter>
        </div>
      </ModalsProvider>
    </MantineProvider>
    
  );
}

export default App;
