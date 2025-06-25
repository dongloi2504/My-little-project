import React from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import { FaTools, FaPrint, FaLaptopMedical } from "react-icons/fa";

export default function SupportServicePage() {
  return (
    <div className="font-sans">
      <div className="pt-[140px]">
        <TopBar />

        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 px-6 py-3">
          <Link
            to="/"
            className="text-gray-600 hover:text-orange-500 hover:underline cursor-pointer transition-colors duration-200"
          >
            Trang chủ
          </Link>
          <span className="mx-1">&gt;</span>
          <span className="text-orange-500 font-medium">Hỗ trợ kỹ thuật</span>
        </div>

        {/* Nội dung chính */}
        <div className="px-6 py-10 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-orange-600 mb-8">
            Dịch vụ Hỗ trợ Khách hàng
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cài đặt & Sửa phần mềm */}
            <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <FaLaptopMedical className="text-orange-500 text-2xl" />
                <h2 className="text-xl font-semibold">Cài đặt & Phần mềm</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Cài đặt phần mềm bán hàng, máy chấm công</li>
                <li>Hướng dẫn sử dụng phần mềm chi tiết</li>
                <li>Sửa lỗi phần mềm bán hàng POS</li>
                <li>Khôi phục dữ liệu khi bị lỗi</li>
              </ul>
            </div>

            {/* Sửa chữa máy móc */}
            <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <FaTools className="text-orange-500 text-2xl" />
                <h2 className="text-xl font-semibold">Sửa chữa Thiết bị</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Sửa máy in hóa đơn, POS</li>
                <li>Xử lý kẹt giấy, kẹt mực, máy in không nhận giấy</li>
                <li>Vệ sinh, kiểm tra và thay linh kiện máy chấm công</li>
                <li>Hướng dẫn bảo trì định kỳ</li>
              </ul>
            </div>
          </div>

          {/* Thông tin liên hệ */}
          <div className="mt-10 bg-orange-50 border-l-4 border-orange-500 p-6 rounded">
            <h3 className="text-lg font-semibold mb-2 text-orange-600">Liên hệ hỗ trợ:</h3>
            <p className="text-gray-800">
              📞 Hotline/Zalo: <strong className="text-orange-600">0376.084.720</strong>
            </p>
            <p className="text-gray-800">
              📧 Email:{" "}
              <a
                href="mailto:innguyengiaquynhon1993@gmail.com"
                className="text-blue-500 underline"
              >
                innguyengiaquynhon1993@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
