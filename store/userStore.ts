import create from 'zustand';

// Define the User and Cart interfaces/types
interface User {
  id: string;
  username: string;
  email: string;
  // Add other properties as needed
}

interface CartItem {
  productId: string;
  quantity: number;
  // Add other properties as needed
}

interface UserState {
  user: User | null;
  cart: CartItem[];
  setUser: (user: User | null) => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || 'null')
      : null,
  cart:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('cart') || '[]')
      : [],
  setUser: (user) => {
    set({ user });
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  },
  addToCart: (item) => {
    set((state) => {
      const updatedCart = [...state.cart, item];
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  },
  removeFromCart: (productId) => {
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.productId !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return { cart: updatedCart };
    });
  },
  clearCart: () => {
    localStorage.removeItem('cart');
    set({ cart: [] });
  },
}));

export default useUserStore;
