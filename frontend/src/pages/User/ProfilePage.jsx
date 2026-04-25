import React, { useState } from 'react';
import { User, Mail, Briefcase, Shield, Camera, Save, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
    const { user, displayName, displayPicture, displayEmail, updateProfile } = useAuth();
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({ name: '', picture: '' });

    const roles = (user?.roles || []).map(r => r.replace('ROLE_', '')).join(', ') || 'MEMBER';

    const openEdit = () => {
        setForm({ name: displayName || '', picture: displayPicture || '' });
        setEditing(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await updateProfile({ name: form.name, picture: form.picture });
            toast.success('Profile updated.');
            setEditing(false);
        } catch (err) {
            const msg = err?.response?.data?.error || err?.response?.data;
            toast.error(typeof msg === 'string' ? msg : 'Failed to update profile.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-6 md:p-10 min-h-[calc(100vh-8rem)] bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight italic mb-8">My Profile</h1>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    {/* Avatar header */}
                    <div className="h-28 bg-gradient-to-r from-blue-600 to-violet-600" />
                    <div className="px-8 pb-8">
                        <div className="flex items-end gap-5 -mt-12 mb-6">
                            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-slate-100 flex items-center justify-center">
                                {displayPicture
                                    ? <img src={displayPicture} alt={displayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                    : <span className="text-3xl font-black text-slate-600">{displayName?.[0]?.toUpperCase() || 'U'}</span>
                                }
                            </div>
                            {!editing && (
                                <button onClick={openEdit}
                                    className="mb-2 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-blue-600 transition-all">
                                    <Camera className="w-4 h-4" /> Edit Profile
                                </button>
                            )}
                        </div>

                        {!editing ? (
                            <div className="space-y-4">
                                <div>
                                    <p className="text-2xl font-black text-slate-900">{displayName}</p>
                                    <p className="text-sm text-slate-500 font-medium mt-0.5">{roles}</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                                    {[
                                        { icon: Mail, label: 'Email', value: displayEmail },
                                        { icon: Shield, label: 'Role', value: roles },
                                        { icon: Briefcase, label: 'Department', value: user?.department || '—' },
                                        { icon: User, label: 'Account', value: user?.active !== false ? 'Active' : 'Inactive' },
                                    ].map(({ icon: Icon, label, value }) => (
                                        <div key={label} className="rounded-2xl border border-slate-100 p-4 bg-slate-50">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Icon className="w-4 h-4 text-slate-400" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
                                            </div>
                                            <p className="text-sm font-bold text-slate-800 truncate">{value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSave} className="space-y-5">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Display Name</label>
                                    <input type="text" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                        placeholder="Your name"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Profile Picture URL</label>
                                    <input type="url" value={form.picture} onChange={e => setForm(p => ({ ...p, picture: e.target.value }))}
                                        placeholder="https://..."
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all" />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button type="submit" disabled={saving}
                                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-blue-600 disabled:opacity-60 transition-all">
                                        {saving ? <Loader className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                    <button type="button" onClick={() => setEditing(false)} disabled={saving}
                                        className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 text-xs font-black uppercase tracking-widest hover:bg-slate-50 disabled:opacity-60 transition-all">
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
