import React, { useState, useEffect } from 'react';

interface QuizIntroPageProps {
    onBack: () => void;
}

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const QuizIntroPage: React.FC<QuizIntroPageProps> = ({ onBack }) => {
    const [countdown, setCountdown] = useState(30);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    useEffect(() => {
        if (countdown > 0) {
            const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timerId);
        } else {
            setIsButtonEnabled(true);
        }
    }, [countdown]);

    return (
        <div className="bg-[#4338CA] min-h-screen flex flex-col p-6 font-['Poppins']">
            <header className="flex-shrink-0 w-full">
                <button 
                    onClick={onBack} 
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors" 
                    aria-label="Go Back"
                >
                    <BackArrowIcon />
                </button>
            </header>
            <main className="flex-grow flex flex-col items-center justify-center">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 text-center">
                    <p className="text-slate-700 text-lg leading-relaxed mb-10">
                        কোষ হলো মানবদেহের গঠন এবং কার্যকরী একক এবং একটি মানবদেহ কয়েকশ' কোটি কোষের সমন্বয়ে গঠিত।
                    </p>
                    <button 
                        onClick={() => window.open('https://www.revenuecpmgate.com/c2j6n4py?key=bdb0fce64840f2e2ae3176e1a3361126', '_blank', 'noopener,noreferrer')}
                        disabled={!isButtonEnabled}
                        className={`w-full max-w-xs py-3 text-lg font-semibold rounded-full transition-all duration-300 ${
                            isButtonEnabled 
                            ? 'text-slate-700 bg-transparent border border-slate-400 hover:bg-slate-700 hover:text-white' 
                            : 'text-slate-500 bg-slate-100 border border-slate-200 cursor-not-allowed'
                        }`}
                    >
                        {isButtonEnabled ? 'START' : `Please wait ${countdown}s`}
                    </button>
                </div>
            </main>
        </div>
    );
};

export default QuizIntroPage;
