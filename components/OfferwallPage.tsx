

import React, { useState, useEffect } from 'react';

interface OfferwallPageProps {
    onBack: () => void;
}

// Icons
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const AdGateIcon = () => (
    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.5 2h-19C1.12 2 0 3.12 0 4.5v15C0 20.88 1.12 22 2.5 22h19c1.38 0 2.5-1.12 2.5-2.5v-15C24 3.12 22.88 2 21.5 2zM12 17l-5-5h10l-5 5z" />
    </svg>
);
const AdGemIcon = () => (
    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7l10 5 10-5L12 2zm0 17.5L4.5 15.25l7.5-3.75 7.5 3.75L12 19.5zM22 7l-10 5v10l10-5V7zM2 7v10l10 5V12L2 7z"/>
    </svg>
);
const OfferToroIcon = () => (
    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
    </svg>
);
const CPXResearchIcon = () => (
    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z"/>
    </svg>
);

const offerwallProviders = [
    {
        name: 'AdGate Media',
        description: 'Complete offers and surveys.',
        rewardInfo: 'High payouts',
        icon: <AdGateIcon />,
        iconBg: 'bg-sky-500'
    },
    {
        name: 'AdGem',
        description: 'Explore gaming offers & app installs.',
        rewardInfo: 'New offers daily',
        icon: <AdGemIcon />,
        iconBg: 'bg-teal-500'
    },
    {
        name: 'OfferToro',
        description: 'A wide variety of offers to choose from.',
        rewardInfo: 'Trusted partner',
        icon: <OfferToroIcon />,
        iconBg: 'bg-orange-500'
    },
    {
        name: 'CPX Research',
        description: 'Get paid for your opinion with surveys.',
        rewardInfo: 'Unlimited surveys',
        icon: <CPXResearchIcon />,
        iconBg: 'bg-indigo-500'
    },
];

interface ProviderCardProps {
    provider: typeof offerwallProviders[0];
    animationDelay: string;
}

const FeaturedOfferCard: React.FC = () => {
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
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg shadow-indigo-500/30 flex flex-col space-y-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-2xl font-bold">Daily Brain Teaser</h3>
                    <p className="text-sm opacity-90 font-medium">Test your knowledge & earn!</p>
                </div>
                <div className="text-lg font-bold bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                    +50 Points
                </div>
            </div>
            
            <p className="text-slate-200 text-lg leading-relaxed text-center py-4">
                কোষ হলো মানবদেহের গঠন এবং কার্যকরী একক এবং একটি মানবদেহ কয়েকশ' কোটি কোষের সমন্বয়ে গঠিত।
            </p>

            <button 
                onClick={() => window.open('https://www.revenuecpmgate.com/c2j6n4py?key=bdb0fce64840f2e2ae3176e1a3361126', '_blank', 'noopener,noreferrer')}
                disabled={!isButtonEnabled}
                className={`w-full py-3 text-base font-bold rounded-xl shadow-md transition-all duration-300 transform hover:scale-105 active:scale-100 ${
                    isButtonEnabled 
                    ? 'text-indigo-600 bg-white' 
                    : 'text-slate-200 bg-white/30 cursor-not-allowed'
                }`}
            >
                {isButtonEnabled ? 'Start Quiz' : `Unlocks in ${countdown}s`}
            </button>
        </div>
    );
};


const ProviderCard: React.FC<ProviderCardProps> = ({ provider, animationDelay }) => (
    <div style={{ animationDelay }} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 flex items-center space-x-4 hover:shadow-md transition-shadow duration-300 animate-fade-in-up">
        <div className={`w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-lg ${provider.iconBg}`}>
            {provider.icon}
        </div>
        <div className="flex-grow">
            <p className="font-bold text-gray-800 dark:text-slate-200">{provider.name}</p>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{provider.description}</p>
            <div className="flex items-center mt-2 text-xs text-green-600 dark:text-green-400 font-medium">
                <span>{provider.rewardInfo}</span>
            </div>
        </div>
        <button className="px-5 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105">
            Open
        </button>
    </div>
);

const OfferwallPage: React.FC<OfferwallPageProps> = ({ onBack }) => {
    return (
        <div 
            className="bg-[#F7F8FA] dark:bg-slate-900 min-h-screen" 
            style={{ fontFamily: "'Poppins', sans-serif" }}
        >
            <div 
                className="max-w-lg mx-auto p-4 sm:p-6 pb-20"
            >
                <header className="flex items-center mb-6 relative">
                    <button
                        onClick={onBack}
                        className="p-2 rounded-full hover:bg-gray-200/80 dark:hover:bg-slate-700 transition-colors absolute left-0"
                        aria-label="Back to dashboard"
                    >
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-slate-200 text-center w-full">
                        Earn Unlimited
                    </h1>
                </header>
                <main className="space-y-8">
                    <section className="animate-fade-in-up">
                        <FeaturedOfferCard />
                    </section>
                    <section>
                        <div className="mb-3 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                            <h2 className="text-lg font-semibold text-gray-700 dark:text-slate-300">More Offer Partners</h2>
                            <p className="text-sm text-gray-500 dark:text-slate-400">Complete tasks from our partners to earn rewards.</p>
                        </div>
                        <div className="space-y-3">
                            {offerwallProviders.map((provider, index) => (
                                <ProviderCard key={index} provider={provider} animationDelay={`${(index + 2) * 100}ms`} />
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default OfferwallPage;