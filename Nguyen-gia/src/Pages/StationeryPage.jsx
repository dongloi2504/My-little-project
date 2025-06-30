import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import ProductGrid from "../components/ProductGrid";
import API_URL from "../config";

export default function StationeryPage() {
  const [products, setProducts] = useState([]);
  const CATEGORY = "Văn Phòng Phẩm";

  useEffect(() => {
    fetch(`${API_URL}/api/products?category=${encodeURIComponent(CATEGORY)}`)
      .then((res) => res.json())
      .then((data) =>
        setProducts(Array.isArray(data) ? data : data.products || [])
      )
      .catch((error) => {
        console.error("❌ Lỗi khi fetch sản phẩm:", error);
      });
  }, []);

  const slug = CATEGORY.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="font-sans">
      <TopBar />

      <main>
        {/* Breadcrumb navigation */}
        <div className="text-sm text-gray-600 px-6 py-3">
          <Link
            to="/"
            className="text-gray-600 hover:text-orange-500 hover:underline transition-colors duration-200"
          >
            Trang chủ
          </Link>
          <span className="mx-1">/</span>
          <Link
            to={`/${slug}`}
            className="text-orange-500 font-medium hover:underline"
          >
            {CATEGORY}
          </Link>
        </div>

        {/* Hiển thị sản phẩm */}
        <ProductGrid products={products} />
      </main>
    </div>
  );
}
