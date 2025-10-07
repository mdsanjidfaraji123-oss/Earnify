import React, { useEffect, useRef } from 'react';

const BannerAd: React.FC = () => {
    const adContainerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<number | null>(null);

    const loadAd = () => {
        const container = adContainerRef.current;
        if (container) {
            // Clear previous ad scripts to ensure a clean refresh
            container.innerHTML = '';

            const scriptConfig = document.createElement('script');
            scriptConfig.type = 'text/javascript';
            scriptConfig.innerHTML = `
                atOptions = {
                    'key' : 'ba374df83687b2c85332233f87e0b8d9',
                    'format' : 'iframe',
                    'height' : 50,
                    'width' : 320,
                    'params' : {}
                };
            `;

            const scriptInvoke = document.createElement('script');
            scriptInvoke.type = 'text/javascript';
            scriptInvoke.src = "//www.highperformanceformat.com/ba374df83687b2c85332233f87e0b8d9/invoke.js";
            
            container.appendChild(scriptConfig);
            container.appendChild(scriptInvoke);
        }
    };

    useEffect(() => {
        const scheduleRefresh = () => {
            loadAd();

            // Calculate a random delay between 30,000ms (30s) and 60,000ms (60s)
            const delay = Math.random() * (60000 - 30000) + 30000;

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = window.setTimeout(scheduleRefresh, delay);
        };

        // Start the ad refresh cycle
        scheduleRefresh();

        // Cleanup on component unmount
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <div 
            className="fixed bottom-0 left-0 right-0 z-50 flex justify-center items-center py-2 bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700"
            aria-label="Advertisement Banner"
        >
            <div ref={adContainerRef} className="flex justify-center items-center h-[50px] w-[320px]" />
        </div>
    );
};

export default BannerAd;
