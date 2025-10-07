import React from 'react';

interface AboutUsPageProps {
    onBack: () => void;
}

// --- Icons ---
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

// Fix: Added `style` prop to allow for inline styling like animation delays.
const Section: React.FC<{ title: string; children: React.ReactNode; className?: string; style?: React.CSSProperties; }> = ({ title, children, className, style }) => (
    <section style={style} className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 ${className || ''}`}>
        <h2 className="text-xl font-bold text-gray-800 dark:text-slate-200 mb-4 text-center">{title}</h2>
        <div className="space-y-3 text-gray-600 dark:text-slate-400 text-sm leading-relaxed">
            {children}
        </div>
    </section>
);

const ValueCard: React.FC<{ icon: React.ReactNode; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="text-center p-4">
        <div className="flex justify-center items-center mb-3">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                {icon}
            </div>
        </div>
        <h3 className="font-bold text-md text-gray-800 dark:text-slate-200">{title}</h3>
        <p className="text-xs mt-1">{description}</p>
    </div>
);

const TeamMemberCard: React.FC<{ avatar: string; name: string; role: string; }> = ({ avatar, name, role }) => (
    <div className="text-center">
        <img src={avatar} alt={name} className="w-20 h-20 rounded-full mx-auto shadow-md" />
        <h3 className="font-bold text-md text-gray-800 dark:text-slate-200 mt-3">{name}</h3>
        <p className="text-xs text-gray-500 dark:text-slate-400">{role}</p>
    </div>
);

// --- Value Icons ---
const ScaleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>;
const BoltIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
const ShieldCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a12.02 12.02 0 009 3c4.524 0 8.36-2.434 9.998-6.045A11.955 11.955 0 0117.618 7.984z" /></svg>;
const LightBulbIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;


const AboutUsPage: React.FC<AboutUsPageProps> = ({ onBack }) => {
    return (
        <div className="bg-[#F7F8FA] dark:bg-slate-900 min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="max-w-lg mx-auto p-4 sm:p-6 pb-20">
                <header className="flex items-center mb-6 relative">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200/80 dark:hover:bg-slate-700 transition-colors absolute left-0 z-10" aria-label="Go back">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-slate-200 text-center w-full">About Us</h1>
                </header>

                <main className="space-y-6">
                    <Section title="Our Mission" className="animate-fade-in-up">
                        <p className="text-center">
                            To empower individuals across the globe by providing accessible and flexible opportunities to earn supplementary income. We believe that everyone deserves the chance to monetize their free time, skills, and opinions in a simple, secure, and rewarding way.
                        </p>
                    </Section>

                    <Section title="Our Story" className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                        <p>
                            Founded in 2023 by a group of tech enthusiasts and gig-economy advocates, Earnify was born from a simple idea: what if anyone, anywhere, could earn extra cash just by using their phone? We saw a world full of untapped potential in the moments people spend waiting, commuting, or relaxing. We set out to build a platform that bridges the gap between companies seeking valuable consumer insights and individuals looking for legitimate, hassle-free ways to earn. Today, we're proud to be a trusted partner for thousands of users on their earning journey.
                        </p>
                    </Section>

                    <Section title="Our Core Values" className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                        <div className="grid grid-cols-2 gap-4">
                            <ValueCard icon={<ScaleIcon />} title="Integrity" description="We operate with transparency and honesty in all we do." />
                            <ValueCard icon={<BoltIcon />} title="Empowerment" description="We provide the tools for our users to take control of their earnings." />
                            <ValueCard icon={<ShieldCheckIcon />} title="Security" description="Protecting our users' data and privacy is our highest priority." />
                            <ValueCard icon={<LightBulbIcon />} title="Innovation" description="We continuously improve our platform to deliver the best experience." />
                        </div>
                    </Section>

                    <Section title="Meet the Team" className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                        <p className="text-center mb-6">We're a passionate team dedicated to building the best earning platform for you.</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                            <TeamMemberCard avatar="https://i.pravatar.cc/100?u=jane-ceo" name="Jane Doe" role="Founder & CEO" />
                            <TeamMemberCard avatar="https://i.pravatar.cc/100?u=john-cto" name="John Smith" role="Co-Founder & CTO" />
                            <TeamMemberCard avatar="https://i.pravatar.cc/100?u=samantha-ops" name="Samantha Lee" role="Head of Operations" />
                        </div>
                    </Section>

                     <Section title="Join Our Journey" className="animate-fade-in-up bg-gradient-to-r from-blue-500 to-indigo-600 text-white" style={{ animationDelay: '400ms' }}>
                        <p className="text-center text-white/90">
                            Whether you're looking to pay off a bill, save for a dream, or just get some extra spending money, we're here to help. Join the Earnify community today and start turning your time into rewards.
                        </p>
                    </Section>
                </main>
            </div>
        </div>
    );
};

export default AboutUsPage;
