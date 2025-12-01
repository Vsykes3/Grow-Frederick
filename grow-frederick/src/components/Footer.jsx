import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div>© {new Date().getFullYear()} GrowCommon. All rights reserved.</div>
        <nav className="flex items-center gap-4">
          <a href="/about" className="hover:text-gray-900">About</a>
          <a href="/contact" className="hover:text-gray-900">Contact</a>
          <a href="/privacy" className="hover:text-gray-900">Privacy</a>
        </nav>
      </div>
    </footer>
  );
}
