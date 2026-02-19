import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 overflow-hidden">
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

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo animation */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl opacity-50 animate-pulse" />
          <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center animate-bounce-slow shadow-2xl p-4">
            <img 
              src="/images/logo.png" 
              alt="WorkFox Logo" 
              className="w-full h-full rounded-full object-contain"
            />
          </div>
        </div>

        {/* Brand name with gradient */}
        <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent animate-gradient">
          WorkFox
        </h1>

        {/* Tagline */}
        <p className="text-white/80 text-lg mb-8 animate-fade-in">
          Decentralized Freelance Platform
        </p>

        {/* Loading bar */}
        <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm mb-4">
          <div
            className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full transition-all duration-300 ease-out shadow-lg"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress percentage */}
        <div className="text-white/60 text-sm font-medium">
          {progress}%
        </div>

        {/* Animated dots */}
        <div className="flex space-x-2 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-white/40 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>

        {/* Loading text */}
        <p className="text-white/50 text-sm mt-4 animate-pulse">
          Connecting to Algorand TestNet...
        </p>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
};

export default LoadingScreen;
