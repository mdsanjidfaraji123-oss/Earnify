
import React, { useState, useEffect, useCallback } from 'react';

// --- Testimonials Data ---
const testimonials = [
  {
    quote: "This is the best platform I've used for earning side cash. Payouts are fast and the tasks are actually fun!",
    author: "Jane Doe",
    role: "Freelancer",
    avatar: "https://i.pravatar.cc/100?u=jane-doe",
  },
  {
    quote: "I was skeptical at first, but I received my first payment within 24 hours. Highly recommended for students!",
    author: "John Smith",
    role: "Student",
    avatar: "https://i.pravatar.cc/100?u=john-smith",
  },
  {
    quote: "A great way to monetize my free time. The user interface is clean and easy to navigate. Love it!",
    author: "Samantha Lee",
    role: "Designer",
    avatar: "https://i.pravatar.cc/100?u=samantha-lee",
  },
];

const payouts = [
  { name: 'David B.', amount: 12.50, method: 'PayPal', avatar: 'https://i.pravatar.cc/40?u=d' },
  { name: 'Maria G.', amount: 25.00, method: 'Payoneer', avatar: 'https://i.pravatar.cc/40?u=m' },
  { name: 'Ken J.', amount: 8.75, method: 'PayPal', avatar: 'https://i.pravatar.cc/40?u=k' },
  { name: 'Linda P.', amount: 50.10, method: 'Bank Transfer', avatar: 'https://i.pravatar.cc/40?u=l' },
];

// --- Live Payout Feed Component ---
const LivePayoutFeed: React.FC = () => {
  const [payout, setPayout] = useState(payouts[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPayout(payouts[Math.floor(Math.random() * payouts.length)]);
    }, 4000); // Duration matches the CSS animation
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-20">
      <p className="text-center font-semibold text-slate-500 dark:text-slate-400 mb-4 tracking-wider">LIVE PAYOUTS</p>
      <div className="w-full max-w-sm mx-auto h-20 flex items-center justify-center">
        <div key={payout.name} className="w-full bg-white dark:bg-slate-800 p-3 rounded-xl shadow-md flex items-center space-x-3 border border-slate-200 dark:border-slate-700 animate-slide-up-fade">
          <img src={payout.avatar} alt={payout.name} className="w-10 h-10 rounded-full" />
          <div className="flex-grow text-sm">
              <p className="font-semibold text-slate-800 dark:text-slate-200">{payout.name}</p>
              <p className="text-slate-500 dark:text-slate-400">just withdrew <span className="font-bold text-green-600 dark:text-green-400">${payout.amount.toFixed(2)}</span></p>
          </div>
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 pr-2">{payout.method}</div>
        </div>
      </div>
    </div>
  );
};


// --- Testimonial Carousel Component ---
const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  const { quote, author, role, avatar } = testimonials[currentIndex];

  return (
    <div className="relative w-full max-w-3xl mx-auto mt-12">
        <div className="relative bg-white dark:bg-slate-800 p-8 sm:p-12 rounded-2xl shadow-xl border-t-4 border-indigo-500">
        <svg className="absolute top-6 left-6 w-12 h-12 text-slate-100 dark:text-slate-700" fill="currentColor" viewBox="0 0 32 32"><path d="M9.333 22.667h4L16 16V9.333H9.333v13.334zm10.667 0h4L26.667 16V9.333H20v13.334z"></path></svg>
            <div className="relative z-10 text-center">
                <img src={avatar} alt={author} className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-indigo-100 dark:border-slate-700" />
                <p className="text-lg text-slate-700 dark:text-slate-300 italic mb-6">"{quote}"</p>
                <p className="font-bold text-slate-900 dark:text-slate-100">{author}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{role}</p>
            </div>
        </div>
        <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-slate-700 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-slate-600 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-slate-700 p-2 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-slate-600 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
        <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
            <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-indigo-600 dark:bg-indigo-400' : 'bg-slate-300 dark:bg-slate-600'} transition-colors`}></button>
            ))}
        </div>
    </div>
  );
};

// --- Payment Methods Component ---
const PaymentMethods: React.FC = () => (
  <div className="mt-20">
    <p className="text-center font-semibold text-slate-500 dark:text-slate-400 mb-6 tracking-wider">WE SUPPORT FAST PAYOUTS</p>
    <div className="flex justify-center items-center flex-wrap gap-x-8 md:gap-x-12 gap-y-4 text-slate-500 dark:text-slate-400">
        <span className="font-semibold text-xl transition-colors duration-300 hover:text-slate-800 dark:hover:text-slate-200">PayPal</span>
        <span className="font-semibold text-xl transition-colors duration-300 hover:text-slate-800 dark:hover:text-slate-200">Nagad</span>
        <span className="font-semibold text-xl transition-colors duration-300 hover:text-slate-800 dark:hover:text-slate-200">bKash</span>
    </div>
  </div>
);

// --- Security Badges Component ---
const SecurityBadges: React.FC = () => (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-16">
        <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-300 p-3 bg-slate-100/80 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a12.02 12.02 0 009 3c4.524 0 8.36-2.434 9.998-6.045A11.955 11.955 0 0117.618 7.984z" /></svg>
            <span className="font-medium">SSL Secured Connection</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-slate-600 dark:text-slate-300 p-3 bg-slate-100/80 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            <span className="font-medium">Verified & Trusted Platform</span>
        </div>
    </div>
);


// --- Main TrustSection Component ---
const TrustSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-slate-100">Trusted by Thousands</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">We are committed to providing a secure and reliable platform for our users.</p>
        </div>
        <TestimonialCarousel />
        <LivePayoutFeed />
        <PaymentMethods />
        <SecurityBadges />
      </div>
    </section>
  );
};

export default TrustSection;