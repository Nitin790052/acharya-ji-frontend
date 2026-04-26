import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import aboutFallback from "../../assets/aboutImage/acharyaji.webp"
import SectionHeader from '../common/SectionHeader';
import { useGetActiveAboutUsQuery } from '../../services/aboutUsApi';
import { API_URL, getImageUrl } from '../../config/apiConfig';


export function About() {
  const { data: aboutData, isLoading, isError } = useGetActiveAboutUsQuery(undefined, {
    pollingInterval: 60000,
    refetchOnMountOrArgChange: true
  });

  if (isLoading || isError || !aboutData) {
    return null;
  }

  const {
    badge,
    title,
    description1,
    description2,
    features = [],
    imageUrl,
    buttonText,
    buttonLink,
    button2Text,
    button2Link
  } = aboutData;

  const displayImage = getImageUrl(imageUrl) || aboutFallback;

  return (
    <section className="py-14 overflow-hidden bg-white">
      <div className="container mx-auto px-3">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Image Side */}
          <div className="relative animate-slide-in-left">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden" style={{ backgroundColor: '#fef2f2' }}>
              {/* Subtle coral tint overlay */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(232,69,60,0.08) 0%, rgba(232,69,60,0.04) 100%)' }} />

              {/* Main Image */}
              <img
                src={displayImage}
                alt={aboutData.imageAlt || title || "About Acharya Ji"}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>
          </div>

          {/* Content Side */}
          <div className="animate-fade-in-up">
            <SectionHeader
              badge={badge || "About Us"}
              title={title || "Bringing Divine Blessings to Your Home"}
              className="text-left mb-6"
            />
            { (description1 || aboutData.description) && (
              <p className="text-gray-600 mb-5 leading-relaxed text-sm">
                {description1 || aboutData.description}
              </p>
            )}
            {description2 && (
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                {description2}
              </p>
            )}

            {(features && features.length > 0) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1.5 p-2 rounded-lg animate-fade-in-right"
                    style={{ backgroundColor: 'rgba(232,69,60,0.05)', animationDelay: `${index * 0.08}s`, animationFillMode: 'both' }}
                  >
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#E8453C' }} />
                    <span className="text-xs text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {buttonText && (
                <Link
                  to={buttonLink || "/about"}
                  className="inline-flex items-center px-5 py-2.5 rounded-lg font-semibold text-white text-sm transition-all duration-300 hover:opacity-90 hover:shadow-lg"
                  style={{ backgroundColor: '#E8453C' }}
                >
                  {buttonText}
                </Link>
              )}
              {button2Text && (
                <Link
                  to={button2Link || "/contact"}
                  className="inline-flex items-center px-5 py-2.5 rounded-lg font-semibold text-sm border-2 transition-all duration-300 hover:text-white"
                  style={{ borderColor: '#E8453C', color: '#E8453C' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#E8453C'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#E8453C'; }}
                >
                  {button2Text}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
