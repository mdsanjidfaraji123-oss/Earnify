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
        <div className="mt-6">
            <div className="flex items-center">
                <div className="flex-grow border-t border-slate-200 dark:border-slate-700" />
                <span className="flex-shrink mx-4 text-xs font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500">
                    Or continue with
                </span>
                <div className="flex-grow border-t border-slate-200 dark:border-slate-700" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                    <button
                        type="button"
                        className="w-full inline-flex justify-center py-2.5 px-4 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm bg-white dark:bg-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        <GoogleIcon />
                        <span className="ml-2">Google</span>
                    </button>
                </div>

                <div>
                    <button
                        type="button"
                        className="w-full inline-flex justify-center py-2.5 px-4 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm bg-white dark:bg-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        <FacebookIcon />
                        <span className="ml-2">Facebook</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SocialLogins;