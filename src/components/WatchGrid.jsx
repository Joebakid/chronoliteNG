// src/components/WatchGrid.jsx
"use client";

import React, { useState, useEffect } from "react";

/**
 * WatchGrid
 * Props:
 *  - items: array of { id?, name, img (url to image or video), price }
 */
const WatchGrid = ({ items = [], Btn = null }) => {
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
  const [enlargedMedia, setEnlargedMedia] = useState(null);

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth >= 768 ? 12 : 6);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setEnlargedMedia(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
      alert("Please fill in all required fields (Name, Email, Address).");
      return;
    }

    const message = encodeURIComponent(
      `Hello, I'm interested in buying "${selectedItem?.name}" priced at ${formatter.format(
        selectedItem?.price ?? 0
      )}.\n\nHere are my details:\nName: ${formData.fullName}\nWhatsApp: ${formData.whatsapp}\nEmail: ${formData.email}\nAddress: ${formData.address}`
    );

    // Redirect to WhatsApp chat
    window.location.href = `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  const filteredItems = items.filter((item) =>
    (item?.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container-custom mt-40 px-4">
      {/* SEARCH BAR */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search for an item..."
          className="border p-2 w-full max-w-md rounded text-black outline-none"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* WATCH GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {paginatedItems.map((item, index) => (
          <div
            key={item.id ?? index}
        className="border border-gray-700 p-2 flex flex-col rounded-lg card-custom text-center h-full min-h-[350px] bg-black text-white"

          >
            <div className="py-2 flex-grow">
              <MediaWithLoader
                src={item.img}
                alt={item.name}
                onClick={() => setEnlargedMedia(item.img)}
              />
              <NameDisplay name={item.name} />
              <p className="mt-2 font-semibold">{formatter.format(item.price ?? 0)}</p>
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

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="px-4 py-2 border rounded disabled:opacity-50"
          onClick={() => {
            if (currentPage > 1) {
              setCurrentPage((p) => p - 1);
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 50);
            }
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
              setCurrentPage((p) => p + 1);
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }, 50);
            }
          }}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* WHATSAPP FORM */}
      {isFormOpen && selectedItem && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md mx-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-600">Enter Your Details</h2>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
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
              placeholder="Email Address *"
              className="border p-2 w-full mb-2 text-gray-950"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Delivery Address *"
              className="border p-2 w-full mb-2 text-gray-950"
              value={formData.address}
              onChange={handleChange}
            />

            <div className="flex gap-2 mt-2">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded w-full"
                onClick={handleSendToWhatsApp}
              >
                Send on WhatsApp
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded w-full"
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
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={() => setEnlargedMedia(null)}
        >
          <div className="max-w-[95%] max-h-[95%]" onClick={(e) => e.stopPropagation()}>
            <EnlargedMedia src={enlargedMedia} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchGrid;

/* -------------------------
   Helper components below
   ------------------------- */

/**
 * extract file id from many Drive link patterns
 */
function extractDriveId(raw) {
  if (!raw) return null;
  const m1 = raw.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (m1) return m1[1];
  const m2 = raw.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (m2) return m2[1];
  const m3 = raw.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (m3) return m3[1];
  return null;
}

/**
 * build candidate drive urls (download/view/media) + original as fallback
 */
function buildDriveCandidates(raw) {
  const id = extractDriveId(raw);
  if (!id) return [raw];
  return [
    `https://drive.google.com/uc?export=download&id=${id}`,
    `https://drive.google.com/uc?export=view&id=${id}`,
    `https://drive.google.com/uc?export=media&id=${id}`,
    // docs alternative
    `https://docs.google.com/uc?export=download&id=${id}`,
    raw,
  ];
}

const isVideoUrl = (src = "") => /\.(mp4|mov|webm|ogg|mkv)$/i.test(src);

/**
 * MediaWithLoader component:
 * - tries candidates one-by-one (useful for Drive)
 * - thumbnails autoplay muted
 */
const MediaWithLoader = React.memo(({ src, alt, onClick }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const candidates = React.useMemo(() => buildDriveCandidates(src), [src]);
  const currentSrc = candidates[candidateIndex] || src;
  const video = isVideoUrl(currentSrc);

  useEffect(() => {
    setIsLoading(true);
    setFailed(false);
    setCandidateIndex(0);
  }, [src]);

  const tryNextCandidate = () => {
    if (candidateIndex < candidates.length - 1) {
      setCandidateIndex((i) => i + 1);
      setIsLoading(true);
      return true;
    }
    return false;
  };

  const handleError = (ev) => {
    const hasNext = tryNextCandidate();
    if (!hasNext) {
      setFailed(true);
      setIsLoading(false);
    }
    console.error("Media error for src:", currentSrc, ev);
  };

  return (
    <div
      className="relative w-full h-32 md:h-40 flex items-center justify-center cursor-pointer overflow-hidden rounded-md bg-gray-50"
      onClick={onClick}
    >
      {isLoading && !failed && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="loader" />
        </div>
      )}

      {failed ? (
        <div className="p-4 text-center">
          <div className="mb-2 text-sm text-gray-500">Could not load media</div>
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 underline text-sm"
          >
            Open original
          </a>
        </div>
      ) : video ? (
        <video
          src={currentSrc}
          className={`w-full h-full rounded-md object-cover transition-opacity ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          crossOrigin="anonymous"
          onLoadedData={() => setIsLoading(false)}
          onCanPlay={() => setIsLoading(false)}
          onError={handleError}
        />
      ) : (
        <img
          src={currentSrc}
          alt={alt}
          className={`w-full h-full rounded-md object-cover transition-opacity ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
          onError={handleError}
        />
      )}
    </div>
  );
});

/**
 * EnlargedMedia - modal content (controls available so user can unmute)
 */
const EnlargedMedia = ({ src }) => {
  const candidates = buildDriveCandidates(src);
  // prefer the download variant first
  const primary = candidates[0];
  const isVideo = isVideoUrl(primary);

  if (isVideo) {
    return (
      <video
        src={primary}
        className="max-w-full max-h-full rounded-lg shadow-lg"
        autoPlay
        loop
        muted
        controls
        playsInline
        preload="metadata"
        crossOrigin="anonymous"
      />
    );
  }
  return <img src={primary} alt="Enlarged Media" className="max-w-full max-h-full rounded-lg shadow-lg" />;
};

/**
 * NameDisplay - truncated name with show more toggle
 */
const NameDisplay = React.memo(({ name = "" }) => {
  const [showFullName, setShowFullName] = useState(false);
  const short = name.slice(0, 20) + (name.length > 20 ? "..." : "");
  return (
    <div className="text-center mt-2">
      <h3 className="font-medium">{showFullName ? name : short}</h3>
      {name.length > 20 && (
        <button
          onClick={() => setShowFullName((s) => !s)}
          className="text-blue-500 text-sm underline mt-1"
        >
          {showFullName ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
});
