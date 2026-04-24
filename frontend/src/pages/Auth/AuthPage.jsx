import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Mail, Lock, User, BookOpen, Zap, Globe, ArrowRight } from 'lucide-react';

const GOOGLE_LOGIN_ENABLED = Boolean(import.meta.env.VITE_GOOGLE_CLIENT_ID);
const MIN_PASSWORD_LENGTH = 6;

const MiniStars = () => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animId;
        const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
        resize();
        window.addEventListener('resize', resize);
        const stars = Array.from({ length: 120 }, () => ({
            x: Math.random(), y: Math.random(), r: Math.random() * 1.2 + 0.2,
            base: Math.random() * 0.7 + 0.2, ts: Math.random() * 0.012 + 0.003, to: Math.random() * Math.PI * 2,
        }));
        let frame = 0;
        const draw = () => {
            const w = canvas.width, h = canvas.height;
            ctx.fillStyle = '#000814';
            ctx.fillRect(0, 0, w, h);
            const neb = ctx.createRadialGradient(w * 0.7, h * 0.3, 0, w * 0.7, h * 0.3, w * 0.5);
            neb.addColorStop(0, 'rgba(80,20,180,0.2)');
            neb.addColorStop(1, 'transparent');
            ctx.fillStyle = neb;
            ctx.fillRect(0, 0, w, h);
            stars.forEach(s => {
                const tw = Math.sin(frame * s.ts + s.to) * 0.3 + 0.7;
                ctx.beginPath();
                ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255,255,255,${s.base * tw})`;
                ctx.fill();
            });
            frame++;
            animId = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
    }, []);
    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

const AuthPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) { toast.error('Email and password are required'); return; }
        if (isRegister && !formData.name) { toast.error('Name is required'); return; }
        setSubmitting(true);
        try {
            const endpoint = isRegister ? 'http://localhost:8080/auth/register' : 'http://localhost:8080/auth/login';
            const payload = isRegister
                ? { name: formData.name, email: formData.email, password: formData.password }
                : { email: formData.email, password: formData.password };
            const response = await axios.post(endpoint, payload);
            if (response.data.token) {
                login(response.data.token);
                toast.success(isRegister ? 'Account created successfully!' : 'Login successful!');
                navigate(from);
            }
        } catch (err) {
            const errorMessage = err?.response?.data?.error || 'Authentication failed';
            toast.error(errorMessage);
        } finally { setSubmitting(false); }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        setSubmitting(true);
        try {
            const googleProfile = credentialResponse?.credential ? jwtDecode(credentialResponse.credential) : null;
            const profileData = { name: googleProfile?.name || '', picture: googleProfile?.picture || '', email: googleProfile?.email || '' };
            try {
                const response = await axios.post('http://localhost:8080/auth/google', { token: credentialResponse.credential });
                if (response.data.token) { login(response.data.token, profileData); toast.success('Welcome back!'); navigate(from); return; }
            } catch (backendErr) {
                login(credentialResponse.credential, profileData);
                toast.success(`Welcome, ${googleProfile?.name || 'User'}!`);
                navigate(from); return;
            }
            toast.error('Authentication error. Please try again.');
        } catch (err) {
            toast.error('Google authentication failed. Please try again.');
        } finally { setSubmitting(false); }
    };

    const inputClass = "w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium text-white outline-none transition-all placeholder:text-slate-500";
    const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
            <MiniStars />
            <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">

                {/* Info Panel */}
                <div className="text-center lg:text-left">
                    <div className="flex items-center gap-3 mb-8 justify-center lg:justify-start">
                        <img src="/logo.svg" alt="Smart Campus Logo" className="w-12 h-12" />
                        <div className="flex flex-col">
                            <span className="text-2xl font-black text-white tracking-tighter leading-none">Smart Campus</span>
                            <span className="text-[9px] font-black text-sky-400 uppercase tracking-widest">Ops Center</span>
                        </div>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl leading-tight mb-4">
                        {isRegister ? 'Create Your Account' : 'Access the\nOperations Hub'}
                    </h1>
                    <p className="text-slate-400 text-base mb-8">
                        The centralized platform for university asset management, bookings, and operational support.
                    </p>
                    <div className="space-y-4">
                        {[
                            { Icon: BookOpen, title: 'Resource Catalogue', desc: 'Browse and reserve equipment, rooms, and facilities.' },
                            { Icon: Zap, title: 'Incident Reporting', desc: 'Report issues and track maintenance requests in real-time.' },
                            { Icon: Globe, title: 'Centralized Dashboard', desc: 'A single pane of glass for all campus operational needs.' },
                        ].map(({ Icon, title, desc }) => (
                            <div key={title} className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                                    style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)' }}>
                                    <Icon className="w-5 h-5 text-sky-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-sm">{title}</h3>
                                    <p className="text-slate-400 text-sm">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Panel */}
                <div className="w-full max-w-md mx-auto">
                    <div className="rounded-2xl p-8 shadow-2xl"
                        style={{ background: 'rgba(10,20,50,0.85)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}>
                        <h2 className="text-2xl font-black text-center text-white mb-1">{isRegister ? 'Register' : 'Sign In'}</h2>
                        <p className="text-center text-slate-400 text-sm mb-6">
                            {isRegister ? 'to start managing resources' : 'to access your dashboard'}
                        </p>

                        {GOOGLE_LOGIN_ENABLED && (
                            <>
                                <div className="flex justify-center">
                                    <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => toast.error('Google login failed.')}
                                        width="300px" theme="filled_black" shape="pill" />
                                </div>
                                <div className="flex items-center my-5">
                                    <div className="flex-grow border-t border-white/10" />
                                    <span className="mx-4 text-xs font-semibold text-slate-500">OR</span>
                                    <div className="flex-grow border-t border-white/10" />
                                </div>
                            </>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-3">
                            {isRegister && (
                                <div className="relative">
                                    <User className="absolute w-4 h-4 text-slate-500 top-1/2 -translate-y-1/2 left-3" />
                                    <input type="text" name="name" placeholder="Full Name" value={formData.name}
                                        onChange={handleChange} className={inputClass} style={inputStyle} required />
                                </div>
                            )}
                            <div className="relative">
                                <Mail className="absolute w-4 h-4 text-slate-500 top-1/2 -translate-y-1/2 left-3" />
                                <input type="email" name="email" placeholder="Email Address" value={formData.email}
                                    onChange={handleChange} className={inputClass} style={inputStyle} required />
                            </div>
                            <div className="relative">
                                <Lock className="absolute w-4 h-4 text-slate-500 top-1/2 -translate-y-1/2 left-3" />
                                <input type="password" name="password" placeholder="Password" value={formData.password}
                                    onChange={handleChange} className={inputClass} style={inputStyle} required />
                            </div>
                            <button type="submit" disabled={submitting}
                                className="w-full py-3 font-bold text-white rounded-xl flex items-center justify-center gap-2 transition-all mt-2"
                                style={{ background: submitting ? 'rgba(56,189,248,0.4)' : 'linear-gradient(135deg,#2563eb,#7c3aed)' }}>
                                {submitting ? 'Processing...' : (isRegister ? 'Create Account' : 'Sign In')}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                        <p className="mt-5 text-sm text-center text-slate-500">
                            {isRegister ? 'Already have an account?' : "Don't have an account?"}
                            <button onClick={() => setIsRegister(!isRegister)} className="font-bold text-sky-400 hover:text-sky-300 ml-1 transition-colors">
                                {isRegister ? 'Sign In' : 'Register Now'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
