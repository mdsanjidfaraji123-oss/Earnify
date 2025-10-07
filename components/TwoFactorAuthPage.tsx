import React, { useState } from 'react';

interface TwoFactorAuthPageProps {
    onBack: () => void;
}

// --- Icons ---
const ArrowLeftIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const ShieldCheckIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a12.02 12.02 0 009 3c4.524 0 8.36-2.434 9.998-6.045A11.955 11.955 0 0117.618 7.984z" /></svg>);
const QrCodeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6.5 6.5v-1m-6.5 1h1m-1-1.5H5.636a1 1 0 01-1-1V15m6.5 6.5v-1m0-6.5H12M12 4h1m5.5 0h1m-1 1.5V7a1 1 0 00-1-1h-1.5m-6.5 0H12m0 6.5h1.5m0 0V12m0 0h-1.5m10.5 6.5h-1m-1.5 0h-1.5v-1.5m-6.5 1.5v-1.5M9 4v1.5M9 4H7a1 1 0 00-1 1v1.5m-1.5 9.5V18a1 1 0 001 1h1.5M4 12h1.5m0 0V9m0 0H4" /></svg>);
const KeyIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" /></svg>);
const ClipboardIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>);
const CheckIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>);

type SetupStep = 'disabled' | 'scan' | 'verify' | 'enabled';

const TwoFactorAuthPage: React.FC<TwoFactorAuthPageProps> = ({ onBack }) => {
    const [setupStep, setSetupStep] = useState<SetupStep>('disabled');
    const [verificationCode, setVerificationCode] = useState('');
    const [isKeyCopied, setIsKeyCopied] = useState(false);

    const setupKey = "ABCD EFGH IJKL MNOP";
    const recoveryCodes = ["1234-5678", "ABCD-EFGH", "IJKL-MNOP", "QRST-UVWX"];

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setIsKeyCopied(true);
        setTimeout(() => setIsKeyCopied(false), 2000);
    };

    const renderContent = () => {
        switch (setupStep) {
            case 'disabled':
                return (
                    <div className="text-center animate-fade-in">
                        <ShieldCheckIcon />
                        <h2 className="text-lg font-bold text-gray-800 dark:text-slate-200 mt-4">Enable Two-Factor Authentication</h2>
                        <p className="text-sm text-gray-600 dark:text-slate-400 mt-2">Protect your account from unauthorized access by requiring a second verification method.</p>
                        <button onClick={() => setSetupStep('scan')} className="mt-6 w-full py-3 px-4 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all">Enable 2FA</button>
                    </div>
                );
            case 'scan':
                return (
                    <div className="animate-fade-in space-y-5">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-slate-200">Step 1: Scan QR Code</h2>
                        <p className="text-sm text-gray-600 dark:text-slate-400">Use an authenticator app like Google Authenticator or Authy to scan the QR code below.</p>
                        <div className="p-4 bg-white rounded-lg inline-block mx-auto">
                            {/* Placeholder for QR Code */}
                            <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="#E5E7EB"/><text x="50" y="55" textAnchor="middle" fill="#9CA3AF" fontSize="12">QR CODE</text></svg>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-slate-400 text-center">Can't scan? Enter this key manually:</p>
                        <div className="flex items-center space-x-2">
                            <div className="flex-1 text-center border-2 border-dashed border-gray-300 rounded-lg p-3 text-gray-700 font-mono text-sm tracking-widest bg-gray-50/50 dark:text-slate-300 dark:bg-slate-700">{setupKey}</div>
                            <button onClick={() => handleCopy(setupKey)} className={`w-11 h-11 flex items-center justify-center rounded-lg transition-colors duration-300 ${isKeyCopied ? 'bg-green-100 dark:bg-green-500/10' : 'bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600'}`}>
                                {isKeyCopied ? <CheckIcon /> : <ClipboardIcon />}
                            </button>
                        </div>
                        <button onClick={() => setSetupStep('verify')} className="w-full py-3 px-4 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all">Next</button>
                    </div>
                );
            case 'verify':
                return (
                     <div className="animate-fade-in space-y-5">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-slate-200">Step 2: Verify Code</h2>
                        <p className="text-sm text-gray-600 dark:text-slate-400">Enter the 6-digit code from your authenticator app to complete the setup.</p>
                        <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} maxLength={6} className="w-full text-center text-2xl tracking-[0.5em] font-mono p-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-0" placeholder="_ _ _ _ _ _" />
                        <button onClick={() => setSetupStep('enabled')} disabled={verificationCode.length !== 6} className="w-full py-3 px-4 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all disabled:bg-gray-400">Verify & Enable</button>
                    </div>
                );
            case 'enabled':
                return (
                     <div className="animate-fade-in space-y-5">
                        <h2 className="text-lg font-bold text-green-600 dark:text-green-400 text-center">2FA Enabled Successfully!</h2>
                        <p className="text-sm text-gray-600 dark:text-slate-400">Please save these recovery codes in a safe place. They can be used to access your account if you lose your device.</p>
                        <div className="p-4 bg-gray-100 dark:bg-slate-700 rounded-lg space-y-2">
                            {recoveryCodes.map(code => <p key={code} className="font-mono text-center tracking-wider">{code}</p>)}
                        </div>
                        <button onClick={() => handleCopy(recoveryCodes.join('\n'))} className="w-full py-3 px-4 font-semibold text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition-all">Copy Codes</button>
                        <button onClick={() => setSetupStep('disabled')} className="w-full py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">Disable Two-Factor Authentication</button>
                    </div>
                );
        }
    };
    
    return (
        <div className="bg-[#F7F8FA] dark:bg-slate-900 min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="max-w-lg mx-auto p-4 sm:p-6 pb-20">
                <header className="flex items-center mb-6 relative">
                     <button onClick={setupStep === 'disabled' || setupStep === 'enabled' ? onBack : () => setSetupStep(prev => prev === 'verify' ? 'scan' : 'disabled')} className="p-2 rounded-full hover:bg-gray-200/80 dark:hover:bg-slate-700 transition-colors absolute left-0 z-10" aria-label="Go back">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-slate-200 text-center w-full">Two-Factor Authentication</h1>
                </header>

                <main className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default TwoFactorAuthPage;