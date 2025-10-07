import React from 'react';

const GoogleIcon: React.FC = () => (
    <svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path fill="currentColor" d="M488 261.8C488 403.3 381.5 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.4 76.4c-24.1-23.4-58.2-38.3-96.5-38.3-80.5 0-146.2 65.7-146.2 146.2s65.7 146.2 146.2 146.2c92.2 0 125.6-58.8 130.3-87.9H248v-96.4h239.9c.1 12.8.2 25.8.2 39.4z"></path>
    </svg>
);

const FacebookIcon: React.FC = () => (
    <svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
        <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
    </svg>
);


const SocialLogins: React.FC = () => {
    return (
        <div className="mt-8">
            <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-slate-300 dark:border-slate-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-white/80 dark:bg-slate-800/80 px-3 text-slate-500 dark:text-slate-400">Or continue with</span>
                </div>
            </div>

            <div className="mt-6 space-y-3">
                <button
                    type="button"
                    className="w-full inline-flex justify-center items-center gap-3 py-2.5 px-4 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                    <GoogleIcon />
                    <span>Continue with Google</span>
                </button>

                <button
                    type="button"
                    className="w-full inline-flex justify-center items-center gap-3 py-2.5 px-4 border border-transparent rounded-lg shadow-sm bg-[#1877F2] text-sm font-medium text-white hover:bg-[#166bda] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1877F2] transition-colors"
                >
                    <FacebookIcon />
                    <span>Continue with Facebook</span>
                </button>
            </div>
        </div>
    );
};

export default SocialLogins;
