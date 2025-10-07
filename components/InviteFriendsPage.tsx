import React, { useState, useMemo, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref, onValue, set } from 'firebase/database';

type Page = 'dashboard';

interface InviteFriendsPageProps {
    onNavigate: (page: Page) => void;
    onBack: () => void;
}

interface Referral {
    id: string;
    name: string;
    status: 'Joined' | 'Pending';
    reward: number;
    date: string;
    avatar: string;
}

// --- Icons (New, more modern set) ---
const ArrowLeftIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>);

const GiftIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1014.625 7.5H9.375A2.625 2.625 0 1012 4.875zM21 11.25H3" /></svg>);

const CopyIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>);

const CheckIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5 text-green-500" }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>);

const UsersIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);

const DollarIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182.979-.733 2.416-.733 3.395 0l.879.659m7.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);

const ShareIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.186 2.25 2.25 0 00-3.933 2.186z" /></svg>);

const UserPlusIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766z" /></svg>);

const StepGiftIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 00-1.635-1.634l-1.188-.648 1.188-.648a2.25 2.25 0 001.635-1.634l.648-1.188.648 1.188a2.25 2.25 0 001.635 1.634l1.188.648-1.188.648a2.25 2.25 0 00-1.635 1.634z" /></svg>);

const WhatsAppIcon = () => (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c0-5.445 4.42-9.865 9.864-9.865a9.864 9.864 0 019.865 9.864c0 5.445-4.42 9.865-9.865 9.865zm0-19.732c-5.445 0-9.864 4.42-9.864 9.865 0 1.742.457 3.425 1.325 4.887l-1.475 5.424 5.565-1.451a9.839 9.839 0 004.85 1.22c5.445 0 9.865-4.42 9.865-9.865s-4.42-9.865-9.865-9.865z"/></svg>);
const TelegramIcon = () => (<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.65 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.57c-.28 1.1-.94 1.36-1.76.86L14.25 16l-4.2 3.9c-.79.74-1.35.2-1.27-.85z"/></svg>);

const QrCodeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 15h.75v.75h-.75v-.75zM13.5 16.5h.75v.75h-.75v-.75zM13.5 18h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM15 13.5h.75v.75h-.75v-.75zM15 15h.75v.75h-.75v-.75zM15 16.5h.75v.75h-.75v-.75zM15 18h.75v.75h-.75v-.75zM15 19.5h.75v.75h-.75v-.75zM16.5 13.5h.75v.75h-.75v-.75zM16.5 15h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75zM16.5 18h.75v.75h-.75v-.75zM16.5 19.5h.75v.75h-.75v-.75zM18 13.5h.75v.75h-.75v-.75zM18 15h.75v.75h-.75v-.75zM18 16.5h.75v.75h-.75v-.75zM18 18h.75v.75h-.75v-.75zM18 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 15h.75v.75h-.75v-.75zM19.5 16.5h.75v.75h-.75v-.75zM19.5 18h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75z" /></svg>);

const milestones = [
    { threshold: 5, reward: 250 },
    { threshold: 15, reward: 500 },
    { threshold: 30, reward: 1000 },
    { threshold: 50, reward: 2500 },
];

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-64">
        <svg className="animate-spin h-8 w-8 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);


// --- Sub-components ---
const StatsCard: React.FC<{icon: React.ReactNode; label: string; value: string | number}> = ({ icon, label, value }) => (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm flex items-center space-x-3">
        <div className="bg-gray-100 dark:bg-slate-700 p-3 rounded-lg text-gray-600 dark:text-slate-300">{icon}</div>
        <div>
            <p className="text-sm text-gray-500 dark:text-slate-400">{label}</p>
            <p className="text-lg font-bold text-gray-800 dark:text-slate-200">{value}</p>
        </div>
    </div>
);

const RewardsRoadmap: React.FC<{ totalReferrals: number }> = ({ totalReferrals }) => {
    const { nextMilestone, progressPercent, referralsNeeded } = useMemo(() => {
        const nextMilestoneIndex = milestones.findIndex(m => totalReferrals < m.threshold);
        const nextMilestone = nextMilestoneIndex !== -1 ? milestones[nextMilestoneIndex] : null;

        if (!nextMilestone) {
            return { nextMilestone: null, progressPercent: totalReferrals >= milestones[milestones.length - 1].threshold ? 100 : 0, referralsNeeded: 0 };
        }

        const previousMilestone = nextMilestoneIndex > 0 ? milestones[nextMilestoneIndex - 1] : { threshold: 0 };
        const startingPoint = previousMilestone.threshold;
        
        const totalInRange = nextMilestone.threshold - startingPoint;
        const currentInRange = totalReferrals - startingPoint;
        const progressPercent = (currentInRange / totalInRange) * 100;
        const referralsNeeded = nextMilestone.threshold - totalReferrals;
        
        return { nextMilestone, progressPercent, referralsNeeded };
    }, [totalReferrals]);

    return (
        <div className="space-y-6">
            {/* 1. Next Goal Focus */}
            {nextMilestone ? (
                <div className="bg-blue-50 dark:bg-slate-700/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center text-sm mb-2">
                        <p className="font-semibold text-blue-800 dark:text-blue-300">
                            Next Reward: +{nextMilestone.reward} Points
                        </p>
                        <p className="font-bold text-blue-600 dark:text-blue-400">
                            {referralsNeeded} more to go!
                        </p>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2.5">
                        <div 
                            className="bg-blue-500 h-2.5 rounded-full transition-all duration-500" 
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>
            ) : (
                 <div className="bg-green-50 dark:bg-green-900/50 p-4 rounded-lg text-center">
                    <p className="font-semibold text-green-800 dark:text-green-300">
                        🎉 You've unlocked all milestone rewards!
                    </p>
                 </div>
            )}
            
            {/* 2. Visual Roadmap */}
            <div className="relative">
                <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-slate-600 -translate-x-1/2" aria-hidden="true" />
                
                <div className="space-y-8">
                    {milestones.map((milestone) => {
                        const isCompleted = totalReferrals >= milestone.threshold;
                        const isNextTarget = nextMilestone?.threshold === milestone.threshold;

                        return (
                            <div key={milestone.threshold} className="relative flex items-center">
                                {/* Marker */}
                                <div className="absolute left-5 -translate-x-1/2 z-10">
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300
                                        ${isCompleted ? 'bg-blue-500 border-blue-500' : ''}
                                        ${isNextTarget ? 'bg-white dark:bg-slate-900 border-blue-500 ring-4 ring-blue-500/30' : ''}
                                        ${!isCompleted && !isNextTarget ? 'bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600' : ''}
                                    `}>
                                        {isCompleted && <CheckIcon className="w-2.5 h-2.5 text-white" />}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className={`ml-12 p-4 rounded-lg w-full transition-all duration-300
                                    ${isNextTarget ? 'bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-blue-500/30' : 'bg-white dark:bg-slate-800'}
                                    ${isCompleted ? 'opacity-80' : ''}
                                `}>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className={`font-bold ${isNextTarget ? 'text-blue-700 dark:text-blue-300' : 'text-gray-800 dark:text-slate-200'}`}>
                                                {milestone.threshold} Referrals
                                            </p>
                                            <p className="text-sm font-semibold text-gray-500 dark:text-slate-400">
                                                Reward: +{milestone.reward} Points
                                            </p>
                                        </div>
                                        {isCompleted && (
                                            <div className="flex items-center space-x-2 text-sm font-semibold text-green-600 dark:text-green-400">
                                                <CheckIcon className="w-5 h-5" />
                                                <span>Claimed</span>
                                            </div>
                                        )}
                                   </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};


const HowItWorksStep: React.FC<{icon: React.ReactNode; title: string; description: string; isLast?: boolean;}> = ({ icon, title, description, isLast = false }) => (
    <div className="flex">
        <div className="flex flex-col items-center mr-4">
            <div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400">
                    {icon}
                </div>
            </div>
            {!isLast && <div className="w-px h-full bg-gray-200 dark:bg-slate-600" />}
        </div>
        <div className="pb-8">
            <p className="mb-1 text-md font-bold text-gray-800 dark:text-slate-200">{title}</p>
            <p className="text-sm text-gray-600 dark:text-slate-400">{description}</p>
        </div>
    </div>
);

const ReferralHistoryItem: React.FC<{referral: Referral}> = ({ referral }) => (
    <div className="flex items-center justify-between text-sm p-3 bg-white dark:bg-slate-800 rounded-lg">
        <div className="flex items-center">
            <img src={referral.avatar} alt={referral.name} className="w-10 h-10 rounded-full" />
            <div className="ml-3">
                <p className="font-semibold text-gray-800 dark:text-slate-200">{referral.name}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Joined: {new Date(referral.date).toLocaleDateString()}</p>
            </div>
        </div>
        <div className="flex items-center space-x-4">
            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${referral.status === 'Joined' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'}`}>{referral.status}</span>
            <p className={`font-bold w-16 text-right ${referral.reward > 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-slate-500'}`}>{referral.reward > 0 ? `+${referral.reward} pts` : '-'}</p>
        </div>
    </div>
);

const InviteFriendsPage: React.FC<InviteFriendsPageProps> = ({ onBack }) => {
    const [isCodeCopied, setIsCodeCopied] = useState(false);
    const [isLinkCopied, setIsLinkCopied] = useState(false);
    const [referralCode, setReferralCode] = useState('');
    const [referralHistory, setReferralHistory] = useState<Referral[]>([]);
    const [stats, setStats] = useState({ referrals: 0, earnings: 0 });
    const [isLoading, setIsLoading] = useState(true);

    const userId = 'user123';
    
    useEffect(() => {
        setIsLoading(true);
        const profileRef = ref(database, `users/${userId}/profile`);
        const referralsRef = ref(database, `users/${userId}/referrals`);
    
        const unsubscribeProfile = onValue(profileRef, (snapshot) => {
            const data = snapshot.val();
            if (data && data.referralCode) {
                setReferralCode(data.referralCode);
            } else {
                set(ref(database, `users/${userId}/profile/referralCode`), 'MDSANJID123');
            }
        });
    
        const unsubscribeReferrals = onValue(referralsRef, async (snapshot) => {
            if (!snapshot.exists()) {
                const mockReferrals = {
                    'ref1': { name: 'John D.', status: 'Joined', reward: 100, date: '2023-10-25T10:00:00Z', avatar: 'https://i.pravatar.cc/100?u=john-d' },
                    'ref2': { name: 'Samantha L.', status: 'Joined', reward: 100, date: '2023-10-22T14:30:00Z', avatar: 'https://i.pravatar.cc/100?u=samantha-l' },
                    'ref3': { name: 'Mike T.', status: 'Pending', reward: 0, date: '2023-10-21T09:15:00Z', avatar: 'https://i.pravatar.cc/100?u=mike-t' },
                };
                await set(referralsRef, mockReferrals);
            } else {
                const data = snapshot.val();
                const historyList: Referral[] = Object.keys(data).map(key => ({ id: key, ...data[key] })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                
                setReferralHistory(historyList);
                
                const joinedReferralsCount = historyList.filter(r => r.status === 'Joined').length;
                setStats({
                    referrals: historyList.length,
                    earnings: joinedReferralsCount * 1.00
                });

                await set(ref(database, `users/${userId}/stats/referrals`), historyList.length);
            }
            setIsLoading(false);
        });
    
        return () => {
            unsubscribeProfile();
            unsubscribeReferrals();
        };
    }, [userId]);

    const referralLink = useMemo(() => referralCode ? `https://earnify.com/ref/${referralCode}` : '', [referralCode]);

    const handleCopy = (text: string, type: 'code' | 'link') => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        if (type === 'code') {
            setIsCodeCopied(true);
            setTimeout(() => setIsCodeCopied(false), 2000);
        } else {
            setIsLinkCopied(true);
            setTimeout(() => setIsLinkCopied(false), 2000);
        }
    };

    const handleNativeShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Join me on Earnify!',
                text: `Join me on Earnify and get a 100 Point bonus! Use my link to sign up:`,
                url: referralLink,
            }).catch(console.error);
        }
    };
    
    const shareText = `Join me on Earnify and get a 100 Point bonus! Use my link: ${referralLink}`;

    return (
        <div className="bg-[#F7F8FA] dark:bg-slate-900 min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="max-w-lg mx-auto p-4 sm:p-6 pb-20">
                <header className="flex items-center mb-6 relative">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200/80 dark:hover:bg-slate-700 transition-colors absolute left-0 z-10" aria-label="Back to dashboard">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-slate-200 text-center w-full">Invite Friends</h1>
                </header>
                <main className="space-y-8">
                    {isLoading ? <LoadingSpinner /> : (
                        <>
                            <section className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 text-white text-center shadow-lg shadow-purple-500/20 animate-fade-in-up">
                                <div className="flex justify-center mb-3"><GiftIcon /></div>
                                <h2 className="text-2xl font-bold">Invite & Earn Big!</h2>
                                <p className="text-sm opacity-90 mt-2 max-w-xs mx-auto">You and your friend will each receive <span className="font-bold text-yellow-300">100 Bonus Points!</span></p>
                            </section>
                            
                            <section className="grid grid-cols-2 gap-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                                <StatsCard icon={<UsersIcon />} label="Your Referrals" value={stats.referrals} />
                                <StatsCard icon={<DollarIcon />} label="Total Earnings" value={`$${stats.earnings.toFixed(2)}`} />
                            </section>

                            <section className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-5 space-y-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                                <h3 className="font-bold text-gray-800 dark:text-slate-200 text-center">Share Your Link</h3>
                                <div className="flex items-center space-x-2">
                                   {/* Placeholder for QR Code */}
                                   <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg"><QrCodeIcon /></div>
                                   <div className="flex-1 space-y-2">
                                        <div className="flex items-center bg-slate-100 dark:bg-slate-700 rounded-lg">
                                            <span className="font-mono text-sm text-blue-600 dark:text-blue-400 p-3 flex-1 truncate">{referralLink}</span>
                                            <button onClick={() => handleCopy(referralLink, 'link')} className="p-2 mr-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                                                {isLinkCopied ? <CheckIcon /> : <CopyIcon />}
                                            </button>
                                        </div>
                                         <div className="flex items-center bg-slate-100 dark:bg-slate-700 rounded-lg">
                                            <span className="font-mono text-sm text-purple-600 dark:text-purple-400 p-3">{referralCode}</span>
                                            <button onClick={() => handleCopy(referralCode, 'code')} className="ml-auto p-2 mr-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                                                {isCodeCopied ? <CheckIcon /> : <CopyIcon />}
                                            </button>
                                        </div>
                                   </div>
                                </div>
                                <div className="grid grid-cols-3 gap-2 pt-2">
                                     <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors font-semibold text-gray-700 dark:text-slate-300"><WhatsAppIcon /></a>
                                    <a href={`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center space-x-2 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors font-semibold text-gray-700 dark:text-slate-300"><TelegramIcon /></a>
                                    <button onClick={handleNativeShare} className="flex items-center justify-center space-x-2 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors font-semibold text-gray-700 dark:text-slate-300"><ShareIcon /><span>More</span></button>
                                </div>
                            </section>

                            <section className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-5 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                                <h3 className="font-bold text-gray-800 dark:text-slate-200 text-center mb-2">Rewards Roadmap</h3>
                                <p className="text-xs text-center text-gray-500 dark:text-slate-400 mb-6">Earn bigger bonuses as you invite more friends!</p>
                                <RewardsRoadmap totalReferrals={stats.referrals} />
                            </section>
                            
                            <section className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-slate-200 mb-3">How It Works</h3>
                                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-5">
                                    <HowItWorksStep icon={<ShareIcon />} title="1. Share Your Link" description="Send your unique code or link to your friends." />
                                    <HowItWorksStep icon={<UserPlusIcon />} title="2. Friend Signs Up" description="Your friend creates an account using your link." />
                                    <HowItWorksStep icon={<StepGiftIcon />} title="3. You Both Earn!" description="Once they complete their first task, you both get bonus points." isLast />
                                </div>
                            </section>
                            
                            <section className="animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-slate-200 mb-3">Your Referrals ({referralHistory.length})</h3>
                                <div className="space-y-2">
                                   {referralHistory.map((ref) => <ReferralHistoryItem key={ref.id} referral={ref} />)}
                                </div>
                            </section>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default InviteFriendsPage;
