// pages/learn/CourseDetail.jsx
import React, { useEffect } from 'react';
import {
    Clock, Users, Award, Star, CheckCircle, BookOpen, Sparkles,
    ChevronRight, Phone, Shield, PlayCircle, MessageSquare, IndianRupee
} from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Link, useParams } from 'react-router-dom';
import { useGetLearningPageBySlugQuery } from '@/services/learningContentApi';
import { BACKEND_URL, getImageUrl } from '@/config/apiConfig';

import acharya from '../../assets/aboutImage/acharyaji.webp';

const CourseDetail = () => {
    const { slug, itemSlug } = useParams();
    const validSlug = (slug && slug !== 'undefined') ? slug : 'astrology';
    const { data: pageData, isLoading, isError } = useGetLearningPageBySlugQuery(validSlug, {
        skip: validSlug === 'undefined' || !validSlug,
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [itemSlug]);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-orange-50/20">
            <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
        </div>;
    }

    const course = pageData?.items?.find(item => item.slug === itemSlug);

    if (!course) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
                    <div className="text-center">
                        <h2 className="text-3xl font-extrabold text-[#4A3427] mb-4 uppercase">Course Not Found</h2>
                        <Link to={`/learn/${slug}`}>
                            <button className="bg-orange-600 text-white px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-orange-700 transition-colors">
                                Back to {pageData?.pageName || 'Courses'}
                            </button>
                        </Link>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen bg-[#FAF9F6] relative overflow-hidden">
                <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-orange-100/20 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-[20%] left-0 w-[500px] h-[500px] bg-amber-100/20 rounded-full blur-[120px] -z-10" />

                {/* ── Hero ────────────────────────────────────────────────── */}
                <section className="relative h-[320px] sm:h-[340px] md:h-[360px] lg:h-[380px] flex items-center text-white overflow-hidden">
                    <div className="absolute inset-0">
                        {(() => {
                            const mediaSrc = getImageUrl(course.image);
                            const isVideo = mediaSrc?.match(/\.(mp4|webm|ogg)$/i);
                            return isVideo ? (
                                <video src={mediaSrc} autoPlay loop muted playsInline className="w-full h-full object-cover object-top" />
                            ) : (
                                <img src={mediaSrc || 'https://via.placeholder.com/1200x600?text=Course'} alt={course.title} className="w-full h-full object-cover object-top" />
                            );
                        })()}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />
                        <div className="absolute inset-0 backdrop-blur-[1px]" />
                    </div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                            {/* Breadcrumb */}
                            <div className="flex items-center justify-center gap-2 mb-6 text-[10px] font-bold uppercase tracking-widest text-white/70">
                                <Link to={`/learn/${slug}`} className="hover:text-amber-400 transition-colors">{pageData.pageName}</Link>
                                <ChevronRight className="w-3 h-3" />
                                <span className="text-amber-400">{course.title}</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-6 shadow-2xl">
                                <Award className="w-4 h-4 text-[#FFC107]" />
                                <span className="text-[#FFC107] text-xs font-serif font-bold uppercase tracking-[0.2em]">{course.level} Level Course</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-3 leading-tight drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] uppercase tracking-wide">
                                {course.title}
                            </h1>
                            <p className="text-lg text-amber-100 leading-relaxed font-medium max-w-2xl mx-auto italic opacity-90 drop-shadow">
                                {course.description}
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── Overview + Enroll Card ───────────────────────────────── */}
                <section className="py-12 md:py-16 bg-white overflow-x-hidden relative">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <div className="grid lg:grid-cols-3 gap-10 items-start">

                            {/* Overview Left */}
                            <div className="lg:col-span-2 animate-slide-in-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[11px] font-bold uppercase tracking-wider mb-5">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>Course Overview</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
                                    What You Will <span className="text-orange-600">Learn</span>
                                </h2>
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                    <Sparkles className="w-5 h-5 text-orange-400" />
                                    <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                </div>
                                <p className="text-gray-700 font-medium text-sm md:text-base leading-relaxed mb-8">{course.description}</p>

                                {/* Key Highlights */}
                                <div className="bg-orange-50/60 border border-orange-100 p-6 mb-8">
                                    <h3 className="text-sm font-black text-[#2A1D13] uppercase tracking-widest mb-5">Course Curriculum Highlights</h3>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {course.modules?.map((m, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center flex-shrink-0 border border-orange-100 shadow-sm mt-0.5">
                                                    <CheckCircle className="w-3.5 h-3.5 text-orange-600" />
                                                </div>
                                                <span className="text-[11px] font-bold text-[#4A3427] uppercase tracking-wide leading-snug">{m}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="flex flex-wrap gap-6">
                                    {[
                                        { icon: Clock, label: 'Duration', value: course.duration },
                                        { icon: Users, label: 'Enrolled', value: `${course.students}+ Students` },
                                        { icon: Award, label: 'Level', value: course.level },
                                        { icon: Star, label: 'Rating', value: `${course.rating}.0 / 5.0` },
                                    ].map(({ icon: Icon, label, value }) => (
                                        <div key={label} className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100">
                                                <Icon className="w-5 h-5 text-orange-600" />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
                                                <p className="text-xs font-black text-[#2A1D13] uppercase">{value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Enroll Card Right */}
                            <div className="lg:col-span-1 animate-slide-in-right">
                                <div className="sticky top-24 bg-white border-b-[6px] border-orange-500 shadow-2xl p-8">
                                    <div className="relative mb-5 rounded-xl overflow-hidden h-44">
                                        {(() => {
                                            const mediaSrc = getImageUrl(course.image);
                                            const isVideo = mediaSrc?.match(/\.(mp4|webm|ogg)$/i);
                                            return isVideo ? (
                                                <video src={mediaSrc} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                                            ) : (
                                                <img src={mediaSrc || 'https://via.placeholder.com/400x300?text=Course'} alt={course.title} className="w-full h-full object-cover" />
                                            );
                                        })()}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute top-3 left-3 bg-amber-400 text-black px-3 py-1 text-[9px] font-black uppercase tracking-widest">
                                            {course.level}
                                        </div>
                                        <PlayCircle className="absolute inset-0 m-auto w-12 h-12 text-white/80 hover:text-white transition-colors cursor-pointer" />
                                    </div>
                                    <div className="mb-6">
                                        <div className="flex items-end gap-2 mb-1">
                                            <span className="text-4xl font-black text-orange-600">₹{course.price?.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <button className="w-full bg-[#E8453C] hover:bg-black text-white font-black text-xs uppercase tracking-[0.2em] py-4 mb-3 transition-all shadow-lg">
                                        Enroll Now
                                    </button>
                                    <button className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-black text-xs uppercase tracking-[0.2em] py-3 flex items-center justify-center gap-2 mb-6 transition-all shadow-md">
                                        <Phone className="w-4 h-4" /> WhatsApp to Enroll
                                    </button>
                                    <div className="space-y-3">
                                        {[
                                            { icon: Clock, text: `Duration: ${course.duration}` },
                                            { icon: Users, text: `${course.students}+ students enrolled` },
                                            { icon: Shield, text: '30-day money-back guarantee' },
                                            { icon: BookOpen, text: 'Lifetime access to materials' },
                                            { icon: Award, text: 'Certificate of completion' },
                                        ].map(({ icon: Icon, text }) => (
                                            <div key={text} className="flex items-center gap-3 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                                                <Icon className="w-4 h-4 text-orange-600 flex-shrink-0" />
                                                <span>{text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Instructor ────────────────────────────────────────────── */}
                <section className="py-12 md:py-16 bg-white relative overflow-hidden">
                    <div className="absolute top-1/2 right-0 translate-y-1/2 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl -z-10" />
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                                <Award className="w-3.5 h-3.5" />
                                <span>Your Guide</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 uppercase">
                                Learn From <span className="text-orange-600">Acharya Ji</span>
                            </h2>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-12 h-1 bg-orange-200 rounded-full" />
                                <Sparkles className="w-5 h-5 text-orange-400" />
                                <div className="w-12 h-1 bg-orange-200 rounded-full" />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-8 items-center bg-[#FFFDF7] border border-orange-100 p-8 shadow-lg">
                            <div className="w-40 h-40 flex-shrink-0 rounded-full overflow-hidden border-4 border-orange-200 shadow-xl">
                                <img src={acharya} alt="Acharya Ji" className="w-full h-full object-cover object-top" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-[#4A3427] uppercase mb-1">Acharya Ji</h3>
                                <p className="text-[10px] font-black uppercase tracking-widest text-orange-600 mb-4">Vedic Astrologer • Jyotish Acharya • Spiritual Teacher</p>
                                <p className="text-gray-600 text-sm font-medium leading-relaxed mb-5">
                                    With over 25 years of experience in Vedic Astrology, Numerology, and spiritual sciences, Acharya Ji has guided thousands of students and clients across India and internationally.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default CourseDetail;
