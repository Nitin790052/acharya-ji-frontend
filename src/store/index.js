import { configureStore } from '@reduxjs/toolkit';
import { navbarApi } from '../services/navbarApi';
import { heroBannerApi } from '../services/heroBannerApi';
import { aboutUsApi } from '../services/aboutUsApi';
import { serviceApi } from '../services/serviceApi';
import { popularPujaApi } from '../services/popularPujaApi';
import { astrologerApi } from '../services/astrologerApi';
import { kundliApi } from '../services/kundliApi';
import { vastuApi } from '../services/vastuApi';
import { testimonialApi } from '../services/testimonialApi';
import { blogApi } from '../services/blogApi';
import { appDownloadApi } from '../services/appDownloadApi';
import { faqApi } from '../services/faqApi';
import { footerApi } from '../services/footerApi';
import { aboutPageApi } from '../services/aboutPageApi';
import { pujaOfferingApi } from '../services/pujaOfferingApi';
import { bookingApi } from '../services/bookingApi';
import { bookPujaContentApi } from '../services/bookPujaContentApi';
import { careerContentApi } from '../services/careerContentApi';
import { mediaApi } from '../services/mediaApi';
import { galleryApi } from '../services/galleryApi';
import { contactApi } from '../services/contactApi';
import { seoApi } from '../services/seoApi';
import { astrologyContentApi } from '../services/astrologyContentApi';
import { kundliContentApi } from '../services/kundliContentApi';
import { vastuContentApi } from '../services/vastuContentApi';
import { healingContentApi } from '../services/healingContentApi';
import { dynamicShopApi } from '../services/dynamicShopApi';
import { courseApi } from '../services/courseApi';
import { learningContentApi } from '../services/learningContentApi';
import { universalContentApi } from '../services/universalContentApi';
import { userApi } from '../services/userApi';
import cartReducer from './slices/cartSlice';

export const store = configureStore({

    reducer: {
        cart: cartReducer,
        [navbarApi.reducerPath]: navbarApi.reducer,
        [heroBannerApi.reducerPath]: heroBannerApi.reducer,
        [aboutUsApi.reducerPath]: aboutUsApi.reducer,
        [serviceApi.reducerPath]: serviceApi.reducer,
        [popularPujaApi.reducerPath]: popularPujaApi.reducer,
        [astrologerApi.reducerPath]: astrologerApi.reducer,
        [kundliApi.reducerPath]: kundliApi.reducer,
        [vastuApi.reducerPath]: vastuApi.reducer,
        [testimonialApi.reducerPath]: testimonialApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [appDownloadApi.reducerPath]: appDownloadApi.reducer,
        [faqApi.reducerPath]: faqApi.reducer,
        [footerApi.reducerPath]: footerApi.reducer,
        [aboutPageApi.reducerPath]: aboutPageApi.reducer,
        [pujaOfferingApi.reducerPath]: pujaOfferingApi.reducer,
        [bookingApi.reducerPath]: bookingApi.reducer,
        [bookPujaContentApi.reducerPath]: bookPujaContentApi.reducer,
        [careerContentApi.reducerPath]: careerContentApi.reducer,
        [mediaApi.reducerPath]: mediaApi.reducer,
        [galleryApi.reducerPath]: galleryApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
        [seoApi.reducerPath]: seoApi.reducer,
        [astrologyContentApi.reducerPath]: astrologyContentApi.reducer,
        [kundliContentApi.reducerPath]: kundliContentApi.reducer,
        [vastuContentApi.reducerPath]: vastuContentApi.reducer,
        [healingContentApi.reducerPath]: healingContentApi.reducer,
        [dynamicShopApi.reducerPath]: dynamicShopApi.reducer,
        [courseApi.reducerPath]: courseApi.reducer,
        [learningContentApi.reducerPath]: learningContentApi.reducer,
        [universalContentApi.reducerPath]: universalContentApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            navbarApi.middleware,
            heroBannerApi.middleware,
            aboutUsApi.middleware,
            serviceApi.middleware,
            popularPujaApi.middleware,
            astrologerApi.middleware,
            kundliApi.middleware,
            vastuApi.middleware,
            testimonialApi.middleware,
            blogApi.middleware,
            appDownloadApi.middleware,
            faqApi.middleware,
            footerApi.middleware,
            aboutPageApi.middleware,
            pujaOfferingApi.middleware,
            bookingApi.middleware,
            bookPujaContentApi.middleware,
            careerContentApi.middleware,
            mediaApi.middleware,
            galleryApi.middleware,
            contactApi.middleware,
            seoApi.middleware,
            astrologyContentApi.middleware,
            kundliContentApi.middleware,
            vastuContentApi.middleware,
            healingContentApi.middleware,
            dynamicShopApi.middleware,
            courseApi.middleware,
            learningContentApi.middleware,
            universalContentApi.middleware,
            userApi.middleware
        ),
});

