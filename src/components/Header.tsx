import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../WalletProvider';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const { activeAddress, isConnected, connect, disconnect } = useWallet();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Don't show header on login page
  if (location.pathname === '/login') {
    return null;
  }

  const handleLogout = () => {
    logout(() => {
      toast.success('Logged out successfully');
      // Reload the page to show loading screen
      window.location.href = '/login';
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleConnect = async () => {
    try {
      await connect();
      toast.success('Wallet connected successfully');
    } catch (error) {
      toast.error('Failed to connect wallet');
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      toast.success('Wallet disconnected');
    } catch (error) {
      toast.error('Failed to disconnect wallet');
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img 
              src="/images/logo.png" 
              alt="WorkFox Logo" 
              className="h-10 w-10 rounded-full object-contain transform group-hover:scale-110 transition-transform shadow-lg"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              WorkFox
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/') 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/tasks"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/tasks') 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Freelancers
            </Link>
            <Link
              to="/create"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/create') 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Clients
            </Link>
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/dashboard') 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/developers"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/developers') 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Developers
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/about') 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              About
            </Link>
          </nav>

          {/* Wallet Connection & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* User Profile Dropdown */}
            {user && (
              <div ref={dropdownRef} className="hidden md:block relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-3 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <img 
                    src={user.picture} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  <svg 
                    className={`w-4 h-4 text-gray-600 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Edit Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Dashboard
                    </Link>
                    <div className="border-t border-gray-200 my-2"></div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setProfileDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {isConnected && activeAddress ? (
              <div className="hidden md:flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">
                    {formatAddress(activeAddress)}
                  </span>
                </div>
                <button
                  onClick={handleDisconnect}
                  className="btn-secondary text-sm"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={handleConnect}
                className="hidden md:block btn-primary text-sm"
              >
                Connect Wallet
              </button>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-4 space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg font-medium ${
                isActive('/') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600'
              }`}
            >
              Home
            </Link>
            <Link
              to="/tasks"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg font-medium ${
                isActive('/tasks') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600'
              }`}
            >
              Freelancers
            </Link>
            <Link
              to="/create"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg font-medium ${
                isActive('/create') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600'
              }`}
            >
              Clients
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg font-medium ${
                isActive('/dashboard') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/developers"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg font-medium ${
                isActive('/developers') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600'
              }`}
            >
              Developers
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg font-medium ${
                isActive('/about') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600'
              }`}
            >
              About
            </Link>
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg font-medium ${
                isActive('/profile') ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600'
              }`}
            >
              My Profile
            </Link>
            <div className="pt-4 border-t border-gray-200">
              {isConnected && activeAddress ? (
                <>
                  <div className="px-4 py-2 bg-green-50 rounded-lg mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {formatAddress(activeAddress)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      handleDisconnect();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full btn-secondary"
                  >
                    Disconnect
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleConnect();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full btn-primary"
                >
                  Connect Wallet
                </button>
              )}
            </div>
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="w-full btn-danger mt-2"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
