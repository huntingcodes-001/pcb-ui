import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import GetStarted from './pages/GetStarted';
import ImprovePCB from './pages/ImprovePCB';
import GeneratePCB from './pages/GeneratePCB';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="flex flex-col min-h-screen transition-colors duration-200 dark:bg-gray-900">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/get-started" element={
                  <ProtectedRoute>
                    <GetStarted />
                  </ProtectedRoute>
                } />
                <Route path="/improve-pcb" element={
                  <ProtectedRoute>
                    <ImprovePCB />
                  </ProtectedRoute>
                } />
                <Route path="/generate-pcb" element={
                  <ProtectedRoute>
                    <GeneratePCB />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;