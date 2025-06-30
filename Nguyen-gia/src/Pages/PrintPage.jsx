import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import ProductGrid from "../components/ProductGrid";
import Breadcrumb from "../components/Breadcrumb"; // bạn có thể tách riêng hoặc dùng inline
import API_URL from "../config";

export default function PrintPage() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const CATEGORY = "In ấn";
  const LIMIT = 12;

  const fetchProducts = async (pageNum) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/api/products?category=${encodeURIComponent(
          CATEGORY
        )}&page=${pageNum}&limit=${LIMIT}`
      );
      const data = await res.json();

      if (res.ok) {
        setProducts((prev) => [...prev, ...(data.products || [])]);
        setTotal(data.total || 0);
      } else {
        console.error("❌ Lỗi khi fetch sản phẩm:", data.error);
      }
    } catch (err) {
      console.error("❌ Lỗi kết nối:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const handleLoadMore = () => {
    if (!isLoading) setPage((prev) => prev + 1);
  };

  const hasMore = products.length < total;
  const remaining = total - products.length;

  return (
    <div className="font-sans">
      {/* Sticky TopBar */}
      <TopBar />

      {/* Không cần pt-[140px] nữa */}
      <main>
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 px-6 py-3">
          <a
            href="/"
            className="text-gray-600 hover:text-orange-500 hover:underline"
          >
            Trang chủ
          </a>
          <span className="mx-1">/</span>
          <a
            href="/in-an"
            className="text-orange-500 font-medium hover:underline"
          >
            In ấn
          </a>
        </div>

        {/* Grid sản phẩm */}
        <ProductGrid products={products} />

        {/* Nút Xem thêm */}
        {hasMore && (
          <div className="flex justify-center my-6">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="px-5 py-2 bg-white rounded-full shadow text-black border hover:bg-gray-100"
            >
              {isLoading ? "Đang tải..." : `Xem thêm ${remaining} kết quả`}
            </button>
          </div>
        )}

        {!hasMore && products.length > 0 && (
          <div className="text-center text-sm text-gray-500 my-4">
            ✅ Bạn đã xem hết tất cả sản phẩm.
          </div>
        )}
      </main>
    </div>
  );
}
