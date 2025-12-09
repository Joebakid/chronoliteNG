// src/components/CartSidebar.jsx
import { useState } from "react";
import { useCart } from "../context/CartContext";

const whatsappNumber = "2349037291405";

export default function CartSidebar() {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    increaseQty,
    decreaseQty,
    removeFromCart,
    cartItemCount,
    cartTotal,
    watchTotal,
    bagOffer,
    nextTierInfo,
    formatter,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    whatsapp: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckoutWhatsApp = () => {
    if (!formData.fullName || !formData.email || !formData.address) {
      alert("Please fill in Name, Email and Address.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    let message = "Hello, I'm interested in buying these items:\n\n";

    cartItems.forEach((ci, index) => {
      const lineTotal = (ci.item.price ?? 0) * ci.quantity;
      message += `${index + 1}. ${ci.item.name} x${
        ci.quantity
      } - ${formatter.format(lineTotal)}\n`;
    });

    message += `\nCart total: ${formatter.format(cartTotal)}\n`;
    message += `Watch total (for promo): ${formatter.format(
      watchTotal
    )}\n`;

    if (bagOffer) {
      message += `\nPromo: Based on my watch order, I qualify for a FREE bag worth up to ${formatter.format(
        bagOffer.maxValue
      )}.\n`;
    } else {
      message += `\nPromo: My watch total does not yet qualify for a free bag.\n`;
    }

    message += `\n\nHere are my details:\nName: ${
      formData.fullName
    }\nWhatsApp: ${formData.whatsapp}\nEmail: ${
      formData.email
    }\nAddress: ${formData.address}`;

    const encoded = encodeURIComponent(message);
    window.location.href = `https://wa.me/${whatsappNumber}?text=${encoded}`;

    // optional: clearCart();
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="bg-white w-full max-w-md h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Your Cart</h2>
          <button
            className="text-gray-600 text-sm"
            onClick={() => setIsCartOpen(false)}
          >
            Close
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 && (
            <p className="text-sm text-gray-600">
              Your cart is empty. Add some items to get started.
            </p>
          )}

          {cartItems.map((ci) => (
            <div
              key={ci.key}
              className="flex items-center justify-between border rounded p-2 text-sm"
            >
              <div className="flex-1 pr-2">
                <p className="font-medium text-gray-800">
                  {ci.item.name}
                </p>
                <p className="text-gray-600">
                  {formatter.format(ci.item.price ?? 0)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="border rounded px-2 py-1 text-xs"
                  onClick={() => decreaseQty(ci.key)}
                >
                  -
                </button>
                <span>{ci.quantity}</span>
                <button
                  className="border rounded px-2 py-1 text-xs"
                  onClick={() => increaseQty(ci.key)}
                >
                  +
                </button>
              </div>

              <button
                className="ml-2 text-xs text-red-500"
                onClick={() => removeFromCart(ci.key)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Summary + Promo + Form */}
        <div className="border-t p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Items:</span>
            <span>{cartItemCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700">Total:</span>
            <span className="font-semibold">
              {formatter.format(cartTotal)}
            </span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm mt-1">
            <span className="text-gray-700">Watch total (promo):</span>
            <span className="font-medium">
              {formatter.format(watchTotal)}
            </span>
          </div>

          <div className="mt-2">
            {bagOffer ? (
              <p className="text-green-600 text-xs sm:text-sm">
                ✅ Promo unlocked: {bagOffer.label} (based on your watch order)
              </p>
            ) : (
              <p className="text-gray-600 text-xs sm:text-sm">
                No free bag yet. Increase your watch total to unlock a free bag.
              </p>
            )}

            {nextTierInfo && (
              <p className="text-gray-600 text-xs sm:text-sm mt-1">
                Add around{" "}
                <span className="font-semibold">
                  {formatter.format(nextTierInfo.diff)}
                </span>{" "}
                more in watches. {nextTierInfo.label}
              </p>
            )}
          </div>

          {/* Checkout form */}
          <div className="mt-3 space-y-2">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
              className="border p-2 w-full text-gray-950 text-xs sm:text-sm"
              value={formData.fullName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="whatsapp"
              placeholder="WhatsApp Number"
              className="border p-2 w-full text-gray-950 text-xs sm:text-sm"
              value={formData.whatsapp}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              className="border p-2 w-full text-gray-950 text-xs sm:text-sm"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Delivery Address *"
              className="border p-2 w-full text-gray-950 text-xs sm:text-sm"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <button
            className="mt-3 w-full bg-blue-600 text-white py-2 rounded disabled:opacity-50"
            disabled={cartItems.length === 0}
            onClick={handleCheckoutWhatsApp}
          >
            Checkout via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
