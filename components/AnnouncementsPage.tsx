import React from 'react';

type Page = 'dashboard';

interface AnnouncementsPageProps {
    onNavigate: (page: Page) => void;
    onBack: () => void;
}

// SVG Icons
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const MegaphoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.875 9.168-5" />
    </svg>
);

const WrenchScrewdriverIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066 2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 01-1.414 1.414L12 6.414l-2.293 2.293a1 1 0 01-1.414-1.414L10 5m0 10.5l2.293 2.293a1 1 0 01-1.414 1.414L12 17.414l-2.293 2.293a1 1 0 01-1.414-1.414L10 15.5m7 5l2.293-2.293a1 1 0 00-1.414-1.414L17 17.414l-2.293-2.293a1 1 0 00-1.414 1.414L16 19m-3-5a1 1 0 100-2 1 1 0 000 2z" />
    </svg>
);

const announcementsData = {
  new: [
    { type: 'update', title: 'New Withdrawal Method Added!', time: 'October 25, 2023', content: 'We are excited to announce that you can now withdraw your earnings via direct bank transfer in supported countries. Check the withdrawal page for more details.' },
  ],
  earlier: [
    { type: 'maintenance', title: 'Scheduled Maintenance on Oct 20', time: 'October 18, 2023', content: 'The platform will be temporarily unavailable on October 20th from 2:00 AM to 4:00 AM UTC for scheduled maintenance. We apologize for any inconvenience.' },
    { type: 'new_feature', title: 'Daily Streaks are Here!', time: 'October 15, 2023', content: 'Introducing Daily Streaks! Log in every day and complete at least one task to build your streak and earn bonus points. The longer the streak, the bigger the bonus!' },
    { type: 'general', title: 'Terms of Service Update', time: 'October 1, 2023', content: 'We have updated our Terms of Service. Please review the new terms to continue using Earnify. Your continued use of the platform constitutes acceptance of the new terms.' },
  ],
};

const getAnnouncementIcon = (type: string) => {
    switch (type) {
        case 'update': return { icon: <MegaphoneIcon />, classes: 'bg-blue-100 text-blue-600' };
        case 'maintenance': return { icon: <WrenchScrewdriverIcon />, classes: 'bg-yellow-100 text-yellow-600' };
        case 'new_feature': return { icon: <SparklesIcon />, classes: 'bg-green-100 text-green-600' };
        default: return { icon: <MegaphoneIcon />, classes: 'bg-gray-100 text-gray-600' };
    }
};

interface AnnouncementItemProps {
    announcement: { type: string, title: string, time: string, content: string };
    animationDelay: string;
}

const AnnouncementItem: React.FC<AnnouncementItemProps> = ({ announcement, animationDelay }) => {
    const { icon, classes } = getAnnouncementIcon(announcement.type);
    return (
        <div style={{ animationDelay }} className="bg-white rounded-xl shadow-sm p-4 flex items-start space-x-4 animate-fade-in-up">
            <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg ${classes}`}>
                {icon}
            </div>
            <div className="flex-grow">
                <p className="font-bold text-md text-gray-800">{announcement.title}</p>
                <p className="text-xs text-gray-500 mt-1 mb-2">{announcement.time}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{announcement.content}</p>
            </div>
        </div>
    );
};


const AnnouncementsPage: React.FC<AnnouncementsPageProps> = ({ onNavigate, onBack }) => {
    return (
        <div className="bg-[#F7F8FA] min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="max-w-lg mx-auto p-4 sm:p-6 pb-20">
                <header className="flex items-center mb-6 relative">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200/80 transition-colors absolute left-0 z-10" aria-label="Go back">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 text-center w-full">Announcements</h1>
                </header>
                <main className="space-y-6">
                    <section>
                        <h2 className="text-lg font-bold text-gray-800 mb-3">New</h2>
                        <div className="space-y-3">
                            {announcementsData.new.map((item, index) => (
                                <AnnouncementItem key={index} announcement={item} animationDelay={`${(index + 1) * 100}ms`} />
                            ))}
                        </div>
                    </section>
                     <section>
                        <h2 className="text-lg font-bold text-gray-800 mb-3">Earlier</h2>
                        <div className="space-y-3">
                            {announcementsData.earlier.map((item, index) => (
                                <AnnouncementItem key={index} announcement={item} animationDelay={`${(announcementsData.new.length + index + 1) * 100}ms`} />
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default AnnouncementsPage;