const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const filePath = path.join(__dirname, '../data/categories.json');

router.get('/', (req, res) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Lỗi đọc categories.json' });

    try {
      const categories = JSON.parse(data);
      res.json(categories);
    } catch {
      res.status(500).json({ error: 'Dữ liệu không hợp lệ' });
    }
  });
});

module.exports = router;
