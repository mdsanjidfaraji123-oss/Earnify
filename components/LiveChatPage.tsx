

import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';

// Icons
const ArrowLeftIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>);
const MoreVerticalIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>);
const PaperclipIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.122 2.122l7.81-7.81" /></svg>);
const SendIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>);
const SeenIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13l4 4L23 7" className="opacity-60" style={{ transform: 'translateX(-4px)' }} />
    </svg>
);

const AlexIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-label="Alex, Support Agent Avatar">
        <defs>
            <linearGradient id="alexAvatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#6366F1' }} />
                <stop offset="100%" style={{ stopColor: '#8B5CF6' }} />
            </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="20" fill="url(#alexAvatarGradient)"/>
        {/* Headset earpiece and mic boom */}
        <path
            d="M 12 18 a 4 4 0 0 1 0 -8 h 1 a 1 1 0 0 0 0 8 z M 16 23 a 8 8 0 0 0 8 -7"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
        />
        {/* Simplified head shape */}
        <circle cx="22" cy="18" r="5" fill="white" opacity="0.2"/>
    </svg>
);


// Types
interface Message {
    id: number;
    text: string;
    sender: 'user' | 'agent';
    timestamp: string; // Storing as ISO string for reliable comparisons
    status?: 'sent' | 'seen';
}

interface ProcessedMessage extends Message {
    showAvatar: boolean;
    isFirstInGroup: boolean;
    isLastInGroup: boolean;
}

interface LiveChatPageProps {
    onBack: () => void;
}

const suggestions = ["How do I withdraw money?", "Tell me about surveys", "My points are missing"];

// Helper function to convert URLs in text to clickable links
const linkify = (text: string, isUser: boolean) => {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    const linkClass = isUser 
        ? "underline hover:text-gray-200" 
        : "text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300";

    return text.split(urlRegex).map((part, i) => {
        if (part.match(urlRegex)) {
            return <a key={i} href={part} target="_blank" rel="noopener noreferrer" className={linkClass} onClick={(e) => e.stopPropagation()}>{part}</a>;
        }
        return part;
    });
};

