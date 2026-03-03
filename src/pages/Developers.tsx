export default function Developers() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%)' }}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0f0f1e] via-[#2d1b69] to-[#1a0033] text-white py-32 overflow-hidden border-b border-[#d4af37]/20">
        {/* Animated background with luxury glow */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 8}px`,
                height: `${2 + Math.random() * 8}px`,
                background: i % 3 === 0 ? '#d4af37' : i % 3 === 1 ? '#bb86fc' : '#00d4ff',
                opacity: 0.1 + Math.random() * 0.2,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 15}s`,
                boxShadow: i % 3 === 0 ? '0 0 20px #d4af37' : i % 3 === 1 ? '0 0 20px #bb86fc' : '0 0 20px #00d4ff',
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in-up bg-gradient-to-r from-[#d4af37] via-[#bb86fc] to-[#00d4ff] bg-clip-text text-transparent">
            Meet the Team
          </h1>
          <p className="text-2xl md:text-3xl text-[#b0b0b8] max-w-3xl mx-auto animation-delay-200 animate-fade-in-up">
            The visionaries building WorkFox's decentralized revolution
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#d4af37] to-[#bb86fc] bg-clip-text text-transparent">
              Core Team
            </h2>
            <p className="text-xl text-[#b0b0b8] max-w-2xl mx-auto">
              Building the future of decentralized work with innovation and expertise
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Naren S J',
                role: 'Lead Developer',
                image: '/images/naren.png',
                bio: 'Full-stack developer passionate about blockchain technology and decentralized systems.',
                skills: ['React', 'TypeScript', 'Algorand', 'Smart Contracts'],
                social: {
                  github: '#',
                  linkedin: '#',
                  twitter: '#',
                },
              },
              {
                name: 'Preetham',
                role: 'Blockchain Developer',
                image: '/images/preetham.jpeg',
                bio: 'Blockchain expert specializing in Algorand smart contracts and DeFi protocols.',
                skills: ['PyTeal', 'Algorand', 'Web3', 'DeFi'],
                social: {
                  github: '#',
                  linkedin: '#',
                  twitter: '#',
                },
              },
              {
                name: 'Rithika',
                role: 'UI/UX Designer',
                image: '/images/rithika.png',
                bio: 'Creative designer focused on building intuitive and beautiful user experiences.',
                skills: ['UI/UX', 'Figma', 'Design Systems', 'Branding'],
                social: {
                  github: '#',
                  linkedin: '#',
                  twitter: '#',
                },
              },
            ].map((member, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl transition-all duration-300 transform hover:-translate-y-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(22, 33, 62, 0.8) 0%, rgba(26, 26, 46, 0.8) 100%)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/0 to-[#bb86fc]/0 group-hover:from-[#d4af37]/10 group-hover:to-[#bb86fc]/15 transition-all duration-300" />

                <div className="relative p-8">
                  {/* Profile Image */}
                  <div className="relative mb-6">
                    <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-[#d4af37] group-hover:border-[#bb86fc] transition-all duration-300 shadow-2xl" style={{ boxShadow: '0 0 30px rgba(212, 175, 55, 0.3)' }}>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.style.background = 'linear-gradient(135deg, #d4af37 0%, #bb86fc 100%)';
                        }}
                      />
                    </div>
                    {/* Status indicator with glow */}
                    <div className="absolute bottom-4 right-1/2 transform translate-x-20 w-5 h-5 bg-[#00d4ff] rounded-full border-2 border-white animate-pulse" style={{ boxShadow: '0 0 15px #00d4ff' }}></div>
                  </div>

                  {/* Name & Role */}
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold text-[#d4af37] mb-2">{member.name}</h3>
                    <p className="text-[#bb86fc] font-semibold text-base">{member.role}</p>
                  </div>

                  {/* Bio */}
                  <p className="text-[#b0b0b8] text-center mb-6 leading-relaxed text-sm">
                    {member.bio}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {member.skills.map((skill, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-110"
                        style={{
                          background: 'rgba(212, 175, 55, 0.1)',
                          color: '#d4af37',
                          border: '1px solid rgba(212, 175, 55, 0.3)',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    <a
                      href={member.social.github}
                      className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-125"
                      style={{
                        background: 'rgba(212, 175, 55, 0.15)',
                        color: '#d4af37',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                      }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a
                      href={member.social.linkedin}
                      className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-125"
                      style={{
                        background: 'rgba(187, 134, 252, 0.15)',
                        color: '#bb86fc',
                        border: '1px solid rgba(187, 134, 252, 0.3)',
                      }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a
                      href={member.social.twitter}
                      className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-125"
                      style={{
                        background: 'rgba(0, 212, 255, 0.15)',
                        color: '#00d4ff',
                        border: '1px solid rgba(0, 212, 255, 0.3)',
                      }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
