import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function WatchGrid({ Btn, items }) {
  const whatsappNumber = "2349013550698"; // Replace with your WhatsApp number

  // Currency Formatter
  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  });

  // Format the price in the items data
  const formattedItems = items.map((item) => ({
    ...item,
    price: formatter.format(item.price),
  }));

  return (
    <div className="container-custom mt-40">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {formattedItems.map((item) => (
          <div
            key={uuidv4()}
            className="border p-4 flex flex-col gap-4 rounded-lg card-custom transition-custom text-center"
          >
            <ImageWithLoader src={item.img} alt={item.name} />
            <NameDisplay name={item.name} />
            <p>{item.price}</p>
            {/* WhatsApp button with price */}
            <Btn
              text="Contact on WhatsApp"
              btnClassName="bg-green-500 text-white px-4 py-2 rounded"
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                `Hello, I'm interested in the product "${item.name}" priced at ${item.price}. Here is the image link: ${item.img}`
              )}`}
            />
          </div>
        ))}
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
        {showFullName
          ? name
          : name.slice(0, 20) + (name.length > 20 ? "..." : "")}
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
