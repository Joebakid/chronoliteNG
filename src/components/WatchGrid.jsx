"use client"

import React, { useState, useEffect } from "react";
import { useRef } from "react";


const WatchGrid = ({ items }) => {
  const whatsappNumber = "2349037291405";

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


  const [searchTerm, setSearchTerm] = useState("");



 

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth >= 768 ? 12 : 6);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // const totalPages = Math.ceil(items.length / itemsPerPage);

  const handleOpenForm = (item) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendToWhatsApp = () => {
    if (!formData.fullName || !formData.email || !formData.address) {
      alert("Please fill in all fields before proceeding.");
      return;
    }

    const message = encodeURIComponent(
      `Hello, I'm interested in buying "${selectedItem.name}" priced at ₦${selectedItem.price}.
      
Here are my details:
Name: ${formData.fullName}
WhatsApp: ${formData.whatsapp}
Email: ${formData.email}
Address: ${formData.address}`
    );

    window.location.href = `https://wa.me/${whatsappNumber}?text=${message}`;
  };
// 

// 
const filteredItems = items.filter((item) =>
  item.name.toLowerCase().includes(searchTerm.toLowerCase())
);

const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

const paginatedItems = filteredItems.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);


  return (
    <div className="container-custom mt-40">

      {/*SEARCH BAR  */}
      <div className="mb-6 flex justify-center">
  <input
    type="text"
    placeholder="Search for a watch..."
    className="border p-2 w-full max-w-md rounded text-black outline-none"
    value={searchTerm}
    onChange={(e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1); // Reset to first page on search
    }}
  />
</div>


      {/*  */}


      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {paginatedItems.map((item, index) => (
          <div
            key={item.id || index}
            className="border p-2 flex flex-col rounded-lg card-custom text-center h-full min-h-[350px]"
          >
            <div className="py-2 flex-grow">
              <ImageWithLoader src={item.img} alt={item.name} />
              <NameDisplay name={item.name} />
              <p>{formatter.format(item.price)}</p>
            </div>

            <div className="mt-auto">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                onClick={() => handleOpenForm(item)}
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="px-4 py-2 border rounded disabled:opacity-50"
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage(currentPage - 1);
            }
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }, 50);
          }}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="px-4 py-2 border rounded disabled:opacity-50"
          onClick={() => {
            if (currentPage < totalPages) {
              setCurrentPage(currentPage + 1);
            }
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }, 50);
          }}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* WhatsApp Form */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-lg font-semibold mb-4 text-gray-600">
              Enter Your Details
            </h2>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="border p-2 w-full mb-2 text-gray-950"
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
            <button
              className="bg-green-500 text-white px-4 py-2 rounded w-full"
              onClick={handleSendToWhatsApp}
            >
              Send on WhatsApp
            </button>
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

// Image Loader Component
const ImageWithLoader = React.memo(({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="relative w-full h-32 md:h-40 flex items-center justify-center">
      {isLoading && <div className="loader"></div>}
      <img
        className={`w-full h-full rounded-md object-cover ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
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
      <h3 className="font-medium">
        {showFullName
          ? name
          : name.slice(0, 20) + (name.length > 20 ? "..." : "")}
      </h3>
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
