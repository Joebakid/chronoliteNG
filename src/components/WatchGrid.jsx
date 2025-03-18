import React, { useState, useEffect, useRef } from "react";
import { usePaystackPayment } from "react-paystack";

const WatchGrid = ({ items }) => {
  const whatsappNumber = "2349037291405";
  const publicKey = "pk_live_ba4eb72e1e6122cfe8c2fd97c6a225ded24619f7";
  const gridRef = useRef(null);

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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container-custom mt-40" ref={gridRef}>
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
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 border rounded disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const PayNowButton = ({ item, formData }) => {
  if (!item || !formData) return null;

  const initializePayment = usePaystackPayment({
    publicKey: "pk_live_ba4eb72e1e6122cfe8c2fd97c6a225ded24619f7",
    email: formData.email,
    amount: item.price * 100,
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
        window.location.href = `https://wa.me/${whatsappNumber}?text=${message}`;
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