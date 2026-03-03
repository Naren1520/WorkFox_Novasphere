export default function AboutUs() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)' }}>
      {/* Hero Section */}
      <section className="relative py-32" style={{ background: 'linear-gradient(135deg, #0f0f1e 0%, #2d1b69 50%, #1a0033 100%)', borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in-up bg-gradient-to-r from-[#d4af37] via-[#bb86fc] to-[#00d4ff] bg-clip-text text-transparent">
              About WorkFox
            </h1>
            <p className="text-xl md:text-2xl text-[#b0b0b8] max-w-3xl mx-auto">
              Building the future of decentralized work, one task at a time
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#d4af37] mb-6">Our Mission</h2>
              <p className="text-lg text-[#b0b0b8] mb-4">
                WorkFox is revolutionizing the freelance economy by leveraging blockchain technology to create a transparent, secure, and efficient marketplace for digital work.
              </p>
              <p className="text-lg text-[#b0b0b8] mb-4">
                We believe in empowering individuals worldwide to connect, collaborate, and transact without intermediaries, reducing costs and increasing trust through smart contracts.
              </p>
              <p className="text-lg text-[#b0b0b8]">
                Built on the Algorand blockchain, we provide instant, low-cost transactions while maintaining the highest standards of security and decentralization.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-transform" style={{ background: 'linear-gradient(135deg, #d4af37 0%, #bb86fc 100%)' }}>
                <div className="grid grid-cols-2 gap-6" style={{ color: '#0f0f1e' }}>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">100%</div>
                    <div style={{ fontWeight: '600' }}>Decentralized</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">0%</div>
                    <div style={{ fontWeight: '600' }}>Platform Fees</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">&lt;3s</div>
                    <div style={{ fontWeight: '600' }}>Transaction Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">24/7</div>
                    <div style={{ fontWeight: '600' }}>Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-20 bg-gradient-to-r from-[#d4af37] to-[#bb86fc] bg-clip-text text-transparent">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔒',
                title: 'Trust & Security',
                description: 'Smart contracts ensure transparent and secure transactions for all parties.',
              },
              {
                icon: '🌍',
                title: 'Global Accessibility',
                description: 'Breaking down barriers to enable worldwide collaboration and opportunity.',
              },
              {
                icon: '⚡',
                title: 'Innovation',
                description: 'Continuously improving and adopting cutting-edge blockchain technology.',
              },
              {
                icon: '🤝',
                title: 'Fair Compensation',
                description: 'Ensuring freelancers receive full payment without hidden fees or delays.',
              },
              {
                icon: '🎯',
                title: 'Transparency',
                description: 'All transactions and agreements are recorded on the blockchain.',
              },
              {
                icon: '💡',
                title: 'Empowerment',
                description: 'Giving control back to freelancers and clients through decentralization.',
              },
            ].map((value, i) => (
              <div key={i} className="text-center p-8 rounded-xl transition-all hover:translate-y-[-4px]" style={{ background: 'linear-gradient(135deg, rgba(22, 33, 62, 0.8) 0%, rgba(26, 26, 46, 0.8) 100%)', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-[#d4af37] mb-3">{value.title}</h3>
                <p className="text-[#b0b0b8]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, rgba(45, 27, 105, 0.3) 0%, rgba(26, 0, 51, 0.3) 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-6 bg-gradient-to-r from-[#d4af37] to-[#bb86fc] bg-clip-text text-transparent">
            Powered by Algorand
          </h2>
          <p className="text-xl text-[#b0b0b8] text-center mb-16 max-w-3xl mx-auto">
            We chose Algorand for its speed, security, and sustainability
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: 'Transaction Speed', value: '< 3 seconds' },
              { label: 'Transaction Cost', value: '~$0.001' },
              { label: 'Carbon Negative', value: 'Yes' },
              { label: 'Finality', value: 'Instant' },
            ].map((stat, i) => (
              <div key={i} className="rounded-xl p-6 shadow-lg text-center card">
                <div className="text-3xl font-bold text-[#d4af37] mb-2">{stat.value}</div>
                <div className="text-[#b0b0b8]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-[#d4af37] mb-6">Join Our Journey</h2>
          <p className="text-xl text-[#b0b0b8] mb-12 max-w-2xl mx-auto">
            We're building the future of work. Be part of the revolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 text-sm"
              style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', color: '#d4af37', border: '2px solid #d4af37', cursor: 'pointer' }}
            >
              View on GitHub
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl font-bold text-sm transition-all transform hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #bb86fc 0%, #d4af37 100%)', color: '#0f0f1e', cursor: 'pointer', boxShadow: '0 4px 15px rgba(187, 134, 252, 0.3)' }}
            >
              Join Discord
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
