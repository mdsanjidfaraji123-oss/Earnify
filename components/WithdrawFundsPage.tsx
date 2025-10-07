import React, { useState, useMemo, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref, onValue, set, push } from 'firebase/database';

type Page = 'dashboard' | 'transactionHistory';

interface WithdrawFundsPageProps {
    onNavigate: (page: Page) => void;
    onBack: () => void;
}

// --- Icons ---
const ArrowLeftIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);
const HistoryIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
);
const PayPalIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.057,5.432c0,0-0.126,0.736-0.063,1.058c0.391,2.02,2.12,3.228,4.338,3.228h1.261c2.219,0,3.34-1.39,3.694-3.102c0.202-0.985-0.315-1.744-1.135-1.744H9.63C8.406,5.127,7.057,5.432,7.057,5.432z M6.072,18.455c0.113,0.666,0.629,0.924,1.261,0.924h0.63c0.63,0,0.946-0.252,1.135-0.924l2.12-11.233H8.385L6.072,18.455z M16.035,8.136c-0.342,0-0.657,0.22-0.788,0.568l-2.459,9.757c-0.126,0.666,0.347,1.009,0.977,1.009h2.12c0.504,0,0.883-0.252,1.009-0.892l0.473-2.396c0.126-0.666-0.315-1.009-0.977-1.009h-1.64l0.473-2.365c0.189-0.819,0.851-1.072,1.671-1.072h1.103c0.914,0,1.355-0.536,1.198-1.549l-0.568-3.134c-0.158-0.883-0.819-1.42-1.765-1.42H16.035z"/>
    </svg>
);
const BankIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6.375a.375.375 0 01.375.375v1.5a.375.375 0 01-.375.375H9a.375.375 0 01-.375-.375v-1.5A.375.375 0 019 6.75zM9 12.75h6.375a.375.375 0 01.375.375v1.5a.375.375 0 01-.375.375H9a.375.375 0 01-.375-.375v-1.5a.375.375 0 01.375-.375z" />
    </svg>
);
const BkashIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={`h-6 w-6 ${className}`} viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M24.787 5.201c-3.896-1.554-8.157-1.129-11.668 1.157-5.833 3.799-7.994 10.775-5.918 16.963 1.482 4.319 4.965 7.615 9.422 8.526 5.253 1.15 10.375-.858 13.435-5.978C32.384 25.132 30.73 17.58 24.787 5.201zM16.92 21.938c-2.197 1.472-5.046 1.057-6.518-1.146s-1.057-5.046 1.146-6.518c2.197-1.472 5.046-1.057 6.518 1.146C19.538 17.617 19.113 20.466 16.92 21.938z"/>
    </svg>
);
const NagadIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={`h-6 w-6 ${className}`} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3.5 15V7h2v5.3l3.4-5.3h2.1V17h-2v-5.3L9.6 17H6.5z"/>
    </svg>
);
const SpinnerIcon: React.FC = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
const CheckCircleIcon: React.FC = () => (
    <div className="w-16 h-16 mx-auto">
        <svg className="w-full h-full text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" className="animate-check-draw" />
        </svg>
    </div>
);

type MethodId = 'paypal' | 'bkash' | 'nagad' | 'bank';

