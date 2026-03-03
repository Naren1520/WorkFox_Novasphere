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
    <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f0f1e 0%, #2d1b69 50%, #1a0033 100%)' }}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => {
          const colors = ['rgba(212, 175, 55, 0.1)', 'rgba(187, 134, 252, 0.1)', 'rgba(0, 212, 255, 0.1)'];
          return (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full opacity-30 animate-float"
              style={{
                background: colors[i % 3],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          );
        })}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo animation */}
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full blur-2xl opacity-50 animate-pulse" style={{ background: 'linear-gradient(135deg, #d4af37 0%, #bb86fc 100%)', boxShadow: '0 0 30px rgba(212, 175, 55, 0.4)' }} />
          <div className="relative w-32 h-32 rounded-full flex items-center justify-center animate-bounce-slow shadow-2xl p-4" style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(187, 134, 252, 0.2) 100%)', border: '2px solid rgba(212, 175, 55, 0.3)' }}>
            <img
              src="/images/logo.png"
              alt="WorkFox Logo"
              className="w-full h-full rounded-full object-contain"
            />
          </div>
        </div>

        {/* Brand name with gradient */}
        <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-gradient" style={{ background: 'linear-gradient(90deg, #d4af37 0%, #bb86fc 50%, #00d4ff 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent' }}>
          WorkFox
        </h1>

        {/* Tagline */}
        <p className="text-lg mb-8 animate-fade-in" style={{ color: '#b0b0b8' }}>
          Decentralized Freelance Platform
        </p>

        {/* Loading bar */}
        <div className="w-64 h-2 rounded-full overflow-hidden backdrop-blur-sm mb-4" style={{ background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
          <div
            className="h-full rounded-full transition-all duration-300 ease-out shadow-lg"
            style={{ background: 'linear-gradient(90deg, #d4af37 0%, #bb86fc 100%)', width: `${progress}%`, boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)' }}
          />
        </div>

        {/* Progress percentage */}
        <div className="text-sm font-medium" style={{ color: '#d4af37' }}>
          {progress}%
        </div>

        {/* Animated dots */}
        <div className="flex space-x-2 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ background: '#d4af37', animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>

        {/* Loading text */}
        <p className="text-sm mt-4 animate-pulse" style={{ color: '#b0b0b8' }}>
          Connecting to Algorand TestNet...
        </p>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(15, 15, 30, 0.5) 100%)' }} />
    </div>
  );
};

export default LoadingScreen;
