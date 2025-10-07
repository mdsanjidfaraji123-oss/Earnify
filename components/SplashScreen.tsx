import React from 'react';

const Logo: React.FC = () => (
  <div className="flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg animate-fade-in-down">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  </div>
);

const SplashScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col justify-center items-center text-center p-4">
      <div className="flex flex-col items-center">
        <Logo />
        <h1 
          className="text-5xl font-extrabold text-slate-800 mt-6 animate-fade-in-up"
          style={{ animationDelay: '200ms' }}
        >
          Earnify
        </h1>
        <p 
          className="text-lg text-slate-600 mt-2 animate-fade-in-up"
          style={{ animationDelay: '400ms' }}
        >
          Turn your time into rewards.
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
