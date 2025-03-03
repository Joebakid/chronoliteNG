import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 text-center">
      <div className="container mx-auto">
        <p className="text-sm">© 2025 Chronolite NG. All rights reserved.</p>
        <div className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
          <a
            href="https://josephbawo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Made By: josephbawo.com
          </a>
          <span className="hidden sm:inline">|</span> {/* Hidden on mobile */}
          <a
            href="https://instagram.com/chronolite.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Instagram: @chronoliteng
          </a>
          <span className="hidden sm:inline">|</span> {/* Hidden on mobile */}
          <a
            href="https://www.tiktok.com/@chronoliteng"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            TikTok: @chronoliteng
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
