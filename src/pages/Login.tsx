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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full mx-4 animate-fade-in-up">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-xl opacity-50 animate-pulse" />
            <img 
              src="/images/logo.png" 
              alt="WorkFox Logo" 
              className="relative w-24 h-24 rounded-full object-contain bg-gradient-to-br from-indigo-50 to-purple-50 p-4 shadow-lg"
            />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to WorkFox
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Sign in to access the decentralized freelance platform
        </p>

        {/* Features */}
        <div className="space-y-3 mb-8">
          {[
            { icon: '🔒', text: 'Secure blockchain payments' },
            { icon: '⚡', text: 'Instant transactions' },
            { icon: '🌍', text: 'Global marketplace' },
          ].map((feature, i) => (
            <div key={i} className="flex items-center space-x-3 text-gray-700">
              <span className="text-2xl">{feature.icon}</span>
              <span className="text-sm">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Google Login Button */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            useOneTap
            theme="filled_blue"
            size="large"
            text="signin_with"
            shape="rectangular"
          />
        </div>

        {/* Terms */}
        <p className="text-xs text-gray-500 text-center mt-6">
          By signing in, you agree to our{' '}
          <a href="#" className="text-indigo-600 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-indigo-600 hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
