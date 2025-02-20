import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 text-center">
      <div className="container mx-auto">
        <p className="text-sm">
          ©  2025 Chronolite NG. All rights reserved.
        </p>
        <div className="mt-2">
          <a
            href="https://josephbawo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline mx-2"
          >
            Made By: josephbawo.com
          </a>
          |
          <a
            href="https://instagram.com/chronoliteng"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline mx-2"
          >
            Instagram: @chronoliteng
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
