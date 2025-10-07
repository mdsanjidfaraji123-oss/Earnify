

import React from 'react';

type Page = 'faq' | 'reportProblem' | 'liveChat';

interface HelpAndSupportPageProps {
    onNavigate: (page: Page, data?: any) => void;
    onBack: () => void;
}

// Icons
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${className || ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);
const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);
const RocketLaunchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);
const WalletIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);
const UserCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);
const BugAntIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
    </svg>
);
const ChatBubbleLeftRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);
const EnvelopeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const HelpTopic: React.FC<{ icon: React.ReactNode; title: string; iconBg: string; onClick?: () => void }> = ({ icon, title, iconBg, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center space-y-2 text-center group">
        <div className={`w-14 h-14 flex items-center justify-center rounded-full ${iconBg} group-hover:scale-110 transition-transform duration-300`}>
            {icon}
        </div>
        <p className="text-xs font-semibold text-gray-700">{title}</p>
    </button>
);

const ContactOption: React.FC<{ icon: React.ReactNode; title: string; subtitle: string; iconBg: string; onClick?: () => void; }> = ({ icon, title, subtitle, iconBg, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg mr-4 ${iconBg}`}>
            {icon}
        </div>
        <div className="text-left flex-grow">
            <p className="font-semibold text-gray-800">{title}</p>
            <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <ChevronRightIcon />
    </button>
);


const HelpAndSupportPage: React.FC<HelpAndSupportPageProps> = ({ onNavigate, onBack }) => {

    const popularTopics = [
        { icon: <RocketLaunchIcon />, title: 'Getting Started', iconBg: 'bg-blue-100 text-blue-600', hash: 'general' },
        { icon: <WalletIcon />, title: 'Payments & Withdrawals', iconBg: 'bg-green-100 text-green-600', hash: 'earnings-payments' },
        { icon: <UserCircleIcon />, title: 'Account Issues', iconBg: 'bg-purple-100 text-purple-600', hash: 'account' },
        { icon: <BugAntIcon />, title: 'Task Problems', iconBg: 'bg-yellow-100 text-yellow-600', hash: 'tasks-offers' },
    ];
    
    return (
        <div className="bg-[#F7F8FA] min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="max-w-lg mx-auto p-4 sm:p-6 pb-20">
                <header className="flex items-center mb-6 relative">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200/80 transition-colors absolute left-0 z-10" aria-label="Go back">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 text-center w-full">Help & Support</h1>
                </header>

                <main className="space-y-8">
                    <div className="relative">
                        <input
                            type="search"
                            placeholder="Search for help..."
                            className="w-full pl-10 pr-4 py-3 bg-white rounded-lg shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="text-gray-400" />
                        </div>
                    </div>

                    <section>
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Popular Topics</h2>
                        <div className="grid grid-cols-4 gap-4 bg-white p-4 rounded-xl shadow-sm">
                            {popularTopics.map(topic => 
                                <HelpTopic 
                                    key={topic.title} 
                                    {...topic}
                                    onClick={() => onNavigate('faq', { hash: topic.hash })} 
                                />
                            )}
                        </div>
                    </section>

                    <section>
                        <button onClick={() => onNavigate('faq')} className="w-full flex justify-between items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                             <div className="text-left">
                                <p className="font-semibold text-gray-800">Explore FAQs</p>
                                <p className="text-sm text-gray-500">Find answers to common questions</p>
                            </div>
                            <ChevronRightIcon />
                        </button>
                    </section>

                    <section>
                         <h2 className="text-lg font-bold text-gray-800 mb-4">Still need help?</h2>
                         <div className="space-y-3">
                             <ContactOption 
                                icon={<ChatBubbleLeftRightIcon />} 
                                title="Live Chat" 
                                subtitle="Usually replies in a few minutes" 
                                iconBg="bg-cyan-100 text-cyan-600"
                                onClick={() => onNavigate('liveChat')}
                             />
                             <a href="mailto:support@earnify.com" className="block">
                                <ContactOption 
                                    icon={<EnvelopeIcon />} 
                                    title="Email Us" 
                                    subtitle="We'll reply within 24 hours" 
                                    iconBg="bg-red-100 text-red-600"
                                />
                             </a>
                             <ContactOption 
                                icon={<BugAntIcon />} 
                                title="Report a Problem" 
                                subtitle="Let us know about a technical issue" 
                                iconBg="bg-yellow-100 text-yellow-600"
                                onClick={() => onNavigate('reportProblem')}
                             />
                         </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default HelpAndSupportPage;
