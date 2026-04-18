import { X, Minus, Plus, Trash2, ShoppingBag, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { getImageUrl } from '@/config/apiConfig';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '@/store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

export function CartDrawer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: samagriItems, isCartOpen, setIsCartOpen, updateQuantity, removeItem, totalPrice: samagriTotal, totalItems: samagriCount } = useCart();
  
  // Get Pooja items from Redux
  const poojaItems = useSelector(state => state.cart?.cartItems || []);
  const poojaTotal = useSelector(state => state.cart?.cartTotal || 0);
  
  const totalItems = samagriCount + poojaItems.length;
  const totalPrice = samagriTotal + poojaTotal;

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 animate-fade-in"
      />

      {/* Drawer */}
      <div
        className="fixed right-0 md:right-auto md:left-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-slide-in-left"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-orange-50/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E8453C] flex items-center justify-center shadow-lg">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-slate-800">Your Sacred Cart</h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#E8453C]">{totalItems} selections</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCartOpen(false)}
            className="rounded-full hover:bg-red-50 hover:text-[#E8453C]"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {totalItems === 0 ? (
            <div
              className="flex flex-col items-center justify-center h-full text-center animate-fade-in"
            >
              <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-4 border border-slate-100">
                <ShoppingBag className="w-12 h-12 text-slate-300" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2 text-slate-400">Your cart is empty</h3>
              <p className="text-slate-400 text-sm">
                Add some divine services or items to your cart
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Pooja Items Section */}
              {poojaItems.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-[#E8453C]"></span>
                     <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Pooja Services</h3>
                  </div>
                  {poojaItems.map((item, index) => (
                    <div
                      key={`pooja-${item.id}`}
                      className="group bg-orange-50/30 hover:bg-orange-50 border border-orange-100/50 rounded-2xl p-4 flex gap-4 transition-all duration-300"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                        <img
                          src={getImageUrl(item.imageUrl)}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-slate-800 truncate uppercase tracking-tight">{item.title}</h4>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[10px] font-medium text-slate-500">
                           <span className="flex items-center gap-1"><Calendar size={10} className="text-[#E8453C]" /> {item.date}</span>
                           <span className="flex items-center gap-1"><Clock size={10} className="text-[#E8453C]" /> {item.time}</span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                           <p className="text-[#E8453C] font-black text-sm">₹{item.price}</p>
                           <button
                             onClick={() => dispatch(removeFromCart({ id: item.id }))}
                             className="p-1.5 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-500 transition-all border border-transparent hover:border-red-100"
                           >
                             <Trash2 className="w-3.5 h-3.5" />
                           </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Samagri Items Section */}
              {samagriItems.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                     <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Puja Samagri</h3>
                  </div>
                  {samagriItems.map((item, index) => (
                    <div
                      key={`samagri-${item.id}`}
                      className="group bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl p-4 flex gap-4 transition-all duration-300"
                    >
                      <div className="w-16 h-16 rounded-xl bg-white overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] text-[#E8453C] font-black uppercase tracking-wider">{item.category}</p>
                        <h4 className="font-bold text-sm text-slate-800 truncate">{item.name}</h4>
                        <div className="flex items-center justify-between mt-3">
                           <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-slate-100">
                             <button
                               onClick={() => updateQuantity(item.id, item.quantity - 1)}
                               className="w-6 h-6 rounded-md bg-slate-50 flex items-center justify-center hover:bg-red-50 hover:text-[#E8453C] transition-colors"
                             >
                               <Minus className="w-3 h-3" />
                             </button>
                             <span className="font-bold text-xs w-5 text-center text-slate-700">{item.quantity}</span>
                             <button
                               onClick={() => updateQuantity(item.id, item.quantity + 1)}
                               className="w-6 h-6 rounded-md bg-slate-50 flex items-center justify-center hover:bg-orange-50 hover:text-orange-600 transition-colors"
                             >
                               <Plus className="w-3 h-3" />
                             </button>
                           </div>
                           <p className="font-black text-sm text-slate-800">₹{item.price}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="self-start p-1.5 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-500 transition-all border border-transparent hover:border-red-100"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {totalItems > 0 && (
          <div className="border-t border-slate-100 p-6 space-y-4 bg-slate-50/30">
            <div className="flex items-center justify-between text-lg">
              <span className="text-slate-500 font-bold text-sm uppercase tracking-widest">Grand Total</span>
              <span className="font-serif font-black text-2xl text-[#E8453C]">₹{totalPrice.toLocaleString()}</span>
            </div>
            <p className="text-[10px] text-slate-400 text-center italic font-medium">
              * Dedicated Panditji and premium samagri are included
            </p>
            <div className="space-y-3 pt-2">
                <Button 
                    className="w-full bg-[#E8453C] hover:bg-[#c73530] text-white rounded-xl py-7 font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-red-500/20 transition-all hover:-translate-y-0.5"
                    onClick={() => {
                       setIsCartOpen(false);
                       navigate('/cart');
                    }}
                >
                  Complete Checkout
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-slate-500 hover:text-[#E8453C] font-bold text-[10px] uppercase tracking-widest"
                  onClick={() => setIsCartOpen(false)}
                >
                  Add More Offerings
                </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
