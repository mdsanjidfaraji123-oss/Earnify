import React, { useState } from 'react';

type Page = 'dashboard';

interface ReportProblemPageProps {
    onNavigate: (page: Page) => void;
    onBack: () => void;
}

// SVG Icons
const ArrowLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const TitleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
    </svg>
);

const CategoryIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2h2" />
    </svg>
);

const DescriptionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
    </svg>
);

const AttachmentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);


const ReportProblemPage: React.FC<ReportProblemPageProps> = ({ onNavigate, onBack }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            onBack();
        }, 3000);
    };
    
    if (isSubmitted) {
        return (
            <div className="bg-[#F7F8FA] min-h-screen flex flex-col items-center justify-center text-center p-4">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-800">Report Submitted</h2>
                    <p className="text-gray-600 mt-2">Thank you! Our team will review your report and get back to you shortly.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#F7F8FA] min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="max-w-lg mx-auto p-4 sm:p-6 pb-20">
                <header className="flex items-center mb-6 relative">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200/80 transition-colors absolute left-0 z-10" aria-label="Go back">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 text-center w-full">Report a Problem</h1>
                </header>

                <main>
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <p className="text-sm text-gray-500 mb-6">Please provide as much detail as possible so we can help you faster.</p>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                                <div className="flex items-center bg-gray-100/70 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition">
                                    <span className="pl-3 text-gray-400"><TitleIcon /></span>
                                    <input type="text" id="subject" required className="flex-1 px-3 py-2.5 w-full bg-transparent focus:outline-none" placeholder="e.g., Payment not received" />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1">Problem Category</label>
                                <div className="flex items-center bg-gray-100/70 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition">
                                     <span className="pl-3 text-gray-400"><CategoryIcon /></span>
                                    <select id="category" required className="flex-1 pl-3 pr-4 py-2.5 w-full bg-transparent appearance-none focus:outline-none">
                                        <option>Select a category...</option>
                                        <option>Payment Issue</option>
                                        <option>Task Not Working</option>
                                        <option>Bug / Glitch</option>
                                        <option>Account Problem</option>
                                        <option>General Feedback</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                                <div className="flex items-start bg-gray-100/70 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition">
                                     <span className="pl-3 pt-3 text-gray-400"><DescriptionIcon /></span>
                                     <textarea id="description" required rows={5} className="flex-1 px-3 py-2.5 w-full bg-transparent focus:outline-none" placeholder="Please describe the issue in detail..."></textarea>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Attach Screenshot (Optional)</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <AttachmentIcon />
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2">
                                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300">
                                    Submit Report
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ReportProblemPage;
