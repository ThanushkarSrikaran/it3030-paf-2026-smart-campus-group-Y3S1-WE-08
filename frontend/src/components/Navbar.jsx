import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, BookOpen, Calendar, Ticket, LogOut, User, Shield, Edit3, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Navbar = () => {
    const { user, logout, displayName, displayPicture, updateProfile } = useAuth();
    const navigate = useNavigate();
    const [showProfileEditor, setShowProfileEditor] = useState(false);
    const [savingProfile, setSavingProfile] = useState(false);
    const [profileForm, setProfileForm] = useState({ name: '', department: '', picture: '' });

    const navItems = [
        ...(user.roles?.some(r => ['ADMIN', 'MANAGER', 'TECHNICIAN'].includes(r.replace('ROLE_', '')))
            ? [{ to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard }]
            : []),
        { to: '/catalogue', label: 'Catalogue', icon: BookOpen },
        { to: '/bookings', label: 'Bookings', icon: Calendar },
        { to: '/tickets', label: 'Operations Hub', icon: Ticket },
        ...(user.roles?.some(r => r.replace('ROLE_', '') === 'ADMIN')
            ? [{ to: '/admin', label: 'Admin Control', icon: Shield }]
            : []),
    ];

    const displayRole = (() => {
        const raw = user?.roles?.[0];
        return typeof raw === 'string' && raw.length <= 30 ? raw.replace('ROLE_', '') : 'MEMBER';
    })();

    const openProfileEditor = () => {
        setProfileForm({ name: user?.name || '', department: user?.department || '', picture: user?.picture || '' });
        setShowProfileEditor(true);
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileForm(prev => ({ ...prev, [name]: value }));
    };

    const handleProfileSave = async (e) => {
        e.preventDefault();
        setSavingProfile(true);
        try {
            await updateProfile({ name: profileForm.name, department: profileForm.department, picture: profileForm.picture });
            toast.success('Profile updated successfully.');
            setShowProfileEditor(false);
        } catch (err) {
            const msg = err?.response?.data?.error || err?.response?.data;
            toast.error(typeof msg === 'string' ? msg : 'Failed to update profile.');
        } finally { setSavingProfile(false); }
    };

    const sidebarBg = { background: 'linear-gradient(180deg, #040d24 0%, #060f2e 60%, #08112e 100%)', borderRight: '1px solid rgba(56,189,248,0.08)' };
    const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' };

    return (
        <aside className="w-64 lg:w-72 flex-shrink-0 flex flex-col h-screen overflow-y-auto sticky top-0 shadow-2xl z-50 rounded-r-3xl" style={sidebarBg}>
            {/* Logo */}
            <Link to="/" className="relative flex items-center gap-3 px-6 pt-8 pb-4 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 0% 50%, rgba(56,189,248,0.07) 0%, transparent 70%)' }} />
                <img src="/logo.svg" alt="Smart Campus" className="w-10 h-10 drop-shadow-lg" />
                <div className="flex flex-col">
                    <span className="text-sm font-black text-white tracking-tight leading-none">Smart Campus</span>
                    <span className="text-[8px] font-black text-sky-400 uppercase tracking-widest">Ops Center</span>
                </div>
            </Link>

            <div className="mx-4 mb-1" style={{ height: '1px', background: 'linear-gradient(90deg,rgba(56,189,248,0.15),transparent)' }} />

            {/* Profile Section */}
            <div className="flex flex-col items-center pt-5 pb-6 px-6">
                <div className="relative mb-4 group cursor-pointer" onClick={() => navigate('/profile')}>
                    <div className="w-20 h-20 rounded-full overflow-hidden shadow-2xl bg-slate-800 flex items-center justify-center text-2xl font-black text-white transition-all duration-300 group-hover:scale-105"
                        style={{ border: '2px solid rgba(56,189,248,0.25)', boxShadow: '0 0 20px rgba(56,189,248,0.1)' }}>
                        {displayPicture
                            ? <img src={displayPicture} alt={displayName} className="w-full h-full object-cover" />
                            : (displayName?.[0]?.toUpperCase() || <User className="w-8 h-8" />)
                        }
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-sky-400 border-2 shadow" style={{ borderColor: '#040d24', boxShadow: '0 0 8px rgba(56,189,248,0.6)' }} />
                </div>
                <h2 className="text-white font-black text-base tracking-tight text-center leading-tight mb-1">{displayName}</h2>
                <p className="text-sky-400 text-[10px] font-bold uppercase tracking-widest truncate max-w-[180px] mb-3">{user?.email}</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black text-sky-200 uppercase tracking-widest"
                    style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.25)', boxShadow: '0 0 10px rgba(56,189,248,0.08)' }}>
                    {displayRole}
                </div>
                <button onClick={() => navigate('/profile')}
                    className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-slate-400 hover:text-sky-300 text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <Edit3 className="w-3 h-3" /> Edit Profile
                </button>
            </div>

            <div className="mx-4 mb-2" style={{ height: '1px', background: 'linear-gradient(90deg,rgba(56,189,248,0.1),rgba(124,58,237,0.1),transparent)' }} />

            {/* Nav */}
            <nav className="flex-1 py-2 flex flex-col gap-1 px-3">
                {navItems.map(item => (
                    <NavLink key={item.to} to={item.to}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-200 group ${
                                isActive
                                ? 'text-sky-300'
                                : 'text-slate-400 hover:text-sky-200'
                            }`
                        }
                        style={({ isActive }) => isActive
                            ? { background: 'linear-gradient(90deg,rgba(56,189,248,0.18),rgba(124,58,237,0.12))', border: '1px solid rgba(56,189,248,0.25)', boxShadow: '0 2px 12px rgba(56,189,248,0.08)' }
                            : { background: 'transparent', border: '1px solid transparent' }
                        }
                    >
                        <item.icon className="w-4 h-4 mr-3 flex-shrink-0" />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div className="mx-4 mt-1" style={{ height: '1px', background: 'linear-gradient(90deg,rgba(255,255,255,0.05),transparent)' }} />

            {/* Logout */}
            <div className="p-4 mt-auto">
                <button onClick={logout}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-red-400 transition-all duration-200 hover:scale-[1.02]"
                    style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                    <LogOut className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Logout</span>
                </button>
            </div>

            {showProfileEditor && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4"
                    style={{ background: 'rgba(0,8,20,0.85)', backdropFilter: 'blur(8px)' }}>
                    <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
                        style={{ background: '#060f2e', border: '1px solid rgba(56,189,248,0.15)' }}>
                        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                            <h3 className="text-white font-black text-base">Edit Profile</h3>
                            <button onClick={() => !savingProfile && setShowProfileEditor(false)} disabled={savingProfile}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors disabled:opacity-50">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <form onSubmit={handleProfileSave} className="p-6 space-y-4">
                            {[
                                { label: 'Name', name: 'name', type: 'text', placeholder: 'Your name' },
                                { label: 'Department', name: 'department', type: 'text', placeholder: 'IT' },
                                { label: 'Profile Picture URL', name: 'picture', type: 'url', placeholder: 'https://...' },
                            ].map(f => (
                                <div key={f.name}>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{f.label}</label>
                                    <input type={f.type} name={f.name} value={profileForm[f.name]} onChange={handleProfileChange}
                                        placeholder={f.placeholder}
                                        className="w-full px-4 py-3 rounded-xl text-sm font-medium text-white outline-none transition-all"
                                        style={inputStyle} />
                                </div>
                            ))}
                            <button type="submit" disabled={savingProfile}
                                className="w-full py-3 rounded-xl text-white text-xs font-black uppercase tracking-widest transition-all disabled:opacity-60"
                                style={{ background: 'linear-gradient(135deg,#2563eb,#7c3aed)' }}>
                                {savingProfile ? 'Saving...' : 'Save Profile'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </aside>
    );
};

export default Navbar;
