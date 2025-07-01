import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function CategoryDropdown() {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      to: "/in-an",
      icon: "/printer.png",
      label: "In ấn",
    },
    {
      to: "/van-phong-pham",
      icon: "/stationery.png",
      label: "Văn Phòng Phẩm",
    },
    {
      to: "/ban-may-moc",
      icon: "/sell-and-buy.png",
      label: "Bán máy in, máy tính tiền (POS)",
    },
    {
      to: "/ho-tro-khach-hang",
      icon: "/wrench.png",
      label: "Hỗ trợ sửa chữa, cài đặt",
    },
  ];

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowSubmenu(true)}
      onMouseLeave={() => setShowSubmenu(false)}
    >
      {/* Nút toggle */}
      <button className="bg-black text-white px-4 py-2 rounded-full flex items-center space-x-2 shadow hover:bg-gray-800 transition">
        <span className="text-lg">☰</span>
        <span className="font-semibold">Danh Mục</span>
      </button>

      {/* Dropdown menu */}
      {showSubmenu && (
        <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-xl p-4 z-50 animate-fade-in">
          <ul className="space-y-3 text-sm">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.to;

              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={`flex items-center gap-3 p-2 rounded-lg transition duration-200
                      ${isActive ? "bg-orange-50 text-orange-500 font-semibold" : "text-gray-800 hover:text-orange-500 hover:bg-gray-50"}
                    `}
                  >
                    <div
                      className={`p-2 rounded-full w-9 h-9 flex justify-center items-center
                        ${isActive ? "bg-orange-100" : "bg-gray-100"}
                      `}
                    >
                      <img src={item.icon} alt={item.label} className="w-5 h-5 object-contain" />
                    </div>
                    <span className="text-[15px]">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
