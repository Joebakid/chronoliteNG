// src/context/CartContext.jsx
import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // [{ key, item, quantity }]
  const [isCartOpen, setIsCartOpen] = useState(false);

  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  const makeItemKey = (item) =>
    item.id ?? `${item.name ?? "item"}-${item.price ?? 0}`;

  // ---------- CART ACTIONS ----------
  const addToCart = (item) => {
    const key = makeItemKey(item);
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.key === key);
      if (existing) {
        return prev.map((ci) =>
          ci.key === key ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { key, item, quantity: 1 }];
    });
  };

  const increaseQty = (key) => {
    setCartItems((prev) =>
      prev.map((ci) =>
        ci.key === key ? { ...ci, quantity: ci.quantity + 1 } : ci
      )
    );
  };

  const decreaseQty = (key) => {
    setCartItems((prev) =>
      prev
        .map((ci) =>
          ci.key === key ? { ...ci, quantity: ci.quantity - 1 } : ci
        )
        .filter((ci) => ci.quantity > 0)
    );
  };

  const removeFromCart = (key) => {
    setCartItems((prev) => prev.filter((ci) => ci.key !== key));
  };

  const clearCart = () => setCartItems([]);

  // ---------- TOTALS ----------
  const cartItemCount = cartItems.reduce(
    (sum, ci) => sum + ci.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (sum, ci) => sum + (ci.item.price ?? 0) * ci.quantity,
    0
  );

  const value = useMemo(
    () => ({
      cartItems,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      increaseQty,
      decreaseQty,
      removeFromCart,
      clearCart,
      cartItemCount,
      cartTotal,
      formatter,
    }),
    [
      cartItems,
      isCartOpen,
      cartItemCount,
      cartTotal,
      formatter,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
};
