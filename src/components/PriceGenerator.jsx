"use client";

import React, { useState, useRef } from "react";

const PriceGenerator = () => {
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const downloadImage = (format = "png") => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = image;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const fontSize = Math.floor(img.width * 0.04); // Bigger font (4% of width)
      const padding = Math.floor(img.width * 0.02); // 2% padding
      const boxWidth = Math.floor(img.width * 0.42);
      const boxHeight = fontSize * 2.5;

      // Draw background box
      ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
      ctx.fillRect(
        img.width - boxWidth - padding,
        padding,
        boxWidth,
        boxHeight
      );

      // Use custom font (Poppins must be loaded in HTML)
      ctx.fillStyle = "white";
      ctx.font = `600 ${fontSize}px 'Poppins', sans-serif`;
      ctx.textAlign = "right";

      ctx.fillText(
        productName,
        img.width - padding * 2,
        padding + fontSize + 2
      );
      ctx.fillText(
        `₦${Number(price).toLocaleString()}`,
        img.width - padding * 2,
        padding + fontSize * 2 + 8
      );

      // Download logic
      const link = document.createElement("a");
      link.download = `${productName || "price-tag"}.${format}`;
      link.href = canvas.toDataURL(`image/${format}`);
      link.click();
    };
  };

  return (
    <div className="bg-black mt-4 text-white py-10 px-4 flex flex-col items-center min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Price Tag Generator</h1>

      {/* Form */}
      <div className="bg-black border border-gray-700 p-6 rounded shadow-md w-full max-w-md mb-10">
        <div className="mb-4">
          <label className="block mb-1 font-medium">Upload Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full bg-black text-white border border-gray-600 rounded p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="e.g. Rolex Submariner"
            className="w-full p-2 bg-black text-white border border-gray-600 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Price (₦)</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g. 350000"
            className="w-full p-2 bg-black text-white border border-gray-600 rounded"
          />
        </div>
      </div>

      {/* Preview */}
      {image && (
        <div className="w-full max-w-md flex flex-col items-center">
          <div className="relative w-full border border-gray-700 rounded shadow-lg overflow-hidden mb-4">
            <img src={image} alt="Uploaded" className="w-full object-cover" />
            <div className="absolute top-2 right-2 bg-black bg-opacity-80 text-white px-3 py-1 rounded text-sm text-right">
              <div className="font-semibold">{productName}</div>
              <div>₦{Number(price).toLocaleString()}</div>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => downloadImage("png")}
              className="bg-black border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
            >
              Download PNG
            </button>
            <button
              onClick={() => downloadImage("jpeg")}
              className="bg-black border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
            >
              Download JPEG
            </button>
            <button
              onClick={() => downloadImage("jpg")}
              className="bg-black border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
            >
              Download JPG
            </button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default PriceGenerator;
