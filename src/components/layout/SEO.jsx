import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useGetSEOByPageNameQuery } from '../../services/seoApi';

const SEO = ({ pageName, title, description, keywords, canonical, image, type = 'website', schemaData }) => {
  const { data: seoConfig } = useGetSEOByPageNameQuery(pageName, { skip: !pageName });

  const siteName = "Acharya Ji Online";
  const defaultDescription = "Professional Astrology Services, Puja, and Spiritual Consultations by Acharya Ji Online.";
  const defaultKeywords = "astrology, puja, online pandit, kundli, career advice";
  const siteUrl = "https://acharya-ji.com"; // Adjust to your actual domain

  // Prioritize explicit props, then CMS fetched config, then fallback defaults
  const metaTitle = title || seoConfig?.title || siteName;
  const metaDescription = description || seoConfig?.description || defaultDescription;
  const metaKeywords = keywords || seoConfig?.keywords || defaultKeywords;
  const metaCanonical = canonical || seoConfig?.canonical || siteUrl;
  const metaImage = image || seoConfig?.ogImage || `${siteUrl}/default-og-image.jpg`; 
  const finalType = seoConfig?.ogType || type;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={metaCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={finalType} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaCanonical} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Robots Tag */}
      <meta name="robots" content="index, follow" />

      {/* Structured Data (JSON-LD) */}
      {(schemaData || seoConfig?.structuredData) && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData || seoConfig?.structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
