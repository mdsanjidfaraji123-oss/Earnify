import React, { useMemo, useEffect, useRef } from 'react';

type Page = 'home' | 'login' | 'signup';

interface HeroSectionProps {
    onNavigate: (page: Page) => void;
}

// --- SVG Icons for Rewards ---
const PayPalIcon: React.FC = () => (
    <svg className="w-8 h-8" fill="currentColor" viewBox="0 8 23 21" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.18,9.22H2.49c-0.53,0-0.88,0.51-1,1.05L0,18.71c-0.1,0.66,0.27,1.05,0.9,1.05h3.42c0.41,0,0.72-0.34,0.76-0.75 l0.66-4.13c0.1-0.66-0.27-1.05-0.9-1.05h-1.3l0.31-1.92h3.4c2.2,0,3.69,1.06,4.1,3.42c0.31,1.83-0.74,2.95-2.22,2.95h-1.93 l-1.29,8.08c-0.1,0.66,0.27,1.05,0.9,1.05h3.42c0.41,0,0.72-0.34,0.76-0.75l1.93-12.08c0.36-2.18-0.9-3.48-3.11-3.48h0Z" />
        <path opacity="0.6" d="M20.21,9.22h-9.69c-0.53,0-0.88,0.51-1,1.05L8,18.71c-0.1,0.66,0.27,1.05,0.9,1.05h3.42c0.41,0,0.72-0.34,0.76-0.75 l0.66-4.13c0.1-0.66-0.27-1.05-0.9-1.05h-1.3l0.31-1.92h3.4c2.2,0,3.69,1.06,4.1,3.42c0.31,1.83-0.74,2.95-2.22,2.95h-1.93 l-1.29,8.08c-0.1,0.66,0.27,1.05,0.9,1.05h3.42c0.41,0,0.72-0.34,0.76-0.75l1.93-12.08c0.36-2.18-0.9-3.48-3.11-3.48h0Z" />
    </svg>
);
const AmazonIcon: React.FC = () => (<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M4 10C4 10 6 12 12 12C18 12 20 10 20 10"/><path d="M15 11L19 7"/></svg>);
const GooglePlayIcon: React.FC = () => (<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M3 7l12 5-12 5V7z"/><path d="M15 12l6-4-6-4v8z"/><path d="M15 12l6 4-6 4v-8z"/></svg>);
const BitcoinIcon: React.FC = () => (<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M10 7h4a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-4V7z"/><path d="M10 11h5a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-5v-4z"/><path d="M12 7v10"/><path d="M8 12h4"/><path d="M8 17h4"/><circle cx="12" cy="12" r="10"/></svg>);
const GiftCardIcon: React.FC = () => (<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="7" width="20" height="13" rx="2"></rect><path d="M2 12H22"></path><path d="M12 7V4C12 2.89543 11.1046 2 10 2C8.89543 2 8 2.89543 8 4V7"></path><path d="M16 7V4C16 2.89543 15.1046 2 14 2C12.8954 2 12 2.89543 12 4"></path></svg>);
const PointsIcon: React.FC = () => (<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><path d="M12 16l-2.5 2 1-3-2.5-1.5 3-0.25L12 10l1 2.75 3 0.25L13.5 15l1 3-2.5-2z"/></svg>);
const VisaIcon: React.FC = () => (<svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 11.5l1.5-6h14l-1.5 6h-14z"/><path d="M12 11.5V17.5"/><path d="M7 17.5H17"/></svg>);


// --- Animation Sub-components ---
const Particles: React.FC = () => {
    const particles = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        style: {
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 15 + 10}s`,
            animationDelay: `${Math.random() * -25}s`,
        }
    })), []);
    return <div className="absolute -inset-10 z-0">{particles.map(p => <div key={p.id} className="particle" style={p.style} />)}</div>;
};

const RadiatingLines: React.FC = () => (
    <div className="radiating-lines z-0">
        {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="line" style={{ transform: `rotate(${i * (360 / 12)}deg)` }}></div>
        ))}
    </div>
);

const HeroIllustration: React.FC = () => {
    const orbitingRewards = useMemo(() => [
        { id: 'paypal', icon: <PayPalIcon />, className: 'bg-white text-[#0070BA]', orbitClass: 'animate-orbit-1', delay: '0s', floatDuration: '8s', depth: 30 },
        { id: 'amazon', icon: <AmazonIcon />, className: 'bg-white text-[#FF9900]', orbitClass: 'animate-orbit-2', delay: '0s', floatDuration: '7s', depth: 60 },
        { id: 'bitcoin', icon: <BitcoinIcon />, className: 'bg-white text-orange-500', orbitClass: 'animate-orbit-3', delay: '0s', floatDuration: '9s', depth: 90 },
        { id: 'googleplay', icon: <GooglePlayIcon />, className: 'bg-white text-green-500', orbitClass: 'animate-orbit-1', delay: '-11s', floatDuration: '7.5s', depth: 30 },
        { id: 'giftcard', icon: <GiftCardIcon />, className: 'bg-white text-pink-500', orbitClass: 'animate-orbit-2', delay: '-9s', floatDuration: '8.5s', depth: 60 },
        { id: 'points', icon: <PointsIcon />, className: 'bg-white text-yellow-500', orbitClass: 'animate-orbit-3', delay: '-7s', floatDuration: '6.5s', depth: 90 },
        { id: 'visa', icon: <VisaIcon />, className: 'bg-white text-[#1A1F71]', orbitClass: 'animate-orbit-2', delay: '-4.5s', floatDuration: '9.5s', depth: 60 },
    ], []);

    const illustrationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!illustrationRef.current) return;
            const { clientX, clientY } = e;
            const rect = illustrationRef.current.getBoundingClientRect();
            // Calculate position relative to center of element
            const x = clientX - (rect.left + rect.width / 2);
            const y = clientY - (rect.top + rect.height / 2);

            illustrationRef.current.style.setProperty('--mouse-x', `${x}`);
            illustrationRef.current.style.setProperty('--mouse-y', `${y}`);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    
    return (
        <div ref={illustrationRef} className="relative w-full h-[30rem] flex items-center justify-center -mt-8 lg:-mt-4 animate-breath">
            <div className="absolute inset-0 mask-radial-gradient">
                <Particles />
                <RadiatingLines />
                
                 {/* Background Glows */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-72 h-72 bg-green-400/10 dark:bg-green-800/20 rounded-full blur-3xl z-0" />
                    <div className="absolute w-96 h-96 bg-indigo-400/10 dark:bg-indigo-800/20 rounded-full blur-3xl animate-pulse z-0" style={{animationDelay: '2s'}}/>
                </div>

                {/* Ripple Effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="ripple-ring w-40 h-40" style={{ animationDelay: '0s' }}></div>
                    <div className="ripple-ring w-40 h-40" style={{ animationDelay: '1.3s' }}></div>
                    <div className="ripple-ring w-40 h-40" style={{ animationDelay: '2.6s' }}></div>
                </div>
            </div>

            {/* Central Orb */}
            <div className="relative z-20 w-20 h-20 bg-gradient-to-br from-green-400 to-indigo-500 rounded-full animate-orb-pulse flex items-center justify-center">
                 <div className="animate-float" style={{ animationDuration: '4s' }}>
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    </div>
                </div>
            </div>

            {/* Orbiting Rewards */}
            <div className="absolute inset-0">
                {orbitingRewards.map((reward, i) => (
                    <div
                        key={reward.id}
                        className="parallax-item z-20"
                        style={{ '--depth': reward.depth } as React.CSSProperties}
                    >
                        <div className={`${reward.orbitClass}`} style={{ animationDelay: reward.delay, willChange: 'transform' }}>
                            <div
                                className="animate-float opacity-0 animate-fade-in"
                                style={{
                                    animationDuration: reward.floatDuration,
                                    animationDelay: `${0.5 + i * 0.15}s`
                                }}
                            >
                                <div className={`w-16 h-16 flex items-center justify-center rounded-2xl shadow-xl backdrop-blur-sm bg-white/80 dark:bg-slate-800/80 ${reward.className}`}>
                                    {reward.icon}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
    return (
        <section id="home" className="relative pt-24 pb-12 lg:pt-28 lg:pb-16 bg-gray-50 dark:bg-slate-900 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col items-center">
                    <div className="text-center max-w-3xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 dark:text-slate-100 leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                            Turn Clicks into Cash. <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-indigo-500">Simple Tasks, Real Rewards.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-4 mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                           Join 5 million+ members earning daily from top brands around the globe.
                        </p>
                        <p className="text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
                            Experience a seamless, mobile-friendly platform with diverse tasks—from surveys to videos—and enjoy fast, secure payouts for your efforts.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fade-in-up" style={{ animationDelay: '350ms' }}>
                            <button
                                onClick={() => onNavigate('signup')}
                                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-indigo-600 rounded-full shadow-lg transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-slate-900 focus:ring-green-500/50 animate-pulse-glow"
                            >
                                Start Earning Now
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                        <div className="mt-8 flex items-center justify-center space-x-2 animate-fade-in-up" style={{ animationDelay: '450ms' }}>
                            <div className="flex -space-x-2">
                                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900" src="https://i.pravatar.cc/40?u=a" alt="" />
                                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900" src="https://i.pravatar.cc/40?u=b" alt="" />
                                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900" src="https://i.pravatar.cc/40?u=c" alt="" />
                            </div>
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400"><strong className="text-slate-800 dark:text-slate-200">5M+</strong> Happy Users</span>
                        </div>
                    </div>

                    <div className="relative w-full max-w-2xl mx-auto mt-8 lg:mt-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
                        <HeroIllustration />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;