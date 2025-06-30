import React, { useEffect, useState } from "react";
import ProductModal from "../components/ProductModal";
import API_URL from "../config"; 

export default function ProductAdminPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);

  const [newProduct, setNewProduct] = useState({
    code: "",
    name: "",
    image: "",
    category: "",
    price: "",
  });

  const [filterName, setFilterName] = useState("");
  const [filterCode, setFilterCode] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const LIMIT = 8;

  const fetchProducts = async (pageNum = 1) => {
    try {
      const res = await fetch(
        `${API_URL}/api/products?page=${pageNum}&limit=${LIMIT}`
      );
      const data = await res.json();
      const productArray = Array.isArray(data) ? data : data.products || [];

      setProducts(productArray);
      setFiltered(productArray);
      setPage(data.page || 1);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("❌ Lỗi khi tải sản phẩm:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/api/categories`);
      const data = await res.json();
      if (Array.isArray(data)) setCategories(data);
    } catch (err) {
      console.error("❌ Lỗi khi tải danh mục:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchFiltered = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products/filter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: filterName,
          code: filterCode,
          category: filterCategory,
        }),
      });
      const data = await res.json();
      const productArray = Array.isArray(data) ? data : data.products || [];
      setFiltered(productArray);
    } catch (err) {
      console.error("❌ Lỗi khi lọc:", err);
    }
  };

  const handleSaveProduct = async (productWithImage) => {
    const isEdit = !!editingProduct;
    const url = isEdit
      ? `${API_URL}/api/products/${editingProduct.id}`
      : `${API_URL}/api/products`;
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productWithImage),
      });
      const data = await res.json();

      if (res.ok) {
        if (isEdit) {
          setProducts((prev) =>
            prev.map((p) => (p.id === editingProduct.id ? data.product : p))
          );
        } else {
          setProducts((prev) => [...prev, data.product]);
        }

        setNewProduct({
          code: "",
          name: "",
          image: "",
          category: "",
          price: "",
        });
        setShowModal(false);
        setEditingProduct(null);
        fetchProducts(page);
      } else {
        alert("❌ Không thể lưu sản phẩm: " + data.error);
      }
    } catch (error) {
      console.error("❌ Lỗi khi lưu sản phẩm:", error);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0 || !window.confirm("Bạn có chắc muốn xóa?"))
      return;

    try {
      const res = await fetch(`${API_URL}/api/products/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds }),
      });
      const data = await res.json();
      if (!res.ok) return alert("❌ " + data.error);

      setFiltered((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
      setProducts((prev) => prev.filter((p) => !selectedIds.includes(p.id)));
      setSelectedIds([]);
    } catch (err) {
      console.error("❌ Lỗi khi xóa:", err);
    }
  };

  return (
    <div className="p-6 font-sans max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">📦 Quản lý sản phẩm</h1>
          <div className="flex gap-2">
            {selectedIds.length > 0 && (
              <button
                onClick={handleDeleteSelected}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                🗑 Xóa
              </button>
            )}
            <button
              onClick={() => {
                setShowModal(true);
                setEditingProduct(null);
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
            >
              + Thêm sản phẩm
            </button>
          </div>
        </div>

        {/* Bộ lọc */}
        <div className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="🔍 Tìm mã..."
            value={filterCode}
            onChange={(e) => setFilterCode(e.target.value)}
            className="border p-2 rounded-md flex-1"
          />
          <input
            type="text"
            placeholder="🔍 Tìm tên..."
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="border p-2 rounded-md flex-1"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border p-2 rounded-md flex-1"
          >
            <option value="">-- Tất cả danh mục --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            onClick={fetchFiltered}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            🔍 Lọc
          </button>
        </div>
      </div>

      {/* Bảng */}
      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-sm">
              <th className="p-3">
                <input
                  type="checkbox"
                  checked={
                    selectedIds.length === filtered.length && filtered.length > 0
                  }
                  onChange={(e) =>
                    setSelectedIds(
                      e.target.checked ? filtered.map((p) => p.id) : []
                    )
                  }
                />
              </th>
              <th className="p-3">Mã</th>
              <th className="p-3">Tên</th>
              <th className="p-3">Hình ảnh</th>
              <th className="p-3">Danh mục</th>
              <th className="p-3">Giá</th>
              <th className="p-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(p.id)}
                    onChange={() =>
                      setSelectedIds((prev) =>
                        prev.includes(p.id)
                          ? prev.filter((x) => x !== p.id)
                          : [...prev, p.id]
                      )
                    }
                  />
                </td>

                <td className="p-3">{p.code}</td>

                {/* ✅ Tên - in đậm */}
                <td className="p-3 font-semibold">{p.name}</td>

                <td className="p-3">
                  {p.image && (
                    <img
                      src={`${API_URL}${p.image}`}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  )}
                </td>

                {/* ✅ Danh mục - in đậm */}
                <td className="p-3 font-semibold">{p.category}</td>

                <td className="p-3">
                  {p.price ? (
                    <span className="text-green-600 font-medium">
                      {`${p.price.toLocaleString()}₫`}
                    </span>
                  ) : (
                    <span className="text-orange-500 font-medium">Liên hệ</span>
                  )}
                </td>

                <td className="p-3">
                  <button
                    onClick={() => {
                      setEditingProduct(p);
                      setNewProduct({ ...p });
                      setShowModal(true);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    ✏️ Sửa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => fetchProducts(i + 1)}
            className={`px-3 py-1 rounded border ${
              page === i + 1
                ? "bg-orange-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal */}
      <ProductModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        newProduct={newProduct}
        onChange={(e) =>
          setNewProduct((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        categories={categories}
        setNewProduct={setNewProduct}
        isEditing={!!editingProduct}
      />
    </div>
  );
}
