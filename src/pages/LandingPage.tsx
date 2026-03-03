import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)' }} className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white py-32 md:py-40" style={{ background: 'linear-gradient(135deg, #0f0f1e 0%, #2d1b69 50%, #1a0033 100%)' }}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full blur-3xl animate-float-slow"
              style={{
                width: `${300 + Math.random() * 200}px`,
                height: `${300 + Math.random() * 200}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 3 === 0 ? 'rgba(212, 175, 55, 0.1)' : i % 3 === 1 ? 'rgba(187, 134, 252, 0.1)' : 'rgba(0, 212, 255, 0.1)',
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 20}s`,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in-up bg-gradient-to-r from-[#d4af37] via-[#bb86fc] to-[#00d4ff] bg-clip-text text-transparent">
              Decentralized Freelancing
              <span className="block mt-3">
                Powered by Algorand
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[#b0b0b8] mb-12 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Connect with talent worldwide. Pay securely with blockchain. No middlemen, no hidden fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
              <Link
                to="/tasks"
                className="px-8 py-4 rounded-xl font-semibold text-lg transform hover:scale-105 transition-all"
                style={{ background: 'linear-gradient(135deg, #d4af37 0%, #f4c95d 100%)', color: '#0f0f1e', boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)' }}
              >
                I'm a Freelancer
              </Link>
              <Link
                to="/create"
                className="px-8 py-4 rounded-xl font-semibold text-lg border-2 transform hover:scale-105 transition-all"
                style={{ borderColor: '#bb86fc', color: '#bb86fc', background: 'rgba(187, 134, 252, 0.1)' }}
              >
                I'm a Client
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 animate-fade-in-up animation-delay-600">
            {[
              { label: 'Active Tasks', value: '1,000+' },
              { label: 'Freelancers', value: '5,000+' },
              { label: 'Total Paid', value: '50K ALGO' },
              { label: 'Success Rate', value: '98%' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-xl" style={{ background: 'rgba(212, 175, 55, 0.05)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                <div className="text-3xl md:text-4xl font-bold mb-2 text-[#d4af37]">{stat.value}</div>
                <div className="text-[#b0b0b8]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="url(#wave-gradient)"/>
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1a1a2e" />
                <stop offset="100%" stopColor="#0f0f1e" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#d4af37] to-[#bb86fc] bg-clip-text text-transparent">
              Why Choose WorkFox?
            </h2>
            <p className="text-xl text-[#b0b0b8] max-w-2xl mx-auto">
              Experience the future of freelancing with blockchain technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: 'Secure Payments',
                description: 'Smart contracts ensure funds are held safely and released automatically upon task completion.',
                color: 'from-[#00d4ff] to-[#0099cc]',
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Instant Transactions',
                description: 'Powered by Algorand blockchain for lightning-fast, low-cost transactions.',
                color: 'from-[#bb86fc] to-[#d4af37]',
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Global Access',
                description: 'Connect with talent from anywhere in the world. No borders, no restrictions.',
                color: 'from-[#d4af37] to-[#f4c95d]',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-2"
                style={{
                  background: 'linear-gradient(135deg, rgba(22, 33, 62, 0.8) 0%, rgba(26, 26, 46, 0.8) 100%)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                }}
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#d4af37] mb-4">{feature.title}</h3>
                <p className="text-[#b0b0b8] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, rgba(45, 27, 105, 0.3) 0%, rgba(26, 0, 51, 0.3) 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#d4af37] to-[#bb86fc] bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-[#b0b0b8]">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Connect Wallet',
                description: 'Link your Algorand wallet using Pera Wallet for secure transactions.',
              },
              {
                step: '02',
                title: 'Post or Browse',
                description: 'Create a task with bounty or browse available opportunities.',
              },
              {
                step: '03',
                title: 'Complete & Earn',
                description: 'Submit work, get approved, and receive instant payment in ALGO.',
              },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="rounded-2xl p-8" style={{ background: 'linear-gradient(135deg, rgba(22, 33, 62, 0.8) 0%, rgba(26, 26, 46, 0.8) 100%)', border: '1px solid rgba(212, 175, 55, 0.2)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)' }}>
                  <div className="text-6xl font-bold mb-4" style={{ color: 'rgba(212, 175, 55, 0.3)' }}>{step.step}</div>
                  <h3 className="text-2xl font-bold text-[#d4af37] mb-4">{step.title}</h3>
                  <p className="text-[#b0b0b8]">{step.description}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <svg className="w-8 h-8" style={{ color: 'rgba(212, 175, 55, 0.3)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-3xl p-12 shadow-2xl" style={{ background: 'linear-gradient(135deg, #2d1b69 0%, #1a0033 100%)', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
            <h2 className="text-4xl md:text-5xl font-bold text-[#d4af37] mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-[#b0b0b8] mb-8">
              Join thousands of freelancers and clients building the future of work
            </p>
            <Link
              to="/tasks"
              className="inline-block px-8 py-4 rounded-xl font-semibold text-lg transform hover:scale-105 transition-all"
              style={{ background: 'linear-gradient(135deg, #d4af37 0%, #f4c95d 100%)', color: '#0f0f1e', boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)' }}
            >
              Explore Tasks Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
