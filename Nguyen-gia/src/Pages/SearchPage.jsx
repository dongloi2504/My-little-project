import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TopBar from "../components/TopBar";
import ProductGrid from "../components/ProductGrid";

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
                    `http://localhost:8080/api/products?name=${encodeURIComponent(name)}`
                );
                const data = await res.json();
                if (res.ok) {
                    setProducts(data.products || []);
                } else {
                    console.error("Lỗi API:", data.error);
                }
            } catch (err) {
                console.error("Lỗi kết nối:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchByName();
    }, [name]);

    return (
        <div className="font-sans">
            <div className="pt-[140px]">
                <TopBar />

                {/* Breadcrumb */}
                <div className="text-sm text-gray-600 px-6 py-3">
                    <span className="text-gray-600">Trang chủ</span>
                    <span className="mx-1">&gt;</span>
                    <span className="text-orange-500 font-medium">{name}</span>
                </div>


                {/* Kết quả */}
                {isLoading ? (
                    <div className="text-center text-gray-500 my-8">Đang tải kết quả...</div>
                ) : products.length > 0 ? (
                    <ProductGrid products={products} repeatCount={5} />
                ) : (
                    <div className="text-center text-gray-500 my-8">Không tìm thấy sản phẩm nào.</div>
                )}
            </div>
        </div>
    );
}
