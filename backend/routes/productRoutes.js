const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    getMyProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const { protect, brand } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// Public routes
router.route('/').get(getProducts);
router.get('/mine', protect, brand, getMyProducts);
router.route('/:id').get(getProductById);

// Brand-only routes
router.post('/', protect, brand, upload.single('image'), createProduct);
router.put('/:id', protect, brand, upload.single('image'), updateProduct);
router.delete('/:id', protect, brand, deleteProduct);

module.exports = router;
