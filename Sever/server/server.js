const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 8080;

// ===== Middleware =====
app.use(cors()); // Cho phép truy cập từ frontend khác origin
app.use(express.json()); // Hỗ trợ parse JSON body
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Truy cập ảnh đã upload

// ===== Routes =====
app.get('/', (req, res) => {
  res.send('🎉 Backend đang hoạt động!');
});

app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});
