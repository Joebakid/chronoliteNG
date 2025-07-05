"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const PriceGenerator = () => {
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Load font on component mount
  useEffect(() => {
    const loadFont = async () => {
      try {
        // Load system fonts
        await document.fonts.ready;
        setFontLoaded(true);
      } catch (error) {
        console.log("Font loading fallback");
        setFontLoaded(true);
      }
    };
    loadFont();
  }, []);

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const downloadImage = useCallback(
    async (format = "png") => {
      if (!image || !productName || !price || !fontLoaded) return;

      setIsProcessing(true);

      try {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.crossOrigin = "anonymous";

        await new Promise((resolve) => {
          img.onload = async () => {
            canvas.width = img.width;
            canvas.height = img.height;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw image
            ctx.drawImage(img, 0, 0);

            // Calculate responsive sizes
            const fontSize = Math.max(Math.floor(img.width * 0.04), 16);
            const padding = Math.max(Math.floor(img.width * 0.02), 8);
            const boxWidth = Math.floor(img.width * 0.45);
            const boxHeight = fontSize * 3;

            // Draw background box with rounded corners
            ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
            ctx.beginPath();
            ctx.roundRect(
              img.width - boxWidth - padding,
              padding,
              boxWidth,
              boxHeight,
              8
            );
            ctx.fill();

            // Set font with fallbacks and ensure it's loaded
            const fontFamily =
              "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', sans-serif";
            ctx.font = `600 ${fontSize}px ${fontFamily}`;
            ctx.fillStyle = "white";
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";

            // Add text with better positioning
            const textX = img.width - padding * 2;
            const nameY = padding + fontSize + 4;
            const priceY = padding + fontSize * 2 + 8;

            // Draw product name
            ctx.fillText(productName, textX, nameY);

            // Draw price
            ctx.fillText(`₦${Number(price).toLocaleString()}`, textX, priceY);

            resolve();
          };
          img.src = image;
        });

        // Download with better quality
        const link = document.createElement("a");
        link.download = `${
          productName.replace(/[^a-z0-9]/gi, "_").toLowerCase() || "price-tag"
        }.${format}`;
        link.href = canvas.toDataURL(
          `image/${format}`,
          format === "png" ? 1.0 : 0.95
        );
        link.click();
      } catch (error) {
        console.error("Download failed:", error);
      } finally {
        setIsProcessing(false);
      }
    },
    [image, productName, price, fontLoaded]
  );

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const isFormValid = image && productName.trim() && price.trim() && fontLoaded;

  return (
    <div className="p-3 py-32 lg:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 text-center sm:mb-8">
          <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
            Price Tag Generator
          </h1>
          <p className="text-sm text-gray-400 sm:text-base">
            Create professional price tags for your products
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-2">
          {/* Form Section */}
          <div className="order-2 p-4 border border-gray-700 rounded-lg lg:order-1 sm:p-6 bg-gray-800/50 backdrop-blur-sm">
            <div className="space-y-4 sm:space-y-6">
              {/* Image Upload */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-white sm:text-base">
                  Product Image
                </label>
                <div
                  onClick={triggerFileInput}
                  className="p-4 text-center transition-all duration-200 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer sm:p-6 lg:p-8 hover:border-gray-500 hover:bg-gray-700/30"
                >
                  {image ? (
                    <div className="space-y-2">
                      <div className="w-6 h-6 mx-auto text-green-400 sm:w-8 sm:h-8">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-sm font-medium text-green-400 sm:text-base">
                        Image uploaded!
                      </p>
                      <p className="text-xs text-gray-400 sm:text-sm">
                        Click to change
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-6 h-6 mx-auto text-gray-400 sm:w-8 sm:h-8">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-400 sm:text-base">
                        Click to upload image
                      </p>
                      <p className="text-xs text-gray-500 sm:text-sm">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Product Name */}
              <div className="space-y-2">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-white sm:text-base"
                >
                  Product Name
                </label>
                <input
                  id="productName"
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Rolex Submariner"
                  className="w-full px-3 py-2 text-sm text-white placeholder-gray-400 transition-colors bg-gray-700 border border-gray-600 rounded-lg sm:px-4 sm:py-3 sm:text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-white sm:text-base"
                >
                  Price (₦)
                </label>
                <input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="350000"
                  className="w-full px-3 py-2 text-sm text-white placeholder-gray-400 transition-colors bg-gray-700 border border-gray-600 rounded-lg sm:px-4 sm:py-3 sm:text-base focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* Download Buttons */}
              <div className="pt-2 space-y-4 sm:pt-4">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
                  <button
                    onClick={() => downloadImage("png")}
                    disabled={!isFormValid || isProcessing}
                    className="flex items-center justify-center px-3 py-2 text-sm text-white transition-colors bg-blue-600 rounded-lg sm:px-4 sm:py-3 sm:text-base hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download PNG
                  </button>
                  <button
                    onClick={() => downloadImage("jpeg")}
                    disabled={!isFormValid || isProcessing}
                    className="flex items-center justify-center px-3 py-2 text-sm text-white transition-colors bg-green-600 rounded-lg sm:px-4 sm:py-3 sm:text-base hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download JPEG
                  </button>
                  <button
                    onClick={() => downloadImage("jpg")}
                    disabled={!isFormValid || isProcessing}
                    className="flex items-center justify-center px-3 py-2 text-sm text-white transition-colors bg-purple-600 rounded-lg sm:px-4 sm:py-3 sm:text-base hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download JPG
                  </button>
                </div>
                {isProcessing && (
                  <div className="flex items-center justify-center space-x-2 text-blue-400">
                    <div className="w-4 h-4 border-2 border-blue-400 rounded-full border-t-transparent animate-spin"></div>
                    <p className="text-xs sm:text-sm">
                      Processing your image...
                    </p>
                  </div>
                )}
                {!fontLoaded && (
                  <div className="flex items-center justify-center space-x-2 text-yellow-400">
                    <div className="w-4 h-4 border-2 border-yellow-400 rounded-full border-t-transparent animate-spin"></div>
                    <p className="text-xs sm:text-sm">Loading fonts...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="order-1 p-4 border border-gray-700 rounded-lg lg:order-2 sm:p-6 bg-gray-800/50 backdrop-blur-sm">
            <label className="block mb-3 text-sm font-medium text-white sm:mb-4 sm:text-base">
              Preview
            </label>
            {image ? (
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={image || "/placeholder.svg"}
                  alt="Product preview"
                  className="object-cover w-full h-auto max-h-[400px] sm:max-h-[500px] lg:max-h-none"
                />
                {productName && price && (
                  <div className="absolute px-2 py-1 text-white rounded-md sm:px-3 lg:px-4 sm:py-2 sm:rounded-lg top-2 sm:top-4 right-2 sm:right-4 bg-black/90 backdrop-blur-sm">
                    <div className="text-xs font-semibold leading-tight sm:text-sm lg:text-base">
                      {productName}
                    </div>
                    <div className="text-xs leading-tight sm:text-sm lg:text-base">
                      ₦{Number(price || 0).toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-48 rounded-lg sm:h-64 lg:h-80 bg-gray-700/50">
                <div className="text-center text-gray-400">
                  <div className="w-8 h-8 mx-auto mb-2 sm:w-12 sm:h-12">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-sm sm:text-base">
                    Upload an image to see preview
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default PriceGenerator;
