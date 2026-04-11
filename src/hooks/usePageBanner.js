import { useLocation } from 'react-router-dom';
import { useGetActiveBannersQuery } from '../services/heroBannerApi';

export const usePageBanner = (options = {}) => {
    const location = useLocation();
    const { data: bannersData } = useGetActiveBannersQuery(undefined, options);

    const defaultContent = {
        '/about': {
            badge: 'DIVINE SERVICES HUB',
            titleHighlight1: 'About Our',
            titleHighlight2: 'Divine',
            titleHighlight3: 'Journey',
            titleEnd: '',
            subtitle: 'Discover the story behind Acharya Ji Online — our mission to bring authentic Vedic traditions and spiritual guidance to seekers worldwide.',
            imageUrl: null,
            metaTitle: 'About Us - Sacred Vedic Spiritual Journey',
            metaDescription: 'Learn about the mission and history of Acharya Ji Online, bringing authentic Vedic puja and astrology guidance to the modern world.',
            metaKeywords: 'about acharya ji, vedic path, spiritual mission'
        },
        '/career': {
            badge: 'DIVINE SERVICES HUB',
            titleHighlight1: 'Empowering Ancient',
            titleHighlight2: 'Traditions via',
            titleHighlight3: 'Modern',
            titleEnd: 'Expertise',
            subtitle: "Join India's most trusted spiritual network of learned Acharyas, Astrologers, and Wellness Experts dedicated to preserving Vedic wisdom.",
            imageUrl: null
        },
        '/gallery': {
            badge: 'DIVINE SERVICES HUB',
            titleHighlight1: 'Sacred Moments',
            titleHighlight2: '&',
            titleHighlight3: 'Divine',
            titleEnd: 'Rituals',
            subtitle: 'Experience the sanctity of Vedic traditions through our captured moments. Real pujas, real blessings, real spiritual journeys.',
            imageUrl: null
        },
        '/media': {
            badge: 'DIVINE SERVICES HUB',
            titleHighlight1: 'Acharya Ji in',
            titleHighlight2: 'Media &',
            titleHighlight3: 'Public',
            titleEnd: 'Platforms',
            subtitle: 'Spreading Vedic wisdom, performing sacred rituals, and guiding thousands through traditional wisdom and spiritual enlightenment.',
            imageUrl: null,
            metaTitle: 'Media & Press - Acharya Ji in the Spotlight',
            metaDescription: 'Explore Acharya Ji\'s appearances in news, events, and spiritual conferences across the globe.',
            metaKeywords: 'acharya ji media, astrology news, vedic events'
        },
        '/pujaServices': {
            badge: 'DIVINE SERVICES HUB',
            titleHighlight1: 'Authentic Vedic',
            titleHighlight2: 'Puja Rituals',
            titleHighlight3: '& Divine',
            titleEnd: 'Services',
            subtitle: 'Experience sacred rituals performed by qualified Acharyas. Book online or for home-visit ceremonies with authentic Vedic precision.',
            imageUrl: null
        },
        '/pujaServices/bookPuja': {
            badge: 'DIVINE SERVICES HUB',
            titleHighlight1: 'Book Authentic Puja with',
            titleHighlight2: 'Experienced',
            titleHighlight3: 'Acharyas',
            titleEnd: '',
            subtitle: 'Sacred Rituals Performed as per Vedic Shastras. Online & Home Visit Puja Services available across India with verified experts.',
            imageUrl: null
        },
        '/contact': {
            badge: 'DIVINE SERVICES HUB',
            titleHighlight1: 'Get in Touch with',
            titleHighlight2: 'Acharya Ji',
            titleHighlight3: 'Online',
            titleEnd: '',
            subtitle: 'Puja booking, astrology consultation, kundli queries, vastu guidance ya general questions — hum aapki madad ke liye yahan hain.',
            imageUrl: null
        },
        '/reiki-healing': {
            badge: 'DIVINE SERVICES HUB',
            titleHighlight1: 'Restore Balance to Your',
            titleHighlight2: 'Mind, Body',
            titleHighlight3: '& Soul',
            titleEnd: '',
            subtitle: 'Experience divine universal energy healing to remove blocks, reduce stress, and restore natural harmony.',
            imageUrl: null
        },
        '/crystal-healing': {
            badge: 'DIVINE SERVICES HUB',
            titleHighlight1: "Unlock Nature's",
            titleHighlight2: 'Secret',
            titleHighlight3: 'Vibrations',
            titleEnd: '',
            subtitle: 'Harness the ancient power of gemstones to align your chakras, clarify your mind, and manifest abundance.',
            imageUrl: null
        },
        '/vastu-consultation': {
            badge: 'DIVINE SERVICES HUB',
            titleHighlight1: 'Balance Your',
            titleHighlight2: 'Space with',
            titleHighlight3: 'Vastu',
            titleEnd: '',
            subtitle: 'Enhance prosperity and peace through ancient architectural wisdom and energy alignment for your home or office.',
            imageUrl: null
        },
        '/kundli': {
            badge: 'DIVINE SERVICES HUB',
            titleHighlight1: 'Get Your Free',
            titleHighlight2: 'Janam',
            titleHighlight3: 'Kundli',
            titleEnd: '',
            subtitle: 'Discover your destiny through Vedic astrology. Generate your personalized birth chart instantly.',
            imageUrl: null
        },
        '/shop-puja-samagri': {
            badge: 'DIVINE SERVICES HUB',
            titleHighlight1: 'Authentic',
            titleHighlight2: 'Puja',
            titleHighlight3: 'Samagri',
            titleEnd: 'Store',
            subtitle: 'Shop for lab-tested gemstones, energized rudrakshas, and premium puja essentials for your spiritual practices.',
            imageUrl: null
        },
        '/samagri/essentials': {
            badge: 'DIVINE SERVICES HUB',
            titleHighlight1: 'Premium',
            titleHighlight2: 'Puja',
            titleHighlight3: 'Essentials',
            titleEnd: '',
            subtitle: 'Complete range of high-quality items for your daily rituals and special ceremonies.',
            imageUrl: null
        },
        '/astrologer': {
            badge: 'DIVINE SERVICES HUB',
            titleHighlight1: 'Talk to India\'s',
            titleHighlight2: 'Top',
            titleHighlight3: 'Astrologers',
            titleEnd: '',
            subtitle: 'Get instant guidance on career, marriage, and life problems from verified Vedic experts. First 5 minutes FREE!',
            imageUrl: null
        },
        '/learn-astrology-courses': {
            badge: 'DIVINE SERVICES HUB',
            titleHighlight1: 'Learn Ancient',
            titleHighlight2: 'Vedic',
            titleHighlight3: 'Wisdom',
            titleEnd: '',
            subtitle: 'Master the art of Astrology, Numerology, and Vastu through our comprehensive certified courses.',
            imageUrl: null
        },
        '/blog': {
            badge: 'DIVINE SERVICES HUB',
            titleHighlight1: 'Explore Sacred',
            titleHighlight2: 'Spiritual',
            titleHighlight3: 'Insights',
            titleEnd: '',
            subtitle: 'Authentic insights on Puja, Astrology & Vedic traditions curated for your spiritual growth.',
            imageUrl: null
        }
    };

    const banner = bannersData?.find(b => b.pagePath === location.pathname) || defaultContent[location.pathname] || {
        badge: 'DIVINE SERVICES HUB',
        titleHighlight1: 'Welcome to',
        titleHighlight2: 'Divine',
        titleHighlight3: 'Services',
        titleEnd: '',
        subtitle: 'Spiritual guidance and authentic Vedic traditions for your well-being.',
        imageUrl: null,
        metaTitle: 'Acharya Ji Online - Divine Spiritual Guidance',
        metaDescription: 'Your trusted partner for Puja, Astrology, and Vedic rituals. Experience authentic spiritual wellbeing with our learned Acharyas.',
        metaKeywords: 'spiritual guidance, puja online, astrology expert'
    };

    return banner;
};
