import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Smartphone, Zap, Clock, Shield, Star, Save, Plus, Trash2 } from 'lucide-react';
import { useGetAppDownloadSettingsQuery, useUpdateAppDownloadSettingsMutation } from '../../../../../services/appDownloadApi';

export default function AppDownloadManager() {
    const { data: settings, isLoading } = useGetAppDownloadSettingsQuery();
    const [updateSettings] = useUpdateAppDownloadSettingsMutation();
    const [form, setForm] = useState({
        badge: '', title: '', subtitle: '',
        googlePlayUrl: '', appStoreUrl: '',
        offerTitle: '', offerDescription: '', offerButtonText: '',
        features: [], stats: []
    });

    useEffect(() => {
        if (settings) setForm({ ...settings });
    }, [settings]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateSettings(form).unwrap();
            toast.success('App Download settings updated!');
        } catch { toast.error('Update failed'); }
    };

    const addFeature = () => setForm(p => ({ ...p, features: [...p.features, { icon: 'Zap', text: '' }] }));
    const removeFeature = (i) => setForm(p => ({ ...p, features: p.features.filter((_, idx) => idx !== i) }));
    const updateFeature = (i, val) => {
        const newF = [...form.features];
        newF[i].text = val;
        setForm(p => ({ ...p, features: newF }));
    };

    const addStat = () => setForm(p => ({ ...p, stats: [...p.stats, { number: '', label: '' }] }));
    const removeStat = (i) => setForm(p => ({ ...p, stats: p.stats.filter((_, idx) => idx !== i) }));
    const updateStat = (i, field, val) => {
        const newS = [...form.stats];
        newS[i][field] = val;
        setForm(p => ({ ...p, stats: newS }));
    };

    const inputCls = "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-white";
    const labelCls = "block text-xs font-semibold text-gray-900 mb-1 uppercase tracking-wide";

    if (isLoading) return <div className="p-10 text-center font-bold text-gray-400">Loading settings...</div>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <ToastContainer position="top-right" autoClose={2500} />
            <div className="mb-6">
                <h1 className="text-2xl font-black text-gray-900 uppercase">App Download <span className="text-orange-600">Manager</span></h1>
                <p className="text-sm text-gray-500 font-medium">Manage APP CTA content, download links, and stats markers</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Header Information */}
                <div className="bg-white rounded-xl shadow-sm border p-5">
                    <h2 className="text-base font-bold text-gray-700 mb-4 border-b pb-2 italic">Headers & Links</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div><label className={labelCls}>Badge</label><input className={inputCls} value={form.badge} onChange={e => setForm(p => ({ ...p, badge: e.target.value }))} /></div>
                        <div className="md:col-span-2"><label className={labelCls}>Title</label><input className={inputCls} value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} /></div>
                        <div className="md:col-span-3"><label className={labelCls}>Subtitle</label><textarea className={inputCls} rows={2} value={form.subtitle} onChange={e => setForm(p => ({ ...p, subtitle: e.target.value }))} /></div>
                        
                        <div className="md:col-span-1.5"><label className={labelCls}>Google Play URL</label><input className={inputCls} value={form.googlePlayUrl} onChange={e => setForm(p => ({ ...p, googlePlayUrl: e.target.value }))} /></div>
                        <div className="md:col-span-1.5"><label className={labelCls}>App Store URL</label><input className={inputCls} value={form.appStoreUrl} onChange={e => setForm(p => ({ ...p, appStoreUrl: e.target.value }))} /></div>
                    </div>
                </div>

                {/* Features & Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl shadow-sm border p-5">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h2 className="text-base font-bold text-gray-700 italic">Features</h2>
                            <button type="button" onClick={addFeature} className="p-1 px-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100 hover:bg-red-100"><Plus className="w-3 h-3 inline mr-1" /> Add</button>
                        </div>
                        <div className="space-y-3">
                            {form.features.map((f, i) => (
                                <div key={i} className="flex gap-2 items-center">
                                    <div className="p-2 bg-gray-50 rounded border text-gray-400 capitalize text-[10px] font-bold w-16 text-center">{f.icon}</div>
                                    <input className={inputCls} value={f.text} onChange={e => updateFeature(i, e.target.value)} placeholder="Feature text..." />
                                    <button type="button" onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border p-5">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h2 className="text-base font-bold text-gray-700 italic">Stats</h2>
                            <button type="button" onClick={addStat} className="p-1 px-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100 hover:bg-red-100"><Plus className="w-3 h-3 inline mr-1" /> Add</button>
                        </div>
                        <div className="space-y-3">
                            {form.stats.map((s, i) => (
                                <div key={i} className="flex gap-2 items-center">
                                    <input className={`${inputCls} w-24`} value={s.number} onChange={e => updateStat(i, 'number', e.target.value)} placeholder="50K+" />
                                    <input className={inputCls} value={s.label} onChange={e => updateStat(i, 'label', e.target.value)} placeholder="Downloads" />
                                    <button type="button" onClick={() => removeStat(i)} className="text-red-400 hover:text-red-600 p-1"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Offer Banner */}
                <div className="bg-white rounded-xl shadow-sm border p-5">
                    <h2 className="text-base font-bold text-gray-700 mb-4 border-b pb-2 italic">Bottom Offer Banner</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div><label className={labelCls}>Offer Title</label><input className={inputCls} value={form.offerTitle} onChange={e => setForm(p => ({ ...p, offerTitle: e.target.value }))} /></div>
                        <div className="md:col-span-2"><label className={labelCls}>Offer Description</label><input className={inputCls} value={form.offerDescription} onChange={e => setForm(p => ({ ...p, offerDescription: e.target.value }))} /></div>
                        <div><label className={labelCls}>Button Text</label><input className={inputCls} value={form.offerButtonText} onChange={e => setForm(p => ({ ...p, offerButtonText: e.target.value }))} /></div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button type="submit" className="flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg hover:-translate-y-1">
                        <Save className="w-5 h-5" /> Save All Changes
                    </button>
                </div>
            </form>
        </div>
    );
}
