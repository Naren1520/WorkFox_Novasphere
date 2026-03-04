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
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [userMode, setUserMode] = useState<'client' | 'freelancer'>('freelancer');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);

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
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Load user mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('workfox_user_mode') as 'client' | 'freelancer';
    if (savedMode) {
      setUserMode(savedMode);
    }
  }, []);

  const toggleUserMode = () => {
    const newMode = userMode === 'client' ? 'freelancer' : 'client';
    setUserMode(newMode);
    localStorage.setItem('workfox_user_mode', newMode);
    toast.success(`Switched to ${newMode} mode`);
  };

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
    <header className="sticky top-0 z-50 border-b" style={{ background: 'linear-gradient(135deg, rgba(15, 15, 30, 0.95) 0%, rgba(26, 26, 46, 0.95) 100%)', backdropFilter: 'blur(10px)', borderColor: 'rgba(212, 175, 55, 0.2)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img
              src="/images/logo.png"
              alt="WorkFox Logo"
              className="h-10 w-10 rounded-full object-contain transform group-hover:scale-110 transition-transform shadow-lg"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#d4af37] to-[#bb86fc] bg-clip-text text-transparent">
              WorkFox
            </span>
          </Link>

          {/* User Mode Toggle */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center space-x-3 px-4 py-2 rounded-lg" style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
              <span className="text-sm font-medium text-[#d4af37]">
                {userMode === 'client' ? 'Client' : 'Freelancer'}
              </span>
              <button
                onClick={toggleUserMode}
                className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2"
                style={{ background: userMode === 'client' ? 'rgba(212, 175, 55, 0.3)' : 'rgba(187, 134, 252, 0.3)' }}
                aria-label={`Switch to ${userMode === 'client' ? 'freelancer' : 'client'} mode`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                    userMode === 'client' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                  style={{ background: userMode === 'client' ? '#d4af37' : '#bb86fc' }}
                />
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/')
                  ? 'text-[#d4af37] bg-[rgba(212,175,55,0.1)]'
                  : 'text-[#b0b0b8] hover:text-[#d4af37]'
              }`}
            >
              Home
            </Link>
            {userMode === 'freelancer' ? (
              <Link
                to="/tasks"
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive('/tasks')
                    ? 'text-[#d4af37] bg-[rgba(212,175,55,0.1)]'
                    : 'text-[#b0b0b8] hover:text-[#d4af37]'
                }`}
              >
                Find Tasks
              </Link>
            ) : (
              <Link
                to="/create"
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive('/create')
                    ? 'text-[#d4af37] bg-[rgba(212,175,55,0.1)]'
                    : 'text-[#b0b0b8] hover:text-[#d4af37]'
                }`}
              >
                Post Task
              </Link>
            )}
            <Link
              to="/dashboard"
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/dashboard')
                  ? 'text-[#d4af37] bg-[rgba(212,175,55,0.1)]'
                  : 'text-[#b0b0b8] hover:text-[#d4af37]'
              }`}
            >
              Dashboard
            </Link>
            <div ref={aboutDropdownRef} className="relative">
              <button
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-1 ${
                  isActive('/about') || isActive('/developers')
                    ? 'text-[#d4af37] bg-[rgba(212,175,55,0.1)]'
                    : 'text-[#b0b0b8] hover:text-[#d4af37]'
                }`}
              >
                <span>About</span>
                <svg
                  className={`w-4 h-4 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {aboutDropdownOpen && (
                <div className="absolute left-0 mt-2 w-40 rounded-xl shadow-lg py-2 z-50" style={{ background: 'linear-gradient(135deg, rgba(22, 33, 62, 0.95) 0%, rgba(26, 26, 46, 0.95) 100%)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                  <Link
                    to="/about"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-[#b0b0b8] hover:text-[#d4af37] transition-colors"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/developers"
                    onClick={() => setAboutDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-[#b0b0b8] hover:text-[#d4af37] transition-colors"
                  >
                    Developers
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Wallet Connection & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* User Profile Dropdown */}
            {user && (
              <div ref={dropdownRef} className="hidden md:block relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-all"
                  style={{ background: 'rgba(212, 175, 55, 0.1)', color: '#d4af37', border: '1px solid rgba(212, 175, 55, 0.3)' }}
                >
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm font-medium">{user.name}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg py-2 z-50" style={{ background: 'linear-gradient(135deg, rgba(22, 33, 62, 0.95) 0%, rgba(26, 26, 46, 0.95) 100%)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                    <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(212, 175, 55, 0.2)' }}>
                      <p className="text-sm font-medium text-[#d4af37]">{user.name}</p>
                      <p className="text-xs text-[#b0b0b8] truncate">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-[#b0b0b8] hover:text-[#d4af37] transition-colors"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Edit Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-[#b0b0b8] hover:text-[#d4af37] transition-colors"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Dashboard
                    </Link>
                    <div className="border-t my-2" style={{ borderColor: 'rgba(212, 175, 55, 0.2)' }}></div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setProfileDropdownOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-[#ff006e] hover:text-[#ff0080] transition-colors"
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
                <div className="flex items-center space-x-2 px-4 py-2 rounded-lg" style={{ background: 'rgba(0, 212, 255, 0.1)', border: '1px solid rgba(0, 212, 255, 0.3)', color: '#00d4ff' }}>
                  <div className="w-2 h-2 bg-[#00d4ff] rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">
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
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ color: '#d4af37' }}
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
        <div className="lg:hidden border-t" style={{ borderColor: 'rgba(212, 175, 55, 0.2)', background: 'linear-gradient(135deg, rgba(15, 15, 30, 0.95) 0%, rgba(26, 26, 46, 0.95) 100%)' }}>
          <nav className="px-4 py-4 space-y-2">
            {/* Mobile User Mode Toggle */}
            <div className="flex items-center justify-between px-4 py-2 rounded-lg" style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
              <span className="text-sm font-medium text-[#d4af37]">
                Mode: {userMode === 'client' ? 'Client' : 'Freelancer'}
              </span>
              <button
                onClick={toggleUserMode}
                className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2"
                style={{ background: userMode === 'client' ? 'rgba(212, 175, 55, 0.3)' : 'rgba(187, 134, 252, 0.3)' }}
                aria-label={`Switch to ${userMode === 'client' ? 'freelancer' : 'client'} mode`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
                    userMode === 'client' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                  style={{ background: userMode === 'client' ? '#d4af37' : '#bb86fc' }}
                />
              </button>
            </div>
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/') ? 'text-[#d4af37]' : 'text-[#b0b0b8]'
              }`}
            >
              Home
            </Link>
            {userMode === 'freelancer' ? (
              <Link
                to="/tasks"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive('/tasks') ? 'text-[#d4af37]' : 'text-[#b0b0b8]'
                }`}
              >
                Find Tasks
              </Link>
            ) : (
              <Link
                to="/create"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive('/create') ? 'text-[#d4af37]' : 'text-[#b0b0b8]'
                }`}
              >
                Post Task
              </Link>
            )}
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/dashboard') ? 'text-[#d4af37]' : 'text-[#b0b0b8]'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/about') ? 'text-[#d4af37]' : 'text-[#b0b0b8]'
              }`}
            >
              About Us
            </Link>
            <Link
              to="/developers"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 pl-8 rounded-lg font-medium transition-all text-sm ${
                isActive('/developers') ? 'text-[#d4af37]' : 'text-[#b0b0b8]'
              }`}
            >
              → Developers
            </Link>
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2 rounded-lg font-medium transition-all ${
                isActive('/profile') ? 'text-[#d4af37]' : 'text-[#b0b0b8]'
              }`}
            >
              My Profile
            </Link>
            <div className="pt-4 border-t" style={{ borderColor: 'rgba(212, 175, 55, 0.2)' }}>
              {isConnected && activeAddress ? (
                <>
                  <div className="px-4 py-2 rounded-lg mb-2" style={{ background: 'rgba(0, 212, 255, 0.1)', color: '#00d4ff', border: '1px solid rgba(0, 212, 255, 0.3)' }}>
                    <span className="text-sm font-medium">
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
