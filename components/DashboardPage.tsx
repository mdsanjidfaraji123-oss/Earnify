

import React, { useState, useRef, TouchEvent, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref, onValue, get, set } from 'firebase/database';


// Type definitions
type Page = 'home' | 'login' | 'signup' | 'dashboard' | 'survey' | 'watchVideo' | 'dailyTask' | 'websites' | 'inviteFriends' | 'notifications' | 'myProfile' | 'settings' | 'transactionHistory' | 'termsAndConditions' | 'announcements' | 'reportProblem' | 'helpAndSupport' | 'withdrawFunds' | 'leaderboard' | 'improveProfile' | 'aboutUs' | 'offerwall' | 'quizIntro';

interface DashboardPageProps {
    onNavigate: (page: Page) => void;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    onLogout: () => void;
    unreadCount: number;
}

// SVG Icon Components
const BellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
);

const ProfileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const WalletIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);

const WithdrawIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
);

const HistoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const FireIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.554-.822.916l-2.074 4.147a1 1 0 001.21 1.508c.26-.105.523-.242.793-.41l.7-4.223c.04-.242.24-.423.48-.423.24 0 .44.18.48.423l.7 4.223c.27.168.532.305.793.41a1 1 0 001.21-1.508l-2.074-4.147a1.001 1.001 0 00-.822-.916z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.658.802.5.5 0 00.658.743A3.535 3.535 0 0110 5.5c.528 0 1.02.122 1.45.334a.5.5 0 00.658-.743A4.535 4.535 0 0011 5.092V5z" clipRule="evenodd" />
    </svg>
);

const ClipboardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

const ShareIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6.002l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.368a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
    </svg>
);

const SurveyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const DailyTaskIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
);

const WebsitesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" />
    </svg>
);

const InviteFriendsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
);

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
);

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
         <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
         <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const HelpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const AboutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);

const RefreshArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
);

const SpinnerIcon = () => (
    <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const CheckIconSolid = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const ChevronDownIcon: React.FC<{className?: string}> = ({className = ''}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-400 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);


// Reusable ActionItem component
interface ActionItemProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    iconBgClass: string;
    iconTextClass: string;
    onClick?: () => void;
    animationDelay?: string;
}

