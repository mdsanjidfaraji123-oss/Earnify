import React, { useState, useEffect } from 'react';
import AuthLayout from './AuthLayout';
import SocialLogins from './SocialLogins';

type Page = 'home' | 'login' | 'signup' | 'dashboard';

interface SignupPageProps {
    onNavigate: (page: Page) => void;
}

const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
);
const EyeOffIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a10.05 10.05 0 013.132-5.125m5.942.543A3 3 0 109.875 9.875m7.5 2.125c.382-.48.724-.99.998-1.525A10.025 10.025 0 0012 5c-.98 0-1.927.18-2.828.515" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1l22 22" /></svg>
);


const SignupPage: React.FC<SignupPageProps> = ({ onNavigate }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [strength, setStrength] = useState(0);
    const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);
    const [showReferral, setShowReferral] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
        if (/\d]/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;
        setStrength(score);
    }, [password]);

    useEffect(() => {
        if (confirmPassword.length > 0) {
            setPasswordsMatch(password === confirmPassword);
        } else {
            setPasswordsMatch(null);
        }
    }, [password, confirmPassword]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        localStorage.setItem('isLoggedIn', 'true');
        onNavigate('dashboard');
    };

    const strengthColors = ['bg-slate-300', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];

    return (
        <AuthLayout onNavigate={onNavigate}>
            <div className="w-full max-w-sm mx-auto">
                <h3 className="text-2xl font-bold text-slate-800 text-center">Create Your Account</h3>
                <p className="text-center text-slate-500 mt-2 mb-8">Let's get you started!</p>
                
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="group flex items-center bg-slate-100/50 border border-slate-200 rounded-lg shadow-sm transition-all duration-300 focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-300/50">
                        <span className="pl-3.5 pointer-events-none">
                            <svg className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                        </span>
                        <input type="text" id="fullname" required className="flex-1 px-3 py-3 w-full bg-transparent focus:outline-none" placeholder="Full Name" />
                    </div>
                     <div className="group flex items-center bg-slate-100/50 border border-slate-200 rounded-lg shadow-sm transition-all duration-300 focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-300/50">
                         <span className="pl-3.5 pointer-events-none">
                                <svg className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                            </span>
                        <input type="email" id="email-signup" required className="flex-1 px-3 py-3 w-full bg-transparent focus:outline-none" placeholder="Email Address" />
                    </div>
                    <div className="group flex items-center bg-slate-100/50 border border-slate-200 rounded-lg shadow-sm transition-all duration-300 focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-300/50">
                        <span className="pl-3.5 pointer-events-none">
                          <svg className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                        </span>
                        <input type="tel" id="phone" className="flex-1 px-3 py-3 w-full bg-transparent focus:outline-none" placeholder="Phone Number" />
                    </div>

                    <div className="group flex items-center bg-slate-100/50 border border-slate-200 rounded-lg shadow-sm transition-all duration-300 focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-300/50">
                         <span className="pl-3.5 pointer-events-none">
                                <svg className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                            </span>
                        <input type={showPassword ? 'text' : 'password'} id="password-signup" value={password} onChange={(e) => setPassword(e.target.value)} required className="flex-1 px-3 py-3 w-full bg-transparent focus:outline-none" placeholder="Password" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="pr-3 text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-0" aria-label={showPassword ? "Hide password" : "Show password"}>
                                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                    </div>

                    {password.length > 0 && (
                        <div className="flex items-center space-x-2">
                            <div className="flex-1 flex space-x-1">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className={`h-2 rounded-full flex-1 transition-colors ${strength > i ? strengthColors[i+1] : 'bg-slate-200'}`}></div>
                                ))}
                            </div>
                            <span className="text-xs font-medium text-slate-500 w-12 text-right">{strength > 0 ? strengthLabels[strength-1] : ''}</span>
                        </div>
                    )}

                    <div className="group flex items-center bg-slate-100/50 border border-slate-200 rounded-lg shadow-sm transition-all duration-300 focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-300/50">
                        <span className="pl-3.5 pointer-events-none">
                           <svg className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                        </span>
                        <input type={showConfirmPassword ? 'text' : 'password'} id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="flex-1 px-3 py-3 w-full bg-transparent focus:outline-none" placeholder="Confirm Password" />
                         <div className="flex items-center pr-2">
                           <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="p-1 text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-0" aria-label={showConfirmPassword ? "Hide password" : "Show password"}>
                                {showConfirmPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                           </button>
                           <div className="ml-1">
                               {passwordsMatch === true && <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}
                               {passwordsMatch === false && <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>}
                           </div>
                        </div>
                    </div>

                    <div>
                        <button type="button" onClick={() => setShowReferral(!showReferral)} className="text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
                           {showReferral ? 'Hide referral code' : 'Have a referral code?'}
                        </button>
                        {showReferral && (
                            <div className="mt-2 group flex items-center bg-slate-100/50 border border-slate-200 rounded-lg shadow-sm transition-all duration-300 focus-within:bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-300/50">
                                <input type="text" id="referral" className="flex-1 px-3 py-3 w-full bg-transparent focus:outline-none" placeholder="Referral Code (Optional)" />
                            </div>
                        )}
                    </div>
                    
                    <div className="flex items-start pt-2">
                        <div className="flex items-center h-5">
                            <input id="terms" name="terms" type="checkbox" required className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="text-slate-600">I agree to the <a href="#" className="font-medium text-indigo-600 hover:underline">Terms</a> and <a href="#" className="font-medium text-indigo-600 hover:underline">Privacy Policy</a></label>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform active:scale-95">
                            Create Account
                        </button>
                    </div>
                </form>

                <SocialLogins />

                <p className="mt-6 text-center text-sm text-slate-600">
                    Already have an account?{' '}
                    <button onClick={() => onNavigate('login')} className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
                        Sign in
                    </button>
                </p>
            </div>
        </AuthLayout>
    );
};

export default SignupPage;