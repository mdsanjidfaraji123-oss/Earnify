import React, { useState, useMemo } from 'react';

type Page = 'dashboard';

interface ImproveProfilePageProps {
    onNavigate: (page: Page) => void;
    onBack: () => void;
}

// --- Icons ---
const ArrowLeftIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);

const CheckCircleIcon = () => (
    <div className="w-20 h-20 mx-auto">
        <svg className="w-full h-full text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <g strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" className="animate-circle-draw" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" className="animate-check-draw" />
            </g>
        </svg>
    </div>
);

const SparklesIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V6h-1a1 1 0 110-2h1V3a1 1 0 011-1zm-1 6a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm1 5a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm-4-3a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm1 5a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm-5-4a1 1 0 011-1h1a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" /></svg>);

// New Section Icons
const UserCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const BriefcaseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const HeartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 20.25l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>;

// --- Data ---
const steps = [
    { title: "Basics", icon: <UserCircleIcon /> },
    { title: "Household", icon: <HomeIcon /> },
    { title: "Employment", icon: <BriefcaseIcon /> },
    { title: "Interests", icon: <HeartIcon /> }
];

const interests = ["Technology", "Travel", "Gaming", "Cooking", "Sports", "Movies", "Music", "Reading", "Fitness", "Fashion", "Art", "Finance"];

const CircularProgress: React.FC<{ progress: number, size?: number, strokeWidth?: number, children?: React.ReactNode }> = ({ progress, size = 100, strokeWidth = 8, children }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
                <circle className="text-gray-200 dark:text-slate-700" stroke="currentColor" strokeWidth={strokeWidth} fill="transparent" r={radius} cx={size / 2} cy={size / 2} />
                <circle className="text-blue-500" stroke="currentColor" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" fill="transparent" r={radius} cx={size / 2} cy={size / 2} style={{ transition: 'stroke-dashoffset 0.5s ease-out' }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                {children}
            </div>
        </div>
    );
};

