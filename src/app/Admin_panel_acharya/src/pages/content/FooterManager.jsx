import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Save, Plus, Trash2, Link as LinkIcon, Database } from 'lucide-react';
import { useGetFooterSettingsQuery, useUpdateFooterSettingsMutation, useSeedFooterSettingsMutation } from '../../../../../services/footerApi';

export default function FooterManager() {
    const { data: settings, isLoading } = useGetFooterSettingsQuery();
    const [updateSettings] = useUpdateFooterSettingsMutation();
    const [seedFooter] = useSeedFooterSettingsMutation();

    const [form, setForm] = useState({
        description: '', facebookUrl: '', instagramUrl: '', twitterUrl: '', youtubeUrl: '',
        address: '', phone: '', email: '',
        serviceLinks: [], astrologyLinks: [], companyLinks: [], productLinks: [],
        privacyPolicyUrl: '', termsOfServiceUrl: '', refundPolicyUrl: ''
    });

    useEffect(() => {
        if (settings) setForm({ ...settings });
    }, [settings]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateSettings(form).unwrap();
            toast.success('Footer updated!');
        } catch { toast.error('Update failed'); }
    };

    const onSeed = async () => {
        if (window.confirm('This will replace current footer data with defaults. Continue?')) {
            try {
                await seedFooter().unwrap();
                toast.success('Footer seeded!');
            } catch { toast.error('Seed failed'); }
        }
    };

    const addLink = (target) => setForm(p => ({ ...p, [target]: [...p[target], { label: '', href: '' }] }));
    const removeLink = (target, i) => setForm(p => ({ ...p, [target]: p[target].filter((_, idx) => idx !== i) }));
    const updateLink = (target, i, field, val) => {
        const newL = [...form[target]];
        newL[i] = { ...newL[i], [field]: val };
        setForm(p => ({ ...p, [target]: newL }));
    };

    const inputCls = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white";
    const labelCls = "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide";

    if (isLoading) return <div className="p-10 text-center font-bold text-gray-400">Loading settings...</div>;

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <ToastContainer position="top-right" autoClose={2500} />
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase">Footer <span className="text-orange-600">Manager</span></h1>
                    <p className="text-sm text-gray-500 font-medium">Manage footer description, social links, contact info, and navigation columns</p>
                </div>
                <button type="button" onClick={onSeed} className="flex items-center gap-2 bg-amber-50 text-amber-600 px-4 py-2 rounded-lg font-bold text-sm border border-amber-100 hover:bg-amber-100 transition-all">
                    <Database className="w-4 h-4" /> Seed Default Data
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Brand & Social Column */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border p-5">
                        <h2 className="text-sm font-bold text-gray-700 mb-4 border-b pb-2 flex items-center gap-2 uppercase tracking-tight">
                            <Layout className="w-4 h-4" /> Brand Info
                        </h2>
                        <div className="space-y-4">
                            <div><label className={labelCls}>Description</label><textarea className={inputCls} rows={3} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} /></div>
                            <div className="grid grid-cols-2 gap-3">
                                <div><label className={labelCls}>Facebook</label><input className={inputCls} value={form.facebookUrl} onChange={e => setForm(p => ({ ...p, facebookUrl: e.target.value }))} /></div>
                                <div><label className={labelCls}>Instagram</label><input className={inputCls} value={form.instagramUrl} onChange={e => setForm(p => ({ ...p, instagramUrl: e.target.value }))} /></div>
                                <div><label className={labelCls}>Twitter</label><input className={inputCls} value={form.twitterUrl} onChange={e => setForm(p => ({ ...p, twitterUrl: e.target.value }))} /></div>
                                <div><label className={labelCls}>Youtube</label><input className={inputCls} value={form.youtubeUrl} onChange={e => setForm(p => ({ ...p, youtubeUrl: e.target.value }))} /></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border p-5">
                        <h2 className="text-sm font-bold text-gray-700 mb-4 border-b pb-2 flex items-center gap-2 uppercase tracking-tight">
                            <Mail className="w-4 h-4" /> Contact Information
                        </h2>
                        <div className="space-y-4">
                            <div><label className={labelCls}><MapPin className="w-3 h-3 inline mr-1" /> Office Address</label><input className={inputCls} value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} /></div>
                            <div><label className={labelCls}><Phone className="w-3 h-3 inline mr-1" /> Phone Number</label><input className={inputCls} value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} /></div>
                            <div><label className={labelCls}><Mail className="w-3 h-3 inline mr-1" /> Email Address</label><input className={inputCls} value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} /></div>
                            
                            <div className="pt-2 border-t mt-4">
                                <h3 className="text-[10px] font-black text-gray-400 uppercase mb-3">Legal Pages</h3>
                                <div className="grid grid-cols-1 gap-2">
                                    <input className={inputCls} value={form.privacyPolicyUrl} onChange={e => setForm(p => ({ ...p, privacyPolicyUrl: e.target.value }))} placeholder="Privacy Policy URL" />
                                    <input className={inputCls} value={form.termsOfServiceUrl} onChange={e => setForm(p => ({ ...p, termsOfServiceUrl: e.target.value }))} placeholder="Terms URL" />
                                    <input className={inputCls} value={form.refundPolicyUrl} onChange={e => setForm(p => ({ ...p, refundPolicyUrl: e.target.value }))} placeholder="Refund URL" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Links Grid */}
                <div className="bg-white rounded-xl shadow-sm border p-5">
                    <h2 className="text-sm font-bold text-gray-700 mb-4 border-b pb-2 flex items-center gap-2 uppercase tracking-tight">
                        <LinkIcon className="w-4 h-4" /> Navigation Links Columns
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {['serviceLinks', 'astrologyLinks', 'companyLinks', 'productLinks'].map(target => (
                            <div key={target} className="space-y-3">
                                <div className="flex justify-between items-center border-b border-gray-50 pb-1">
                                    <h3 className="text-xs font-black text-amber-600 uppercase tracking-widest">{target.replace('Links', ' Services')}</h3>
                                    <button type="button" onClick={() => addLink(target)} className="p-0.5 text-amber-600 hover:bg-amber-50 rounded"><Plus className="w-4 h-4" /></button>
                                </div>
                                <div className="space-y-2 max-h-[400px] overflow-y-auto px-1">
                                    {form[target]?.map((link, i) => (
                                        <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-100 space-y-2 relative group">
                                            <button type="button" onClick={() => removeLink(target, i)} className="absolute -top-1 -right-1 p-1 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-all scale-75"><Trash2 className="w-3 h-3" /></button>
                                            <input className="w-full text-[10px] uppercase font-black tracking-tight bg-transparent border-b border-gray-200 focus:outline-none" placeholder="Label" value={link.label} onChange={e => updateLink(target, i, 'label', e.target.value)} />
                                            <input className="w-full text-[10px] text-gray-400 bg-transparent focus:outline-none italic" placeholder="URL (/...)" value={link.href} onChange={e => updateLink(target, i, 'href', e.target.value)} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button type="submit" className="flex items-center gap-2 bg-amber-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-amber-700 transition-all shadow-lg hover:-translate-y-1">
                        <Save className="w-5 h-5" /> Save Footer Settings
                    </button>
                </div>
            </form>
        </div>
    );
}
