import React, { useState } from 'react';
import AuthLayout from './AuthLayout';
import SocialLogins from './SocialLogins';

type Page = 'home' | 'login' | 'signup' | 'dashboard';

interface LoginPageProps {
    onNavigate: (page: Page) => void;
}

const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
);
const EyeOffIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a10.05 10.05 0 013.132-5.125m5.942.543A3 3 0 109.875 9.875m7.5 2.125c.382-.48.724-.99.998-1.525A10.025 10.025 0 0012 5c-.98 0-1.927.18-2.828.515" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1l22 22" /></svg>
);
const SpinnerIcon: React.FC = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            localStorage.setItem('isLoggedIn', 'true');
            onNavigate('dashboard');
        }, 1500);
    };

    return (
        <AuthLayout onNavigate={onNavigate}>
            <div className="w-full">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 text-center">Welcome Back!</h3>
                <p className="text-center text-slate-500 dark:text-slate-400 mt-2 mb-8">Sign in to continue your journey.</p>
                
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="sr-only">Email or Phone</label>
                        <div className="group flex items-center bg-white dark:bg-slate-700/50 border-2 border-slate-200 dark:border-slate-700 rounded-lg shadow-sm transition-all duration-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
                            <span className="pl-3.5 pointer-events-none">
                                <svg className="h-5 w-5 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-600 transition" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                            </span>
                            <input type="email" id="email" required className="flex-1 px-3 py-3 w-full bg-transparent focus:outline-none dark:text-slate-200" placeholder="Email or Phone" />
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                         <div className="group flex items-center bg-white dark:bg-slate-700/50 border-2 border-slate-200 dark:border-slate-700 rounded-lg shadow-sm transition-all duration-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
                            <span className="pl-3.5 pointer-events-none">
                                <svg className="h-5 w-5 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-600 transition" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                            </span>
                            <input type={showPassword ? 'text' : 'password'} id="password" required className="flex-1 px-3 py-3 w-full bg-transparent focus:outline-none dark:text-slate-200" placeholder="Password" />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="pr-3 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 focus:outline-none focus:ring-0" aria-label={showPassword ? "Hide password" : "Show password"}>
                                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 dark:border-slate-600 rounded"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm font-medium text-slate-600 dark:text-slate-400 cursor-pointer">
                                Remember me
                            </label>
                        </div>
                        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline">Forgot password?</a>
                    </div>

                    <div>
                        <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed">
                            {isLoading ? <SpinnerIcon /> : 'Sign In'}
                        </button>
                    </div>
                </form>

                <SocialLogins />

                <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                    Don't have an account?{' '}
                    <button onClick={() => onNavigate('signup')} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline">
                        Sign up
                    </button>
                </p>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;