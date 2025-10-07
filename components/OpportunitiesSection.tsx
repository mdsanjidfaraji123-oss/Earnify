

import React from 'react';

interface OpportunityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  animationDelay: string;
  popular?: boolean;
}

const OpportunityCard: React.FC<OpportunityCardProps> = ({ icon, title, description, animationDelay, popular }) => (
  <div style={{ animationDelay }} className="relative p-8 text-center bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group animate-fade-in-up">
    {popular && <div className="absolute -top-3 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-md transform rotate-3">MOST POPULAR</div>}
    <div className="inline-block p-4 mb-4 text-indigo-600 bg-indigo-100 dark:text-indigo-400 dark:bg-indigo-900/50 rounded-full group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400">{description}</p>
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-slate-800/50 dark:to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl -z-10"></div>
  </div>
);

const LightBulbIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
</svg>);
const PlayCircleIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
</svg>);
const UserPlusIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766z" />
</svg>);
const ListBulletIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12M8.25 17.25h12M3.75 6.75h.007v.008H3.75V6.75zm0 5.25h.007v.008H3.75v-.008zm0 5.25h.007v.008H3.75v-.008z" />
</svg>);

const OpportunitiesSection: React.FC = () => {
  return (
    <section id="opportunities" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100">Earning Opportunities</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Explore multiple ways to earn. The more you engage, the more you earn!</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <OpportunityCard 
            icon={<LightBulbIcon />}
            title="Play Quizzes"
            description="Test your knowledge on various topics and earn rewards for correct answers."
            animationDelay="100ms"
          />
          <OpportunityCard 
            icon={<PlayCircleIcon />}
            title="Watch Ads"
            description="Watch short video ads from our partners and get paid for your time."
            animationDelay="200ms"
          />
          <OpportunityCard 
            icon={<UserPlusIcon />}
            title="Referrals"
            description="Invite your friends to join and earn a commission for every successful referral."
            animationDelay="300ms"
          />
          <OpportunityCard 
            icon={<ListBulletIcon />}
            title="Take Surveys"
            description="Share your opinion by completing simple surveys from top brands."
            animationDelay="400ms"
            popular={true}
          />
        </div>
      </div>
    </section>
  );
};

export default OpportunitiesSection;