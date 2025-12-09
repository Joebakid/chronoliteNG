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
  // ❌ no more setIsCartOpen(true) here
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

  const cartItemCount = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, ci) => sum + (ci.item.price ?? 0) * ci.quantity,
    0
  );

  // ---------- WATCH-ONLY TOTAL (for promo) ----------
  const isWatchItem = (item = {}) => {
    const type = (item.type || item.category || "").toLowerCase();
    const name = (item.name || "").toLowerCase();

    if (type.includes("watch")) return true;
    if (name.includes("watch")) return true;

    return false;
  };

  const watchTotal = cartItems.reduce(
    (sum, ci) =>
      isWatchItem(ci.item)
        ? sum + (ci.item.price ?? 0) * ci.quantity
        : sum,
    0
  );

  const getBagOffer = (total) => {
    if (total >= 60000) {
      return {
        tier: 3,
        maxValue: 20000,
        label: "Free bag worth up to ₦20,000",
      };
    }
    if (total >= 55000) {
      return {
        tier: 2,
        maxValue: 15000,
        label: "Free bag worth up to ₦15,000",
      };
    }
    if (total >= 50000) {
      return {
        tier: 1,
        maxValue: 10000,
        label: "Free bag worth up to ₦10,000",
      };
    }
    return null;
  };

  const bagOffer = getBagOffer(watchTotal);

  const getNextTierInfo = (total) => {
    if (total < 50000) {
      return {
        nextAt: 50000,
        diff: 50000 - total,
        label:
          "Add more watches to reach ₦50,000 and get a free bag worth up to ₦10,000.",
      };
    }
    if (total < 55000) {
      return {
        nextAt: 55000,
        diff: 55000 - total,
        label:
          "Add a bit more in watches to reach ₦55,000 and upgrade to a free bag worth up to ₦15,000.",
      };
    }
    if (total < 60000) {
      return {
        nextAt: 60000,
        diff: 60000 - total,
        label:
          "Add a bit more in watches to reach ₦60,000 and upgrade to a free bag worth up to ₦20,000.",
      };
    }
    return null;
  };

  const nextTierInfo = getNextTierInfo(watchTotal);

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
      watchTotal,
      bagOffer,
      nextTierInfo,
      formatter,
    }),
    [
      cartItems,
      isCartOpen,
      cartItemCount,
      cartTotal,
      watchTotal,
      bagOffer,
      nextTierInfo,
      formatter,
    ]
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
};
