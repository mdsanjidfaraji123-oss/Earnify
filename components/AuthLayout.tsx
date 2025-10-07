import React from 'react';

type Page = 'home' | 'login' | 'signup';

interface AuthLayoutProps {
  onNavigate: (page: Page) => void;
  children: React.ReactNode;
}

const Logo: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button onClick={onClick} className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-lg group">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 group-hover:from-indigo-600 group-hover:to-purple-700 transition-all duration-300 transform group-hover:scale-110">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    </div>
    <span className="text-3xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">Earnify</span>
  </button>
);


const AuthLayout: React.FC<AuthLayoutProps> = ({ onNavigate, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-white flex flex-col justify-center items-center p-4">
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <button 
          onClick={() => onNavigate('home')} 
          className="text-slate-500 hover:text-indigo-600 transition duration-300 p-2 rounded-full hover:bg-slate-200/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      
      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-center mb-6">
            <Logo onClick={() => onNavigate('home')} />
        </div>
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl p-6 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
