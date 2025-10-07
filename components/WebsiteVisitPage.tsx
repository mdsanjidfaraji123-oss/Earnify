
import React, { useState, useEffect } from 'react';
import type { WebsiteOffer } from '../App';

interface WebsiteVisitPageProps {
    offer: WebsiteOffer;
    onBack: () => void;
    onComplete: (partnerName: string) => void;
}

// Icons
const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const AnimatedCheckCircle = () => (
    <div className="w-24 h-24 mx-auto">
        <svg className="w-full h-full text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <g strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" className="animate-circle-draw" stroke="white" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" className="animate-check-draw" stroke="white" />
            </g>
        </svg>
    </div>
);

const CircularProgress: React.FC<{ progress: number; size?: number; strokeWidth?: number; children: React.ReactNode }> = ({ progress, size = 200, strokeWidth = 14, children }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
                <circle className="text-white/20" stroke="currentColor" strokeWidth={strokeWidth} fill="transparent" r={radius} cx={size / 2} cy={size / 2} />
                <circle className="text-white" stroke="currentColor" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" fill="transparent" r={radius} cx={size / 2} cy={size / 2} style={{ transition: 'stroke-dashoffset 1s linear' }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                {children}
            </div>
        </div>
    );
};

const WebsiteVisitPage: React.FC<WebsiteVisitPageProps> = ({ offer, onBack, onComplete }) => {
    const [isComplete, setIsComplete] = useState(false);
    const initialDuration = parseInt(offer.duration.replace('s', ''), 10);
    const [countdown, setCountdown] = useState(initialDuration);

    // Effect to open website and start countdown on mount
    useEffect(() => {
        // In a real scenario, you might want to open this on a user gesture, but for this flow we open it programmatically.
        // Note: This might be blocked by popup blockers.
        window.open(offer.url, '_blank', 'noopener,noreferrer');
        
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsComplete(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Run only once on mount

    // Effect to handle completion and navigate back
    useEffect(() => {
        if (isComplete) {
            const timer = setTimeout(() => {
                onComplete(offer.partner);
            }, 3000); // Wait 3 seconds on success screen
            return () => clearTimeout(timer);
        }
    }, [isComplete, onComplete, offer.partner]);

    const progress = ((initialDuration - countdown) / initialDuration) * 100;
    
    if (isComplete) {
        return (
            <div className="bg-gradient-to-br from-[#623ce7] to-[#3a2588] min-h-screen flex flex-col items-center justify-center p-4">
                 <div className="flex flex-col items-center justify-center text-center animate-fade-in">
                    <AnimatedCheckCircle />
                    <h2 className="text-3xl font-bold text-white mt-6 drop-shadow-md">Reward Claimed!</h2>
                    <p className="text-gray-300 mt-2">Your reward has been added to your balance.</p>
                    <div className="mt-4 p-3 px-5 inline-flex items-center bg-green-500/80 text-white font-bold rounded-full text-lg">
                        {offer.reward}
                    </div>
                </div>
            </div>
        );
    }
    
    // Countdown view
    return (
        <div className="bg-gradient-to-br from-[#623ce7] to-[#3a2588] min-h-screen flex flex-col p-4 text-white animate-fade-in">
            <header className="flex-shrink-0 w-full max-w-md mx-auto">
                 <button onClick={onBack} className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white/20 transition-colors" aria-label="Go Back">
                    <BackArrowIcon />
                </button>
            </header>
            <main className="flex-grow flex flex-col items-center justify-center text-center">
                 <CircularProgress progress={progress}>
                    <span className="text-6xl font-bold text-white drop-shadow-lg">{countdown}</span>
                    <span className="text-lg text-white/80 -mt-2">seconds</span>
                 </CircularProgress>

                <h2 className="text-3xl font-bold text-white mt-8 drop-shadow-md">Stay on this page...</h2>
                <p className="text-gray-300 mt-2 max-w-sm">
                    A new tab has opened. Keep this page open until the timer ends to claim your reward.
                </p>

                <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-xl p-4 flex items-center space-x-4 w-full max-w-sm">
                    <div className={`w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-lg ${offer.iconBg}`}>
                        {offer.icon}
                    </div>
                    <div className="text-left">
                        <p className="font-bold text-white">{offer.partner}</p>
                        <p className="text-sm font-semibold text-green-300">{offer.reward}</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default WebsiteVisitPage;
