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
import { NavigateProvider } from '../ts/navigate';
import { Notifications } from '@mantine/notifications';
import RestrictedRoute from './components/RestrictedRoute';

function App() {
  return (
    <MantineProvider>
      <ModalsProvider>
        <AuthProvider>
          <NavigateProvider>
            <Notifications />
            <div
              style={{ backgroundColor: 'rgb(246,246,246)', height: '100%' }}
            >
              <BrowserRouter>
                {window.location.href.split('/')[
                  window.location.href.split('/').length - 1
                ] !== 'login' &&
                  window.location.href.split('/')[
                    window.location.href.split('/').length - 1
                  ] !== 'profile' && <Navbar />}
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<AuthenticationForm />} />
                  <Route
                    path="/dashboard"
                    element={
                      <RestrictedRoute>
                        <Dashboard />
                      </RestrictedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <RestrictedRoute>
                        <UserDashboard />
                      </RestrictedRoute>
                    }
                  />
                  <Route
                    path="/charitysearch"
                    element={
                      <RestrictedRoute>
                        <CharitySearch />
                      </RestrictedRoute>
                    }
                  />
                  <Route
                    path="/charity"
                    element={
                      <RestrictedRoute>
                        <CharityByCategory />
                      </RestrictedRoute>
                    }
                  />
                </Routes>
              </BrowserRouter>
            </div>
          </NavigateProvider>
        </AuthProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
