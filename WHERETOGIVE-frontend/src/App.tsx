import { AuthenticationForm } from './Login';
import Dashboard from './Dashboard';
import Landing from './Landing';
import Questionnaire from './Questionnaire';
import React from 'react';
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { AuthProvider } from '../ts/authenticate';
import CharityByCategory from './CharityByCategoryView';
import UserDashboard from './UserDashboard';
import CharitySearch from './CharitySearch';
import { Notifications } from '@mantine/notifications';

function App() {
  return (
    <MantineProvider>
      <ModalsProvider>
        <AuthProvider>
        <Notifications />
          <div style={{ backgroundColor: 'rgb(246,246,246)' }}>
            <BrowserRouter>
              {window.location.href.split('/')[
                window.location.href.split('/').length - 1
              ] !== 'login' && 
              window.location.href.split('/')[
                window.location.href.split('/').length - 1
              ] !== 'profile' && (
                <Navbar
                  links={[
                    { link: 'google.com', label: 'Home' },
                    { link: 'facebook.com', label: 'About' },
                    { link: 'google2.com', label: 'Link1' },
                  ]}
                />
              )}
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<AuthenticationForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<UserDashboard />} />
                <Route path="/charitysearch" element={<CharitySearch />} />
                <Route path="/charity" element={<CharityByCategory />} />
              </Routes>
            </BrowserRouter>
          </div>
        </AuthProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
