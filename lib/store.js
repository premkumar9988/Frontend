import { create } from "zustand";

export const useStore = create((set) => ({
  cart: [],
  user: null,

  setUser: (user) => set({ user }),

  addToCart: (book) =>
    set((state) => {
      const exists = state.cart.find((i) => i.id === book.id);
      if (exists) {
        return {
          cart: state.cart.map((i) =>
            i.id === book.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { cart: [...state.cart, { ...book, qty: 1 }] };
    }),

  updateQty: (id, qty) =>
    set((state) => ({
      cart: state.cart.map((i) =>
        i.id === id ? { ...i, qty } : i
      ),
    })),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((i) => i.id !== id),
    })),

  clearCart: () => set({ cart: [] }),
}));