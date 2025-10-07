import React from 'react';

type Page = 'home' | 'login' | 'signup';

interface AuthLayoutProps {
  onNavigate: (page: Page) => void;
  children: React.ReactNode;
}

const Logo: React.FC<{ onClick: () => void; isDarkMode?: boolean }> = ({ onClick, isDarkMode = false }) => (
  <button onClick={onClick} className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-lg group">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 group-hover:from-indigo-600 group-hover:to-purple-700 transition-all duration-300 transform group-hover:scale-110">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    </div>
    <span className={`text-3xl font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors`}>Earnify</span>
  </button>
);

const BrandingPanel: React.FC = () => (
    <div className="relative hidden lg:block bg-slate-900">
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-16 left-16 w-32 h-32 bg-indigo-500/30 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-16 right-16 w-32 h-32 bg-purple-500/30 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center h-full p-16 text-white">
            <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                </div>
                <span className="text-4xl font-bold">Earnify</span>
            </div>

            <h2 className="mt-8 text-4xl font-extrabold tracking-tight">
                Simple tasks.
                <br />
                <span className="text-indigo-400">Real rewards.</span>
            </h2>

            <div className="mt-12 pt-8 border-t border-slate-700">
                <blockquote className="text-lg">
                    <p>"This is the best platform I've used for earning side cash. Payouts are fast and the tasks are actually fun!"</p>
                </blockquote>
                <figcaption className="flex items-center mt-4 space-x-3">
                    <img className="w-10 h-10 rounded-full" src="https://i.pravatar.cc/100?u=jane-doe" alt="Jane Doe"/>
                    <div>
                        <div className="font-semibold">Jane Doe</div>
                        <div className="text-sm text-slate-400">Freelancer</div>
                    </div>
                </figcaption>
            </div>
        </div>
    </div>
);


const AuthLayout: React.FC<AuthLayoutProps> = ({ onNavigate, children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-black lg:grid lg:grid-cols-2">
        <BrandingPanel />
        <div className="relative flex flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8 bg-gray-50 dark:bg-black overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 -translate-y-1/2 translate-x-1/2 bg-indigo-100 dark:bg-indigo-900/40 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-purple-100 dark:bg-purple-900/40 rounded-full filter blur-3xl"></div>

            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
                <button 
                onClick={() => onNavigate('home')} 
                className="text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition duration-300 p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                aria-label="Close"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
            
            <div className="relative w-full max-w-sm mx-auto z-10">
                <div className="flex justify-center mb-8">
                    <Logo onClick={() => onNavigate('home')} />
                </div>
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-slate-900/10 p-6 sm:p-8">
                    {children}
                </div>
            </div>
        </div>
    </div>
  );
};

export default AuthLayout;