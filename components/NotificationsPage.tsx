
import React, { useState, useMemo } from 'react';
import type { Notification, NotificationsData } from '../App';

interface NotificationsPageProps {
    onBack: () => void;
    notifications: NotificationsData;
    onMarkAsRead: (id: number) => void;
    onMarkAllAsRead: () => void;
    onDelete: (id: number) => void;
    onClearAll: () => void;
}

// --- Icons ---
const ArrowLeftIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const DollarSignIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182.979-.733 2.416-.733 3.395 0l.879.659m7.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const ClipboardListIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>);
const UserGroupIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
const SparklesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" /></svg>);
const TrashIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>);
const CheckCheckIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);
const BellIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>);

const getNotificationIcon = (type: string) => {
    switch (type) {
        case 'withdrawal_success': return { icon: <DollarSignIcon />, classes: 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400' };
        case 'new_survey': return { icon: <ClipboardListIcon />, classes: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/50 dark:text-cyan-400' };
        case 'referral_success': return { icon: <UserGroupIcon />, classes: 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400' };
        case 'points_earned': return { icon: <SparklesIcon />, classes: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-400' };
        case 'welcome': return { icon: <SparklesIcon />, classes: 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400' };
        default: return { icon: <SparklesIcon />, classes: 'bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-slate-300' };
    }
};

const NotificationItem: React.FC<{ notification: Notification; onMarkAsRead: (id: number) => void; onDelete: (id: number) => void; }> = ({ notification, onMarkAsRead, onDelete }) => {
    const { icon, classes } = getNotificationIcon(notification.type);
    return (
        <div onClick={() => !notification.read && onMarkAsRead(notification.id)} className={`relative group p-4 flex items-start space-x-4 rounded-xl transition-colors duration-300 ${notification.read ? 'bg-white dark:bg-slate-800' : 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100/50 dark:hover:bg-blue-900/40 cursor-pointer'}`}>
            <div className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg ${classes}`}>{icon}</div>
            <div className="flex-grow">
                <p className={`font-semibold text-sm leading-tight ${notification.read ? 'text-gray-700 dark:text-slate-300' : 'text-gray-900 dark:text-slate-100'}`}>{notification.title}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{notification.time}</p>
            </div>
            {!notification.read && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0 self-center mr-2"></div>}
            <button onClick={(e) => { e.stopPropagation(); onDelete(notification.id); }} className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-200/50 dark:bg-slate-700/50 text-gray-500 dark:text-slate-400 hover:bg-gray-300/80 dark:hover:bg-slate-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Delete notification"><CloseIcon /></button>
        </div>
    );
};

const EmptyState: React.FC = () => (
    <div className="text-center py-20 animate-fade-in">
        <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
            <BellIcon />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-slate-200">No Notifications</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">You're all caught up!</p>
    </div>
);

const NotificationsPage: React.FC<NotificationsPageProps> = ({ onBack, notifications, onMarkAsRead, onMarkAllAsRead, onDelete, onClearAll }) => {
    const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');
    
    const filteredNotifications = useMemo(() => {
        const all = [...notifications.new, ...notifications.earlier];
        if (activeFilter === 'unread') {
            return all.filter(n => !n.read);
        }
        return all;
    }, [notifications, activeFilter]);
    
    const hasUnread = useMemo(() => notifications.new.some(n => !n.read) || notifications.earlier.some(n => !n.read), [notifications]);

    return (
        <div className="bg-[#F7F8FA] dark:bg-slate-900 min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="max-w-lg mx-auto p-4 sm:p-6 pb-20">
                <header className="flex items-center mb-4 relative">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200/80 dark:hover:bg-slate-700 transition-colors absolute left-0 z-10" aria-label="Back to dashboard">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-slate-200 text-center w-full">Notifications</h1>
                </header>
                
                <div className="flex justify-between items-center mb-4">
                     <button onClick={onMarkAllAsRead} disabled={!hasUnread} className="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 disabled:text-gray-400 dark:disabled:text-slate-500 disabled:cursor-not-allowed">
                        <CheckCheckIcon />
                        <span className="ml-1.5">Mark all as read</span>
                    </button>
                     <button onClick={onClearAll} disabled={filteredNotifications.length === 0} className="flex items-center text-sm font-semibold text-red-500 dark:text-red-400 disabled:text-gray-400 dark:disabled:text-slate-500 disabled:cursor-not-allowed">
                        <TrashIcon />
                        <span className="ml-1.5">Clear All</span>
                    </button>
                </div>

                <div className="mb-6 p-1 bg-gray-200/80 dark:bg-slate-800 rounded-lg flex items-center justify-between">
                    {(['all', 'unread'] as const).map(filter => (
                        <button key={filter} onClick={() => setActiveFilter(filter)} className={`w-full py-2 text-sm font-semibold rounded-md transition-all duration-300 capitalize ${activeFilter === filter ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-slate-400'}`}>
                            {filter}
                        </button>
                    ))}
                </div>

                <main>
                    {filteredNotifications.length > 0 ? (
                        <div className="space-y-3">
                            {filteredNotifications.map((notification) => (
                                <NotificationItem key={notification.id} notification={notification} onMarkAsRead={onMarkAsRead} onDelete={onDelete} />
                            ))}
                        </div>
                    ) : (
                        <EmptyState />
                    )}
                </main>
            </div>
        </div>
    );
};

export default NotificationsPage;
