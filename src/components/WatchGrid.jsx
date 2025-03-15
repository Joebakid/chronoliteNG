import React, { useState, useEffect } from "react";
import { PaystackButton } from "react-paystack";
import { v4 as uuidv4 } from "uuid";

function WatchGrid({ items }) {
  const whatsappNumber = "2349037291405"; // Your WhatsApp number
  const publicKey = "pk_live_ba4eb72e1e6122cfe8c2fd97c6a225ded24619f7"; // Replace with your Paystack public key
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  // Fix: Keep original price as a number for Paystack while formatting for display
  const formattedItems = items.map((item) => ({
    ...item,
    formattedPrice: formatter.format(item.price), // Display price
  }));

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(formattedItems.length / itemsPerPage);
  const paginatedItems = formattedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handlePaymentSuccess = (response, item) => {
    console.log("Payment Successful", response);

    // Redirect user to WhatsApp with payment confirmation
    const message = encodeURIComponent(
      `Hello, I just paid for "${item.name}" priced at ${item.formattedPrice}. My payment reference is ${response.reference}.`
    );
    window.location.href = `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  return (
    <div className="container-custom mt-40">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {paginatedItems.map((item) => (
          <div
            key={uuidv4()}
            className="border p-4 flex flex-col gap-4 rounded-lg card-custom transition-custom text-center"
          >
            <ImageWithLoader src={item.img} alt={item.name} />
            <NameDisplay name={item.name} />
            <p>{item.formattedPrice}</p>

            {/* Paystack Button - Corrected Amount Calculation */}
            <PaystackButton
              className="bg-blue-500 text-white px-4 py-2 rounded"
              amount={item.price * 100} // Convert to kobo without formatting issues
              email={`user-${Date.now()}@paystack.com`} // Generates a unique email for Paystack
              publicKey={publicKey}
              text="Pay Now"
              onSuccess={(response) => handlePaymentSuccess(response, item)}
            />

            {/* Direct WhatsApp Contact */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                `Hello, I'm interested in "${item.name}" priced at ${item.formattedPrice}. Here is the image link: ${item.img}`
              )}`}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Contact on WhatsApp
            </a>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 gap-2">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 text-black"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt;&lt;
        </button>

        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 text-black"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  );
}

// ImageWithLoader Component
function ImageWithLoader({ src, alt }) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className="relative w-full h-72 flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="loader"></div>
        </div>
      )}
      <img
        className={`w-full h-full rounded-md object-cover transition-opacity ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        src={src}
        alt={alt}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}

// NameDisplay Component
function NameDisplay({ name }) {
  const [showFullName, setShowFullName] = useState(false);
  return (
    <div className="text-center">
      <h3 className="font-medium">
        {showFullName ? name : name.slice(0, 20) + (name.length > 20 ? "..." : "")}
      </h3>
      {name.length > 20 && (
        <button
          onClick={() => setShowFullName((prev) => !prev)}
          className="text-blue-500 text-sm underline"
        >
          {showFullName ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
}

export default WatchGrid;