const WithdrawFundsPage: React.FC<WithdrawFundsPageProps> = ({ onNavigate, onBack }) => {
    const [amount, setAmount] = useState('');
    const [selectedMethod, setSelectedMethod] = useState<MethodId | null>(null);
    const [bankDetails, setBankDetails] = useState({
        accountHolder: '',
        accountNumber: '',
        bankName: '',
    });
    const [availableBalance, setAvailableBalance] = useState<number | null>(null);
    const minimumWithdrawal = 5.00;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const userId = 'user123'; // Static user ID for demonstration

    useEffect(() => {
        const balanceRef = ref(database, `users/${userId}/balance`);
        const unsubscribe = onValue(balanceRef, (snapshot) => {
            const data = snapshot.val();
            setAvailableBalance(data !== null ? data : 0);
        });
        return () => unsubscribe();
    }, [userId]);

    const paymentMethods: { id: MethodId; name: string; icon: React.ReactNode; }[] = [
        { id: 'paypal', name: 'PayPal', icon: <PayPalIcon className="text-gray-700 dark:text-slate-300" /> },
        { id: 'bkash', name: 'bKash', icon: <BkashIcon className="text-gray-700 dark:text-slate-300" /> },
        { id: 'nagad', name: 'Nagad', icon: <NagadIcon className="text-gray-700 dark:text-slate-300" /> },
        { id: 'bank', name: 'Bank Transfer', icon: <BankIcon className="text-gray-700 dark:text-slate-300" /> },
    ];
    
    const withdrawalAmount = useMemo(() => parseFloat(amount) || 0, [amount]);
    const transactionFee = useMemo(() => {
        if (withdrawalAmount === 0) return 0;
        const rate = selectedMethod === 'paypal' || selectedMethod === 'bank' ? 0.02 : 0.015;
        return withdrawalAmount * rate;
    }, [withdrawalAmount, selectedMethod]);
    const amountToReceive = useMemo(() => withdrawalAmount - transactionFee, [withdrawalAmount, transactionFee]);
    
    const isFormValid = useMemo(() => {
        if (availableBalance === null || !amount || !selectedMethod || withdrawalAmount < minimumWithdrawal || withdrawalAmount > availableBalance) {
            return false;
        }
        if (selectedMethod === 'bank') {
            return bankDetails.accountNumber.trim() !== '' && bankDetails.accountHolder.trim() !== '' && bankDetails.bankName.trim() !== '';
        }
        return true;
    }, [amount, selectedMethod, withdrawalAmount, availableBalance, bankDetails, minimumWithdrawal]);

    const handleQuickAmount = (value: number | 'max') => {
        if (availableBalance === null) return;
        const newAmount = value === 'max' ? availableBalance : value;
        setAmount(newAmount.toFixed(2));
    };

    const handleMethodSelection = (methodId: MethodId) => {
        setSelectedMethod(methodId);
        if (methodId !== 'bank') {
            setBankDetails({ accountHolder: '', accountNumber: '', bankName: '' });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid || availableBalance === null) return;

        setIsSubmitting(true);

        const newBalance = availableBalance - withdrawalAmount;
        const balanceRef = ref(database, `users/${userId}/balance`);
        const transactionsRef = ref(database, `users/${userId}/transactions`);

        const newTransaction = {
            type: 'withdrawal' as const,
            description: `${paymentMethods.find(m => m.id === selectedMethod)?.name} Withdrawal`,
            date: new Date().toISOString(),
            amount: -withdrawalAmount,
            status: 'Pending' as const
        };

        try {
            await set(balanceRef, newBalance);
            await push(transactionsRef, newTransaction);
            
            setIsSubmitting(false);
            setIsSuccess(true);
            setTimeout(() => {
                 setIsSuccess(false);
                 onBack();
            }, 3000);

        } catch (error) {
            console.error("Withdrawal failed: ", error);
            setIsSubmitting(false);
            alert("An error occurred during withdrawal. Please try again.");
        }
    };

    if (isSuccess) {
        const methodName = paymentMethods.find(m => m.id === selectedMethod)?.name || 'N/A';
        return (
            <div className="bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm min-h-screen flex flex-col items-center justify-center text-center p-4 fixed inset-0 z-50">
                <div className="bg-white dark:bg-slate-800 w-full max-w-sm p-6 rounded-2xl shadow-xl animate-scale-in overflow-hidden">
                    <div className="animate-fade-in-up">
                        <CheckCircleIcon />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mt-4 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        Success!
                    </h2>
                    <p className="text-gray-600 dark:text-slate-400 mt-2 text-sm animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        Your withdrawal request is being processed.
                    </p>
    
                    <div className="text-left bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 mt-6 space-y-2 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500 dark:text-slate-400">Amount</span>
                            <span className="font-semibold text-slate-700 dark:text-slate-200">${parseFloat(amount).toFixed(2)}</span>
                        </div>
                         <div className="flex justify-between text-sm">
                            <span className="text-slate-500 dark:text-slate-400">Method</span>
                            <span className="font-semibold text-slate-700 dark:text-slate-200">{methodName}</span>
                        </div>
                    </div>
    
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1 mt-6 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                        <div className="bg-blue-500 h-1 rounded-full animate-progress-fill"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#F4F7FE] dark:bg-slate-900 min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="max-w-md mx-auto p-4 sm:p-5">
                <header className="flex items-center justify-between mb-6 animate-fade-in-down">
                    <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-slate-700 transition-colors" aria-label="Go back">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-slate-200">Withdraw Funds</h1>
                    <button onClick={() => onNavigate('transactionHistory')} className="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                        <HistoryIcon />
                        <span className="ml-1.5">History</span>
                    </button>
                </header>

                <main className="space-y-5">
                    <section className="bg-white dark:bg-slate-800 rounded-xl p-5 text-center shadow-[0_4px_12px_rgba(0,0,0,0.05)] animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <p className="text-sm text-gray-500 dark:text-slate-400">Current Balance</p>
                        <p className="text-4xl font-bold text-gray-800 dark:text-slate-200 mt-1">
                            {availableBalance !== null ? `$${availableBalance.toFixed(2)}` : '...'}
                        </p>
                    </section>

                    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)] space-y-6">
                        <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                            <div className="flex justify-between items-baseline">
                                <label htmlFor="amount" className="text-sm font-semibold text-gray-700 dark:text-slate-300">Amount to Withdraw</label>
                                <span className="text-xs text-gray-500 dark:text-slate-400">Min: ${minimumWithdrawal.toFixed(2)}</span>
                            </div>
                            <div className="relative mt-2">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">$</div>
                                <input
                                    type="number"
                                    id="amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    required
                                    min={minimumWithdrawal}
                                    step="0.01"
                                    className="w-full pl-8 pr-4 py-3 text-lg font-medium bg-gray-100 dark:bg-slate-700 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all duration-300"
                                />
                            </div>
                             {availableBalance !== null && withdrawalAmount > 0 && withdrawalAmount > availableBalance && <p className="text-red-500 text-xs mt-2">Amount cannot exceed your available balance.</p>}
                             {withdrawalAmount > 0 && withdrawalAmount < minimumWithdrawal && <p className="text-red-500 text-xs mt-2">Minimum withdrawal is ${minimumWithdrawal.toFixed(2)}.</p>}
                            <div className="flex items-center space-x-2 mt-3">
                                {([5, 10, 25, 'max'] as const).map(val => {
                                    const isAmountDisabled = availableBalance === null || (typeof val === 'number' && val > availableBalance);
                                    return (
                                        <button
                                            type="button"
                                            key={val}
                                            onClick={() => handleQuickAmount(val)}
                                            disabled={isAmountDisabled}
                                            className="flex-1 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-500/10 dark:text-blue-400 rounded-md hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-colors disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed dark:disabled:bg-slate-700 dark:disabled:text-slate-500"
                                        >
                                            {val === 'max' ? 'Max' : `$${val}`}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                            <label className="text-sm font-semibold text-gray-700 dark:text-slate-300">Payment Method</label>
                            <div className="grid grid-cols-2 gap-3 mt-2">
                                {paymentMethods.map((method) => (
                                    <button
                                        key={method.id}
                                        type="button"
                                        onClick={() => handleMethodSelection(method.id)}
                                        className={`p-3 border-2 rounded-lg flex items-center space-x-3 transition-all duration-200 ${selectedMethod === method.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10' : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'}`}
                                    >
                                        {method.icon}
                                        <span className="font-semibold text-sm text-gray-800 dark:text-slate-200">{method.name}</span>
                                    </button>
                                ))}
                            </div>
                             {selectedMethod === 'bank' && (
                                <div className="mt-4 space-y-3 bg-gray-50 dark:bg-slate-700/50 p-4 rounded-lg animate-fade-in-up">
                                    <h4 className="text-sm font-semibold text-gray-800 dark:text-slate-200">Bank Account Details</h4>
                                    <div>
                                        <label className="text-xs font-medium text-gray-600 dark:text-slate-400">Account Holder Name</label>
                                        <input type="text" value={bankDetails.accountHolder} onChange={(e) => setBankDetails({...bankDetails, accountHolder: e.target.value})} className="mt-1 w-full text-sm bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-600 dark:text-slate-400">Account Number</label>
                                        <input type="text" value={bankDetails.accountNumber} onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})} className="mt-1 w-full text-sm bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-600 dark:text-slate-400">Bank Name</label>
                                        <input type="text" value={bankDetails.bankName} onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})} className="mt-1 w-full text-sm bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
                                    </div>
                                </div>
                             )}
                        </div>

                        {withdrawalAmount > 0 && (
                            <div className="border-t border-gray-200 dark:border-slate-700 pt-4 space-y-2 text-sm animate-fade-in-up">
                                <h4 className="font-semibold text-gray-700 dark:text-slate-300 mb-2">Summary</h4>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 dark:text-slate-400">Withdrawal amount</span>
                                    <span className="font-medium text-gray-800 dark:text-slate-200">${withdrawalAmount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 dark:text-slate-400">Transaction fee</span>
                                    <span className="font-medium text-gray-800 dark:text-slate-200">-${transactionFee.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center font-bold pt-2 border-t border-gray-100 dark:border-slate-700/50 mt-2">
                                    <span className="text-gray-800 dark:text-slate-200">You will receive</span>
                                    <span className="text-blue-600 dark:text-blue-400">${amountToReceive.toFixed(2)}</span>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting || !isFormValid}
                            className="w-full py-3.5 text-md font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform active:scale-95 disabled:from-gray-400 disabled:to-gray-500 disabled:shadow-none disabled:cursor-not-allowed flex justify-center items-center animate-fade-in-up"
                            style={{ animationDelay: '400ms' }}
                        >
                            {isSubmitting ? <SpinnerIcon /> : 'Submit Request'}
                        </button>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default WithdrawFundsPage;
