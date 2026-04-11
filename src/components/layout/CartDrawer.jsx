import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, totalPrice, totalItems } = useCart();

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
        className="fixed left-0 top-0 h-full w-full max-w-md bg-card shadow-2xl z-50 flex flex-col animate-slide-in-left"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-divine flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold">Your Cart</h2>
              <p className="text-sm text-muted-foreground">{totalItems} items</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCartOpen(false)}
            className="rounded-full hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center h-full text-center animate-fade-in"
            >
              <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4">
                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground text-sm">
                Add some divine items to your cart
              </p>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={item.id}
                className="bg-muted/50 rounded-xl p-4 flex gap-4 animate-fade-in-left"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
              >
                <div className="w-20 h-20 rounded-lg bg-sandalwood-light overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-primary font-medium">{item.category}</p>
                  <h4 className="font-semibold truncate">{item.name}</h4>
                  <p className="text-primary font-bold">₹{item.price}</p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-background flex items-center justify-center hover:bg-primary/10 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-background flex items-center justify-center hover:bg-primary/10 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-6 space-y-4 animate-fade-in-up">
            <div className="flex items-center justify-between text-lg">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-serif font-bold text-xl">₹{totalPrice.toLocaleString()}</span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Shipping & taxes calculated at checkout
            </p>
            <Button variant="divine" size="xl" className="w-full">
              Proceed to Checkout
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setIsCartOpen(false)}
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
