"use client";

/* LeBonBureau — cart state.
   Persisted to localStorage (key "lbb_cart") for now. The provider exposes
   the same operations the prototype's app.js did, but as React state. */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  id: string;
  name: string;
  color: string;
  size: string;
  price: number;
  qty: number;
  /** Denormalized from the product so the cart needs no catalogue lookup. */
  photo?: number;
  categoryLabel?: string;
}

const CART_KEY = "lbb_cart";

export function itemKey(i: CartItem): string {
  return i.id + "|" + i.color + "|" + i.size;
}

interface CartContextValue {
  items: CartItem[];
  /** Hydrated from localStorage yet? Avoids SSR/client count mismatch. */
  ready: boolean;
  qty: number;
  total: number;
  addToCart: (entry: CartItem) => void;
  setItemQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  // Hydrate once on mount.
  useEffect(() => {
    try {
      setItems((JSON.parse(localStorage.getItem(CART_KEY) || "[]") as CartItem[]) || []);
    } catch {
      setItems([]);
    }
    setReady(true);
  }, []);

  // Persist on every change (once hydrated).
  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items, ready]);

  const addToCart = useCallback((entry: CartItem) => {
    setItems((cart) => {
      const key = itemKey(entry);
      const found = cart.find((i) => itemKey(i) === key);
      if (found) {
        return cart.map((i) => (itemKey(i) === key ? { ...i, qty: i.qty + entry.qty } : i));
      }
      return [...cart, entry];
    });
  }, []);

  const setItemQty = useCallback((key: string, qty: number) => {
    setItems((cart) =>
      cart.map((i) => (itemKey(i) === key ? { ...i, qty: Math.max(1, Math.min(9, qty)) } : i))
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((cart) => cart.filter((i) => itemKey(i) !== key));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const qty = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);
  const total = useMemo(() => items.reduce((n, i) => n + i.price * i.qty, 0), [items]);

  const value: CartContextValue = {
    items,
    ready,
    qty,
    total,
    addToCart,
    setItemQty,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
