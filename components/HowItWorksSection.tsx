

import React from 'react';

interface StepCardProps {
  icon: React.ReactNode;
  step: string;
  title: string;
  description: string;
  className?: string;
  animationDelay: string;
}

const StepCard: React.FC<StepCardProps> = ({ icon, step, title, description, className, animationDelay }) => (
  <div style={{ animationDelay }} className={`relative p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group animate-fade-in-up ${className}`}>
    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-indigo-100 dark:bg-slate-700 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 rounded-full transition-all duration-300 transform group-hover:scale-110">
      {icon}
    </div>
    <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{title}</h4>
    <p className="text-slate-600 dark:text-slate-400">{description}</p>
    <p className="absolute top-4 right-4 text-6xl font-bold text-slate-100 dark:text-slate-700/50 group-hover:text-indigo-200 dark:group-hover:text-indigo-500/30 transition-colors duration-300 -z-10">{step}</p>
  </div>
);

const UserPlusIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
);

const ClipboardListIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);

const CashIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);


const HowItWorksSection: React.FC = () => {
  return (
    <section id="howitworks" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100">How It Works</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Getting started is simple. Follow these three easy steps to begin your earning journey.</p>
        </div>
        <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-12 mt-8 text-center">
          <div className="hidden lg:block absolute top-8 left-0 w-full h-0.5 -z-10">
             <div className="w-full h-full bg-gradient-to-r from-transparent via-indigo-300 to-transparent dark:via-indigo-700/50"></div>
          </div>
          <StepCard 
            icon={<UserPlusIcon />} 
            step="01" 
            title="Sign Up"
            description="Create your free account in just a few minutes and get instant access."
            animationDelay="100ms"
          />
          <StepCard 
            icon={<ClipboardListIcon />} 
            step="02" 
            title="Complete Tasks"
            description="Browse through various tasks like surveys, quizzes, and ads. Choose what suits you best."
            animationDelay="200ms"
          />
          <StepCard 
            icon={<CashIcon />} 
            step="03" 
            title="Withdraw Earnings"
            description="Once you reach the minimum threshold, withdraw your earnings via our secure payment methods."
            animationDelay="300ms"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;