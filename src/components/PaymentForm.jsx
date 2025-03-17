import React, { useState } from "react";
import { usePaystackPayment } from "react-paystack";

const PaymentForm = ({ item, onClose }) => {
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

  const initializePayment = usePaystackPayment({
    publicKey: "pk_live_ba4eb72e1e6122cfe8c2fd97c6a225ded24619f7",
    email: formData.email,
    amount: item?.price * 100, // Paystack requires amount in kobo
    currency: "NGN",
  });

  const handlePay = () => {
    if (!formData.fullName || !formData.email || !formData.address) {
      alert("Please fill in all fields before proceeding.");
      return;
    }

    initializePayment({
      onSuccess: (response) => {
        alert(`Payment successful! Ref: ${response.reference}`);
        const message = encodeURIComponent(
          `Hello, I just paid for "${item.name}" priced at ₦${item.price}. My payment reference is ${response.reference}.
          \nHere are my details:
          \nName: ${formData.fullName}
          \nWhatsApp: ${formData.whatsapp}
          \nEmail: ${formData.email}
          \nAddress: ${formData.address}`
        );
        window.location.href = `https://wa.me/2349037291405?text=${message}`;
      },
      onClose: () => {
        alert("Payment canceled.");
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">Enter Your Details</h2>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="border p-2 w-full mb-2"
          value={formData.fullName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="whatsapp"
          placeholder="WhatsApp Number"
          className="border p-2 w-full mb-2"
          value={formData.whatsapp}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="border p-2 w-full mb-2"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Delivery Address"
          className="border p-2 w-full mb-2"
          value={formData.address}
          onChange={handleChange}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
          onClick={handlePay}
        >
          Complete Payment
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded w-full mt-2"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
