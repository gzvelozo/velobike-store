"use client";

import { Product, getProduct } from "@/lib/products";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface StoredCartItem {
  slug: string;
  quantity: number;
}

const CART_STORAGE_KEY = "velomed-cart";

function saveCart(items: CartItem[]) {
  try {
    const stored: StoredCartItem[] = items.map((i) => ({
      slug: i.product.slug,
      quantity: i.quantity,
    }));
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(stored));
  } catch {}
}

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];

    const stored: StoredCartItem[] = JSON.parse(raw);
    if (!Array.isArray(stored)) return [];

    const seen = new Map<string, CartItem>();
    for (const item of stored) {
      if (
        !item ||
        typeof item.slug !== "string" ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0
      ) {
        continue;
      }

      const product = getProduct(item.slug);
      if (!product) continue;

      const existing = seen.get(item.slug);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        seen.set(item.slug, { product, quantity: item.quantity });
      }
    }
    return Array.from(seen.values());
  } catch {
    return [];
  }
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  hydrated: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setItems(loadCart());
    setHydrated(true);
  }, []);

  // Persist to localStorage on change (skip initial empty state)
  useEffect(() => {
    if (hydrated) {
      saveCart(items);
    }
  }, [items, hydrated]);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.slug === product.slug);
      if (existing) {
        return prev.map((i) =>
          i.product.slug === product.slug
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.product.slug !== slug));
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.product.slug !== slug));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.product.slug === slug ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        hydrated,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
