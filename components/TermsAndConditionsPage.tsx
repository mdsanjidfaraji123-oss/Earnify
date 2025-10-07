import React from 'react';

type Page = 'home' | 'login' | 'signup' | 'dashboard' | 'survey' | 'watchVideo' | 'dailyTask' | 'websites' | 'inviteFriends' | 'notifications' | 'myProfile' | 'transactionHistory' | 'termsAndConditions' | 'privacyPolicy' | 'faq';

interface TermsAndConditionsPageProps {
    onNavigate: (page: Page) => void;
    onBack: () => void;
}

// --- Icons ---
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3">{title}</h2>
        <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
            {children}
        </div>
    </div>
);


const TermsAndConditionsPage: React.FC<TermsAndConditionsPageProps> = ({ onNavigate, onBack }) => {
    return (
        <div className="bg-[#F7F8FA] min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="max-w-lg mx-auto p-4 sm:p-6 pb-20">
                <header className="flex items-center mb-6 relative">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200/80 transition-colors absolute left-0 z-10" aria-label="Go back">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 text-center w-full">Terms & Conditions</h1>
                </header>

                <main className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-xs text-gray-500 mb-6">Last Updated: October 26, 2023</p>

                    <Section title="1. Introduction">
                        <p>Welcome to Earnify ("we", "our", "us"). These Terms and Conditions govern your use of our website and services. By accessing or using our platform, you agree to be bound by these terms. If you do not agree with any part of the terms, you may not use our services.</p>
                    </Section>

                    <Section title="2. User Accounts">
                        <p>To use our services, you must create an account. You agree to provide accurate and complete information and to keep this information up-to-date. You are responsible for safeguarding your password and for all activities that occur under your account. You must be at least 18 years old to create an account.</p>
                    </Section>

                    <Section title="3. Earning and Rewards">
                        <p>Earnify provides opportunities to earn points by completing tasks such as surveys, watching videos, and participating in offers. Points have no cash value until they are redeemed.</p>
                        <ul className="list-disc list-inside space-y-1 pl-2">
                            <li>We reserve the right to change the value of points or the availability of rewards at any time.</li>
                            <li>Fraudulent activities, including the use of bots, VPNs, or providing false information, will result in account termination and forfeiture of all earnings.</li>
                        </ul>
                    </Section>

                    <Section title="4. Withdrawals">
                        <p>You may request a withdrawal once you reach the minimum required point threshold. Payouts are made through the payment methods listed on our platform. We are not responsible for any fees charged by third-party payment processors. Please allow up to 7 business days for your withdrawal request to be processed.</p>
                    </Section>

                    <Section title="5. Prohibited Conduct">
                        <p>You agree not to:</p>
                        <ul className="list-disc list-inside space-y-1 pl-2">
                            <li>Use the service for any illegal purpose.</li>
                            <li>Create multiple accounts for a single person.</li>
                            <li>Use any automated system to access or complete tasks.</li>
                            <li>Harass, abuse, or harm another person.</li>
                        </ul>
                    </Section>

                    <Section title="6. Termination">
                        <p>We may terminate or suspend your account at our sole discretion, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the service will immediately cease, and all accumulated points will be forfeited.</p>
                    </Section>
                    
                     <Section title="7. Limitation of Liability">
                        <p>Our service is provided "as is." We do not warrant that the service will be uninterrupted or error-free. In no event shall Earnify be liable for any indirect, incidental, or consequential damages arising out of your use of the service.</p>
                    </Section>

                    <Section title="8. Changes to Terms">
                        <p>We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new terms on this page and updating the "Last Updated" date. Your continued use of the service after such changes constitutes your acceptance of the new terms.</p>
                    </Section>

                    <Section title="9. Contact Us">
                        <p>If you have any questions about these Terms, please contact us at <a href="mailto:support@earnify.com" className="text-blue-600 hover:underline">support@earnify.com</a>.</p>
                    </Section>
                </main>
            </div>
        </div>
    );
};

export default TermsAndConditionsPage;