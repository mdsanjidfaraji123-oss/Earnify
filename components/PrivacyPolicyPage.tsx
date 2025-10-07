import React from 'react';

type Page = 'home' | 'login' | 'signup' | 'dashboard' | 'survey' | 'watchVideo' | 'dailyTask' | 'websites' | 'inviteFriends' | 'notifications' | 'myProfile' | 'transactionHistory' | 'termsAndConditions' | 'privacyPolicy' | 'faq';

interface PrivacyPolicyPageProps {
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


const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate, onBack }) => {
    return (
        <div className="bg-[#F7F8FA] min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="max-w-lg mx-auto p-4 sm:p-6 pb-20">
                <header className="flex items-center mb-6 relative">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200/80 transition-colors absolute left-0 z-10" aria-label="Go back">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 text-center w-full">Privacy Policy</h1>
                </header>

                <main className="bg-white rounded-xl shadow-sm p-6">
                    <p className="text-xs text-gray-500 mb-6">Last Updated: October 26, 2023</p>

                    <Section title="1. Information We Collect">
                        <p>We collect information you provide directly to us, such as when you create an account, complete a task, or contact customer support. This may include:</p>
                        <ul className="list-disc list-inside space-y-1 pl-2">
                            <li>Personal identification information (Name, email address, phone number).</li>
                            <li>Demographic information (Age, gender, country).</li>
                            <li>Payment information for processing withdrawals.</li>
                        </ul>
                    </Section>

                    <Section title="2. How We Use Your Information">
                        <p>We use the information we collect to operate, maintain, and provide you with the features and functionality of our service. This includes:</p>
                        <ul className="list-disc list-inside space-y-1 pl-2">
                            <li>To manage your account and process transactions.</li>
                            <li>To personalize your experience and match you with relevant tasks.</li>
                            <li>To communicate with you, including sending service-related notices.</li>
                            <li>To detect and prevent fraud and abuse.</li>
                        </ul>
                    </Section>

                    <Section title="3. Sharing of Your Information">
                        <p>We do not sell your personal information. We may share your information with third-party vendors and service providers that perform services on our behalf, such as payment processing and survey providers. We may also disclose your information if required by law.</p>
                    </Section>

                    <Section title="4. Data Security">
                        <p>We use commercially reasonable safeguards to help keep the information collected through the service secure. However, no security system is impenetrable, and we cannot guarantee the security of our systems 100%.</p>
                    </Section>

                    <Section title="5. Your Choices About Your Information">
                        <p>You may, of course, decline to submit personal information through the service, in which case Earnify may not be able to provide certain services to you. You may update or correct your account information at any time by logging into your account.</p>
                    </Section>

                    <Section title="6. Children's Privacy">
                        <p>Our service is not directed to individuals under 18. We do not knowingly collect personal information from children under 18. If we become aware that a child under 18 has provided us with personal information, we will take steps to delete such information.</p>
                    </Section>

                    <Section title="7. Changes to Our Privacy Policy">
                        <p>We may modify or update this Privacy Policy from time to time, so you should review this page periodically. When we change the policy in a material manner, we will update the ‘last updated’ date at the top of this page.</p>
                    </Section>

                    <Section title="8. Contact Us">
                        <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@earnify.com" className="text-blue-600 hover:underline">privacy@earnify.com</a>.</p>
                    </Section>
                </main>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;