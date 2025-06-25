import React from "react";
import { Link } from "react-router-dom";
import CategoryDropdown from "./CategoryDropdown";

export default function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      {/* Thanh đen trên cùng */}
      <div className="bg-black text-white text-sm flex justify-between px-4 py-2">
        <span>📞 0376.084.720</span>
      </div>

      {/* Thanh cam */}
      <div className="bg-orange-500 px-6 py-4 text-white">
        <div className="max-w-7xl mx-auto flex items-center space-x-4">
          {/* Logo + chữ */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-white rounded-full p-2 shadow">
              <img src="logo.png" alt="logo" className="w-16 h-14" />
            </div>
            <span className="text-2xl font-bold italic">
              <span className="text">Nguyễn</span>
              <span className="text ml-1">Gia</span>
            </span>
          </Link>

          <CategoryDropdown />

          {/* Thanh tìm kiếm */}
          <div className="relative w-full max-w-xl bg-white rounded-full shadow-md overflow-hidden h-12">
            <input
              type="text"
              placeholder="Tìm sản phẩm mong muốn"
              className="w-full h-full pl-5 pr-12 rounded-full text-gray-700 outline-none bg-white"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white p-2 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-800 shadow-md">
              🔍
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