const ActionItem: React.FC<ActionItemProps> = ({ icon, title, subtitle, iconBgClass, iconTextClass, onClick, animationDelay }) => (
    <button style={{ animationDelay }} onClick={onClick} className="w-full flex items-center p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-200 animate-spring-in-up">
        <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg mr-4 ${iconBgClass} ${iconTextClass}`}>
            {icon}
        </div>
        <div className="text-left flex-grow">
            <p className="font-semibold text-gray-800 dark:text-slate-200">{title}</p>
            <p className="text-sm text-gray-500 dark:text-slate-400">{subtitle}</p>
        </div>
        <ChevronRightIcon />
    </button>
);

const ProfileCompletionCard: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
    const completion = 40; // Hardcoded for now
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (completion / 100) * circumference;

    return (
        <button 
            onClick={() => onNavigate('improveProfile')}
            className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 text-left hover:shadow-md transition-shadow duration-300 flex items-center space-x-4"
        >
            <div className="relative w-14 h-14 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 56 56">
                    <circle className="text-gray-200 dark:text-slate-700" strokeWidth="5" stroke="currentColor" fill="transparent" r={radius} cx="28" cy="28" />
                    <circle className="text-blue-500" strokeWidth="5" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx="28" cy="28" style={{ transition: 'stroke-dashoffset 0.5s ease' }} />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-md font-bold text-blue-600 dark:text-blue-400">
                    {completion}%
                </span>
            </div>
            <div className="flex-grow">
                <h3 className="font-bold text-gray-800 dark:text-slate-200">Improve Your Profile</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Get better surveys & a <span className="font-semibold text-blue-600 dark:text-blue-400">+100 Point Bonus</span>!</p>
            </div>
            <ChevronRightIcon />
        </button>
    );
};


// Main DashboardPage component
const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate, unreadCount }) => {
    // State for pull-to-refresh
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [pullPosition, setPullPosition] = useState(0);
    const touchStartY = useRef(0);
    const REFRESH_THRESHOLD = 80;

    const [balance, setBalance] = useState<number | null>(null);
    const [referralCode, setReferralCode] = useState('...');
    const [isCodeCopied, setIsCodeCopied] = useState(false);

    const [isGoalCardExpanded, setIsGoalCardExpanded] = useState(false);
    
    const dailyGoalTasks = [
        { id: 1, title: 'Daily Check-in', isComplete: true, icon: <CheckIconSolid />, page: 'dailyTask' as Page },
        { id: 2, title: 'Watch 3 Videos', isComplete: false, progress: { current: 1, total: 3 }, icon: <PlayIcon />, page: 'watchVideo' as Page },
        { id: 3, title: 'Complete a Survey', isComplete: true, icon: <SurveyIcon />, page: 'survey' as Page },
        { id: 4, title: 'Visit a Website', isComplete: false, icon: <WebsitesIcon />, page: 'websites' as Page },
    ];

    const completedTasks = dailyGoalTasks.filter(t => t.isComplete).length;
    const totalTasks = dailyGoalTasks.length;
    const goalProgress = (completedTasks / totalTasks) * 100;
    const allTasksComplete = completedTasks === totalTasks;

    useEffect(() => {
        const userId = 'user123';
        const balanceRef = ref(database, `users/${userId}/balance`);
        const profileRef = ref(database, `users/${userId}/profile`);

        const unsubscribeBalance = onValue(balanceRef, (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
                setBalance(data);
            } else {
                set(balanceRef, 90448.00); // Initialize if null
            }
        });

        const unsubscribeProfile = onValue(profileRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data.referralCode) {
                setReferralCode(data.referralCode);
            } else {
                const defaultCode = 'MDSANJID123';
                setReferralCode(defaultCode);
                if (data && !data.referralCode) {
                    set(ref(database, `users/${userId}/profile/referralCode`), defaultCode);
                }
            }
        });

        return () => {
            unsubscribeBalance();
            unsubscribeProfile();
        };
    }, []);

    const quickActions = [
        { icon: <SurveyIcon />, title: 'Survey to Earn', subtitle: 'Share your opinion for rewards', iconBgClass: 'bg-cyan-100', iconTextClass: 'text-cyan-600', onClick: () => onNavigate('survey') },
        { icon: <PlayIcon />, title: 'Watch Video', subtitle: 'Earn rewards by watching', iconBgClass: 'bg-red-100', iconTextClass: 'text-red-500', onClick: () => onNavigate('watchVideo') },
        { icon: <DailyTaskIcon />, title: 'Daily Task', subtitle: 'Complete to hit your goal', iconBgClass: 'bg-green-100', iconTextClass: 'text-green-600', onClick: () => onNavigate('dailyTask') },
        { icon: <WebsitesIcon />, title: 'Websites', subtitle: 'Browse partner sites', iconBgClass: 'bg-yellow-100', iconTextClass: 'text-yellow-600', onClick: () => onNavigate('websites') },
        { icon: <InviteFriendsIcon />, title: 'Invite Friends', subtitle: 'Earn for each new user', iconBgClass: 'bg-purple-100', iconTextClass: 'text-purple-500', onClick: () => onNavigate('inviteFriends') },
        { icon: <StarIcon />, title: 'Earn Unlimited', subtitle: 'Explore offers and tasks', iconBgClass: 'bg-orange-100', iconTextClass: 'text-orange-500', onClick: () => onNavigate('offerwall') },
    ];
    
    const accountActions = [
        { icon: <SettingsIcon />, title: 'Settings', subtitle: 'App preferences, notifications', iconBgClass: 'bg-gray-200/60', iconTextClass: 'text-gray-600', onClick: () => onNavigate('settings') },
        { icon: <HelpIcon />, title: 'Help & Support', subtitle: 'Contact us, FAQs', iconBgClass: 'bg-gray-200/60', iconTextClass: 'text-gray-600', onClick: () => onNavigate('helpAndSupport') },
        { icon: <AboutIcon />, title: 'About Us', subtitle: 'Learn more about our mission', iconBgClass: 'bg-gray-200/60', iconTextClass: 'text-gray-600', onClick: () => onNavigate('aboutUs') },
    ];

    const handleCopy = () => {
        if (referralCode && referralCode !== '...') {
            navigator.clipboard.writeText(referralCode);
            setIsCodeCopied(true);
            setTimeout(() => setIsCodeCopied(false), 2000);
        }
    };

    const handleShare = () => {
        if (navigator.share && referralCode && referralCode !== '...') {
            navigator.share({
                title: 'Join me on Earnify!',
                text: `Use my referral code ${referralCode} to get a bonus on Earnify!`,
                url: `https://earnify.com/ref/${referralCode}`,
            }).catch(console.error);
        } else {
            onNavigate('inviteFriends');
        }
    };

    // Touch handlers for pull-to-refresh
    const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        if (isRefreshing || window.scrollY !== 0) return;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        if (isRefreshing || touchStartY.current === 0) return;
        const pullDistance = e.touches[0].clientY - touchStartY.current;
        if (pullDistance > 0) {
            e.preventDefault();
            const dampenedPull = Math.pow(pullDistance, 0.85);
            setPullPosition(dampenedPull);
        }
    };

    const handleTouchEnd = () => {
        if (isRefreshing || touchStartY.current === 0) return;

        if (pullPosition > REFRESH_THRESHOLD) {
            setIsRefreshing(true);
            setPullPosition(60);
            setTimeout(() => {
                if (balance !== null) {
                    const newBalance = balance + (Math.random() * 50 - 25);
                    const userId = 'user123';
                    const balanceRef = ref(database, `users/${userId}/balance`);
                    set(balanceRef, newBalance);
                }
                setIsRefreshing(false);
                setPullPosition(0);
            }, 1500);
        } else {
            setPullPosition(0);
        }
        
        touchStartY.current = 0;
    };


    return (
        <div 
            className="bg-[#F7F8FA] min-h-screen relative overflow-hidden dark:bg-slate-900" 
            style={{ fontFamily: "'Poppins', sans-serif" }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
             <div 
                className="absolute top-0 left-0 right-0 flex justify-center items-end" 
                style={{ height: '60px', transform: `translateY(${pullPosition - 60}px)`, opacity: Math.min(pullPosition / REFRESH_THRESHOLD, 1) }}
            >
                <div className="pb-2">
                    {isRefreshing ? (
                        <SpinnerIcon />
                    ) : (
                        <div className="transition-transform" style={{ transform: `rotate(${pullPosition > REFRESH_THRESHOLD ? 180 : 0}deg)`}}>
                            <RefreshArrowIcon />
                        </div>
                    )}
                </div>
            </div>
            <div 
                className="max-w-md mx-auto p-4 sm:p-5 pb-10 transition-transform"
                style={{ 
                    transform: `translateY(${pullPosition}px)`,
                    transition: touchStartY.current === 0 ? 'transform 0.3s ease' : 'none',
                }}
            >
                <header className="flex justify-between items-center my-4 animate-fade-in-down">
                    <div>
                        <p className="text-gray-500 dark:text-slate-400 text-sm">Welcome back,</p>
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-slate-200">Md Sanjid Faraji</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => onNavigate('notifications')} className="relative w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full border border-gray-200/80 dark:border-slate-700">
                            <BellIcon />
                            {unreadCount > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                                    {unreadCount > 9 ? '9+' : unreadCount}
                                </span>
                            )}
                        </button>
                         <button onClick={() => onNavigate('myProfile')} className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full border border-gray-200/80 dark:border-slate-700">
                            <ProfileIcon />
                        </button>
                    </div>
                </header>

                <main className="space-y-6">
                    <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm animate-spring-in-up" style={{ animationDelay: '100ms'}}>
                        <div className="flex items-center space-x-2 text-gray-500 dark:text-slate-400">
                            <WalletIcon />
                            <h2 className="font-semibold">Your Balance</h2>
                        </div>
                        <div className="text-center my-6">
                            <p className="text-5xl font-bold text-gray-800 dark:text-slate-100">
                                ${balance !== null ? balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '...'}
                            </p>
                            <p className="text-md text-gray-500 dark:text-slate-400 font-medium mt-2">
                                {balance !== null ? (balance * 1000).toLocaleString('en-US') : '...'} Points
                            </p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button onClick={() => onNavigate('withdrawFunds')} className="flex-1 flex items-center justify-center py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all transform hover:scale-105">
                                <WithdrawIcon />
                                <span>Withdraw</span>
                            </button>
                            <button onClick={() => onNavigate('transactionHistory')} className="flex-1 flex items-center justify-center py-3 bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-slate-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-all">
                                <HistoryIcon />
                                <span>History</span>
                            </button>
                        </div>
                    </section>
                    
                    <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm animate-spring-in-up" style={{ animationDelay: '200ms'}}>
                        <button 
                            className="w-full p-5 text-left"
                            onClick={() => setIsGoalCardExpanded(!isGoalCardExpanded)}
                            aria-expanded={isGoalCardExpanded}
                        >
                            <div className="flex justify-between items-center text-sm">
                                <p className="font-semibold text-gray-800 dark:text-slate-200">Daily Goal Progress</p>
                                <div className="flex items-center font-bold text-gray-700 dark:text-slate-300">
                                    <FireIcon />
                                    <span className="ml-1">{completedTasks}/{totalTasks} Tasks</span>
                                </div>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 mt-2">
                                <div className="bg-blue-500 rounded-full h-2 transition-all duration-500" style={{ width: `${goalProgress}%` }}></div>
                            </div>
                            <div className="flex justify-between items-center mt-3">
                                <p className="text-xs text-gray-500 dark:text-slate-400">
                                    {allTasksComplete 
                                        ? "🎉 Goal achieved! Claim your bonus!" 
                                        : `Complete ${totalTasks - completedTasks} more task${totalTasks - completedTasks > 1 ? 's' : ''} for a bonus!`}
                                </p>
                                <ChevronDownIcon className={`transform transition-transform duration-300 ${isGoalCardExpanded ? 'rotate-180' : ''}`} />
                            </div>
                        </button>
                        
                        <div className={`grid transition-all duration-500 ease-in-out ${isGoalCardExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                            <div className="overflow-hidden">
                                <div className="px-5 pb-5 border-t border-gray-100 dark:border-slate-700">
                                    <div className="space-y-3 pt-4">
                                        {dailyGoalTasks.map(task => (
                                            <div key={task.id} className="flex items-center">
                                                <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full ${task.isComplete ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'} dark:bg-slate-700 dark:text-slate-300`}>
                                                    {task.isComplete ? <CheckIconSolid /> : task.icon}
                                                </div>
                                                <div className="ml-3 flex-grow">
                                                    <p className={`font-medium text-sm text-gray-800 dark:text-slate-200 ${task.isComplete ? 'line-through text-gray-500 dark:text-slate-500' : ''}`}>{task.title}</p>
                                                    {task.progress && !task.isComplete && (
                                                        <p className="text-xs text-gray-500 dark:text-slate-400">{task.progress.current}/{task.progress.total} completed</p>
                                                    )}
                                                </div>
                                                {!task.isComplete && (
                                                    <button onClick={() => onNavigate(task.page)} className="px-4 py-1.5 text-xs font-semibold text-blue-600 bg-blue-100/70 dark:bg-blue-500/10 dark:text-blue-400 rounded-lg transition-colors hover:bg-blue-200/70 dark:hover:bg-blue-500/20">
                                                        Go
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    {allTasksComplete && (
                                        <button className="w-full mt-4 py-2.5 font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition-all animate-pulse-glow">
                                            Claim +50 Point Bonus
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="animate-spring-in-up" style={{ animationDelay: '300ms'}}>
                        <ProfileCompletionCard onNavigate={onNavigate} />
                    </section>
                    
                    <section className="animate-spring-in-up" style={{ animationDelay: '400ms'}}>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-slate-200 mb-3">Invite Friends, Earn More</h2>
                        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm">
                            <p className="text-sm text-gray-500 dark:text-slate-400 mb-3">Share your referral code with friends. When they sign up, you both get bonus points!</p>
                            <div className="flex items-center space-x-2">
                                <div className="flex-1 text-center bg-gray-100 dark:bg-slate-700 rounded-lg p-3 text-gray-700 dark:text-slate-300 font-mono text-sm tracking-wider">
                                    {referralCode}
                                </div>
                                <button onClick={handleCopy} className="w-11 h-11 flex items-center justify-center bg-blue-50 dark:bg-slate-700 rounded-lg hover:bg-blue-100 dark:hover:bg-slate-600 transition-colors" aria-label="Copy code">
                                    {isCodeCopied ? <CheckIconSolid /> : <ClipboardIcon />}
                                </button>
                                <button onClick={handleShare} className="w-11 h-11 flex items-center justify-center bg-blue-50 dark:bg-slate-700 rounded-lg hover:bg-blue-100 dark:hover:bg-slate-600 transition-colors" aria-label="Share">
                                    <ShareIcon />
                                </button>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-slate-200 mb-3 animate-spring-in-up" style={{ animationDelay: '500ms'}}>Quick Actions</h2>
                        <div className="space-y-3">
                            {quickActions.map((action, index) => (
                                <ActionItem key={action.title} {...action} animationDelay={`${500 + (index + 1) * 100}ms`} />
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-slate-200 mb-3 animate-spring-in-up" style={{ animationDelay: '1200ms'}}>Account</h2>
                        <div className="space-y-3">
                             {accountActions.map((action, index) => (
                                <ActionItem key={action.title} {...action} animationDelay={`${1200 + (index + 1) * 100}ms`} />
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;