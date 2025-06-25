// ProductModal.jsx
import React, { useState, useEffect } from "react";

export default function ProductModal({
    show,
    onClose,
    onSave,
    newProduct,
    onChange,
    categories,
    setNewProduct,
    isEditing
}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!show) {
            setSelectedFile(null);
            setErrors({});
        }
    }, [show]);

    if (!show) return null;

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    const uploadImage = async () => {
        if (!selectedFile) return newProduct.image || "";

        const formData = new FormData();
        formData.append("image", selectedFile);
        setUploading(true);

        try {
            const res = await fetch("http://localhost:8080/api/products/upload", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            return data.imageUrl || "";
        } catch (err) {
            console.error("❌ Upload lỗi:", err);
            return "";
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        const imageUrl = await uploadImage();

        const productWithImage = {
            ...newProduct,
            image: imageUrl
        };

        try {
            await onSave(productWithImage); // gọi về FE xử lý POST/PUT
        } catch (err) {
            setErrors({ global: "Lỗi lưu sản phẩm" });
            console.error("❌ Lỗi lưu:", err);
        }
    };

    const handleReset = () => {
        setSelectedFile(null);
        setErrors({});
        setNewProduct({
            code: "",
            name: "",
            image: "",
            category: "",
            price: ""
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                <h2 className="text-xl font-semibold mb-4">
                    {isEditing ? "Sửa thông tin sản phẩm" : "Thêm sản phẩm mới"}
                </h2>

                <div className="grid grid-cols-1 gap-3">
                    <input
                        type="text"
                        name="code"
                        placeholder="Mã sản phẩm"
                        value={newProduct.code}
                        onChange={onChange}
                        className="border p-2 rounded"
                    />

                    <input
                        type="text"
                        name="name"
                        placeholder="Tên sản phẩm"
                        value={newProduct.name}
                        onChange={onChange}
                        className="border p-2 rounded"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="border p-2 rounded"
                    />

                    {(selectedFile || newProduct.image) && (
                        <img
                            src={
                                selectedFile
                                    ? URL.createObjectURL(selectedFile)
                                    : `http://localhost:8080${newProduct.image}`
                            }
                            alt="Preview"
                            className="h-24 object-cover border rounded"
                        />
                    )}

                    <select
                        name="category"
                        value={newProduct.category}
                        onChange={onChange}
                        className="border p-2 rounded"
                    >
                        <option value="">-- Chọn danh mục --</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    <input
                        type="number"
                        name="price"
                        placeholder="Giá"
                        value={newProduct.price}
                        onChange={onChange}
                        className="border p-2 rounded"
                    />

                    {errors.global && (
                        <p className="text-red-500 text-sm">{errors.global}</p>
                    )}

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            onClick={handleReset}
                            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={uploading}
                            className={`px-4 py-2 text-white rounded ${
                                uploading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-orange-500 hover:bg-orange-600"
                            }`}
                        >
                            {uploading ? "Đang tải..." : "Lưu"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
