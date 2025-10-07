import React, { useState } from 'react';

type Page = 'dashboard' | 'watchVideo' | 'survey' | 'inviteFriends';

interface DailyTaskPageProps {
    onNavigate: (page: Page) => void;
}

// SVG Icons
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const FireIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`text-white ${className}`} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.554-.822.916l-2.074 4.147a1 1 0 001.21 1.508c.26-.105.523-.242.793-.41l.7-4.223c.04-.242.24-.423.48-.423.24 0 .44.18.48.423l.7 4.223c.27.168.532.305.793.41a1 1 0 001.21-1.508l-2.074-4.147a1.001 1.001 0 00-.822-.916z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.658.802.5.5 0 00.658.743A3.535 3.535 0 0110 5.5c.528 0 1.02.122 1.45.334a.5.5 0 00.658-.743A4.535 4.535 0 0011 5.092V5z" clipRule="evenodd" />
    </svg>
);

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const PlayIconSolid = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

const SurveyIconSolid = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
    </svg>
);

const UserGroupIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
    </svg>
);

const CheckIconSolid = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const RefreshArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
);

const SpinnerIcon = () => (
    <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

type TaskStatus = 'claim' | 'incomplete' | 'completed';

interface Task {
    title: string;
    reward: string;
    icon: React.ReactNode;
    status: TaskStatus;
    progress?: { current: number; total: number; unit: string; };
}

const dailyTasksData: Task[] = [
    {
        title: 'Daily Check-in',
        reward: '+10 Points',
        icon: <CalendarIcon />,
        status: 'claim',
    },
    {
        title: 'Watch 5 Videos',
        reward: '+25 Points',
        icon: <PlayIconSolid />,
        status: 'incomplete',
        progress: { current: 2, total: 5, unit: 'watched' },
    },
    {
        title: 'Complete a Survey',
        reward: '+50 Points',
        icon: <SurveyIconSolid />,
        status: 'completed',
        progress: { current: 1, total: 1, unit: 'completed' },
    },
    {
        title: 'Complete Another Survey',
        reward: '+50 Points',
        icon: <SurveyIconSolid />,
        status: 'incomplete',
        progress: { current: 0, total: 1, unit: 'completed' },
    },
    {
        title: 'Refer a Friend',
        reward: '+100 Points',
        icon: <UserGroupIcon />,
        status: 'incomplete',
        progress: { current: 0, total: 1, unit: 'referred' },
    }
];

interface TaskCardProps {
    task: Task;
    animationDelay: string;
    onAction: (taskTitle: string) => void;
}

const CircularProgress: React.FC<{ progress: number; size?: number; strokeWidth?: number }> = ({ progress, size = 140, strokeWidth = 12 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
            <circle className="text-gray-200 dark:text-slate-700" stroke="currentColor" strokeWidth={strokeWidth} fill="transparent" r={radius} cx={size / 2} cy={size / 2} />
            <circle className="text-blue-500" stroke="currentColor" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" fill="transparent" r={radius} cx={size / 2} cy={size / 2} style={{ transition: 'stroke-dashoffset 0.5s ease-out' }} />
        </svg>
    );
};

const TaskCard: React.FC<TaskCardProps> = ({ task, animationDelay, onAction }) => {
    const isCompleted = task.status === 'completed';

    const getButton = (status: TaskStatus) => {
        switch (status) {
            case 'claim':
                return <button onClick={() => onAction(task.title)} className="px-5 py-2 text-sm font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 animate-pulse-glow">Claim</button>;
            case 'incomplete':
                return <button onClick={() => onAction(task.title)} className="px-5 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105">Go</button>;
             default: return null;
        }
    };

    return (
        <div style={{ animationDelay }} className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 flex items-center space-x-4 animate-fade-in-up transition-all ${isCompleted ? 'opacity-60' : ''}`}>
            <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-700">
                {task.icon}
            </div>
            <div className="flex-grow">
                <p className="font-bold text-gray-800 dark:text-slate-200">{task.title}</p>
                 {task.progress && task.status !== 'completed' ? (
                    <div className="mt-1">
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-green-600 font-medium">{task.reward}</p>
                            <p className="text-xs text-gray-500 dark:text-slate-400">{task.progress.current} / {task.progress.total} {task.progress.unit}</p>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-1.5 mt-1">
                            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(task.progress.current / task.progress.total) * 100}%` }}></div>
                        </div>
                    </div>
                ) : (
                    <p className="text-sm text-green-600 font-medium">{task.reward}</p>
                )}
            </div>
            {isCompleted ? (
                 <div className="flex items-center space-x-2 text-sm font-semibold text-gray-500 dark:text-slate-400">
                    <CheckIconSolid />
                    <span>Done</span>
                </div>
            ) : getButton(task.status)}
        </div>
    );
};

