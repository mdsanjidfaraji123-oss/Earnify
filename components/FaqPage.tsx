import React, { useState, useEffect } from 'react';

type Page = 'home' | 'login' | 'signup' | 'dashboard' | 'survey' | 'watchVideo' | 'dailyTask' | 'websites' | 'inviteFriends' | 'notifications' | 'myProfile' | 'transactionHistory' | 'termsAndConditions' | 'privacyPolicy' | 'faq';

interface FaqPageProps {
    onNavigate: (page: Page) => void;
    onBack: () => void;
    hash?: string;
}

// --- Icons ---
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

interface AccordionItemProps {
    question: string;
    children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ question, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left py-4 px-1"
                aria-expanded={isOpen}
            >
                <span className="font-semibold text-gray-800 text-sm">{question}</span>
                <span className={`transform transition-transform duration-300 text-gray-500 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDownIcon />
                </span>
            </button>
            <div
                className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className="overflow-hidden">
                    <div className={`pb-4 px-1 text-gray-600 text-sm leading-relaxed transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};


const faqData = {
    "General": [
        { q: "What is Earnify?", a: "Earnify is a platform that allows users to earn real money by completing simple online tasks such as taking surveys, watching videos, completing offers, and more." },
        { q: "Is Earnify free to use?", a: "Yes, creating an account and using Earnify is completely free. We will never ask you for payment to use our platform." },
        { q: "Who is eligible to join Earnify?", a: "You must be at least 18 years old to create an account and start earning on our platform." },
    ],
    "Earnings & Payments": [
        { q: "How do I earn money?", a: "You can earn points by successfully completing tasks available on your dashboard. These tasks include surveys, watching videos, visiting websites, and referring friends. 1000 points is equivalent to $1.00." },
        { q: "What is the minimum amount for withdrawal?", a: "The minimum withdrawal amount is $5.00 (5000 points). You must reach this threshold before you can request a payout." },
        { q: "What are the payment methods?", a: "We support various payment methods including PayPal, Payoneer, and direct bank transfers. Availability may vary depending on your country." },
        { q: "How long does it take to receive my payment?", a: "Withdrawal requests are typically processed within 3-5 business days. You will receive a notification once your payment has been sent." },
    ],
    "Tasks & Offers": [
        { q: "Why are there no tasks available for me?", a: "Task availability can depend on your demographic profile and location. We are constantly adding new partners and tasks, so please check back regularly. Completing your profile can also unlock more opportunities." },
        { q: "A task did not give me points. What should I do?", a: "Please wait up to 24 hours as some partner rewards can be delayed. If you still haven't received your points, go to your Transaction History, find the task, and use the 'Report Missing Points' link. Provide as much detail as possible." },
    ],
    "Account": [
        { q: "Can I have more than one account?", a: "No, each user is allowed to have only one account. Creating multiple accounts is a violation of our terms and will lead to account suspension." },
        { q: "I forgot my password. What should I do?", a: "You can reset your password by clicking the 'Forgot Password?' link on the login page. An email with instructions will be sent to your registered email address." },
        { q: "How do I delete my account?", a: "You can request to delete your account from your 'My Profile' page. Please note that this action is irreversible and all your data and earnings will be permanently removed." },
    ]
};

const FaqPage: React.FC<FaqPageProps> = ({ onNavigate, onBack, hash }) => {

    useEffect(() => {
        if (hash) {
            setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100); // Small delay for content to render
        }
    }, [hash]);
    
    return (
        <div className="bg-[#F7F8FA] min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="max-w-lg mx-auto p-4 sm:p-6 pb-20">
                <header className="flex items-center mb-6 relative">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200/80 transition-colors absolute left-0 z-10" aria-label="Go back">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 text-center w-full">Frequently Asked Questions</h1>
                </header>

                <main className="bg-white rounded-xl shadow-sm p-6">
                    {Object.entries(faqData).map(([category, items]) => {
                        const categoryId = category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
                        return (
                            <div key={category} className="mb-8">
                                <h2 id={categoryId} className="text-lg font-bold text-gray-800 mb-2 scroll-mt-20">{category}</h2>
                                <div className="space-y-1">
                                    {items.map(item => (
                                        <AccordionItem key={item.q} question={item.q}>
                                            <p>{item.a}</p>
                                        </AccordionItem>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </main>
            </div>
        </div>
    );
};

export default FaqPage;