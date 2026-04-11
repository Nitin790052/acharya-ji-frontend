import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Save, Phone, MessageCircle, Award, Mail,
    MapPin, Clock, Globe, Plus, Trash2, Link as LinkIcon, Database
} from 'lucide-react';
import {
    useGetContactSettingsQuery,
    useUpdateContactSettingsMutation,
    useSeedContactSettingsMutation
} from '../../../../../services/contactApi';

export default function ContactManager() {
    const { data: contactSettings, isLoading } = useGetContactSettingsQuery();
    const [updateSettings] = useUpdateContactSettingsMutation();
    const [seedSettings] = useSeedContactSettingsMutation();

    const [form, setForm] = useState({
        quickContacts: [],
        supportInfo: {
            location: '',
            supportHours1: '',
            supportHours2: '',
            serviceArea: ''
        },
        commitments: [],
        mapEmbedUrl: ''
    });

    useEffect(() => {
        if (contactSettings) {
            setForm({
                quickContacts: contactSettings.quickContacts || [],
                supportInfo: contactSettings.supportInfo || {
                    location: '',
                    supportHours1: '',
                    supportHours2: '',
                    serviceArea: ''
                },
                commitments: contactSettings.commitments || [],
                mapEmbedUrl: contactSettings.mapEmbedUrl || ''
            });
        }
    }, [contactSettings]);

    const handleSupportInfoChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            supportInfo: {
                ...prev.supportInfo,
                [name]: value
            }
        }));
    };

    const handleQuickContactChange = (index, field, value) => {
        const updatedQuickContacts = [...form.quickContacts];
        updatedQuickContacts[index] = { ...updatedQuickContacts[index], [field]: value };
        setForm(prev => ({ ...prev, quickContacts: updatedQuickContacts }));
    };

    const addQuickContact = () => {
        setForm(prev => ({
            ...prev,
            quickContacts: [...prev.quickContacts, { title: '', desc: '', iconType: 'phone', action: '' }]
        }));
    };

    const removeQuickContact = (index) => {
        const updatedQuickContacts = form.quickContacts.filter((_, i) => i !== index);
        setForm(prev => ({ ...prev, quickContacts: updatedQuickContacts }));
    };

    const handleCommitmentChange = (index, value) => {
        const updatedCommitments = [...form.commitments];
        updatedCommitments[index] = value;
        setForm(prev => ({ ...prev, commitments: updatedCommitments }));
    };

    const addCommitment = () => {
        setForm(prev => ({
            ...prev,
            commitments: [...prev.commitments, '']
        }));
    };

    const removeCommitment = (index) => {
        const updatedCommitments = form.commitments.filter((_, i) => i !== index);
        setForm(prev => ({ ...prev, commitments: updatedCommitments }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateSettings(form).unwrap();
            toast.success('Contact settings updated successfully!');
            // Reset categories to clean placeholders as requested
            setForm({
                quickContacts: [],
                supportInfo: {
                    location: '',
                    supportHours1: '',
                    supportHours2: '',
                    serviceArea: ''
                },
                commitments: [],
                mapEmbedUrl: ''
            });
        } catch (error) {
            toast.error(error?.data?.message || 'Failed to update settings');
        }
    };

    const handleSeed = async () => {
        if (!window.confirm('This will reset all contact page settings to factory defaults. Continue?')) return;
        try {
            await seedSettings().unwrap();
            toast.success('Settings reset to defaults!');
        } catch (error) {
            toast.error('Failed to seed settings');
        }
    };

    if (isLoading) return <div className="p-8 text-center">Loading settings...</div>;

    const inputClasses = "w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white transition-all";
    const labelClasses = "block text-xs font-black text-gray-700 uppercase tracking-widest mb-1.5";

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 uppercase">Contact Page <span className="text-orange-600">Manager</span></h1>
                    <p className="text-sm text-gray-500 font-medium">Configure help center details and quick contact options</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSeed}
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200"
                    >
                        <Database className="w-4 h-4" /> Quick Seed
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 bg-orange-600 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-orange-700 transition-all shadow-lg hover:shadow-orange-200"
                    >
                        <Save className="w-4 h-4" /> Save Changes
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Quick Contacts Grid */}
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden">
                    <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-50 rounded-lg text-orange-600"><Phone className="w-5 h-5" /></div>
                            <h2 className="text-base font-black text-gray-800 uppercase tracking-wider">Quick Contact Cards</h2>
                        </div>
                        <button type="button" onClick={addQuickContact} className="text-xs font-black text-orange-600 hover:text-orange-700 flex items-center gap-1.5 uppercase tracking-widest transition-colors">
                            <Plus className="w-4 h-4" /> Add Card
                        </button>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {form.quickContacts.map((contact, index) => (
                            <div key={index} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 relative group animate-fade-in">
                                <button type="button" onClick={() => removeQuickContact(index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClasses}>Card Title</label>
                                            <input className={inputClasses} value={contact.title} onChange={e => handleQuickContactChange(index, 'title', e.target.value)} placeholder="e.g. Call / WhatsApp" />
                                        </div>
                                        <div>
                                            <label className={labelClasses}>Icon Type</label>
                                            <select className={inputClasses} value={contact.iconType} onChange={e => handleQuickContactChange(index, 'iconType', e.target.value)}>
                                                <option value="phone">Phone</option>
                                                <option value="message">Message</option>
                                                <option value="award">Award/Ritual</option>
                                                <option value="mail">Mail</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Description</label>
                                        <input className={inputClasses} value={contact.desc} onChange={e => handleQuickContactChange(index, 'desc', e.target.value)} placeholder="Short description..." />
                                    </div>
                                    <div>
                                        <label className={labelClasses}>Action Value (Phone/Email/Link)</label>
                                        <input className={inputClasses} value={contact.action} onChange={e => handleQuickContactChange(index, 'action', e.target.value)} placeholder="e.g. +91 98765 43210" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Support Info & Map */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Support Details */}
                    <div className="bg-white rounded-2xl shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden">
                        <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Clock className="w-5 h-5" /></div>
                            <h2 className="text-base font-black text-gray-800 uppercase tracking-wider">Support Details</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className={labelClasses}>Location Display</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                    <input name="location" className={`${inputClasses} pl-10`} value={form.supportInfo.location} onChange={handleSupportInfoChange} placeholder="e.g. Delhi NCR, India" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClasses}>Hours Line 1</label>
                                    <input name="supportHours1" className={inputClasses} value={form.supportInfo.supportHours1} onChange={handleSupportInfoChange} placeholder="e.g. Monday - Sunday" />
                                </div>
                                <div>
                                    <label className={labelClasses}>Hours Line 2</label>
                                    <input name="supportHours2" className={inputClasses} value={form.supportInfo.supportHours2} onChange={handleSupportInfoChange} placeholder="e.g. 8 AM - 10 PM" />
                                </div>
                            </div>
                            <div>
                                <label className={labelClasses}>Service Area</label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                    <input name="serviceArea" className={`${inputClasses} pl-10`} value={form.supportInfo.serviceArea} onChange={handleSupportInfoChange} placeholder="e.g. Pan-India & International" />
                                </div>
                            </div>
                            <div>
                                <label className={labelClasses}>Google Map Embed URL (src link only)</label>
                                <div className="relative">
                                    <LinkIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                                    <input className={`${inputClasses} pl-10 text-xs`} value={form.mapEmbedUrl} onChange={e => setForm(p => ({ ...p, mapEmbedUrl: e.target.value }))} placeholder="https://www.google.com/maps/embed?..." />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Commitments */}
                    <div className="bg-white rounded-2xl shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden">
                        <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-50 rounded-lg text-green-600"><Award className="w-5 h-5" /></div>
                                <h2 className="text-base font-black text-gray-800 uppercase tracking-wider">Trust Commitments</h2>
                            </div>
                            <button type="button" onClick={addCommitment} className="text-xs font-black text-green-600 hover:text-green-700 flex items-center gap-1.5 uppercase tracking-widest transition-colors">
                                <Plus className="w-4 h-4" /> Add
                            </button>
                        </div>
                        <div className="p-6 space-y-3">
                            {form.commitments.map((commitment, index) => (
                                <div key={index} className="flex items-center gap-3 animate-fade-in">
                                    <div className="flex-grow">
                                        <input className={inputClasses} value={commitment} onChange={e => handleCommitmentChange(index, e.target.value)} placeholder="e.g. 100% Confidentiality" />
                                    </div>
                                    <button type="button" onClick={() => removeCommitment(index)} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            {form.commitments.length === 0 && <p className="text-xs text-gray-400 text-center py-4 font-medium italic">No commitments added yet.</p>}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
