

import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import OpportunitiesSection from './components/OpportunitiesSection';
import TrustSection from './components/TrustSection';
import SignupSection from './components/SignupSection';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import DashboardPage from './components/DashboardPage';
import SurveyPage from './components/SurveyPage';
import SurveyQuestionPage from './components/SurveyQuestionPage';
import WatchVideoPage from './components/WatchVideoPage';
import DailyTaskPage from './components/DailyTaskPage';
import WebsitesPage from './components/WebsitesPage';
import WebsiteVisitPage from './components/WebsiteVisitPage'; // New Import
import InviteFriendsPage from './components/InviteFriendsPage';
import NotificationsPage from './components/NotificationsPage';
import MyProfilePage from './components/MyProfilePage';
import SettingsPage from './components/SettingsPage';
import TransactionHistoryPage from './components/TransactionHistoryPage';
import TermsAndConditionsPage from './components/TermsAndConditionsPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import FaqPage from './components/FaqPage';
import AnnouncementsPage from './components/AnnouncementsPage';
import ReportProblemPage from './components/ReportProblemPage';
import HelpAndSupportPage from './components/HelpAndSupportPage';
import WithdrawFundsPage from './components/WithdrawFundsPage';
import LeaderboardPage from './components/LeaderboardPage';
import SplashScreen from './components/SplashScreen';
import ImproveProfilePage from './components/ImproveProfilePage';
import NotificationSettingsPage from './components/NotificationSettingsPage';
import PasswordSecurityPage from './components/PasswordSecurityPage';
import TwoFactorAuthPage from './components/TwoFactorAuthPage';
import AboutUsPage from './components/AboutUsPage';
import OfferwallPage from './components/OfferwallPage';
import BannerAd from './components/BannerAd';
import LiveChatPage from './components/LiveChatPage';

type Page = 'home' | 'login' | 'signup' | 'dashboard' | 'survey' | 'surveyQuestion' | 'watchVideo' | 'dailyTask' | 'websites' | 'websiteVisit' | 'inviteFriends' | 'notifications' | 'myProfile' | 'settings' | 'transactionHistory' | 'termsAndConditions' | 'privacyPolicy' | 'faq' | 'announcements' | 'reportProblem' | 'helpAndSupport' | 'withdrawFunds' | 'leaderboard' | 'improveProfile' | 'notificationSettings' | 'passwordSecurity' | 'twoFactorAuth' | 'aboutUs' | 'offerwall' | 'liveChat';

// Interface for website offer data
export interface WebsiteOffer {
    partner: string;
    title: string;
    reward: string;
    duration: string;
    icon: React.ReactNode;
    iconBg: string;
    url: string;
    tags?: ('new' | 'popular')[];
}

export interface Notification {
    id: number;
    type: string;
    title: string;
    time: string;
    read: boolean;
}

export interface NotificationsData {
    new: Notification[];
    earlier: Notification[];
}


