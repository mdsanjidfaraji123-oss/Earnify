import React from 'react';

type Page = 'home' | 'login' | 'signup';

interface SignupSectionProps {
    onNavigate: (page: Page) => void;
}

const SignupSection: React.FC<SignupSectionProps> = ({ onNavigate }) => {
  return (
    <section id="signup" className="py-20 bg-indigo-700 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-400/10 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="dotted" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle fill="white" cx="2" cy="2" r="1"></circle></pattern></defs><rect width="100%" height="100%" fill="url(#dotted)"></rect></svg>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Start Your Earning Journey Today
        </h2>
        <p className="mt-4 text-lg text-indigo-200 max-w-2xl mx-auto">
          Join a community of earners and start making money online in your spare time. It's free and always will be.
        </p>
        <button 
          onClick={() => onNavigate('signup')}
          className="mt-8 inline-block px-10 py-4 text-lg font-semibold text-indigo-700 bg-white rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white animate-pulse-glow-white"
        >
          Create Your Free Account Now
        </button>
      </div>
    </section>
  );
};

export default SignupSection;