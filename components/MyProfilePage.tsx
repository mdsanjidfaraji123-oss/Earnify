import React, { useState, useMemo, useEffect, useRef } from 'react';
import { database } from '../firebaseConfig';
import { ref, onValue, get, set } from 'firebase/database';

type Page = 'dashboard' | 'improveProfile';

interface MyProfilePageProps {
    onNavigate: (page: Page) => void;
    onBack: () => void;
    onLogout: () => void;
}

interface ProfileData {
    fullName: string;
    email: string;
    phone: string;
    dob: string;
    country: string;
    uid: string;
    avatar?: string;
}

interface UserStats {
    earnings: number;
    tasks: number;
    referrals: number;
}


// --- Icons ---
const ArrowLeftIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);
const CameraIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>);
const PencilIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>);
const WalletIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>);
const ClipboardCheckIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>);
const UserGroupIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>);
const ChevronRightIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>);
const KeyIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" /></svg>);
const LogoutIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>);
const TrashIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>);
const SpinnerIcon = () => (<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>);
const LoadingSpinner = () => (<svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>);
const CopyIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>);
const CheckIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>);


const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; color: string; animationDelay: string }> = ({ icon, label, value, color, animationDelay }) => (
    <div style={{ animationDelay }} className={`flex-1 p-4 rounded-xl flex items-center space-x-3 animate-fade-in-up ${color}`}>
        <div className="text-white/80">{icon}</div>
        <div>
            <p className="text-sm text-white/90">{label}</p>
            <p className="text-lg font-bold text-white">{value}</p>
        </div>
    </div>
);

const ProfileCompletionCard: React.FC<{ onNavigate: (page: Page) => void; completion: number }> = ({ onNavigate, completion }) => {
    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (completion / 100) * circumference;

    return (
        <button onClick={() => onNavigate('improveProfile')} className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 text-left hover:shadow-md transition-shadow duration-300 flex items-center space-x-4">
            <div className="relative w-14 h-14 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 56 56">
                    <circle className="text-gray-200 dark:text-slate-700" strokeWidth="5" stroke="currentColor" fill="transparent" r={radius} cx="28" cy="28" />
                    <circle className="text-blue-500" strokeWidth="5" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx="28" cy="28" style={{ transition: 'stroke-dashoffset 0.5s ease' }} />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-md font-bold text-blue-600 dark:text-blue-400">{Math.round(completion)}%</span>
            </div>
            <div className="flex-grow">
                <h3 className="font-bold text-gray-800 dark:text-slate-200">Improve Your Profile</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">Get better tasks &amp; a <span className="font-semibold text-blue-600 dark:text-blue-400">+100 Point Bonus</span>!</p>
            </div>
            <ChevronRightIcon />
        </button>
    );
};

const InfoRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div>
        <label className="text-xs font-semibold text-gray-500 dark:text-slate-400">{label}</label>
        <p className="text-sm text-gray-800 dark:text-slate-200 mt-1">{value}</p>
    </div>
);

const EditRow: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string }> = ({ label, name, value, onChange, type = "text" }) => (
    <div>
        <label htmlFor={name} className="text-xs font-semibold text-gray-500 dark:text-slate-400">{label}</label>
        <input id={name} type={type} name={name} value={value} onChange={onChange} className="mt-1 w-full bg-gray-100/70 dark:bg-slate-700 border-2 border-gray-200 dark:border-slate-600 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"/>
    </div>
);