const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [pageStack, setPageStack] = useState<Page[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [selectedWebsite, setSelectedWebsite] = useState<WebsiteOffer | null>(null);
  const [visitedWebsites, setVisitedWebsites] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<NotificationsData>({
      new: [
        { id: 1, type: 'withdrawal_success', title: 'Withdrawal of $25.50 successful!', time: '15 minutes ago', read: false },
        { id: 2, type: 'new_survey', title: 'New Survey: Share your thoughts on mobile gaming.', time: '1 hour ago', read: false },
      ],
      earlier: [
        { id: 3, type: 'points_earned', title: 'You earned 50 points from Daily Tasks.', time: 'Yesterday', read: true },
        { id: 4, type: 'referral_success', title: 'Your friend John Doe has joined using your referral code!', time: '2 days ago', read: true },
        { id: 5, type: 'welcome', title: 'Welcome to Earnify! Complete your profile for a bonus.', time: '3 days ago', read: true },
      ],
    });
  const [navContext, setNavContext] = useState<any>(null);


  const unreadCount = useMemo(() => {
    // We only count 'new' notifications as unread for the badge, but check the 'read' flag for robustness
    return [...notifications.new, ...notifications.earlier].filter(n => !n.read).length;
  }, [notifications]);

  const handleMarkAsRead = (id: number) => {
    const markRead = (n: Notification) => n.id === id ? { ...n, read: true } : n;
    setNotifications(prev => ({
        new: prev.new.map(markRead),
        earlier: prev.earlier.map(markRead),
    }));
  };

  const handleMarkAllAsRead = () => {
      const markAll = (n: Notification) => ({...n, read: true});
      setNotifications(prev => ({
          new: prev.new.map(markAll),
          earlier: prev.earlier.map(markAll),
      }));
  };

  const handleDeleteNotification = (id: number) => {
      setNotifications(prev => ({
          new: prev.new.filter(n => n.id !== id),
          earlier: prev.earlier.filter(n => n.id !== id),
      }));
  };

  const handleClearAllNotifications = () => {
      setNotifications({ new: [], earlier: [] });
  };


  const currentPage = pageStack.length > 0 ? pageStack[pageStack.length - 1] : null;

  useEffect(() => {
    const checkLoginStatus = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setTimeout(() => {
            if (isLoggedIn) {
                setPageStack(['dashboard']);
            } else {
                setPageStack(['home']);
            }
            setShowSplash(false);
        }, 2500); // Splash screen duration
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev: boolean) => !prev);

  const navigate = (page: Page, data?: any) => {
    if (page === currentPage && page !== 'websiteVisit') return;
    if (page === 'websiteVisit' && data) {
      setSelectedWebsite(data as WebsiteOffer);
    }
    setNavContext(data);
    setPageStack(prev => [...prev, page]);
    if (!data?.hash) {
      window.scrollTo(0, 0);
    }
  };

  const goBack = () => {
    setPageStack(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };
  
  const handleWebsiteVisitComplete = (partnerName: string) => {
    if (!visitedWebsites.includes(partnerName)) {
        setVisitedWebsites(prev => [...prev, partnerName]);
    }
    goBack();
  };

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    setPageStack(['home']);
    window.scrollTo(0, 0);
  };
  
  const pagesWithAds: Page[] = [
    'dashboard', 'survey', 'watchVideo', 'dailyTask', 'websites', 
    'inviteFriends', 'notifications', 'myProfile', 'settings', 
    'transactionHistory', 'termsAndConditions', 'privacyPolicy', 'faq', 
    'announcements', 'reportProblem', 'helpAndSupport', 'withdrawFunds', 
    'leaderboard', 'improveProfile', 'notificationSettings', 
    'passwordSecurity', 'aboutUs', 'offerwall', 'liveChat'
  ];

  const showAds = currentPage && pagesWithAds.includes(currentPage);

  const renderPage = () => {
    if (!currentPage) return null;
    switch (currentPage) {
      case 'login':
        return <LoginPage onNavigate={navigate} />;
      case 'signup':
        return <SignupPage onNavigate={navigate} />;
      case 'dashboard':
        return <DashboardPage onNavigate={navigate} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} onLogout={logout} unreadCount={unreadCount} />;
      case 'survey':
        return <SurveyPage onNavigate={navigate} onBack={goBack} />;
      case 'surveyQuestion':
        return <SurveyQuestionPage onNavigate={navigate} />;
      case 'watchVideo':
        return <WatchVideoPage onNavigate={navigate} onBack={goBack} />;
      case 'dailyTask':
        return <DailyTaskPage onNavigate={navigate} />;
      case 'websites':
        return <WebsitesPage onNavigate={navigate} visitedWebsites={visitedWebsites} />;
      case 'websiteVisit':
        if (!selectedWebsite) {
            goBack(); // Safety check
            return null;
        }
        return <WebsiteVisitPage onBack={goBack} onComplete={handleWebsiteVisitComplete} offer={selectedWebsite} />;
      case 'inviteFriends':
        return <InviteFriendsPage onNavigate={navigate} onBack={goBack} />;
      case 'notifications':
        return <NotificationsPage 
                    onBack={goBack} 
                    notifications={notifications}
                    onMarkAsRead={handleMarkAsRead}
                    onMarkAllAsRead={handleMarkAllAsRead}
                    onDelete={handleDeleteNotification}
                    onClearAll={handleClearAllNotifications}
                />;
      case 'myProfile':
        return <MyProfilePage onNavigate={navigate} onBack={goBack} onLogout={logout} />;
      case 'settings':
        return <SettingsPage onNavigate={navigate} onBack={goBack} isDarkMode={isDarkMode} toggleDarkMode={setIsDarkMode} onLogout={logout} />;
      case 'notificationSettings':
        return <NotificationSettingsPage onBack={goBack} />;
      case 'passwordSecurity':
        return <PasswordSecurityPage onBack={goBack} onNavigate={navigate} />;
      case 'twoFactorAuth':
        return <TwoFactorAuthPage onBack={goBack} />;
      case 'transactionHistory':
        return <TransactionHistoryPage onNavigate={navigate} onBack={goBack} />;
      case 'termsAndConditions':
        return <TermsAndConditionsPage onNavigate={navigate} onBack={goBack} />;
      case 'privacyPolicy':
        return <PrivacyPolicyPage onNavigate={navigate} onBack={goBack} />;
      case 'faq':
        return <FaqPage onNavigate={navigate} onBack={goBack} hash={navContext?.hash} />;
      case 'announcements':
        return <AnnouncementsPage onNavigate={navigate} onBack={goBack} />;
      case 'reportProblem':
        return <ReportProblemPage onNavigate={navigate} onBack={goBack} />;
      case 'helpAndSupport':
        return <HelpAndSupportPage onNavigate={navigate} onBack={goBack} />;
      case 'liveChat':
        return <LiveChatPage onBack={goBack} />;
      case 'withdrawFunds':
        return <WithdrawFundsPage onNavigate={navigate} onBack={goBack} />;
      case 'leaderboard':
        return <LeaderboardPage onNavigate={navigate} onBack={goBack} />;
       case 'improveProfile':
        return <ImproveProfilePage onNavigate={navigate} onBack={goBack} />;
      case 'aboutUs':
        return <AboutUsPage onBack={goBack} />;
      case 'offerwall':
        return <OfferwallPage onBack={goBack} />;
      case 'home':
      default:
        return (
          <>
            <Header onNavigate={navigate} />
            <main>
              <HeroSection onNavigate={navigate} />
              <HowItWorksSection />
              <OpportunitiesSection />
              <TrustSection />
              <SignupSection onNavigate={navigate} />
            </main>
            <Footer onNavigate={navigate} />
          </>
        );
    }
  };

  return (
    <div className="bg-gray-50 text-slate-700 min-h-screen dark:bg-slate-900 dark:text-slate-300">
      {showSplash ? (
        <SplashScreen />
      ) : (
        <>
          <div key={currentPage} className="animate-fade-in">
            <div className={showAds ? 'pb-20' : ''}>
              {renderPage()}
            </div>
          </div>
          {showAds && <BannerAd />}
        </>
      )}
    </div>
  );
};

export default App;