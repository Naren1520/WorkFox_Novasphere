import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import LoadingScreen from './components/LoadingScreen';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import TaskBoard from './pages/TaskBoard';
import CreateTask from './pages/CreateTask';
import TaskDetails from './pages/TaskDetails';
import Dashboard from './pages/Dashboard';
import Developers from './pages/Developers';
import AboutUs from './pages/AboutUs';
import Profile from './pages/Profile';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function AppContent() {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const location = window.location;

  useEffect(() => {
    // Check if we should show loading screen
    const shouldShowLoading = sessionStorage.getItem('workfox_show_loading');
    const hasSeenLoading = sessionStorage.getItem('workfox_seen_loading');
    
    if (shouldShowLoading === 'true') {
      // Show loading screen (after logout or first visit)
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('workfox_seen_loading', 'true');
        sessionStorage.removeItem('workfox_show_loading');
      }, 5000);
      return () => clearTimeout(timer);
    } else if (hasSeenLoading === 'true') {
      // Already seen loading in this session, skip it
      setLoading(false);
    } else {
      // First visit in this session
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('workfox_seen_loading', 'true');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <LandingPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <TaskBoard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreateTask />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tasks/:id"
              element={
                <ProtectedRoute>
                  <TaskDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/developers"
              element={
                <ProtectedRoute>
                  <Developers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <ProtectedRoute>
                  <AboutUs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
        <AIChatbot />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!clientId || clientId === 'your_google_client_id_here') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Configuration Error</h2>
          <p className="text-gray-700">
            Please set your Google Client ID in the .env file.
          </p>
        </div>
      </div>
    );
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
