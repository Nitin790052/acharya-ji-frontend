import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, Star, Award } from 'lucide-react';
import { usePageBanner } from "@/hooks/usePageBanner";
import { BACKEND_URL } from "@/config/apiConfig";


const products = [
  {
    id: 'p1',
    name: 'Premium Dhoop Sticks',
    price: 299,
    image: '/placeholder.svg',
    category: 'Dhoop & Incense',
    rating: 4.8,
    description: 'Natural fragrance, long-lasting',
  },
  {
    id: 'p2',
    name: 'Pure Desi Ghee (500ml)',
    price: 599,
    image: '/placeholder.svg',
    category: 'Puja Essentials',
    rating: 4.9,
    description: 'Made from pure cow milk',
  },
  {
    id: 'p3',
    name: 'Samidha Wood Bundle',
    price: 199,
    image: '/placeholder.svg',
    category: 'Hawan Items',
    rating: 4.7,
    description: 'For hawan and fire rituals',
  },
  {
    id: 'p4',
    name: 'Complete Puja Thali Set',
    price: 1299,
    image: '/placeholder.svg',
    category: 'Puja Kits',
    rating: 4.9,
    description: 'Brass thali with all accessories',
  },
  {
    id: 'p5',
    name: 'Kumkum & Chandan Set',
    price: 149,
    image: '/placeholder.svg',
    category: 'Tilak Items',
    rating: 4.6,
    description: 'Pure and natural ingredients',
  },
  {
    id: 'p6',
    name: 'Cotton Wicks (Pack of 500)',
    price: 99,
    image: '/placeholder.svg',
    category: 'Diya & Wicks',
    rating: 4.5,
    description: 'Ready-to-use wicks for lamps',
  },
  {
    id: 'p7',
    name: 'Camphor Tablets (100g)',
    price: 179,
    image: '/placeholder.svg',
    category: 'Aarti Items',
    rating: 4.8,
    description: 'Pure kapoor for aarti',
  },
  {
    id: 'p8',
    name: 'Ganga Jal (500ml)',
    price: 249,
    image: '/placeholder.svg',
    category: 'Holy Water',
    rating: 4.9,
    description: 'Authentic from Haridwar',
  },
];

export default function PujaEssentials() {
  const { addItem } = useCart();
  const banner = usePageBanner({ pollingInterval: 60000 });
  const bannerImage = banner?.imageUrl ? (banner.imageUrl.startsWith('http') ? banner.imageUrl : `${BACKEND_URL}${banner.imageUrl}`) : null;

  return (
    <Layout>
      <section className="relative h-[320px] sm:h-[320px] md:h-[360px] lg:h-[370px] flex items-center py-[20px] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={bannerImage} alt="Puja Essentials" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(217,119,6,0.2),transparent_50%)]" />
        </div>
        <div className="container mx-auto px-4 relative z-10 w-full animate-fade-in-up">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-8 shadow-2xl">
              <Award className="w-4 h-4 text-[#FFC107]" />
              <span className="text-[#FFC107] text-xs md:text-sm font-black uppercase tracking-widest">{banner.badge || "DIVINE SERVICES HUB"}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] uppercase">
              {banner.titleHighlight1} {banner.titleEnd} <br />
              <span className="text-yellow-300">{banner.titleHighlight2} {banner.titleHighlight3}</span>
            </h1>

            <p className="text-lg md:text-xl text-amber-100 leading-relaxed font-medium max-w-2xl mx-auto mb-8 drop-shadow">
              {banner.subtitle}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {banner.buttons && banner.buttons.length > 0 &&
                banner.buttons.map((btn, idx) => (
                  btn.text && (
                    <button
                      key={idx}
                      onClick={() => btn.link?.startsWith('#') ? document.getElementById(btn.link.substring(1))?.scrollIntoView({ behavior: 'smooth' }) : (btn.link === '#book-pooja' ? window.dispatchEvent(new CustomEvent('openPoojaDrawer')) : (btn.link ? window.location.href = btn.link : null))}
                      className={`group relative ${idx === 0 ? 'bg-[#E8453C] hover:bg-black' : 'bg-[#1A1A1A] hover:bg-orange-600'} text-white px-8 py-4 rounded-none font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl transition-all duration-300 overflow-hidden ${idx !== 0 ? 'border border-white/10' : ''}`}
                    >
                      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <span className="relative flex items-center gap-2.5">{btn.text}</span>
                    </button>
                  )
                ))
              }
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="bg-card rounded-xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
              >
                <div className="aspect-square bg-sandalwood-light relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-1 text-sm text-gold mb-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold">{product.rating}</span>
                  </div>
                  <h3 className="font-bold mb-1 line-clamp-1 text-gray-800 uppercase tracking-tight">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3 font-medium">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-primary">₹{product.price}</span>
                    <Button
                      variant="divine"
                      size="sm"
                      onClick={() => addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        category: product.category,
                      })}
                      className="rounded-lg h-9 w-9 p-0 flex items-center justify-center"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
