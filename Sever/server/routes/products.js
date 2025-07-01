const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const router = express.Router();
const dataPath = path.join(__dirname, '../data/products.json');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

/**
 * [GET] /api/products
 */
router.get('/', (req, res) => {
  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Lỗi đọc dữ liệu sản phẩm' });

    try {
      let products = JSON.parse(data);
      const { search, name, category, page = 1, limit = 20 } = req.query;

      // Lọc category
      if (category) {
        products = products.filter(p =>
          p.category?.toLowerCase() === category.toLowerCase()
        );
      }

      // Lọc search
      if (search) {
        products = products.filter(p =>
          p.name?.toLowerCase().includes(search.toLowerCase()) ||
          p.code?.toLowerCase().includes(search.toLowerCase())
        );
      }

      // Hoặc lọc name riêng nếu có
      if (name) {
        products = products.filter(p =>
          p.name?.toLowerCase().includes(name.toLowerCase())
        );
      }

      // Pagination
      const pageNumber = parseInt(page, 10);
      const pageSize = parseInt(limit, 10);
      const total = products.length;
      const totalPages = Math.ceil(total / pageSize);

      const start = (pageNumber - 1) * pageSize;
      const end = start + pageSize;
      const paginated = products.slice(start, end);

      res.json({
        page: pageNumber,
        limit: pageSize,
        total,
        totalPages,
        products: paginated
      });
    } catch (e) {
      console.error("❌ Lỗi xử lý dữ liệu:", e.message);
      res.status(500).json({ error: 'Lỗi định dạng dữ liệu' });
    }
  });
});

// [POST] /api/products
router.post('/', (req, res) => {
  try {
    const newProduct = req.body;
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const products = JSON.parse(raw);

    // Kiểm tra trùng mã hoặc tên
    const isDuplicate = products.some(
      p =>
        p.code?.toLowerCase() === newProduct.code?.toLowerCase() ||
        p.name?.toLowerCase() === newProduct.name?.toLowerCase()
    );

    if (isDuplicate) {
      return res.status(400).json({
        error: 'Sản phẩm có mã hoặc tên đã tồn tại. Vui lòng chọn mã/tên khác.'
      });
    }

    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;

    const toSave = {
      id: newId,
      ...newProduct,
      price: newProduct.price ? Number(newProduct.price) : null
    };

    products.push(toSave);
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2), 'utf-8');
    res.status(201).json({ message: '✅ Thêm sản phẩm thành công', product: toSave });
  } catch (err) {
    console.error('❌ Lỗi khi thêm sản phẩm:', err.message);
    res.status(500).json({ error: 'Không thể thêm sản phẩm' });
  }
});

// [POST] /api/products/upload
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Không có file được tải lên' });
  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({ imageUrl });
});

// [POST] /api/products/delete
router.post('/delete', (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: 'Danh sách ID không hợp lệ' });
  }

  try {
    let products = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    const remaining = products.filter(p => !ids.includes(p.id));
    const deletedCount = products.length - remaining.length;

    fs.writeFileSync(dataPath, JSON.stringify(remaining, null, 2), 'utf-8');

    res.json({ message: `✅ Đã xóa ${deletedCount} sản phẩm`, deletedCount });
  } catch (err) {
    console.error("❌ Lỗi khi xóa sản phẩm:", err.message);
    res.status(500).json({ error: 'Không thể xóa sản phẩm' });
  }
});

// [POST] /api/products/filter
router.post('/filter', (req, res) => {
  const { code, name, category } = req.body;

  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Không thể đọc dữ liệu' });

    try {
      let products = JSON.parse(data);

      if (code) {
        products = products.filter(p =>
          p.code?.toLowerCase().includes(code.toLowerCase())
        );
      }

      if (name) {
        products = products.filter(p =>
          p.name?.toLowerCase().includes(name.toLowerCase())
        );
      }

      if (category) {
        products = products.filter(p =>
          p.category?.toLowerCase() === category.toLowerCase()
        );
      }

      res.json(products);
    } catch (error) {
      console.error("❌ Lỗi filter:", error.message);
      res.status(500).json({ error: 'Lỗi xử lý dữ liệu' });
    }
  });
});

module.exports = router;