// Main Component
const LiveChatPage: React.FC<LiveChatPageProps> = ({ onBack }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isModelLoading, setIsModelLoading] = useState(true);
    const [showSuggestions, setShowSuggestions] = useState(true);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const chatRef = useRef<Chat | null>(null);

    const AD_BANNER_HEIGHT = 70; // Safe height for the ad banner area (50px + padding)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Initialize Gemini Chat on component mount
    useEffect(() => {
        const initChat = async () => {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                const chat = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: "You are Alex, a friendly and helpful customer support agent for 'Earnify'. Your goal is to assist users. Keep responses concise. You can reference URLs like https://earnify.com/history.",
                        temperature: 0.7,
                    }
                });
                chatRef.current = chat;

                const response = await chat.sendMessage({ message: "Greet the user warmly as Alex from Earnify Support and ask how you can help today." });
                const initialMessage: Message = {
                    id: Date.now(), text: response.text, sender: 'agent', timestamp: new Date().toISOString(),
                };
                setMessages([initialMessage]);
            } catch (error) {
                console.error("Failed to initialize chat:", error);
                const errorMessage: Message = {
                    id: Date.now(), text: "Sorry, I'm having trouble connecting. Please try again later.", sender: 'agent', timestamp: new Date().toISOString(),
                };
                setMessages([errorMessage]);
            } finally {
                setIsModelLoading(false);
            }
        };

        initChat();
    }, []);

    useEffect(scrollToBottom, [messages, isModelLoading]);

    // Auto-resize textarea
    useLayoutEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            const scrollHeight = textarea.scrollHeight;
            const maxHeight = 120; // Corresponds to max-h-[120px]
            if (scrollHeight > maxHeight) {
                textarea.style.height = `${maxHeight}px`;
                textarea.style.overflowY = 'auto';
            } else {
                textarea.style.height = `${scrollHeight}px`;
                textarea.style.overflowY = 'hidden';
            }
        }
    }, [inputValue]);

    const processedMessages: ProcessedMessage[] = useMemo(() => {
        return messages.map((msg, index, arr) => {
            const prevMsg = arr[index - 1];
            const nextMsg = arr[index + 1];
            const isFirstInGroup = !prevMsg || prevMsg.sender !== msg.sender || (new Date(msg.timestamp).getTime() - new Date(prevMsg.timestamp).getTime() > 60000);
            const isLastInGroup = !nextMsg || nextMsg.sender !== msg.sender || (new Date(nextMsg.timestamp).getTime() - new Date(msg.timestamp).getTime() > 60000);
            return { ...msg, showAvatar: msg.sender === 'agent' && isLastInGroup, isFirstInGroup, isLastInGroup };
        });
    }, [messages]);

    const handleSendMessage = async (text: string) => {
        if (text.trim() === '' || !chatRef.current) return;

        setShowSuggestions(false);
        const userMessage: Message = { id: Date.now(), text, sender: 'user', timestamp: new Date().toISOString(), status: 'sent' };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsModelLoading(true);

        // Mark as 'seen' for better UX
        setTimeout(() => setMessages(prev => prev.map(m => m.id === userMessage.id ? { ...m, status: 'seen' } : m)), 500);
        
        try {
            const stream = await chatRef.current.sendMessageStream({ message: text });
            
            const agentMessageId = Date.now() + 1;
            const agentMessage: Message = { id: agentMessageId, text: '', sender: 'agent', timestamp: new Date().toISOString() };
            setMessages(prev => [...prev, agentMessage]);

            let fullText = '';
            for await (const chunk of stream) {
                fullText += chunk.text;
                setMessages(prev => prev.map(m => m.id === agentMessageId ? { ...m, text: fullText } : m));
            }
        } catch (error) {
            console.error("Failed to get streaming response:", error);
            const errorMessage: Message = { id: Date.now() + 1, text: "I'm sorry, I encountered an error. Please rephrase your question.", sender: 'agent', timestamp: new Date().toISOString() };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsModelLoading(false);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        handleSendMessage(suggestion);
    };

    return (
        <div className="fixed inset-0 z-30 flex flex-col bg-gray-50 dark:bg-slate-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div 
                className="max-w-lg mx-auto w-full flex flex-col h-full"
                style={{ paddingBottom: `${AD_BANNER_HEIGHT}px` }}
            >
                <header className="relative flex-shrink-0 flex items-center p-3 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-sm z-10">
                    <div className="flex-1 flex justify-start">
                        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700" aria-label="Go back">
                            <ArrowLeftIcon />
                        </button>
                    </div>
                
                    <div className="flex items-center rounded-lg p-1">
                        <div className="relative flex-shrink-0">
                            <AlexIcon className="w-10 h-10"/>
                            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-slate-800"></span>
                        </div>
                        <div className="ml-3 text-left min-w-0">
                            <h1 className="text-base font-semibold text-gray-800 dark:text-slate-200 leading-tight truncate">Alex - Support</h1>
                            <p className="text-xs text-green-500 dark:text-green-400">Online</p>
                        </div>
                    </div>
                    
                    <div className="flex-1 flex justify-end">
                        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700" aria-label="More options">
                            <MoreVerticalIcon />
                        </button>
                    </div>
                </header>

                <main className="flex-grow p-4 overflow-y-auto chat-bg">
                    <div className="flex flex-col space-y-1">
                        {processedMessages.map((msg) => {
                            const isUser = msg.sender === 'user';
                            return (
                                <div key={msg.id} className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'} ${msg.isFirstInGroup ? 'pt-4' : ''}`}>
                                    {msg.sender === 'agent' && (msg.showAvatar ? <AlexIcon className="w-7 h-7 flex-shrink-0 mb-1"/> : <div className="w-7 flex-shrink-0"></div>)}
                                    <div className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
                                        <div className={`px-4 py-2.5 animate-fade-in-up rounded-2xl ${
                                            isUser ? 'bg-blue-600 text-white rounded-br-lg' : 'bg-white dark:bg-slate-700 text-gray-800 dark:text-slate-200 rounded-bl-lg shadow-sm'
                                        }`}>
                                            <p className="text-sm" style={{ wordBreak: 'break-word' }}>{linkify(msg.text, isUser)}</p>
                                        </div>
                                        {msg.isLastInGroup && (
                                            <div className="flex items-center justify-end space-x-1 mt-1 px-2 animate-fade-in">
                                                <span className="text-xs text-gray-500 dark:text-slate-400">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                {isUser && msg.status === 'seen' && <SeenIcon />}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        {isModelLoading && messages.length > 0 && messages[messages.length - 1]?.sender === 'user' && (
                             <div className="flex items-end gap-2 justify-start mt-4 animate-fade-in-up">
                                <AlexIcon className="w-7 h-7 mb-1"/>
                                <div className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-700 rounded-bl-lg shadow-sm">
                                    <div className="flex items-center space-x-1.5">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing-dot-1"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing-dot-2"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-typing-dot-3"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </main>

                {showSuggestions && !isModelLoading && (
                    <div className="flex-shrink-0 p-3 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700/50">
                        <div className="overflow-x-auto pb-1 -mx-3 px-3">
                            <div className="flex items-start gap-2 w-max animate-fade-in-up">
                                {suggestions.map(s => (
                                    <button key={s} onClick={() => handleSuggestionClick(s)} className="bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 font-semibold text-sm px-4 py-2 rounded-full border border-blue-100 dark:border-slate-600 hover:bg-blue-100 dark:hover:bg-slate-600 transition-colors flex-shrink-0">
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <footer className="flex-shrink-0 p-3 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700/50">
                    <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }} className="flex items-end space-x-3 bg-gray-100 dark:bg-slate-700 rounded-2xl p-2">
                        <button type="button" className="p-2 text-gray-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors flex-shrink-0"><PaperclipIcon /></button>
                        <textarea
                            ref={textareaRef}
                            rows={1}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(inputValue); } }}
                            placeholder="Type a message..."
                            className="flex-grow py-2 px-1 bg-transparent dark:text-slate-200 text-sm focus:outline-none focus:ring-0 resize-none"
                            style={{ maxHeight: '120px' }}
                            disabled={isModelLoading}
                        />
                        <button type="submit" className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all transform hover:scale-110 active:scale-100 disabled:bg-gray-400 disabled:scale-100 dark:disabled:bg-slate-500 disabled:cursor-not-allowed" disabled={!inputValue.trim() || isModelLoading}>
                            <SendIcon />
                        </button>
                    </form>
                </footer>
            </div>
        </div>
    );
};

export default LiveChatPage;