import React, { useState, useEffect } from "react";
import { usePaystackPayment } from "react-paystack";
import { useRef } from "react";
import emailjs from "@emailjs/browser";

const WatchGrid = ({ items }) => {
  const whatsappNumber = "2349037291405";
  const publicKey = "pk_live_ba4eb72e1e6122cfe8c2fd97c6a225ded24619f7";

  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    whatsapp: "",
    email: "",
    address: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth >= 768 ? 12 : 6);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handleOpenForm = (item) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container-custom mt-40">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {paginatedItems.map((item, index) => (
          <div
            key={item.id || index}
            className="border p-2 flex flex-col gap-4 rounded-lg card-custom text-center"
          >
            <ImageWithLoader src={item.img} alt={item.name} />
            <NameDisplay name={item.name} />
            <p>{formatter.format(item.price)}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleOpenForm(item)}
            >
              Pay Now
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="px-4 py-2 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Payment Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-lg font-semibold mb-4 text-gray-600">Enter Your Details</h2>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="border p-2 w-full mb-2  text-gray-950"
              value={formData.fullName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="whatsapp"
              placeholder="WhatsApp Number"
              className="border p-2 w-full mb-2 text-gray-950"
              value={formData.whatsapp}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="border p-2 w-full mb-2 text-gray-950"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Delivery Address"
              className="border p-2 w-full mb-2 text-gray-950"
              value={formData.address}
              onChange={handleChange}
            />
            <PayNowButton item={selectedItem} formData={formData} />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded w-full mt-2"
              onClick={() => setIsFormOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Paystack Payment Button Component
const PayNowButton = ({ item, formData }) => {
  if (!item || !formData) return null;

  const initializePayment = usePaystackPayment({
    publicKey: "pk_live_ba4eb72e1e6122cfe8c2fd97c6a225ded24619f7",
    email: formData.email,
    amount: item.price * 100, // Paystack requires amount in kobo
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
    <button
      className="bg-green-500 text-white px-4 py-2 rounded w-full"
      onClick={handlePay}
    >
      Complete Payment
    </button>
  );
};

// Image Loader Component
const ImageWithLoader = React.memo(({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="relative w-full h-32 md:h-40 flex items-center justify-center">
      {isLoading && <div className="loader"></div>}
      <img
        className={`w-full h-full rounded-md object-cover ${isLoading ? "opacity-0" : "opacity-100"}`}
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
});

// Name Display Component
const NameDisplay = React.memo(({ name }) => {
  const [showFullName, setShowFullName] = useState(false);
  return (
    <div className="text-center">
      <h3 className="font-medium">{showFullName ? name : name.slice(0, 20) + (name.length > 20 ? "..." : "")}</h3>
      {name.length > 20 && (
        <button
          onClick={() => setShowFullName(!showFullName)}
          className="text-blue-500 text-sm underline"
        >
          {showFullName ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
});

export default WatchGrid;
