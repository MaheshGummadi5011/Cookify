// src/App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import FavoritesPage from './pages/FavoritesPage';
import Footer from './components/layout/Footer'; // Import Footer

function App() {
  return (
    <Router>
      {/* This wrapper ensures the footer is at the bottom */}
      <div className="flex flex-col min-h-screen">
        <Toaster position="top-center" />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe/:id" element={<RecipePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;