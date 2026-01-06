// src/components/WatchGrid.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

const WatchGrid = ({
  items = [],
  discountAmount = 0,
}) => {
  const whatsappNumber = "2349037291405";

  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  const { addToCart, cartItemCount, setIsCartOpen } = useCart();

  // ✅ DISCOUNT APPLIED TO ALL ITEMS IN THIS GRID
  const discountedItems = items.map((item) => ({
    ...item,
    price:
      discountAmount > 0
        ? Math.max(0, (item.price || 0) - discountAmount)
        : item.price,
  }));

  // ---------- STATE ----------
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [enlargedMedia, setEnlargedMedia] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    whatsapp: "",
    email: "",
    address: "",
  });

  // ---------- RESPONSIVE PAGE SIZE ----------
  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth >= 768 ? 12 : 6);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // ✅ SCROLL TO TOP WHEN PAGE CHANGES (FIX)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // ---------- HANDLERS ----------
  const handleAddToCart = (item) => addToCart(item);

  const handleSendToWhatsApp = () => {
    if (!formData.fullName || !formData.email || !formData.address) {
      alert("Please fill required fields");
      return;
    }

    const msg = `Hello, I want to buy "${selectedItem.name}" for ${formatter.format(
      selectedItem.price
    )}

Name: ${formData.fullName}
WhatsApp: ${formData.whatsapp}
Email: ${formData.email}
Address: ${formData.address}`;

    window.location.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      msg
    )}`;
  };

  // ---------- FILTER / PAGINATION ----------
  const filteredItems = discountedItems.filter((item) =>
    (item.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / itemsPerPage)
  );

  // ✅ Prevent invalid page index
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="mx-auto max-w-5xl mt-24 px-4">
      {/* TOP BAR */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Search for an item..."
          className="border p-2 w-full max-w-md rounded text-black"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <button
          onClick={() => setIsCartOpen(true)}
          className="border px-4 py-2 rounded bg-white text-black"
        >
          Cart ({cartItemCount})
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {paginatedItems.map((item, index) => (
          <div
            key={item.id ?? index}
            className="border border-gray-700 p-3 rounded-lg bg-black text-white flex flex-col"
          >
            <MediaWithLoader
              src={item.img}
              alt={item.name}
              onClick={() => setEnlargedMedia(item.img)}
            />

            <div className="mt-3 text-center">
              <NameDisplay name={item.name} />
              <p className="mt-2 font-semibold">
                {formatter.format(item.price)}
              </p>
            </div>

            <div className="mt-auto flex flex-col gap-2 pt-4">
              <button
                className="h-10 bg-gray-200 text-black rounded text-sm"
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </button>

              <button
                className="h-10 bg-blue-500 text-white rounded"
                onClick={() => {
                  setSelectedItem(item);
                  setIsFormOpen(true);
                }}
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 my-6 items-center">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="border py-1 px-3 rounded-md"
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="border py-1 px-3 rounded-md"
        >
          Next
        </button>
      </div>

      {/* WHATSAPP MODAL */}
      {isFormOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h2 className="font-semibold mb-3 text-black">
              Order {selectedItem.name}
            </h2>

            {["fullName", "whatsapp", "email", "address"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field}
                className="border p-2 w-full mb-2"
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
              />
            ))}

            <div className="flex gap-2">
              <button
                className="bg-green-500 text-white h-10 rounded w-full"
                onClick={handleSendToWhatsApp}
              >
                Send on WhatsApp
              </button>
              <button
                className="bg-red-500 text-white h-10 rounded w-full"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MEDIA MODAL */}
      {enlargedMedia && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setEnlargedMedia(null)}
        >
          <EnlargedMedia src={enlargedMedia} />
        </div>
      )}
    </div>
  );
};

export default WatchGrid;

/* ---------------- HELPERS ---------------- */

const isVideoUrl = (src = "") => /\.(mp4|mov|webm|ogg)$/i.test(src);

const MediaWithLoader = ({ src, alt, onClick }) =>
  isVideoUrl(src) ? (
    <video
      src={src}
      className="w-full aspect-video rounded"
      muted
      loop
      autoPlay
      controls
      onClick={onClick}
    />
  ) : (
    <img
      src={src}
      alt={alt}
      className="w-full aspect-video object-cover rounded cursor-pointer"
      loading="lazy"
      onClick={onClick}
    />
  );

const EnlargedMedia = ({ src }) =>
  isVideoUrl(src) ? (
    <video
      src={src}
      className="max-w-full max-h-full rounded"
      autoPlay
      loop
      muted
      controls
    />
  ) : (
    <img src={src} className="max-w-full max-h-full rounded" />
  );

const NameDisplay = ({ name = "" }) => {
  const [show, setShow] = React.useState(false);
  const short = name.slice(0, 20) + (name.length > 20 ? "..." : "");
  return (
    <div>
      <h3>{show ? name : short}</h3>
      {name.length > 20 && (
        <button
          className="text-blue-500 text-sm underline"
          onClick={() => setShow(!show)}
        >
          {show ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};
