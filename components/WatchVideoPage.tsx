import React from 'react';

type Page = 'dashboard' | 'transactionHistory';

interface WatchVideoPageProps {
    onNavigate: (page: Page) => void;
    onBack: () => void;
}

// --- SVG Icons ---
const ChevronLeftIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>);
const HistoryIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const GiftIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>);
const FireIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.554-.822.916l-2.074 4.147a1 1 0 001.21 1.508c.26-.105.523-.242.793-.41l.7-4.223c.04-.242.24-.423.48-.423.24 0 .44.18.48.423l.7 4.223c.27.168.532.305.793.41a1 1 0 001.21-1.508l-2.074-4.147a1.001 1.001 0 00-.822-.916z" clipRule="evenodd" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.658.802.5.5 0 00.658.743A3.535 3.535 0 0110 5.5c.528 0 1.02.122 1.45.334a.5.5 0 00.658-.743A4.535 4.535 0 0011 5.092V5z" clipRule="evenodd" /></svg>);

const HideoutTvIcon = () => (<svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.11 13.11L15.33 12l-4.44-3.11v6.22z" /></svg>);
const LootablyIcon = () => (<svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7v10l10 5 10-5V7l-10-5zm0 2.24L19.5 8.5 12 12.26 4.5 8.5 12 4.24zM3 8.82v6.36l8 4V15L3 8.82zm18 0v6.36l-8 4V15l8-6.18z" fill="currentColor"/></svg>);
const AdgateIcon = () => (<svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M21.5 2h-19C1.12 2 0 3.12 0 4.5v15C0 20.88 1.12 22 2.5 22h19c1.38 0 2.5-1.12 2.5-2.5v-15C24 3.12 22.88 2 21.5 2zM12 17l-5-5h10l-5 5z" /></svg>);

const videoProviders = [
    { name: 'Lootably', description: 'Watch curated video content and earn.', rewardInfo: 'Up to +500 Points', icon: <LootablyIcon />, iconBg: 'bg-indigo-500', tags: ['hot', 'highest paying'], },
    { name: 'Hideout.tv', description: 'Discover exclusive content and get paid.', rewardInfo: '+10 Points per 3 ads', icon: <HideoutTvIcon />, iconBg: 'bg-green-500', tags: ['new'], },
    { name: 'AdGate Media', description: 'Sponsored videos and trailers.', rewardInfo: 'Variable rewards', icon: <AdgateIcon />, iconBg: 'bg-sky-500', },
];

const featuredProvider = videoProviders[0];
const otherProviders = videoProviders.slice(1);

const DailyBonusCard: React.FC = () => {
    const progress = 60; // Example progress
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-center mb-2">
                <p className="font-bold text-gray-800 dark:text-slate-200">Today's Progress</p>
                <div className="flex items-center text-sm font-semibold text-green-600 dark:text-green-400"><GiftIcon className="w-5 h-5 mr-1.5" />Daily Bonus</div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-xs text-center text-gray-500 dark:text-slate-400 mt-2">Watch 5 more videos to earn a <span className="font-semibold text-green-600 dark:text-green-400">+25 Point</span> bonus!</p>
        </div>
    );
};

const FeaturedProviderCard: React.FC<{provider: typeof featuredProvider; onClick: () => void;}> = ({ provider, onClick }) => (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-5 text-white shadow-lg shadow-indigo-500/20 flex flex-col space-y-4">
        <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">{provider.name}</h3>
            <div className="text-lg font-bold bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                {provider.rewardInfo}
            </div>
        </div>
        <p className="text-sm opacity-90 font-medium flex-grow">{provider.description}</p>
        <div className="flex justify-between items-end pt-2">
            <div className="flex items-center space-x-2">
                {provider.tags?.includes('hot') && <span className="text-xs font-semibold bg-red-500 text-white px-2 py-0.5 rounded-full flex items-center"><FireIcon /> Hot</span>}
                {provider.tags?.includes('highest paying') && <span className="text-xs font-semibold bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full">Top Earner</span>}
            </div>
            <button onClick={onClick} className="px-5 py-2.5 text-base font-bold text-indigo-600 bg-white rounded-xl shadow-md transition-transform transform hover:scale-105 active:scale-100">
                Watch Now
            </button>
        </div>
    </div>
);

const ProviderCard: React.FC<{ provider: typeof otherProviders[0] }> = ({ provider }) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 flex items-center space-x-4">
        <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg ${provider.iconBg}`}>
            {provider.icon}
        </div>
        <div className="flex-grow">
            <div className="flex items-center space-x-2">
                <p className="font-bold text-gray-800 dark:text-slate-200">{provider.name}</p>
                {provider.tags?.includes('new') && <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-0.5 rounded-full">New</span>}
            </div>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{provider.description}</p>
        </div>
        <button className="px-5 py-2 text-sm font-semibold text-indigo-600 bg-indigo-100/70 dark:bg-indigo-500/10 dark:text-indigo-400 rounded-lg transition-colors hover:bg-indigo-200/70 dark:hover:bg-indigo-500/20">
            Open
        </button>
    </div>
);


const WatchVideoPage: React.FC<WatchVideoPageProps> = ({ onNavigate, onBack }) => {
    
    const handleWatchNow = () => {
        const script = document.createElement('script');
        script.dataset.zone = '10014133';
        script.src = 'https://groleegni.net/vignette.min.js';
        script.onerror = () => {
            console.error("Failed to load the ad script.");
            script.remove();
        };
        document.body.appendChild(script);
    };

    return (
        <div className="bg-gray-50 dark:bg-slate-900 min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="max-w-lg mx-auto p-4 sm:p-6 pb-20">
                <header className="flex items-center justify-between mb-6 animate-fade-in-down">
                    <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-200/80 dark:hover:bg-slate-700 transition-colors" aria-label="Go back">
                        <ChevronLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-slate-200">
                        Watch & Earn
                    </h1>
                    <button onClick={() => onNavigate('transactionHistory')} className="flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        <HistoryIcon />
                        <span>History</span>
                    </button>
                </header>

                <main className="space-y-6">
                    <section className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <DailyBonusCard />
                    </section>
                    
                    <section className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        <FeaturedProviderCard provider={featuredProvider} onClick={handleWatchNow} />
                    </section>
                    
                    <section>
                        <h2 className="text-lg font-bold text-gray-800 dark:text-slate-200 mb-3 animate-fade-in-up" style={{ animationDelay: '300ms' }}>Other Providers</h2>
                        <div className="space-y-3">
                            {otherProviders.map((provider, index) => (
                                <div key={provider.name} className="animate-fade-in-up" style={{ animationDelay: `${400 + index * 100}ms` }}>
                                    <ProviderCard provider={provider} />
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default WatchVideoPage;