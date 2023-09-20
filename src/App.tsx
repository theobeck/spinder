import LandingPage from './pages/LandingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Callback from './pages/Callback.tsx';
import React, { useEffect } from 'react';
import { SpotifyAPI } from './authentication.ts';
import MainPage from './pages/MainPage';
import FavoritesPage from './pages/FavoritesPage';
import PlayPage from './pages/PlayPage';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const authorization = SpotifyAPI.getAuthorization();

  useEffect(() => {
    if (authorization === null && window.location.pathname !== '/' && window.location.pathname !== '/callback') {
      window.location.href = '/';
    }
  }, [authorization]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {authorization ? (
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/play" element={<PlayPage />} />
            <Route path="/playlists" element={<h1>TODO</h1>} />
            <Route path="/settings" element={<h1>TODO</h1>} />
          </Routes>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route path="/callback" element={<Callback />} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </Router>
      )}
    </QueryClientProvider>
  );
}

export default App;