// --- Main Component ---
const ImproveProfilePage: React.FC<ImproveProfilePageProps> = ({ onBack }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        gender: '',
        dob: '',
        maritalStatus: '',
        householdIncome: '',
        householdSize: '',
        employmentStatus: '',
        industry: '',
        interests: [] as string[],
    });
    const [isFinished, setIsFinished] = useState(false);
    
    const totalSteps = steps.length;
    const progress = useMemo(() => ((currentStep + 1) / totalSteps) * 100, [currentStep, totalSteps]);
    
    const [transitionClass, setTransitionClass] = useState('animate-slide-in-from-right');

    const handleNext = () => {
        setTransitionClass('animate-slide-out-to-left');
        setTimeout(() => {
            if (currentStep < totalSteps - 1) {
                setCurrentStep(currentStep + 1);
            } else {
                setIsFinished(true);
            }
            setTransitionClass('animate-slide-in-from-right');
        }, 300); // match animation duration
    };

    const handleBack = () => {
        setTransitionClass('animate-slide-out-to-right');
        setTimeout(() => {
            if (currentStep > 0) {
                setCurrentStep(currentStep - 1);
            } else {
                onBack();
            }
            setTransitionClass('animate-slide-in-from-left');
        }, 300); // match animation duration
    };
    
    const handleInterestToggle = (interest: string) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest) 
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };
    
    // Check if the current step is valid to proceed
    const isStepValid = useMemo(() => {
        switch(currentStep) {
            case 0: return formData.gender !== '' && formData.dob !== '';
            case 1: return formData.householdIncome !== '' && formData.householdSize !== '';
            case 2: return formData.employmentStatus !== '';
            case 3: return formData.interests.length >= 3;
            default: return false;
        }
    }, [currentStep, formData]);


    if (isFinished) {
        return (
            <div className="bg-[#F7F8FA] dark:bg-slate-900 min-h-screen flex flex-col items-center justify-center text-center p-4">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl animate-fade-in-up w-full max-w-sm">
                    <CheckCircleIcon />
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-200 mt-5">Profile Complete!</h2>
                    <p className="text-gray-600 dark:text-slate-400 mt-2">You've earned a <span className="font-bold text-blue-600 dark:text-blue-400">+100 Point Bonus</span>. More relevant tasks are coming your way!</p>
                    <button onClick={onBack} className="mt-8 w-full py-3 px-4 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all">
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }
    
    const currentStepData = steps[currentStep];

    return (
        <div className="bg-[#F7F8FA] dark:bg-slate-900 min-h-screen flex flex-col" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="max-w-lg mx-auto w-full p-4 sm:p-6 pb-40 flex-grow">
                <header className="flex items-center mb-4 relative">
                    <button onClick={handleBack} className="p-2 rounded-full hover:bg-gray-200/80 dark:hover:bg-slate-700 transition-colors absolute left-0 z-10" aria-label="Go back">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-slate-200 text-center w-full">Improve Your Profile</h1>
                </header>
                
                {/* Progress Header */}
                <section className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-5 mb-6 flex items-center space-x-4">
                    <CircularProgress progress={progress}>
                        <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{Math.round(progress)}<span className="text-xs">%</span></div>
                    </CircularProgress>
                    <div>
                        <p className="text-xs text-gray-500 dark:text-slate-400">Step {currentStep + 1} of {totalSteps}</p>
                        <h2 className="text-lg font-bold text-gray-800 dark:text-slate-200">{currentStepData.title}</h2>
                        <p className="text-xs text-gray-500 dark:text-slate-400">Unlock higher-paying surveys!</p>
                    </div>
                </section>
                
                <main className="overflow-hidden">
                    <div className={transitionClass}>
                        {currentStep === 0 && (
                           <div className="space-y-6">
                               <div>
                                    <label className="text-sm font-semibold text-gray-700 dark:text-slate-300">Gender</label>
                                    <div className="grid grid-cols-2 gap-3 mt-2">
                                        {['Male', 'Female', 'Other', 'Prefer not to say'].map(option => (
                                            <button key={option} type="button" onClick={() => setFormData({...formData, gender: option})} className={`py-3 text-sm rounded-lg border-2 font-medium transition-all ${formData.gender === option ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 ring-2 ring-blue-500/20' : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'}`}>{option}</button>
                                        ))}
                                    </div>
                                </div>
                                 <div>
                                    <label htmlFor="dob" className="text-sm font-semibold text-gray-700 dark:text-slate-300">Date of Birth</label>
                                    <input id="dob" type="date" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} className="mt-2 w-full p-3 bg-white dark:bg-slate-800 rounded-lg border-2 border-gray-200 dark:border-slate-700 focus:border-blue-500 focus:ring-0" />
                                </div>
                            </div>
                        )}
                        
                         {currentStep === 1 && (
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="householdIncome" className="text-sm font-semibold text-gray-700 dark:text-slate-300">Annual Household Income</label>
                                    <select id="householdIncome" value={formData.householdIncome} onChange={e => setFormData({...formData, householdIncome: e.target.value})} className="mt-2 w-full p-3 bg-white dark:bg-slate-800 rounded-lg border-2 border-gray-200 dark:border-slate-700 focus:border-blue-500 focus:ring-0">
                                        <option value="">Select an option...</option>
                                        <option>Less than $25,000</option>
                                        <option>$25,000 - $49,999</option>
                                        <option>$50,000 - $99,999</option>
                                        <option>$100,000 - $149,999</option>
                                        <option>$150,000 or more</option>
                                    </select>
                                </div>
                                 <div>
                                    <label htmlFor="householdSize" className="text-sm font-semibold text-gray-700 dark:text-slate-300">Household Size</label>
                                    <input id="householdSize" type="number" min="1" value={formData.householdSize} onChange={e => setFormData({...formData, householdSize: e.target.value})} className="mt-2 w-full p-3 bg-white dark:bg-slate-800 rounded-lg border-2 border-gray-200 dark:border-slate-700 focus:border-blue-500 focus:ring-0" placeholder="e.g., 4" />
                                </div>
                            </div>
                        )}
                        
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="employmentStatus" className="text-sm font-semibold text-gray-700 dark:text-slate-300">Employment Status</label>
                                    <select id="employmentStatus" value={formData.employmentStatus} onChange={e => setFormData({...formData, employmentStatus: e.target.value})} className="mt-2 w-full p-3 bg-white dark:bg-slate-800 rounded-lg border-2 border-gray-200 dark:border-slate-700 focus:border-blue-500 focus:ring-0">
                                        <option value="">Select an option...</option>
                                        <option>Employed full-time</option>
                                        <option>Employed part-time</option>
                                        <option>Self-employed</option>
                                        <option>Student</option>
                                        <option>Unemployed</option>
                                        <option>Retired</option>
                                    </select>
                                </div>
                                 <div>
                                    <label htmlFor="industry" className="text-sm font-semibold text-gray-700 dark:text-slate-300">Industry (if applicable)</label>
                                    <input id="industry" type="text" value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} className="mt-2 w-full p-3 bg-white dark:bg-slate-800 rounded-lg border-2 border-gray-200 dark:border-slate-700 focus:border-blue-500 focus:ring-0" placeholder="e.g., Technology" />
                                </div>
                            </div>
                        )}
                        
                         {currentStep === 3 && (
                            <div className="space-y-5">
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 dark:text-slate-300">Your Interests</label>
                                    <p className="text-xs text-gray-500 dark:text-slate-400">Select at least 3 to help us find relevant tasks for you. ({formData.interests.length} selected)</p>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {interests.map(interest => (
                                            <button key={interest} type="button" onClick={() => handleInterestToggle(interest)} className={`px-4 py-2 text-sm rounded-full border-2 font-medium transition-colors ${formData.interests.includes(interest) ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'}`}>{interest}</button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
            
            <footer className="fixed bottom-20 left-0 right-0 z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-t border-gray-100 dark:border-slate-700">
                <div className="max-w-lg mx-auto p-4">
                    <button onClick={handleNext} disabled={!isStepValid} className="w-full py-3.5 px-4 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all flex items-center justify-center disabled:bg-gray-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed">
                        {currentStep < totalSteps - 1 ? 'Save & Continue' : (
                            <>
                                <SparklesIcon />
                                <span>Finish & Claim Bonus</span>
                            </>
                        )}
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default ImproveProfilePage;
