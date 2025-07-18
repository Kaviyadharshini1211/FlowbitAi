import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { isLoggedIn, getToken } from './utils/auth';
import ScreensLoader from './pages/ScreenLoader';
import axios from 'axios';
import './App.css'

export default function App() {
  const [screens, setScreens] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = getToken();

  useEffect(() => {
    const fetchScreens = async () => {
      if (!isLoggedIn()) return setLoading(false);

      try {
        const res = await axios.get('http://localhost:5000/api/me/screens', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setScreens(res.data); // array of screen objects
      } catch (err) {
        console.error('Error fetching screens:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchScreens();
  }, [token]);

  if (loading) return <div>Loading screens...</div>;

  return (
    <BrowserRouter>
      <Routes>
        {/* Login route */}
        <Route
          path="/login"
          element={<Login onLogin={() => window.location.href = '/'} />}
        />

        {/* Dynamically render routes from screen config */}
        {isLoggedIn() &&
          screens.map((screen, index) => {
            const path = `/${screen.name.toLowerCase().replace(/\s/g, '-')}`;
            return (
              <Route
                key={index}
                path={`${path}/*`}
                element={<ScreensLoader url={screen.url} token={token} />}
              />
            );
          })}

        {/* Default route: redirect based on auth */}
        <Route
          path="*"
          element={
            isLoggedIn()
              ? <Navigate to={`/${screens[0]?.name.toLowerCase().replace(/\s/g, '-') || ''}`} replace />
              : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
