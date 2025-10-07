import React, { useState } from 'react';

type Page = 'dashboard';

interface LeaderboardPageProps {
    onNavigate: (page: Page) => void;
    onBack: () => void;
}

// --- Icons ---
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const MedalIcon: React.FC<{ rank: number }> = ({ rank }) => {
    const medalColors: { [key: number]: string } = {
        1: 'text-yellow-400',
        2: 'text-gray-400',
        3: 'text-orange-400',
    };
    if (rank > 3) return null;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${medalColors[rank]}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd" />
        </svg>
    );
};

// --- Mock Data ---
const generateUsers = (count: number, factor: number) => Array.from({ length: count }, (_, i) => ({
    rank: i + 1,
    name: `User #${Math.floor(Math.random() * 9000) + 1000}`,
    earnings: parseFloat(((count - i) * factor * (Math.random() * 0.5 + 0.75)).toFixed(2)),
    avatar: `https://i.pravatar.cc/100?u=user${i + factor}`
}));

const leaderboardData = {
    weekly: generateUsers(20, 10),
    monthly: generateUsers(50, 40),
    allTime: generateUsers(100, 200),
};

const currentUser = { 
    rank: 42, 
    name: 'Md Sanjid Faraji', 
    earnings: 1850.50, 
    avatar: 'https://i.pravatar.cc/100?u=md-sanjid-faraji' 
};

type LeaderboardPeriod = 'weekly' | 'monthly' | 'allTime';

interface User {
    rank: number;
    name: string;
    earnings: number;
    avatar: string;
}

// --- Sub-components ---
interface UserRowProps {
    user: User;
    animationDelay: string;
}
const UserRow: React.FC<UserRowProps> = ({ user, animationDelay }) => {
    const isTopThree = user.rank <= 3;
    return (
        <div style={{ animationDelay }} className={`flex items-center p-3 rounded-lg animate-fade-in-up ${isTopThree ? 'bg-blue-50 dark:bg-slate-800' : ''}`}>
            <div className="w-10 text-center text-sm font-bold text-gray-500 dark:text-slate-400">{user.rank}</div>
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mx-3" />
            <div className="flex-grow">
                <p className="font-semibold text-gray-800 dark:text-slate-200">{user.name}</p>
            </div>
            {isTopThree && <MedalIcon rank={user.rank} />}
            <div className="w-24 text-right font-bold text-blue-600 dark:text-blue-400">${user.earnings.toFixed(2)}</div>
        </div>
    );
};

const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ onBack }) => {
    const [activeTab, setActiveTab] = useState<LeaderboardPeriod>('allTime');

    const tabs: { id: LeaderboardPeriod, label: string }[] = [
        { id: 'weekly', label: 'Weekly' },
        { id: 'monthly', label: 'Monthly' },
        { id: 'allTime', label: 'All-Time' },
    ];

    const currentData = leaderboardData[activeTab];

    return (
        <div className="bg-[#F7F8FA] min-h-screen dark:bg-slate-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="max-w-lg mx-auto p-4 sm:p-6 pb-32">
                <header className="flex items-center mb-6 relative">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200/80 dark:hover:bg-slate-700 transition-colors absolute left-0 z-10" aria-label="Go back">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-slate-200 text-center w-full">Leaderboard</h1>
                </header>

                <main>
                    <div className="mb-6 p-1 bg-gray-200/80 dark:bg-slate-800 rounded-lg flex items-center justify-between">
                         {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full py-2 text-sm font-semibold rounded-md transition-all duration-300 ${activeTab === tab.id ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-slate-400'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white dark:bg-slate-800/50 rounded-xl shadow-sm p-2 space-y-1">
                        {currentData.map((user, index) => (
                            <UserRow key={user.rank} user={user} animationDelay={`${index * 30}ms`} />
                        ))}
                    </div>
                </main>
            </div>
            
            <div className="fixed bottom-0 left-0 right-0 z-10">
                <div className="max-w-lg mx-auto p-4">
                     <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl shadow-lg p-3 flex items-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                        <div className="w-10 text-center text-lg font-bold">{currentUser.rank}</div>
                        <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full mx-3 border-2 border-white/50" />
                        <div className="flex-grow">
                            <p className="font-bold">{currentUser.name} (You)</p>
                        </div>
                        <div className="w-24 text-right font-bold text-lg">${currentUser.earnings.toFixed(2)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaderboardPage;
