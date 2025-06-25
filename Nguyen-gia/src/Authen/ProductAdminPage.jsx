import React, { useEffect, useState } from "react";
import ProductModal from "../components/ProductModal";

export default function ProductAdminPage() {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [categories, setCategories] = useState([]);

    const [newProduct, setNewProduct] = useState({
        code: "",
        name: "",
        image: "",
        category: "",
        price: ""
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
            const res = await fetch(`http://localhost:8080/api/products?page=${pageNum}&limit=${LIMIT}`);
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
            const res = await fetch("http://localhost:8080/api/categories");
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
            const res = await fetch("http://localhost:8080/api/products/filter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: filterName,
                    code: filterCode,
                    category: filterCategory
                })
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
            ? `http://localhost:8080/api/products/${editingProduct.id}`
            : "http://localhost:8080/api/products";
        const method = isEdit ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productWithImage)
            });
            const data = await res.json();

            if (res.ok) {
                if (isEdit) {
                    setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? data.product : p)));
                } else {
                    setProducts((prev) => [...prev, data.product]);
                }

                setNewProduct({ code: "", name: "", image: "", category: "", price: "" });
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
        if (selectedIds.length === 0 || !window.confirm("Bạn có chắc muốn xóa?")) return;

        try {
            const res = await fetch("http://localhost:8080/api/products/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids: selectedIds })
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
        <div className="p-6 font-sans max-w-6xl mx-auto">
            <div className="mb-6 space-y-2">
                <h1 className="text-5xl font-bold">Quản lý sản phẩm</h1>
                <div className="flex justify-end gap-2">
                    {selectedIds.length > 0 && (
                        <button onClick={handleDeleteSelected} className="bg-red-500 text-white px-4 py-2 rounded">
                            🗑 Xóa
                        </button>
                    )}
                    <button
                        onClick={() => {
                            setShowModal(true);
                            setEditingProduct(null);
                        }}
                        className="bg-orange-500 text-white px-4 py-2 rounded"
                    >
                        + Thêm sản phẩm
                    </button>
                </div>
            </div>

            {/* Filter */}
            <div className="bg-white rounded shadow p-4 mb-6 flex flex-col md:flex-row gap-4 items-end">
                <input type="text" placeholder="Tìm mã..." value={filterCode} onChange={(e) => setFilterCode(e.target.value)} className="border p-2 rounded" />
                <input type="text" placeholder="Tìm tên..." value={filterName} onChange={(e) => setFilterName(e.target.value)} className="border p-2 rounded" />
                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="border p-2 rounded">
                    <option value="">-- Tất cả danh mục --</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <button onClick={fetchFiltered} className="bg-blue-500 text-white px-4 py-2 rounded">🔍 Filter</button>
            </div>

            {/* Table */}
            <table className="w-full bg-white rounded shadow text-sm">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="p-2"><input type="checkbox" checked={selectedIds.length === filtered.length && filtered.length > 0} onChange={(e) => setSelectedIds(e.target.checked ? filtered.map(p => p.id) : [])} /></th>
                        <th className="p-2">Mã</th>
                        <th className="p-2">Tên</th>
                        <th className="p-2">Hình ảnh</th>
                        <th className="p-2">Danh mục</th>
                        <th className="p-2">Giá</th>
                        <th className="p-2">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((p) => (
                        <tr key={p.id} className="border-t hover:bg-gray-50">
                            <td className="p-2"><input type="checkbox" checked={selectedIds.includes(p.id)} onChange={() => setSelectedIds((prev) => prev.includes(p.id) ? prev.filter((x) => x !== p.id) : [...prev, p.id])} /></td>
                            <td className="p-2">{p.code}</td>
                            <td className="p-2">{p.name}</td>
                            <td className="p-2">{p.image && (<img src={`http://localhost:8080${p.image}`} alt={p.name} className="w-16 h-12 object-cover" />)}</td>
                            <td className="p-2">{p.category}</td>
                            <td className="p-2">{p.price ? `${p.price.toLocaleString()}₫` : "Liên hệ"}</td>
                            <td className="p-2">
                                <button onClick={() => { setEditingProduct(p); setNewProduct({ ...p }); setShowModal(true); }} className="text-blue-500 hover:underline">✏️ Sửa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-6 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i + 1} onClick={() => fetchProducts(i + 1)} className={`px-3 py-1 rounded border ${page === i + 1 ? "bg-orange-500 text-white" : "bg-white"}`}>
                        {i + 1}
                    </button>
                ))}
            </div>

            {/* Modal */}
            <ProductModal
                show={showModal}
                onClose={() => { setShowModal(false); setEditingProduct(null); }}
                onSave={handleSaveProduct}
                newProduct={newProduct}
                onChange={(e) => setNewProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
                categories={categories}
                setNewProduct={setNewProduct}
                isEditing={!!editingProduct}
            />
        </div>
    );
}
