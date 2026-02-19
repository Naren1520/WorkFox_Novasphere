import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credential: string, callback?: () => void) => void;
  logout: (callback?: () => void) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('workfox_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (credential: string, callback?: () => void) => {
    try {
      // Decode JWT token
      const base64Url = credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      const userData = JSON.parse(jsonPayload);
      const user: User = {
        email: userData.email,
        name: userData.name,
        picture: userData.picture,
        sub: userData.sub,
      };

      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('workfox_user', JSON.stringify(user));
      
      // Call callback after state is updated
      if (callback) {
        setTimeout(callback, 100);
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const logout = (callback?: () => void) => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('workfox_user');
    // Set flag to show loading screen on next page load
    sessionStorage.setItem('workfox_show_loading', 'true');
    sessionStorage.removeItem('workfox_seen_loading');
    
    // Call callback after state is updated
    if (callback) {
      setTimeout(callback, 100);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
