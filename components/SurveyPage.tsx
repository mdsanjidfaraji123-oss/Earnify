import React from 'react';

type Page = 'dashboard' | 'surveyQuestion' | 'transactionHistory' | 'improveProfile';

interface SurveyPageProps {
    onNavigate: (page: Page) => void;
    onBack: () => void;
}

// --- SVG Icons ---
const ChevronLeftIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>);
const HistoryIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const SparklesIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V6h-1a1 1 0 110-2h1V3a1 1 0 011-1zm-1 6a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm1 5a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm-4-3a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm1 5a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm-5-4a1 1 0 011-1h1a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" /></svg>);
const FireIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.554-.822.916l-2.074 4.147a1 1 0 001.21 1.508c.26-.105.523-.242.793-.41l.7-4.223c.04-.242.24-.423.48-.423.24 0 .44.18.48.423l.7 4.223c.27.168.532.305.793.41a1 1 0 001.21-1.508l-2.074-4.147a1.001 1.001 0 00-.822-.916z" clipRule="evenodd" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.658.802.5.5 0 00.658.743A3.535 3.535 0 0110 5.5c.528 0 1.02.122 1.45.334a.5.5 0 00.658-.743A4.535 4.535 0 0011 5.092V5z" clipRule="evenodd" /></svg>);
const TrophyIcon: React.FC<{className?: string}> = ({className}) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" /><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM7 11h2a2 2 0 012 2v2a2 2 0 01-2 2H7a2 2 0 01-2-2v-2a2 2 0 012-2z" /></svg>);
const ChevronRightIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>);

// --- Mock Data ---
const surveyProfile = { completion: 75 };
const featuredSurvey = { title: "Your Daily Tech Habits", provider: "InsightPoll", time: 10, reward: 1.25, match: 95, category: "Technology" };
const moreSurveys = [
    { title: "Snacking Preferences Survey", reward: 0.80, time: 8, category: "Food & Drink", tags: ['hot'] },
    { title: "Future of Streaming Services", reward: 1.50, time: 12, category: "Entertainment", tags: ['new'] },
    { title: "Your Next Vacation Plans", reward: 0.95, time: 7, category: "Travel" },
    { title: "Mobile Gaming Insights", reward: 0.70, time: 5, category: "Gaming" },
];

// --- Sub-components ---

const ProfileCompletionCard: React.FC<{ onNavigate: (page: Page) => void; completion: number }> = ({ onNavigate, completion }) => {
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (completion / 100) * circumference;
    return (
        <button onClick={() => onNavigate('improveProfile')} className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 text-left hover:shadow-md transition-shadow duration-300 flex items-center space-x-4">
            <div className="relative w-14 h-14 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 56 56">
                    <circle className="text-gray-200 dark:text-slate-700" strokeWidth="5" stroke="currentColor" fill="transparent" r={radius} cx="28" cy="28" />
                    <circle className="text-indigo-500" strokeWidth="5" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx="28" cy="28" style={{ transition: 'stroke-dashoffset 0.5s ease' }} />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-md font-bold text-indigo-600 dark:text-indigo-400">{completion}%</span>
            </div>
            <div className="flex-grow">
                <h3 className="font-bold text-gray-800 dark:text-slate-200">Your Survey Profile</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Unlock higher-paying surveys & get a <span className="font-semibold text-indigo-600 dark:text-indigo-400">+100 Point Bonus</span>!</p>
            </div>
            <ChevronRightIcon />
        </button>
    );
};

const FeaturedSurveyCard: React.FC<{ onStart: () => void }> = ({ onStart }) => (
    <div className="bg-indigo-600 dark:bg-indigo-700 rounded-2xl p-5 text-white shadow-lg shadow-indigo-500/20 flex flex-col space-y-4">
        <div className="flex justify-between items-center">
            <div className="flex items-center text-xs font-semibold bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <SparklesIcon className="h-4 w-4 mr-1.5" /> Best Match ({featuredSurvey.match}%)
            </div>
            <div className="text-lg font-bold bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                ${featuredSurvey.reward.toFixed(2)}
            </div>
        </div>
        <h3 className="text-2xl font-bold">{featuredSurvey.title}</h3>
        <div className="flex justify-between items-center pt-2">
            <div className="text-sm opacity-90 font-medium">
                <p>{featuredSurvey.time} min • {featuredSurvey.provider}</p>
            </div>
            <button onClick={onStart} className="px-5 py-2.5 text-base font-bold text-indigo-600 bg-white rounded-xl shadow-md transition-transform transform hover:scale-105 active:scale-100">
                Start Survey
            </button>
        </div>
    </div>
);

const SurveyListItem: React.FC<{ survey: typeof moreSurveys[0]; onStart: () => void; }> = ({ survey, onStart }) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 flex items-center space-x-4">
        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
            <TrophyIcon className="w-7 h-7" />
        </div>
        <div className="flex-grow">
            <div className="flex items-center space-x-2">
                <p className="font-bold text-gray-800 dark:text-slate-200">{survey.title}</p>
                {survey.tags?.includes('hot') && <span className="text-xs font-semibold bg-red-100 text-red-800 px-2 py-0.5 rounded-full flex items-center"><FireIcon className="w-3 h-3 mr-1" /> Hot</span>}
                {survey.tags?.includes('new') && <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-0.5 rounded-full">New</span>}
            </div>
            <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500 dark:text-slate-400">
                <span>{survey.time} min</span>
                <span className="text-gray-300 dark:text-slate-600">•</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">${survey.reward.toFixed(2)}</span>
                <span className="text-gray-300 dark:text-slate-600">•</span>
                <span className="px-2 py-0.5 text-xs bg-slate-100 dark:bg-slate-700 rounded">{survey.category}</span>
            </div>
        </div>
        <button onClick={onStart} className="px-5 py-2 text-sm font-semibold text-indigo-600 bg-indigo-100/70 dark:bg-indigo-500/10 dark:text-indigo-400 rounded-lg transition-colors hover:bg-indigo-200/70 dark:hover:bg-indigo-500/20">
            Start
        </button>
    </div>
);


const SurveyPage: React.FC<SurveyPageProps> = ({ onNavigate, onBack }) => {
    return (
        <div className="bg-[#F7F8FA] dark:bg-slate-900 min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="max-w-lg mx-auto p-4 sm:p-6 pb-20">
                <header className="flex items-center justify-between mb-6 animate-fade-in-down relative">
                    <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-200/80 dark:hover:bg-slate-700 transition-colors" aria-label="Go back">
                        <ChevronLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-slate-200">
                        Survey Hub
                    </h1>
                    <button onClick={() => onNavigate('transactionHistory')} className="flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        <HistoryIcon />
                        <span>History</span>
                    </button>
                </header>

                <main className="space-y-6">
                    <section className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <ProfileCompletionCard onNavigate={onNavigate} completion={surveyProfile.completion} />
                    </section>

                    <section className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        <FeaturedSurveyCard onStart={() => onNavigate('surveyQuestion')} />
                    </section>

                    <section>
                        <h2 className="text-lg font-bold text-gray-800 dark:text-slate-200 mb-3 animate-fade-in-up" style={{ animationDelay: '300ms' }}>More Surveys</h2>
                        <div className="space-y-3">
                            {moreSurveys.map((survey, index) => (
                                <div key={survey.title} className="animate-fade-in-up" style={{ animationDelay: `${400 + index * 100}ms` }}>
                                    <SurveyListItem survey={survey} onStart={() => onNavigate('surveyQuestion')} />
                                </div>
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default SurveyPage;
