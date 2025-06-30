import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";

export default function TopBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?name=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="sticky top-0 left-0 right-0 z-50 bg-white shadow-md">
      {/* Hotline */}
      <div className="bg-black text-white text-sm flex justify-between px-4 py-2">
        <span>📞 0376.084.720</span>
      </div>

      {/* Logo + Menu + Search */}
      <div className="bg-orange-500 px-4 py-3 text-white">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="bg-white rounded-full shadow flex-shrink-0 p-1">
              <img
                src="logo.png"
                alt="Logo Nguyễn Gia"
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain"
              />
            </div>
            <span className="text-xl sm:text-2xl font-bold italic whitespace-nowrap">
              Nguyễn <span className="ml-1">Gia</span>
            </span>
          </Link>

          <div className="flex-shrink-0">
            <CategoryDropdown />
          </div>

          <form
            onSubmit={handleSearch}
            className="flex-grow w-full sm:w-auto relative bg-white rounded-full shadow-md overflow-hidden h-10 sm:h-12"
          >
            <input
              type="text"
              placeholder="Tìm sản phẩm mong muốn"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-full pl-4 pr-12 rounded-full text-gray-700 outline-none bg-white"
              aria-label="Tìm sản phẩm"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white p-2 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-gray-800 shadow-md"
              aria-label="Tìm kiếm"
            >
              🔍
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
