const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  console.log('GET /data route hit'); // Debug: route handler invoked
  res.json({ message: 'Data accessed successfully' });
});

module.exports = router;