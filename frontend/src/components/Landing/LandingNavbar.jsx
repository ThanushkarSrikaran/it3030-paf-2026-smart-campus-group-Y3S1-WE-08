import React from 'react';
import { Mail, MapPin, User, Search, Menu, LogOut, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NotificationPanel from '../../modules/Notifications/NotificationPanel';

const LandingNavbar = () => {
    const { user, logout, displayName, displayPicture } = useAuth();
    const navigate = useNavigate();
    const isLoggedIn = Boolean(user);

    const handleLogout = () => { logout(); navigate('/'); };

    return (
        <header className="w-full">
            {/* Top bar */}
            <div className="hidden md:block py-2 px-4 sm:px-6 lg:px-8" style={{ background: 'rgba(0,8,20,0.95)', borderBottom: '1px solid rgba(56,189,248,0.08)' }}>
                <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3 text-sky-400" />
                            <span>support@smartcampus.edu</span>
                        </div>
                        <div className="flex items-center gap-2 border-l border-white/10 pl-6">
                            <MapPin className="w-3 h-3 text-sky-400" />
                            <span>Campus Maintenance Center</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            <>
                                <Link to="/dashboard" className="flex items-center gap-2 hover:text-sky-400 transition-colors">
                                    <LayoutDashboard className="w-3 h-3 text-sky-400" /><span>DASHBOARD</span>
                                </Link>
                                <button onClick={handleLogout} className="flex items-center gap-2 hover:text-red-400 transition-colors">
                                    <LogOut className="w-3 h-3" /><span>LOGOUT</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="flex items-center gap-2 hover:text-sky-400 transition-colors">
                                    <User className="w-3 h-3 text-sky-400" /><span>OPERATIONS LOGIN</span>
                                </Link>
                                <Link to="/tickets" className="px-4 py-2 font-black transition-all rounded-md text-white"
                                    style={{ background: 'linear-gradient(135deg,#2563eb,#7c3aed)' }}>
                                    FILE INCIDENT
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Main nav */}
            <nav className="sticky top-0 z-50 shadow-lg" style={{ background: 'rgba(4,13,36,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(56,189,248,0.08)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-18 py-3">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link to="/" className="flex items-center gap-3">
                                <img src="/logo.svg" alt="Smart Campus Logo" className="w-9 h-9" />
                                <div className="flex flex-col">
                                    <span className="text-base font-black text-white tracking-tighter leading-none">Smart Campus</span>
                                    <span className="text-[8px] font-black text-sky-400 uppercase tracking-widest">Ops Center</span>
                                </div>
                            </Link>

                            <div className="hidden lg:flex items-center ml-10 space-x-6">
                                {[
                                    { label: 'Resources', to: '/catalogue' },
                                    { label: 'Bookings', to: '/bookings' },
                                    { label: 'Operations Hub', to: '/tickets' },
                                    ...(isLoggedIn && user.roles?.some(r => ['ADMIN', 'MANAGER', 'TECHNICIAN'].includes(r.replace('ROLE_', '')))
                                        ? [{ label: 'Dashboard', to: '/dashboard' }] : [])
                                ].map(item => (
                                    <Link key={item.label} to={item.to} className="group relative">
                                        <span className="text-sm font-bold text-slate-300 group-hover:text-sky-400 transition-colors">{item.label}</span>
                                        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-400 transition-all group-hover:w-full" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex items-center rounded-xl px-3 py-2 w-48"
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-sm w-full font-medium text-slate-300 placeholder:text-slate-600" />
                                <Search className="w-4 h-4 text-slate-500 flex-shrink-0" />
                            </div>

                            {isLoggedIn && <div className="flex items-center gap-1"><NotificationPanel /><div className="h-6 w-px mx-1" style={{ background: 'rgba(255,255,255,0.1)' }} /></div>}

                            {isLoggedIn ? (
                                <div className="flex items-center gap-3 cursor-pointer group">
                                    <div className="hidden md:flex flex-col text-right leading-tight">
                                        <span className="text-sm font-black text-white group-hover:text-sky-400 transition-colors uppercase tracking-tight">{displayName}</span>
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{user?.roles?.[0]?.replace('ROLE_', '') || 'MEMBER'}</span>
                                    </div>
                                    <div className="relative flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full overflow-hidden" style={{ border: '2px solid rgba(56,189,248,0.3)' }}>
                                            {displayPicture
                                                ? <img src={displayPicture} alt={displayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                                : <div className="w-full h-full flex items-center justify-center font-black text-white text-base" style={{ background: 'linear-gradient(135deg,#2563eb,#7c3aed)' }}>{displayName?.[0]?.toUpperCase() || 'U'}</div>
                                            }
                                        </div>
                                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-sky-400 border-2 rounded-full" style={{ borderColor: '#040d24' }} />
                                    </div>
                                    <button onClick={handleLogout} className="hidden md:flex p-2 rounded-xl text-slate-500 hover:text-red-400 transition-colors">
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <Link to="/login" className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest text-white transition-all"
                                    style={{ background: 'linear-gradient(135deg,#1d4ed8,#6d28d9)' }}>
                                    <User className="w-4 h-4" /> Sign In
                                </Link>
                            )}

                            <button className="lg:hidden p-2 text-slate-400 rounded-lg hover:bg-white/10">
                                <Menu className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default LandingNavbar;
