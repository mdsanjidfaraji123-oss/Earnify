import React, { useState } from 'react';

interface NotificationSettingsPageProps {
    onBack: () => void;
}

// --- Icons ---
const ArrowLeftIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const SurveyIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>);
const TaskIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>);
const WalletIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>);
const MegaphoneIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.875 9.168-5" /></svg>);

// --- Reusable Components ---
const ToggleSwitch: React.FC<{ enabled: boolean; onChange: (enabled: boolean) => void; disabled?: boolean; }> = ({ enabled, onChange, disabled = false }) => (
    <button type="button" disabled={disabled} className={`${enabled ? 'bg-blue-600' : 'bg-gray-200 dark:bg-slate-600'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`} role="switch" aria-checked={enabled} onClick={() => !disabled && onChange(!enabled)}>
        <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
    </button>
);

const SettingsGroup: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-slate-400 px-4 pt-4 pb-2">{title}</h3>
        <div className="divide-y divide-gray-100 dark:divide-slate-700">
            {children}
        </div>
    </div>
);

// Fix: Made the 'icon' prop optional as it's not used when 'isMaster' is true.
const SettingsToggle: React.FC<{ icon?: React.ReactNode; title: string; description?: string; enabled: boolean; onChange: (enabled: boolean) => void; disabled?: boolean; isMaster?: boolean; }> = ({ icon, title, description, enabled, onChange, disabled = false, isMaster = false }) => (
    <div className={`flex items-center p-4 ${disabled ? 'opacity-60' : ''} ${isMaster ? '' : 'pl-6'}`}>
        {!isMaster && (
            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-gray-600 dark:text-slate-300">
                {icon}
            </div>
        )}
        <div className={`flex-grow ${isMaster ? '' : 'ml-3'}`}>
            <p className="font-semibold text-gray-800 dark:text-slate-200">{title}</p>
            {description && <p className="text-xs text-gray-500 dark:text-slate-400">{description}</p>}
        </div>
        <div className="ml-4 flex-shrink-0">
            <ToggleSwitch enabled={enabled} onChange={onChange} disabled={disabled} />
        </div>
    </div>
);

const NotificationSettingsPage: React.FC<NotificationSettingsPageProps> = ({ onBack }) => {
    // Push notifications state
    const [pushAll, setPushAll] = useState(true);
    const [pushSurveys, setPushSurveys] = useState(true);
    const [pushTasks, setPushTasks] = useState(true);
    const [pushWithdrawals, setPushWithdrawals] = useState(true);
    const [pushOffers, setPushOffers] = useState(false);

    // Email notifications state
    const [emailAll, setEmailAll] = useState(true);
    const [emailSurveys, setEmailSurveys] = useState(true);
    const [emailWithdrawals, setEmailWithdrawals] = useState(true);
    const [emailOffers, setEmailOffers] = useState(true);

    return (
        <div className="bg-[#F7F8FA] dark:bg-slate-900 min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="max-w-lg mx-auto p-4 sm:p-6 pb-20">
                <header className="flex items-center mb-6 relative">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200/80 dark:hover:bg-slate-700 transition-colors absolute left-0 z-10" aria-label="Go back">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-slate-200 text-center w-full">Notifications</h1>
                </header>
                <main className="space-y-6">
                    <SettingsGroup title="Push Notifications">
                        <SettingsToggle isMaster title="Allow Push Notifications" enabled={pushAll} onChange={setPushAll} />
                        <SettingsToggle icon={<SurveyIcon />} title="New Surveys" description="Get notified for new relevant surveys" enabled={pushSurveys} onChange={setPushSurveys} disabled={!pushAll} />
                        <SettingsToggle icon={<TaskIcon />} title="Task Updates" description="Reminders for daily tasks and streaks" enabled={pushTasks} onChange={setPushTasks} disabled={!pushAll} />
                        <SettingsToggle icon={<WalletIcon />} title="Withdrawal Status" description="Updates on your payment requests" enabled={pushWithdrawals} onChange={setPushWithdrawals} disabled={!pushAll} />
                        <SettingsToggle icon={<MegaphoneIcon />} title="Announcements & Offers" description="Platform news and special promotions" enabled={pushOffers} onChange={setPushOffers} disabled={!pushAll} />
                    </SettingsGroup>
                    <SettingsGroup title="Email Notifications">
                         <SettingsToggle isMaster title="Allow Email Notifications" enabled={emailAll} onChange={setEmailAll} />
                        <SettingsToggle icon={<SurveyIcon />} title="New Surveys Digest" description="Weekly summary of available surveys" enabled={emailSurveys} onChange={setEmailSurveys} disabled={!emailAll} />
                        <SettingsToggle icon={<WalletIcon />} title="Withdrawal Confirmations" description="Receive an email for every transaction" enabled={emailWithdrawals} onChange={setEmailWithdrawals} disabled={!emailAll} />
                        <SettingsToggle icon={<MegaphoneIcon />} title="Newsletter & Offers" description="Occasional news and partner offers" enabled={emailOffers} onChange={setEmailOffers} disabled={!emailAll} />
                    </SettingsGroup>
                </main>
            </div>
        </div>
    );
};

export default NotificationSettingsPage;
