import LandingPage from '../pages/LandingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Callback from '../pages/Callback.tsx';
import React from 'react';
import { SpotifyAPI } from '../utils/authentication.ts';
import MainPage from '../pages/MainPage';
import FavoritesPage from '../pages/FavoritesPage';
import PlayPage from '../pages/PlayPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import TrackDetailPage from "../pages/TrackDetailPage";

export default function App() {
  const authorization = SpotifyAPI.getAuthorization();

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {authorization ? (
        <Router basename={window.location.host === "it2810-13.idi.ntnu.no" ? "project1" : "/"}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/play" element={<PlayPage />} />
            <Route path="/track/:trackId" element={<TrackDetailPage />} />
            <Route path="/playlists" element={<h1>TODO</h1>} />
            <Route path="/settings" element={<h1>TODO</h1>} />
          </Routes>
        </Router>
      ) : (
        <Router basename={window.location.host === "it2810-13.idi.ntnu.no" ? "project1" : "/"}>
          <Routes>
            <Route path="/callback" element={<Callback />} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </Router>
      )}
    </QueryClientProvider>
  );
}
