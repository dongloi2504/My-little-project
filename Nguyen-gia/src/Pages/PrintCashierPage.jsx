import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import ProductGrid from "../components/ProductGrid";
import API_URL from "../config";

export default function PrintCashierPage() {
  const [products, setProducts] = useState([]);
  const CATEGORY = "Mua Bán";

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        const productArray = Array.isArray(data) ? data : data.products || [];
        const filtered = productArray.filter(
          (p) =>
            p.category?.toLowerCase() === "mua" ||
            p.category?.toLowerCase() === "bán"
        );
        setProducts(filtered);
      })
      .catch((error) => {
        console.error("❌ Lỗi khi fetch sản phẩm:", error);
      });
  }, []);

  const slug = CATEGORY.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="font-sans">
      {/* Sticky TopBar */}
      <TopBar />

      <main>
        {/* Breadcrumb */}
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

        {/* Hiển thị danh sách sản phẩm */}
        <ProductGrid products={products} />
      </main>
    </div>
  );
}
