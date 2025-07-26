import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  User,
  Settings,
  Heart,
  Clock,
  LogOut,
  Mail,
  Phone,
  ShieldCheck
} from 'lucide-react';

const ProfileMenu = ({ isProfileOpen, setIsProfileOpen }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('logging out');
        logout();
        setIsProfileOpen(false);
        navigate('/'); // Navigate to home page after logout
    };

    const profileItems = [
        { text: "My Profile", icon: User },
        { text: "Account Settings", icon: Settings },
        { text: "My Bookings", icon: Clock },
        { text: "Wishlist", icon: Heart },
        { text: "Messages", icon: Mail },
        { text: "Contact Us", icon: Phone },
        { text: "Privacy Settings", icon: ShieldCheck },
        { text: "Logout", icon: LogOut, onClick: handleLogout }
    ];

    if (!isProfileOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/75 z-40 transition-opacity duration-300"
                onClick={() => setIsProfileOpen(false)}
            />
            
            {/* Profile Menu */}
            <div className="fixed inset-y-0 right-0 w-[30%] bg-white z-50 overflow-y-auto shadow-lg">
                <div className="px-4 py-8">
                    <div className="flex justify-end">
                        <button onClick={() => setIsProfileOpen(false)} className="p-2">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Profile Header */}
                    <div className="mt-8 mb-6 px-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                                <User className="h-8 w-8 text-gray-500" />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">Guest User</h2>
                                <p className="text-gray-500">Sign in to access your account</p>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-gray-200 mx-4 mb-6"></div>

                    {/* Profile Navigation */}
                    <nav>
                        <div className="px-4">
                            {profileItems.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div key={index} className="relative group">
                                        <button
                                            onClick={item.onClick}
                                            className="block w-full py-3 text-left text-gray-600 transition-all duration-300 group-hover:text-gray-900"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <Icon className="h-5 w-5" />
                                                <span className="text-base relative">
                                                    {item.text}
                                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
                                                </span>
                                            </div>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default ProfileMenu;