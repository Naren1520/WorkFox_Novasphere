export default function Developers() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white py-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            Meet the Team
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            The minds behind WorkFox's decentralized revolution
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Team</h2>
            <p className="text-xl text-gray-600">
              Building the future of decentralized work
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
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
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-purple-600/0 group-hover:from-indigo-600/10 group-hover:to-purple-600/10 transition-all duration-300" />

                <div className="relative p-8">
                  {/* Profile Image */}
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-indigo-100 group-hover:border-indigo-300 transition-all duration-300 shadow-xl">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback to gradient if image not found
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                        }}
                      />
                    </div>
                    {/* Status indicator */}
                    <div className="absolute bottom-2 right-1/2 transform translate-x-16 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>

                  {/* Name & Role */}
                  <div className="text-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-indigo-600 font-medium">{member.role}</p>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 text-center mb-6 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {member.skills.map((skill, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex justify-center space-x-4">
                    <a
                      href={member.social.github}
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-900 hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a
                      href={member.social.linkedin}
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a
                      href={member.social.twitter}
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors"
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

      {/* Tech Stack Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Tech Stack</h2>
            <p className="text-xl text-gray-600">
              Cutting-edge technologies powering WorkFox
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { name: 'React 19', icon: '⚛️', color: 'from-blue-500 to-cyan-500' },
              { name: 'TypeScript', icon: '📘', color: 'from-blue-600 to-blue-800' },
              { name: 'Algorand', icon: '⛓️', color: 'from-gray-800 to-black' },
              { name: 'TailwindCSS', icon: '🎨', color: 'from-cyan-500 to-blue-500' },
              { name: 'Vite', icon: '⚡', color: 'from-purple-500 to-pink-500' },
              { name: 'Pera Wallet', icon: '👛', color: 'from-yellow-500 to-orange-500' },
              { name: 'Gemini AI', icon: '🤖', color: 'from-indigo-500 to-purple-500' },
              { name: 'Netlify', icon: '🚀', color: 'from-teal-500 to-green-500' },
            ].map((tech, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${tech.color} flex items-center justify-center text-3xl`}>
                  {tech.icon}
                </div>
                <h3 className="text-center font-bold text-gray-900">{tech.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: '10K+', label: 'Lines of Code', icon: '💻' },
              { value: '50+', label: 'Components', icon: '🧩' },
              { value: '100%', label: 'Type Safe', icon: '🛡️' },
              { value: '24/7', label: 'Uptime', icon: '⚡' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-indigo-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Journey</h2>
          <p className="text-xl mb-8 text-white/90">
            We're always looking for talented individuals to join our mission
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/Naren1520/WorkFoxx_Novasphere"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View on GitHub
            </a>
            <a
              href="#"
              className="px-8 py-4 bg-transparent border-2 border-white rounded-xl font-semibold hover:bg-white/10 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