const DailyTaskPage: React.FC<DailyTaskPageProps> = ({ onNavigate }) => {
    const [tasks, setTasks] = useState<Task[]>(dailyTasksData);

    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const totalTasks = tasks.length;
    const progress = (completedTasks / totalTasks) * 100;

    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const [pullPosition, setPullPosition] = React.useState(0);
    const touchStartY = React.useRef(0);
    const REFRESH_THRESHOLD = 80;

    const handleTaskAction = (taskTitle: string) => {
        if (taskTitle === 'Daily Check-in') {
            setTasks(currentTasks => 
                currentTasks.map(t => 
                    t.title === taskTitle ? { ...t, status: 'completed' } : t
                )
            );
        } else if (taskTitle.includes('Watch')) {
            onNavigate('watchVideo');
        } else if (taskTitle.includes('Survey')) {
            onNavigate('survey');
        } else if (taskTitle.includes('Refer')) {
            onNavigate('inviteFriends');
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (isRefreshing || window.scrollY !== 0) return;
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (isRefreshing || touchStartY.current === 0) return;
        const pullDistance = e.touches[0].clientY - touchStartY.current;
        if (pullDistance > 0) {
            const dampenedPull = Math.pow(pullDistance, 0.8);
            setPullPosition(dampenedPull);
        }
    };

    const handleTouchEnd = () => {
        if (isRefreshing || touchStartY.current === 0) return;

        if (pullPosition > REFRESH_THRESHOLD) {
            setIsRefreshing(true);
            setPullPosition(60);
            setTimeout(() => {
                // In a real app, you'd fetch new tasks here.
                // For now, we just reset the state.
                setTasks(dailyTasksData);
                setIsRefreshing(false);
                setPullPosition(0);
            }, 1500);
        } else {
            setPullPosition(0);
        }
        
        touchStartY.current = 0;
    };

    return (
        <div 
            className="bg-[#F7F8FA] min-h-screen relative overflow-hidden dark:bg-slate-900" 
            style={{ fontFamily: "'Poppins', sans-serif" }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div 
                className="absolute top-0 left-0 right-0 flex justify-center items-end" 
                style={{ height: '60px', transform: `translateY(${pullPosition - 60}px)`, opacity: Math.min(pullPosition / REFRESH_THRESHOLD, 1) }}
            >
                <div className="pb-2">
                    {isRefreshing ? (
                        <SpinnerIcon />
                    ) : (
                        <div className="transition-transform" style={{ transform: `rotate(${pullPosition > REFRESH_THRESHOLD ? 180 : 0}deg)`}}>
                            <RefreshArrowIcon />
                        </div>
                    )}
                </div>
            </div>
            <div 
                className="max-w-lg mx-auto p-4 sm:p-6 pb-10 transition-transform"
                style={{ 
                    transform: `translateY(${pullPosition}px)`,
                    transition: touchStartY.current === 0 ? 'transform 0.3s ease' : 'none',
                }}
            >
                <header className="flex items-center mb-6 relative">
                    <button
                        onClick={() => onNavigate('dashboard')}
                        className="p-2 rounded-full hover:bg-gray-200/80 dark:hover:bg-slate-700 transition-colors absolute left-0"
                        aria-label="Back to dashboard"
                    >
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-slate-200 text-center w-full">
                        Daily Tasks
                    </h1>
                </header>
                <main>
                    <section className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 mb-6 text-center animate-fade-in-up" style={{ animationDelay: '100ms'}}>
                        <h2 className="font-bold text-gray-800 dark:text-slate-200">Daily Goal Progress</h2>
                        <div className="relative inline-block my-4">
                            <CircularProgress progress={progress} />
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{completedTasks}<span className="text-lg text-gray-500 dark:text-slate-400">/{totalTasks}</span></span>
                                <span className="text-xs text-gray-500 dark:text-slate-400">Tasks Done</span>
                            </div>
                        </div>
                        <div className={`p-3 rounded-lg transition-all duration-500 ${progress === 100 ? 'bg-green-100 dark:bg-green-500/20' : 'bg-gray-100 dark:bg-slate-700'}`}>
                            <p className={`text-sm font-semibold ${progress === 100 ? 'text-green-800 dark:text-green-300' : 'text-gray-700 dark:text-slate-300'}`}>
                                {progress === 100 ? '🎉 Goal Achieved! Claim Your Bonus!' : 'Complete all tasks for a +100 Point bonus!'}
                            </p>
                        </div>
                    </section>

                    <section className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl shadow-lg p-6 mb-6 text-white text-center animate-fade-in-up" style={{ animationDelay: '200ms'}}>
                        <div className="flex justify-center items-center">
                            <div className="animate-pulse-fire">
                                <FireIcon className="h-12 w-12" />
                            </div>
                        </div>
                        <p className="text-6xl font-extrabold mt-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }}>5</p>
                        <p className="font-semibold text-lg opacity-90">Day Streak</p>
                        <p className="text-sm opacity-80 mt-2">Keep the fire going for bigger rewards!</p>
                    </section>

                    <div className="mb-4 animate-fade-in-up" style={{ animationDelay: '300ms'}}>
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-slate-300">Today's Tasks</h2>
                    </div>
                    <div className="space-y-3">
                        {tasks.map((task, index) => (
                            <TaskCard key={index} task={task} animationDelay={`${300 + (index + 1) * 100}ms`} onAction={handleTaskAction} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DailyTaskPage;