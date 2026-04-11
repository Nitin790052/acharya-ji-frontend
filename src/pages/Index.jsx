import { Layout } from '@/components/layout/Layout';
import HeroBanner from '@/components/home/HeroBanner';
import { Services } from '@/components/home/Services';
import { About } from '@/components/home/About';
import { FAQ } from '@/components/home/FAQ';
import PopularPujaServices from '../components/home/PopularServices';
import TalkToAstrologer from '../components/home/TalkToAstrologer';
import KundliServices from '../components/home/KundliServices';
import VastuRemediesHealing from '../components/home/VastuRemediesHealing';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';
import BlogsKnowledge from '../components/home/BlogsKnowledge';
import AppDownloadCTA from '../components/home/AppDownloadCTA';
import { usePageBanner } from '@/hooks/usePageBanner';
import SEO from '@/components/layout/SEO';

const Index = () => {
  const banner = usePageBanner({ pollingInterval: 3000 });

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Acharya Ji Online",
    "url": "https://acharya-ji.com",
    "logo": "https://acharya-ji.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "customer service"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Acharya Ji Online",
    "image": "https://acharya-ji.com/featured-image.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Noida, Sector XX",
      "addressLocality": "Noida",
      "addressRegion": "UP",
      "postalCode": "201301",
      "addressCountry": "IN"
    },
    "url": "https://acharya-ji.com",
    "telephone": "+91-XXXXXXXXXX"
  };

  return (
    <Layout>
      <SEO 
        pageName="home"
        title={banner.metaTitle} 
        description={banner.metaDescription} 
        keywords={banner.metaKeywords}
        canonical={banner.canonicalUrl}
        schemaData={[organizationSchema, localBusinessSchema]}
      />
      <HeroBanner />
      <About />
      <Services />
      <PopularPujaServices />
      <TalkToAstrologer />
      <KundliServices />
      <VastuRemediesHealing />
      {/* <WhyChooseUs /> */}
      <Testimonials />
      <BlogsKnowledge />
      <AppDownloadCTA />
      <FAQ />
      {/* <CTA /> */}
      {/* <HowItWorks /> */}
    </Layout>
  );
};

export default Index;
