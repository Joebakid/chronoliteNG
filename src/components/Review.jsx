import React from "react";

function Review() {
  // Dynamically import all images from the "public/img" folder
  const images = Object.keys(
    import.meta.glob("/public/img/*.{jpg,png,jpeg,gif,webp}")
  );

  return (
    <section className="container-custom py-10">
      <div className="flex flex-wrap justify-center gap-4">
        {images.map((src, index) => {
          const fileName = src.split("/").pop().split(".")[0]; // Extract filename
          const altText = fileName.replace(/[-_]/g, " "); // Format alt text

          return (
            <img
              key={index}
              src={src.replace("/public", "")} // Fix for public assets in Vite
              alt={altText}
              className="w-full max-w-[250px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[250px] rounded-lg object-cover transition-transform duration-300 hover:scale-105"
            />
          );
        })}
      </div>
    </section>
  );
}

export default Review;
