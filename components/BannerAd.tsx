import React, { useEffect } from 'react';

const BannerAd: React.FC = () => {
    useEffect(() => {
        try {
            // @ts-ignore
            if (window.adsbygoogle) {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, []);

    return (
        <div 
            className="fixed bottom-0 left-0 right-0 z-50 flex justify-center items-center bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700"
            aria-label="Advertisement Banner"
            style={{ height: '90px' }}
        >
            <div className="w-full max-w-[728px] h-[90px] overflow-hidden flex justify-center items-center">
                <ins className="adsbygoogle"
                    style={{ display: 'inline-block', width: '728px', height: '90px' }}
                    data-ad-client="ca-pub-3775067411474407"
                    data-ad-slot="7377990891"></ins>
            </div>
        </div>
    );
};

export default BannerAd;
