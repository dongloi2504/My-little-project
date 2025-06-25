import React from "react";

export default function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-4 py-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex flex-col border rounded-lg bg-white p-4 transition-transform hover:scale-105 hover:shadow-xl hover:border-orange-400 duration-300"
        >
          {/* Hình ảnh sản phẩm */}
          <img
            src={`http://localhost:8080${product.image}`}
            alt={product.name}
            loading="lazy"
            className="h-40 w-full object-cover rounded-md"
          />

          {/* Thông tin sản phẩm */}
          <div className="mt-3">
            <p className="text-lg font-semibold text-gray-800">
              {product.name}
            </p>

            {product.price && (
              <p className="text-green-600 font-bold mt-2">
                {product.price.toLocaleString()} ₫
              </p>
            )}

            <p className="text-red-500 text-sm mt-1">📞 0376.084.720</p>
          </div>
        </div>
      ))}
    </div>
  );
}
