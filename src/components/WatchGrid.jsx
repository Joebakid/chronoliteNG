import React, { useState } from "react";
import { PaystackButton } from "react-paystack";

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
  const itemsPerPage = 9;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handleOpenForm = (item) => {
    setSelectedItem(item);
    setIsFormOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentSuccess = (response) => {
    console.log("Payment Successful", response);
    const message = encodeURIComponent(
      `Hello, I just paid for "${selectedItem.name}" priced at ${formatter.format(
        selectedItem.price
      )}. My payment reference is ${response.reference}.
      \nHere are my details:
      \nName: ${formData.fullName}
      \nWhatsApp: ${formData.whatsapp}
      \nEmail: ${formData.email}
      \nAddress: ${formData.address}`
    );
    window.location.href = `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  const paginatedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="container-custom mt-40">
      {/* Responsive Grid (2 columns on mobile, 3 on desktop) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {paginatedItems.map((item, index) => (
          <div
            key={item.id || index}
            className="border p-4 flex flex-col gap-4 rounded-lg card-custom text-center"
          >
            <ImageWithLoader src={item.img} alt={item.name} />
            <NameDisplay name={item.name} />
            <p>{formatter.format(item.price)}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleOpenForm(item)}>
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
        <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
        <button
          className="px-4 py-2 border rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">Enter Your Details</h2>
            <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />
            <input type="text" name="whatsapp" placeholder="WhatsApp Number" value={formData.whatsapp} onChange={handleChange} className="w-full mb-2 p-2 border rounded text-black" required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full mb-2 p-2 border rounded" required />
            <PaystackButton
              className="bg-green-500 text-white px-4 py-2 rounded w-full"
              amount={selectedItem.price * 100}
              email={formData.email}
              publicKey={publicKey}
              text="Proceed to Payment"
              onSuccess={handlePaymentSuccess}
            />
            <button className="mt-2 text-red-600 underline w-full" onClick={() => setIsFormOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
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
      <h3 className="font-medium">
        {showFullName ? name : name.slice(0, 20) + (name.length > 20 ? "..." : "")}
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
