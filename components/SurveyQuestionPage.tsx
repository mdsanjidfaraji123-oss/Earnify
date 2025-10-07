import React, { useState, useEffect } from 'react';

type Page = 'dashboard' | 'survey';

interface SurveyQuestionPageProps {
    onNavigate: (page: Page) => void;
}

// --- Icons ---
const BackIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>);
const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);
const NextArrowIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>);
const PrevArrowIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>);

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

// --- Mock Data ---
const surveyData = {
    id: 'food-delivery-v1',
    title: "Food Delivery Preferences",
    reward: 0.05,
    questions: [
        { id: 'q1', text: 'How often do you typically order food for delivery in a month?', options: ['Never', '1-2 times', '3-5 times', '6-10 times', 'More than 10 times'] },
        { id: 'q2', text: 'What is your primary reason for ordering food delivery?', options: ['Convenience', 'Craving a specific food', 'Special occasion', 'Don\'t feel like cooking', 'Work/study reasons'] },
        { id: 'q3', text: 'Which food delivery app do you use most often?', options: ['Uber Eats', 'DoorDash', 'Grubhub', 'Postmates', 'Other'] },
        { id: 'q4', text: 'How much do you typically spend per delivery order?', options: ['$10 - $20', '$21 - $40', '$41 - $60', 'More than $60'] }
    ]
};

const SURVEY_PROGRESS_KEY = 'surveyProgress';

const SurveyQuestionPage: React.FC<SurveyQuestionPageProps> = ({ onNavigate }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isComplete, setIsComplete] = useState(false);
    const [transitionDirection, setTransitionDirection] = useState<'next' | 'prev'>('next');
    
    // Load progress from localStorage on component mount
    useEffect(() => {
        try {
            const savedProgressJSON = localStorage.getItem(SURVEY_PROGRESS_KEY);
            if (savedProgressJSON) {
                const savedProgress = JSON.parse(savedProgressJSON);
                if (savedProgress.surveyId === surveyData.id) {
                    setAnswers(savedProgress.answers || {});
                    setCurrentQuestionIndex(savedProgress.currentQuestionIndex || 0);
                } else {
                    localStorage.removeItem(SURVEY_PROGRESS_KEY);
                }
            }
        } catch (error) {
            console.error("Failed to load survey progress:", error);
            localStorage.removeItem(SURVEY_PROGRESS_KEY);
        }
    }, []);

    // Save progress to localStorage whenever answers or question index change
    useEffect(() => {
        if (!isComplete && (Object.keys(answers).length > 0 || currentQuestionIndex > 0)) {
            const progress = {
                surveyId: surveyData.id,
                currentQuestionIndex,
                answers,
            };
            localStorage.setItem(SURVEY_PROGRESS_KEY, JSON.stringify(progress));
        }
    }, [answers, currentQuestionIndex, isComplete]);

    const currentQuestion = surveyData.questions[currentQuestionIndex];
    const totalQuestions = surveyData.questions.length;
    const selectedAnswer = answers[currentQuestion.id];

    const handleSelectOption = (option: string) => {
        setAnswers(prev => ({ ...prev, [currentQuestion.id]: option }));
    };

    const handleNext = () => {
        setTransitionDirection('next');
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            console.log('Survey completed:', answers);
            localStorage.removeItem(SURVEY_PROGRESS_KEY);
            setIsComplete(true);
        }
    };
    
    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setTransitionDirection('prev');
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };
    
    const handleCloseSurvey = () => {
        onNavigate('survey');
    };

    if (isComplete) {
        return (
            <div className="bg-slate-50 min-h-screen flex flex-col justify-center items-center p-6 text-center animate-fade-in">
                <CheckCircleIcon />
                <h2 className="text-3xl font-bold text-slate-800 mt-6">Survey Complete!</h2>
                <p className="text-slate-600 mt-2">Thank you for your valuable feedback.</p>
                <p className="mt-4 p-3 px-5 inline-block bg-green-100 text-green-800 font-bold rounded-full text-lg">
                    +${surveyData.reward.toFixed(2)} Added
                </p>
                <button
                    onClick={() => onNavigate('survey')}
                    className="mt-8 w-full max-w-xs py-3 text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl"
                >
                    Back to Surveys
                </button>
            </div>
        );
    }
    
    const animationClass = transitionDirection === 'next' ? 'animate-slide-in-from-right' : 'animate-slide-in-from-left';

    return (
        <div className="bg-slate-50 min-h-screen flex flex-col font-['Poppins'] text-slate-800">
            {/* Header */}
            <header className="p-4 pt-5 bg-slate-50">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={handleCloseSurvey} className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm border border-slate-200" aria-label="Go Back">
                        <BackIcon />
                    </button>
                    <div className="text-center">
                        <p className="font-semibold text-blue-600">Question {currentQuestionIndex + 1} of {totalQuestions}</p>
                        <p className="text-sm text-slate-500">{surveyData.title}</p>
                    </div>
                    <button onClick={handleCloseSurvey} className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm border border-slate-200" aria-label="Close survey">
                        <CloseIcon />
                    </button>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}></div>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 px-5 py-8 overflow-hidden">
                <div key={currentQuestionIndex} className={animationClass}>
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">{currentQuestion.text}</h2>
                    <div className="space-y-4">
                        {currentQuestion.options.map((option) => (
                            <button
                                key={option}
                                onClick={() => handleSelectOption(option)}
                                role="radio"
                                aria-checked={selectedAnswer === option}
                                className={`w-full text-left p-4 rounded-2xl flex items-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-sm ${
                                    selectedAnswer === option
                                        ? 'bg-white border-2 border-blue-500'
                                        : 'bg-white border border-gray-200 hover:border-blue-400'
                                }`}
                            >
                                <div className={`w-6 h-6 flex-shrink-0 border-2 rounded-full mr-4 transition-colors ${
                                    selectedAnswer === option ? 'border-blue-500' : 'border-gray-300'
                                }`}>
                                    {selectedAnswer === option && (
                                        <div className="w-full h-full p-1">
                                            <div className="w-full h-full bg-blue-500 rounded-full"></div>
                                        </div>
                                    )}
                                </div>
                                <span className={`font-semibold ${
                                    selectedAnswer === option ? 'text-blue-700' : 'text-slate-700'
                                }`}>
                                    {option}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="px-5 py-4 bg-white/80 backdrop-blur-sm shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
                <div className="flex items-center space-x-3">
                    {currentQuestionIndex > 0 && (
                        <button
                            onClick={handlePrevious}
                            className="w-1/3 py-4 text-lg font-bold text-slate-600 bg-slate-200 rounded-2xl flex justify-center items-center transition-opacity"
                        >
                            <PrevArrowIcon />
                            Previous
                        </button>
                    )}
                    <button
                        onClick={handleNext}
                        disabled={!selectedAnswer}
                        className="flex-1 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex justify-center items-center transition-opacity disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-100"
                    >
                        {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Finish Survey'}
                        {currentQuestionIndex < totalQuestions - 1 && <NextArrowIcon />}
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default SurveyQuestionPage;