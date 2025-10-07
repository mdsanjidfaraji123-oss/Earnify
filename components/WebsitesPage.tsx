
import React from 'react';
import type { WebsiteOffer } from '../App';

type Page = 'dashboard' | 'websiteVisit' | 'transactionHistory';

interface WebsitesPageProps {
    onNavigate: (page: Page, data?: any) => void;
    visitedWebsites: string[];
}

// --- SVG Icons ---
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);
const HistoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const FeaturedSparkleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
);
const DeviceIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
);
const SmallClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const RewardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
    </svg>
);
const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
const AyetStudiosIcon = () => (
    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm-1.5 14.5l-4-4L8 11l2.5 2.5L16 8l1.5 1.5-7 7z"/>
    </svg>
);
const AdscendMediaIcon = () => (
    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 12l10 10 10-10L12 2zm0 18.59L3.41 12 12 3.41 20.59 12 12 20.59zM12 5l-5 5h10l-5-5z"/>
    </svg>
);
const NotikIcon = () => (
    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 15h-2v-6h2v6zm4 0h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v3z"/>
    </svg>
);
const LootablyIcon = () => (
    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zm0 2.24L19.5 8.5 12 12.26 4.5 8.5 12 4.24zM3 8.82v6.36l8 4V15L3 8.82zm18 0v6.36l-8 4V15l8-6.18z" fill="currentColor"/>
    </svg>
);


const websiteOffers: WebsiteOffer[] = [
    { partner: 'AdGem', title: 'Explore Gaming Offers & Deals', reward: '+15 Points', duration: '10s', icon: <AdGemIcon />, iconBg: 'bg-teal-500', url: 'https://example.com/adgem', tags: ['new'] },
    { partner: 'OfferToro', title: 'Discover New & Popular Apps', reward: '+20 Points', duration: '15s', icon: <OfferToroIcon />, iconBg: 'bg-orange-500', url: 'https://example.com/offertoro', tags: ['popular'] },
    { partner: 'ayet-Studios', title: 'Watch Engaging Video Content', reward: '+10 Points', duration: '8s', icon: <AyetStudiosIcon />, iconBg: 'bg-sky-500', url: 'https://example.com/ayet-studios' },
    { partner: 'AdscendMedia', title: 'Complete Fun & Easy Surveys', reward: '+25 Points', duration: '20s', icon: <AdscendMediaIcon />, iconBg: 'bg-red-500', url: 'https://example.com/adscendmedia' },
    { partner: 'Notik', title: 'Play Games & Earn Rewards', reward: '+30 Points', duration: '25s', icon: <NotikIcon />, iconBg: 'bg-purple-500', url: 'https://example.com/notik', tags: ['popular'] },
    { partner: 'Lootably', title: 'Complete tasks for rewards', reward: '+18 Points', duration: '12s', icon: <LootablyIcon />, iconBg: 'bg-indigo-500', url: 'https://example.com/lootably' },
];

const featuredWebsite = websiteOffers[0];
const moreWebsites = websiteOffers.slice(1);

interface OfferCardProps {
    offer: WebsiteOffer;
    onVisit: (offer: WebsiteOffer) => void;
    isVisited: boolean;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer, onVisit, isVisited }) => {
    return (
        <div className={`bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] p-4 flex items-center space-x-4 ${isVisited ? 'opacity-60' : ''}`}>
            <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg ${offer.iconBg}`}>
                {offer.icon}
            </div>
            <div className="flex-grow">
                 <div className="flex items-center space-x-2">
                    <p className="font-bold">{offer.title}</p>
                    {offer.tags?.includes('new') && <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-0.5 rounded-full">New</span>}
                    {offer.tags?.includes('popular') && <span className="text-xs font-semibold bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">Popular</span>}
                </div>
                <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
                    <span className="flex items-center"><RewardIcon /> <span className="ml-1 font-semibold">{offer.reward}</span></span>
                    <span className="flex items-center"><SmallClockIcon /> <span className="ml-1">{offer.duration}</span></span>
                </div>
            </div>
            {isVisited ? (
                <div className="flex items-center space-x-2 text-green-600 text-sm font-semibold">
                    <CheckCircleIcon />
                    <span>Visited</span>
                </div>
            ) : (
                <button onClick={() => onVisit(offer)} className="px-5 py-2 text-sm font-semibold text-blue-600 bg-blue-100/70 rounded-lg transition-colors hover:bg-blue-200/70">
                    Visit
                </button>
            )}
        </div>
    );
};

const WebsitesPage: React.FC<WebsitesPageProps> = ({ onNavigate, visitedWebsites }) => {
    const handleVisit = (offer: WebsiteOffer) => {
        if (visitedWebsites.includes(offer.partner)) return;
        onNavigate('websiteVisit', offer);
    };
    
    const isFeaturedVisited = visitedWebsites.includes(featuredWebsite.partner);

    return (
        <div className="bg-white min-h-screen text-gray-800" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <header className="flex items-center justify-between p-4 sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100">
                <button onClick={() => onNavigate('dashboard')} className="p-2" aria-label="Go Back">
                    <ChevronLeftIcon />
                </button>
                <h1 className="text-xl font-bold">Browse Websites</h1>
                <button onClick={() => onNavigate('transactionHistory')} className="flex items-center text-sm font-semibold text-blue-600">
                    <HistoryIcon />
                    <span>History</span>
                </button>
            </header>

            <main className="p-4 space-y-8">
                <section>
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white shadow-lg shadow-blue-500/20 flex flex-col space-y-8">
                        <div className="flex justify-between items-start">
                             <div className="flex items-center text-xs font-semibold bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                                <FeaturedSparkleIcon /> Featured Website
                            </div>
                            <div className="text-sm font-semibold bg-white/20 backdrop-blur-sm rounded-full px-3.5 py-1.5">
                                {featuredWebsite.reward}
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold leading-tight flex items-center space-x-3">
                           <span>{featuredWebsite.title}</span>
                           {featuredWebsite.tags?.includes('new') && <span className="text-sm font-semibold bg-green-400 text-green-900 px-3 py-1 rounded-full">New</span>}
                           {featuredWebsite.tags?.includes('popular') && <span className="text-sm font-semibold bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full">Popular</span>}
                        </h3>
                        <div className="flex justify-between items-center">
                            <div className="space-y-2 text-sm opacity-90">
                                <p className="flex items-center space-x-2">
                                    <DeviceIcon />
                                    <span>{featuredWebsite.partner}</span>
                                </p>
                                <p className="flex items-center space-x-2">
                                    <SmallClockIcon />
                                    <span>{featuredWebsite.duration} visit</span>
                                </p>
                            </div>
                            <button 
                                onClick={() => handleVisit(featuredWebsite)} 
                                disabled={isFeaturedVisited}
                                className="px-6 py-3 text-base font-bold text-blue-600 bg-white rounded-xl shadow-md transition-transform transform hover:scale-105 active:scale-100 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {isFeaturedVisited ? 'Visited' : 'Start Visit'}
                            </button>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-lg font-bold mb-4">More Opportunities</h2>
                    <div className="space-y-3">
                        {moreWebsites.map((offer) => (
                            <OfferCard 
                                key={offer.partner} 
                                offer={offer}
                                onVisit={handleVisit}
                                isVisited={visitedWebsites.includes(offer.partner)}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default WebsitesPage;
