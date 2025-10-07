import React, { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref, onValue } from 'firebase/database';

type Page = 'dashboard' | 'myProfile' | 'helpAndSupport' | 'privacyPolicy' | 'termsAndConditions' | 'transactionHistory' | 'notificationSettings' | 'passwordSecurity' | 'leaderboard';

interface SettingsPageProps {
    onNavigate: (page: Page) => void;
    onBack: () => void;
    isDarkMode: boolean;
    toggleDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    onLogout: () => void;
}

interface ProfileData {
    fullName: string;
    email: string;
}

// --- Icons ---
const ArrowLeftIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const HistoryIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const LockClosedIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>);
const PaintBrushIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>);
const BellIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>);
const QuestionMarkCircleIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const ShieldCheckIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a12.02 12.02 0 009 3c4.524 0 8.36-2.434 9.998-6.045A11.955 11.955 0 0117.618 7.984z" /></svg>);
const DocumentTextIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>);
const LogoutIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>);
const ChevronRightIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>);
const SearchIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>);

// --- Reusable Components ---
const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void; }> = ({ enabled, onChange }) => (
    <button type="button" className={`${enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-slate-600'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`} role="switch" aria-checked={enabled} onClick={() => onChange(!enabled)}>
        <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
    </button>
);
const SettingsGroup: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <section>
        <h3 className="text-sm font-bold text-gray-500 dark:text-slate-400 px-4 pb-2 uppercase tracking-wider">{title}</h3>
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden divide-y divide-gray-100 dark:divide-slate-700">
            {children}
        </div>
    </section>
);
const SettingsLink: React.FC<{ icon: React.ReactNode; title: string; onClick: () => void; }> = ({ icon, title, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center p-4 text-left hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-gray-500 dark:text-slate-400">{icon}</div>
        <div className="ml-3 flex-grow"><p className="font-semibold text-gray-800 dark:text-slate-200">{title}</p></div>
        <div className="text-gray-400"><ChevronRightIcon /></div>
    </button>
);
const SettingsToggle: React.FC<{ icon: React.ReactNode; title: string; enabled: boolean; onChange: (enabled: boolean) => void; }> = ({ icon, title, enabled, onChange }) => (
    <div className="flex items-center p-4">
        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-gray-500 dark:text-slate-400">{icon}</div>
        <div className="ml-3 flex-grow"><p className="font-semibold text-gray-800 dark:text-slate-200">{title}</p></div>
        <div className="ml-4 flex-shrink-0"><ToggleSwitch enabled={enabled} onChange={onChange} /></div>
    </div>
);

const SettingsPage: React.FC<SettingsPageProps> = ({ onBack, isDarkMode, toggleDarkMode, onNavigate, onLogout }) => {
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const userId = 'user123';

    useEffect(() => {
        const profileRef = ref(database, `users/${userId}/profile`);
        const unsubscribe = onValue(profileRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setProfileData(data);
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, [userId]);

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account? This action is permanent and cannot be undone.")) {
            onLogout();
        }
    };

    return (
        <div className="bg-[#F7F8FA] dark:bg-slate-900 min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="max-w-lg mx-auto p-4 sm:p-6 pb-20">
                <header className="flex items-center mb-6 relative">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200/80 dark:hover:bg-slate-700 transition-colors absolute left-0 z-10" aria-label="Go back">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-slate-200 text-center w-full">Settings</h1>
                </header>

                <main className="space-y-8">
                    {isLoading ? (
                        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 animate-pulse flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
                            </div>
                        </div>
                    ) : (
                        <button onClick={() => onNavigate('myProfile')} className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 flex items-center space-x-4 text-left hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors animate-fade-in-up">
                            <img className="w-16 h-16 rounded-full" src="https://i.pravatar.cc/150?u=md-sanjid-faraji" alt="User Avatar" />
                            <div className="flex-1">
                                <p className="font-bold text-lg text-gray-900 dark:text-slate-100">{profileData?.fullName}</p>
                                <p className="text-sm text-gray-500 dark:text-slate-400">{profileData?.email}</p>
                            </div>
                            <div className="text-gray-400"><ChevronRightIcon /></div>
                        </button>
                    )}

                    <div className="relative animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><SearchIcon className="text-gray-400"/></div>
                        <input type="search" placeholder="Search settings..." className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 text-sm rounded-xl shadow-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        <SettingsGroup title="Account & Security">
                            <SettingsLink icon={<LockClosedIcon />} title="Password & Security" onClick={() => onNavigate('passwordSecurity')} />
                            <SettingsLink icon={<HistoryIcon />} title="Transaction History" onClick={() => onNavigate('transactionHistory')} />
                        </SettingsGroup>

                        <SettingsGroup title="Preferences">
                            <SettingsToggle icon={<PaintBrushIcon />} title="Dark Mode" enabled={isDarkMode} onChange={toggleDarkMode} />
                            <SettingsLink icon={<BellIcon />} title="Notifications" onClick={() => onNavigate('notificationSettings')} />
                        </SettingsGroup>
                        
                        <SettingsGroup title="Support & Legal">
                            <SettingsLink icon={<QuestionMarkCircleIcon />} title="Help & Support" onClick={() => onNavigate('helpAndSupport')} />
                            <SettingsLink icon={<ShieldCheckIcon />} title="Privacy Policy" onClick={() => onNavigate('privacyPolicy')} />
                            <SettingsLink icon={<DocumentTextIcon />} title="Terms & Conditions" onClick={() => onNavigate('termsAndConditions')} />
                        </SettingsGroup>
                    </div>

                    <div className="pt-4 space-y-3 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                        <button onClick={onLogout} className="w-full flex items-center justify-center p-3 text-sm font-semibold text-blue-600 bg-blue-100/60 dark:bg-blue-900/40 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-lg transition-colors">
                            <LogoutIcon />
                            <span className="ml-3">Logout</span>
                        </button>
                        <button onClick={handleDeleteAccount} className="w-full text-sm font-semibold text-red-600 dark:text-red-400 py-2 text-center hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg">
                            Delete Account
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SettingsPage;
