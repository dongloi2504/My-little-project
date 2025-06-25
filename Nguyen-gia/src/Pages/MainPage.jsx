import React from "react";
import TopBar from "../components/TopBar";
import { FaPhoneAlt } from "react-icons/fa";

export default function MainMenu() {
    return (
        <div className="font-sans">
            <div className="pt-[140px]">
                <TopBar />

                {/* Main Intro */}
                <div className="bg-white text-gray-800 px-6 py-16">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <img
                            src="/logo.png"
                            alt="Nguyễn Gia Logo"
                            className="mx-auto w-24 h-24 object-contain"
                        />
                        <h1 className="text-4xl font-bold italic">
                            <span className="text-red-600">Nguyễn</span>
                            <span className="text-yellow-400 ml-1">Gia</span>
                        </h1>
                        <p className="text-lg">
                            Chất lượng, nhanh chóng và hỗ trợ tận nơi – chúng tôi có mặt khi bạn cần.
                        </p>
                        <p className="italic text-gray-600">
                            “Khởi đầu nhỏ – Thành công lớn cùng bạn.”
                        </p>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="bg-gray-50 px-6 py-10">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                        {/* Cột 1-2: Thông tin công ty */}
                        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow">
                            <h2 className="text-xl font-bold mb-4">Thông tin công ty</h2>
                            <p><span className="font-semibold">Tên:</span> CTY TNHH TM DV NGUYỄN GIA</p>
                            <p><span className="font-semibold">Địa chỉ:</span> Tổ 1, KV 8, P. Nhơn Phú, TP. Quy Nhơn – Bình Định</p>
                            <p><span className="font-semibold">MST:</span> 4101636575</p>
                            <p><span className="font-semibold">Giờ hoạt động:</span> 7:00 – 17:00 (Ngoài giờ: vui lòng gọi/Zalo)</p>
                            <p className="mt-2">
                                <span className="font-semibold">Email:</span>{" "}
                                <a href="mailto:innguyengiaquynhon1993@gmail.com" className="text-blue-500 underline">
                                    innguyengiaquynhon1993@gmail.com
                                </a>
                            </p>
                        </div>

                        {/* Cột 3: Hỗ trợ cài đặt */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-bold text-lg border-b-2 border-orange-500 inline-block mb-3">
                                HỖ TRỢ KHÁCH HÀNG
                            </h3>
                            <ul className="space-y-2 text-sm">
                                <li>◇ Sửa máy in hóa đơn, POS</li>
                                <li>◇ Hướng dẫn cài đặt phần mềm và chấm công</li>
                                <li>◇ Cài đặt TeamViewer từ xa</li>
                            </ul>
                        </div>

                        {/* Cột 4: Liên hệ */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-bold text-lg border-b-2 border-orange-500 inline-block mb-3">
                                THÔNG TIN LIÊN LẠC
                            </h3>
                            <div className="space-y-3 text-sm text-gray-800">
                                <div className="flex items-center space-x-2">
                                    <FaPhoneAlt className="text-orange-500" />
                                    <span>Hotline/Zalo:</span>
                                    <span className="text-orange-600 font-semibold">0376.084.720</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
