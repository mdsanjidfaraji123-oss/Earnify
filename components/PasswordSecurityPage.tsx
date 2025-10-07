import React, { useState, useEffect } from 'react';

type Page = 'twoFactorAuth';

interface PasswordSecurityPageProps {
    onBack: () => void;
    onNavigate: (page: Page) => void;
}

// --- Icons ---
const ArrowLeftIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>);
const EyeOffIcon: React.FC<{ className?: string }> = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a10.05 10.05 0 013.132-5.125m5.942.543A3 3 0 109.875 9.875m7.5 2.125c.382-.48.724-.99.998-1.525A10.025 10.025 0 0012 5c-.98 0-1.927.18-2.828.515" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1l22 22" /></svg>);
const CheckIcon = () => (<svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>);
const CrossIcon = () => (<svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>);
const SpinnerIcon = () => (<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>);

// --- Reusable Components ---
const SettingsGroup: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-5">
        <h3 className="text-lg font-bold text-gray-800 dark:text-slate-200 mb-4">{title}</h3>
        {children}
    </div>
);

const PasswordInput: React.FC<{ id: string; placeholder: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; onToggleVisibility: () => void; isVisible: boolean; showIndicator?: React.ReactNode; }> = ({ id, placeholder, value, onChange, onToggleVisibility, isVisible, showIndicator }) => (
    <div className="group flex items-center bg-gray-100/70 dark:bg-slate-700 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300">
        <input type={isVisible ? 'text' : 'password'} id={id} required className="flex-1 px-4 py-3 w-full bg-transparent focus:outline-none" placeholder={placeholder} value={value} onChange={onChange} />
        <div className="flex items-center pr-2">
            {showIndicator}
            <button type="button" onClick={onToggleVisibility} className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-0" aria-label={isVisible ? "Hide password" : "Show password"}>
                {isVisible ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
        </div>
    </div>
);

const PasswordSecurityPage: React.FC<PasswordSecurityPageProps> = ({ onBack, onNavigate }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [strength, setStrength] = useState(0);
    const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    
    // This would typically come from an API
    const is2faEnabled = false;

    useEffect(() => {
        let score = 0;
        if (newPassword.length >= 8) score++;
        if (/[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword)) score++;
        if (/\d/.test(newPassword)) score++;
        if (/[^a-zA-Z0-9]/.test(newPassword)) score++;
        setStrength(score);
    }, [newPassword]);

    useEffect(() => {
        if (confirmPassword.length > 0) {
            setPasswordsMatch(newPassword === confirmPassword);
        } else {
            setPasswordsMatch(null);
        }
    }, [newPassword, confirmPassword]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!passwordsMatch || strength < 2) return;
        setIsSaving(true);
        setSaveSuccess(false);
        setTimeout(() => {
            setIsSaving(false);
            setSaveSuccess(true);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setTimeout(() => setSaveSuccess(false), 3000);
        }, 1500);
    };

    const strengthColors = ['bg-gray-300', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];

    return (
        <div className="bg-[#F7F8FA] dark:bg-slate-900 min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="max-w-lg mx-auto p-4 sm:p-6 pb-20">
                <header className="flex items-center mb-6 relative">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200/80 dark:hover:bg-slate-700 transition-colors absolute left-0 z-10" aria-label="Go back">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-slate-200 text-center w-full">Password & Security</h1>
                </header>

                <main className="space-y-6">
                    <SettingsGroup title="Change Password">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="current-password" className="text-sm font-semibold text-gray-700 dark:text-slate-300">Current Password</label>
                                <PasswordInput id="current-password" placeholder="••••••••" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} onToggleVisibility={() => setShowCurrent(!showCurrent)} isVisible={showCurrent} />
                            </div>
                            <div>
                                <label htmlFor="new-password" className="text-sm font-semibold text-gray-700 dark:text-slate-300">New Password</label>
                                <PasswordInput id="new-password" placeholder="New password" value={newPassword} onChange={e => setNewPassword(e.target.value)} onToggleVisibility={() => setShowNew(!showNew)} isVisible={showNew} />
                                {newPassword.length > 0 && (
                                    <div className="flex items-center space-x-2 mt-2">
                                        <div className="flex-1 flex space-x-1">
                                            {[...Array(4)].map((_, i) => (
                                                <div key={i} className={`h-1.5 rounded-full flex-1 transition-colors ${strength > i ? strengthColors[i+1] : 'bg-gray-200 dark:bg-slate-600'}`}></div>
                                            ))}
                                        </div>
                                        <span className="text-xs font-medium text-gray-500 dark:text-slate-400 w-12 text-right">{strength > 0 ? strengthLabels[strength-1] : ''}</span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="text-sm font-semibold text-gray-700 dark:text-slate-300">Confirm New Password</label>
                                <PasswordInput id="confirm-password" placeholder="Confirm password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} onToggleVisibility={() => setShowConfirm(!showConfirm)} isVisible={showConfirm} showIndicator={passwordsMatch === true ? <CheckIcon /> : passwordsMatch === false ? <CrossIcon /> : null} />
                            </div>
                            <div className="pt-2">
                                <button type="submit" disabled={isSaving || !passwordsMatch || strength < 2} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                    {isSaving ? <SpinnerIcon /> : 'Save Changes'}
                                </button>
                                {saveSuccess && <p className="text-green-600 text-sm mt-2 text-center">Password updated successfully!</p>}
                            </div>
                        </form>
                    </SettingsGroup>

                    <SettingsGroup title="Two-Factor Authentication">
                        <div className="flex items-center p-2">
                            <div className="flex-grow">
                                <p className="font-semibold text-gray-800 dark:text-slate-200">
                                    Status: <span className={is2faEnabled ? "text-green-600" : "text-red-500"}>{is2faEnabled ? "Enabled" : "Disabled"}</span>
                                </p>
                                <p className="text-sm text-gray-500 dark:text-slate-400">Add an extra layer of security to your account.</p>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                                <button onClick={() => onNavigate('twoFactorAuth')} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                                    Manage
                                </button>
                            </div>
                        </div>
                    </SettingsGroup>
                    
                     <SettingsGroup title="Active Sessions">
                        <ul className="space-y-2 text-sm">
                            <li className="flex justify-between items-center p-2">
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-slate-200">Chrome on Windows</p>
                                    <p className="text-gray-500 dark:text-slate-400">New York, USA</p>
                                </div>
                                <span className="font-medium text-green-600">Active now</span>
                            </li>
                            <li className="flex justify-between items-center p-2">
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-slate-200">Safari on iPhone</p>
                                    <p className="text-gray-500 dark:text-slate-400">New York, USA</p>
                                </div>
                                <span className="text-gray-500 dark:text-slate-400">2 hours ago</span>
                            </li>
                        </ul>
                         <div className="pt-4 mt-2 border-t border-gray-100 dark:border-slate-700">
                             <button className="w-full text-sm font-semibold text-red-600 dark:text-red-400 text-center py-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg">
                                Log out from all other devices
                             </button>
                         </div>
                    </SettingsGroup>
                </main>
            </div>
        </div>
    );
};

export default PasswordSecurityPage;