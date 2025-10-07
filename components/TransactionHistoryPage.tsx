import React, { useState, useMemo, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { ref, onValue, query, orderByChild } from 'firebase/database';

type Page = 'dashboard';

interface TransactionHistoryPageProps {
    onNavigate: (page: Page) => void;
    onBack: () => void;
}

// --- Icons ---
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);
const EarningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);
const WithdrawalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);
const BonusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
);
const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-64">
        <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);


// --- Data Types ---
type TransactionStatus = 'Completed' | 'Pending' | 'Failed';
type TransactionType = 'earning' | 'withdrawal' | 'bonus';

interface Transaction {
    id: string;
    type: TransactionType;
    description: string;
    date: string;
    amount: number;
    status: TransactionStatus;
}

const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
        case 'earning': return { icon: <EarningIcon />, classes: 'bg-green-100 text-green-600' };
        case 'withdrawal': return { icon: <WithdrawalIcon />, classes: 'bg-red-100 text-red-600' };
        case 'bonus': return { icon: <BonusIcon />, classes: 'bg-purple-100 text-purple-600' };
        default: return { icon: <EarningIcon />, classes: 'bg-gray-100 text-gray-600' };
    }
};

const getStatusBadge = (status: TransactionStatus) => {
    switch (status) {
        case 'Completed': return 'bg-green-100 text-green-800';
        case 'Pending': return 'bg-yellow-100 text-yellow-800';
        case 'Failed': return 'bg-red-100 text-red-800';
    }
};

// --- Helper Functions ---
const formatDateGroup = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

// --- Sub-components ---
interface TransactionItemProps {
    transaction: Transaction;
    animationDelay: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, animationDelay }) => {
    const { icon, classes } = getTransactionIcon(transaction.type);
    const amountColor = transaction.amount > 0 ? 'text-green-600' : 'text-gray-800';
    const amountSign = transaction.amount > 0 ? '+' : '';

    return (
        <div style={{ animationDelay }} className="bg-white rounded-xl shadow-sm p-4 flex items-center space-x-4 animate-fade-in-up">
            <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg ${classes}`}>{icon}</div>
            <div className="flex-grow">
                <p className="font-semibold text-sm text-gray-800 leading-tight">{transaction.description}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(transaction.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            <div className="text-right">
                <p className={`font-bold text-md ${amountColor}`}>{amountSign}${Math.abs(transaction.amount).toFixed(2)}</p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${getStatusBadge(transaction.status)}`}>
                    {transaction.status}
                </span>
            </div>
        </div>
    );
};

const TransactionHistoryPage: React.FC<TransactionHistoryPageProps> = ({ onNavigate, onBack }) => {
    const [activeFilter, setActiveFilter] = useState<TransactionType | 'all'>('all');
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const userId = 'user123';
        const transactionsRef = ref(database, `users/${userId}/transactions`);
        const transactionsQuery = query(transactionsRef, orderByChild('date'));

        const unsubscribe = onValue(transactionsQuery, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const transactionsList: Transaction[] = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                })).reverse(); // Show newest first
                setTransactions(transactionsList);
            } else {
                setTransactions([]);
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);


    const filteredTransactions = useMemo(() => {
        if (activeFilter === 'all') return transactions;
        if (activeFilter === 'earning') return transactions.filter(t => t.type === 'earning' || t.type === 'bonus');
        return transactions.filter(t => t.type === activeFilter);
    }, [activeFilter, transactions]);
    
    const groupedTransactions = useMemo(() => {
        return filteredTransactions.reduce((acc, transaction) => {
            const dateGroup = formatDateGroup(transaction.date);
            if (!acc[dateGroup]) {
                acc[dateGroup] = [];
            }
            acc[dateGroup].push(transaction);
            return acc;
        }, {} as Record<string, Transaction[]>);
    }, [filteredTransactions]);

    const filterTabs: { id: TransactionType | 'all', label: string }[] = [
        { id: 'all', label: 'All' },
        { id: 'earning', label: 'Earnings' },
        { id: 'withdrawal', label: 'Withdrawals' },
    ];

    return (
        <div className="bg-[#F7F8FA] min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="max-w-lg mx-auto p-4 sm:p-6 pb-20">
                <header className="flex items-center mb-6 relative">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200/80 transition-colors absolute left-0 z-10" aria-label="Back to dashboard">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 text-center w-full">Transaction History</h1>
                </header>

                <main>
                    <div className="mb-6 p-1 bg-gray-200/80 rounded-lg flex items-center justify-between">
                         {filterTabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveFilter(tab.id)}
                                className={`w-full py-2 text-sm font-semibold rounded-md transition-all duration-300 ${activeFilter === tab.id ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : Object.keys(groupedTransactions).length > 0 ? (
                        <div className="space-y-6">
                            {Object.entries(groupedTransactions).map(([dateGroup, transactionsInGroup]) => (
                                <section key={dateGroup}>
                                    <h2 className="text-md font-bold text-gray-800 mb-3">{dateGroup}</h2>
                                    <div className="space-y-3">
                                        {(transactionsInGroup as Transaction[]).map((transaction, index) => (
                                            <TransactionItem key={transaction.id} transaction={transaction} animationDelay={`${(index + 1) * 100}ms`} />
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-gray-500">No transactions found for this filter.</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default TransactionHistoryPage;