const MyProfilePage: React.FC<MyProfilePageProps> = ({ onNavigate, onBack, onLogout }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isUidCopied, setIsUidCopied] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [userStats, setUserStats] = useState<UserStats | null>(null);
    const [tempData, setTempData] = useState<ProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [newAvatarPreview, setNewAvatarPreview] = useState<string | null>(null);
    const [isSavingAvatar, setIsSavingAvatar] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const userId = 'user123'; // Static user ID for demonstration

    useEffect(() => {
        const profileRef = ref(database, `users/${userId}/profile`);
        const statsRef = ref(database, `users/${userId}/stats`);

        const initializeData = async () => {
            const profileSnapshot = await get(profileRef);
            if (!profileSnapshot.exists()) {
                await set(profileRef, {
                    fullName: 'Md Sanjid Faraji',
                    email: 'mdsanjid.faraji@example.com',
                    phone: '+1 234 567 8900',
                    dob: '1995-08-15',
                    country: 'United States',
                    uid: '1a2b3c-4d5e6f-7g8h9i',
                });
            }
            const statsSnapshot = await get(statsRef);
            if (!statsSnapshot.exists()) {
                await set(statsRef, { earnings: 2450.75, tasks: 312, referrals: 14 });
            }
        };

        initializeData().then(() => {
            const unsubscribeProfile = onValue(profileRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setProfileData(data);
                    setTempData(data);
                }
                setIsLoading(false);
            });

            const unsubscribeStats = onValue(statsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) setUserStats(data);
            });

            return () => {
                unsubscribeProfile();
                unsubscribeStats();
            };
        });
    }, []);

    const profileCompletion = useMemo(() => {
        if (!profileData) return 0;
        const fields: (keyof ProfileData)[] = ['fullName', 'email', 'phone', 'dob', 'country'];
        const filledFields = fields.filter(field => profileData[field] && String(profileData[field]).trim() !== '').length;
        return (filledFields / fields.length) * 100;
    }, [profileData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (tempData) {
            setTempData(prev => ({ ...prev!, [e.target.name]: e.target.value }));
        }
    };
    const handleSave = () => {
        if (!tempData) return;
        setIsSaving(true);
        const profileRef = ref(database, `users/${userId}/profile`);
        set(profileRef, tempData)
            .then(() => setIsEditing(false))
            .catch(error => console.error("Error saving profile data: ", error))
            .finally(() => setIsSaving(false));
    };
    const handleCancel = () => {
        setTempData(profileData);
        setIsEditing(false);
    };
     const handleCopyUid = () => {
        if (!profileData?.uid) return;
        navigator.clipboard.writeText(profileData.uid);
        setIsUidCopied(true);
        setTimeout(() => setIsUidCopied(false), 2000);
    };

    const handleConfirmDelete = () => {
        console.log("Account deletion confirmed.");
        onLogout();
        setShowDeleteConfirm(false);
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSaveAvatar = () => {
        if (!newAvatarPreview) return;
        setIsSavingAvatar(true);
        const avatarRef = ref(database, `users/${userId}/profile/avatar`);
        set(avatarRef, newAvatarPreview)
            .then(() => {
                setNewAvatarPreview(null);
                if(fileInputRef.current) fileInputRef.current.value = "";
            })
            .catch(error => console.error("Error saving avatar: ", error))
            .finally(() => setIsSavingAvatar(false));
    };
    
    const handleCancelAvatar = () => {
        setNewAvatarPreview(null);
        if(fileInputRef.current) fileInputRef.current.value = "";
    };
    
    if (isLoading || !profileData || !userStats) {
        return (
            <div className="bg-[#F7F8FA] dark:bg-slate-900 min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }
    
    return (
        <div className="bg-[#F7F8FA] dark:bg-slate-900 min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="max-w-lg mx-auto p-4 sm:p-6 pb-20">
                <header className="flex items-center mb-4 relative">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200/80 dark:hover:bg-slate-700 transition-colors z-10" aria-label="Go back">
                        <ArrowLeftIcon />
                    </button>
                    <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-bold text-gray-800 dark:text-slate-200">My Profile</h1>
                </header>

                <main className="space-y-6">
                    <section className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-5 text-center animate-fade-in-up">
                        <div className="relative inline-block group">
                            <img 
                                className="h-28 w-28 rounded-full object-cover ring-4 ring-white dark:ring-slate-800 shadow-md" 
                                src={newAvatarPreview || profileData.avatar || `https://i.pravatar.cc/150?u=${profileData.uid}`} 
                                alt="User profile" 
                            />
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleAvatarChange}
                                accept="image/png, image/jpeg"
                                className="hidden" 
                            />
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" 
                                aria-label="Change profile picture"
                            >
                                <CameraIcon />
                            </button>
                        </div>
                        {newAvatarPreview && (
                            <div className="flex items-center space-x-3 mt-4 animate-fade-in">
                                <button onClick={handleCancelAvatar} disabled={isSavingAvatar} className="flex-1 py-2 text-sm font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500 transition disabled:opacity-50">Cancel</button>
                                <button onClick={handleSaveAvatar} className="flex-1 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center" disabled={isSavingAvatar}>
                                    {isSavingAvatar ? <SpinnerIcon /> : 'Save Photo'}
                                </button>
                            </div>
                        )}
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-200 mt-3">{profileData.fullName}</h2>
                        <p className="text-sm text-gray-500 dark:text-slate-400">{profileData.email}</p>
                         <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700">
                            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 dark:text-slate-400">
                                <span>UID: {profileData.uid}</span>
                                <button onClick={handleCopyUid} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700" aria-label="Copy User ID">
                                    {isUidCopied ? <CheckIcon /> : <CopyIcon />}
                                </button>
                            </div>
                        </div>
                    </section>

                    <section className="flex items-center gap-3">
                        <StatCard icon={<WalletIcon />} label="Total Earned" value={`$${userStats.earnings.toFixed(2)}`} color="bg-gradient-to-br from-green-500 to-emerald-600" animationDelay="100ms" />
                        <StatCard icon={<ClipboardCheckIcon />} label="Tasks Done" value={`${userStats.tasks}`} color="bg-gradient-to-br from-blue-500 to-indigo-600" animationDelay="200ms" />
                        <StatCard icon={<UserGroupIcon />} label="Referrals" value={`${userStats.referrals}`} color="bg-gradient-to-br from-purple-500 to-violet-600" animationDelay="300ms" />
                    </section>

                    <section className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                        <ProfileCompletionCard onNavigate={onNavigate} completion={profileCompletion} />
                    </section>

                    <section className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-5 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-gray-800 dark:text-slate-200 text-lg">Account Information</h3>
                            {!isEditing && <button onClick={() => setIsEditing(true)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 transition-colors"><PencilIcon /></button>}
                        </div>
                        
                        <div className="space-y-4">
                            {isEditing && tempData ? (
                                <>
                                    <EditRow label="Full Name" name="fullName" value={tempData.fullName} onChange={handleInputChange} />
                                    <EditRow label="Phone Number" name="phone" value={tempData.phone} onChange={handleInputChange} type="tel" />
                                    <EditRow label="Date of Birth" name="dob" value={tempData.dob} onChange={handleInputChange} type="date" />
                                    <EditRow label="Country" name="country" value={tempData.country} onChange={handleInputChange} />
                                </>
                            ) : (
                                <>
                                    <InfoRow label="Full Name" value={profileData.fullName} />
                                    <InfoRow label="Phone Number" value={profileData.phone} />
                                    <InfoRow label="Date of Birth" value={profileData.dob} />
                                    <InfoRow label="Country" value={profileData.country} />
                                </>
                            )}
                        </div>

                        {isEditing && (
                            <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-gray-100 dark:border-slate-700">
                                <button onClick={handleCancel} className="flex-1 py-2.5 text-sm font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500 transition">Cancel</button>
                                <button onClick={handleSave} className="flex-1 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center" disabled={isSaving}>
                                    {isSaving ? <SpinnerIcon /> : 'Save Changes'}
                                </button>
                            </div>
                        )}
                    </section>

                    <section className="space-y-2 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
                         <button className="w-full flex items-center p-3 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-100 rounded-lg dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors shadow-sm">
                            <KeyIcon /> <span className="ml-3">Change Password</span>
                        </button>
                         <button onClick={onLogout} className="w-full flex items-center p-3 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-100 rounded-lg dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors shadow-sm">
                            <LogoutIcon /> <span className="ml-3">Logout</span>
                        </button>
                         <button onClick={() => setShowDeleteConfirm(true)} className="w-full flex items-center p-3 text-sm font-semibold text-red-600 bg-white hover:bg-red-50 rounded-lg dark:bg-slate-800 dark:text-red-400 dark:hover:bg-red-500/10 transition-colors shadow-sm">
                            <TrashIcon /> <span className="ml-3">Delete Account</span>
                        </button>
                    </section>
                </main>
            </div>
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="delete-dialog-title">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-sm p-6 text-center animate-scale-in">
                        <div className="w-12 h-12 mx-auto bg-red-100 dark:bg-red-500/10 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        </div>
                        <h2 id="delete-dialog-title" className="text-lg font-bold text-gray-800 dark:text-slate-200 mt-4">Delete Account</h2>
                        <p className="text-sm text-gray-600 dark:text-slate-400 mt-2">
                            Are you sure you want to delete your account? This action is permanent and all your data will be lost.
                        </p>
                        <div className="flex items-center space-x-3 mt-6">
                            <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-2.5 text-sm font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500 transition">
                                Cancel
                            </button>
                            <button onClick={handleConfirmDelete} className="flex-1 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition">
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
// FIX: Added default export
export default MyProfilePage;