import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import TopBar from "../components/TopBar";
import ProductGrid from "../components/ProductGrid";
import API_URL from "../config";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "";
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchByName = async () => {
      if (!name) return;

      setIsLoading(true);
      try {
        const res = await fetch(
          `${API_URL}/api/products?search=${encodeURIComponent(name)}`
        );
        const data = await res.json();
        if (res.ok) {
          setProducts(data.products || []);
        } else {
          console.error("❌ Lỗi API:", data.error);
        }
      } catch (err) {
        console.error("❌ Lỗi kết nối:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchByName();
  }, [name]);

  return (
    <div className="font-sans">
      {/* Sticky TopBar */}
      <TopBar />

      <main>
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 px-6 py-3">
          <Link
            to="/"
            className="text-gray-600 hover:text-orange-500 hover:underline"
          >
            Trang chủ
          </Link>
          <span className="mx-1">/</span>
          <span className="text-orange-500 font-medium">{name}</span>
        </div>

        {/* Kết quả */}
        {isLoading ? (
          <div className="text-center text-gray-500 my-8">
            🔍 Đang tải kết quả...
          </div>
        ) : products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="text-center text-gray-500 my-8">
            ❌ Không tìm thấy sản phẩm nào.
          </div>
        )}
      </main>
    </div>
  );
}
