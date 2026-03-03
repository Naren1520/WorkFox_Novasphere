import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      login(credentialResponse.credential, () => {
        toast.success('Successfully logged in!');
        navigate('/', { replace: true });
      });
    }
  };

  const handleError = () => {
    toast.error('Login failed. Please try again.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)' }}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-30 animate-float"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: ['#d4af37', '#bb86fc', '#00d4ff'][Math.floor(Math.random() * 3)],
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <div className="relative z-10 rounded-3xl p-12 max-w-md w-full mx-4 animate-fade-in-up shadow-2xl" style={{ background: 'linear-gradient(135deg, rgba(22, 33, 62, 0.95) 0%, rgba(26, 26, 46, 0.95) 100%)', backdropFilter: 'blur(10px)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 rounded-full blur-2xl opacity-60 animate-pulse" style={{ background: 'linear-gradient(135deg, #d4af37 0%, #bb86fc 100%)' }} />
            <img
              src="/images/logo.png"
              alt="WorkFox Logo"
              className="relative w-24 h-24 rounded-full object-contain p-4 shadow-xl" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(187, 134, 252, 0.1) 100%)', border: '2px solid rgba(212, 175, 55, 0.3)' }}
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-3 bg-gradient-to-r from-[#d4af37] via-[#bb86fc] to-[#00d4ff] bg-clip-text text-transparent">
          Welcome to WorkFox
        </h1>
        <p className="text-center mb-8" style={{ color: '#b0b0b8' }}>
          Sign in to access the decentralized freelance platform
        </p>

        {/* Features */}
        <div className="space-y-3 mb-8">
          {[
            { icon: '🔒', text: 'Secure blockchain payments' },
            { icon: '⚡', text: 'Instant transactions' },
            { icon: '🌍', text: 'Global marketplace' },
          ].map((feature, i) => (
            <div key={i} className="flex items-center space-x-3 p-3 rounded-lg" style={{ background: 'rgba(212, 175, 55, 0.05)', border: '1px solid rgba(212, 175, 55, 0.1)' }}>
              <span className="text-2xl">{feature.icon}</span>
              <span className="text-sm" style={{ color: '#b0b0b8' }}>{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Google Login Button */}
        <div className="flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap
            theme="filled_black"
            size="large"
            text="signin_with"
            shape="rectangular"
          />
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div style={{ borderTop: '1px solid rgba(212, 175, 55, 0.2)' }}></div>
        </div>

        {/* Terms */}
        <p className="text-xs text-center" style={{ color: '#b0b0b8' }}>
          By signing in, you agree to our{' '}
          <a href="#" className="hover:underline transition-colors" style={{ color: '#d4af37' }}>
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="hover:underline transition-colors" style={{ color: '#d4af37' }}>
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
