const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');

// @desc    Fetch all products (marketplace)
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 12;
        const category = req.query.category;

        const query = {};
        if (category && category !== 'All') {
            query.category = category;
        }

        const count = await Product.countDocuments(query);
        const products = await Product.find(query)
            .populate('brand', 'name')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        res.json({
            products,
            page,
            pages: Math.ceil(count / limit),
            total: count,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('brand', 'name');
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get brand's own products
// @route   GET /api/products/mine
// @access  Private/Brand
const getMyProducts = async (req, res) => {
    try {
        const products = await Product.find({ brand: req.user._id })
            .sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Brand
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        if (!name || !description || price === undefined) {
            return res.status(400).json({ message: 'Please provide name, description, and price' });
        }

        let imageUrl = '';
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        } else if (req.body.imageUrl) {
            imageUrl = req.body.imageUrl;
        } else {
            return res.status(400).json({ message: 'Please provide a product image' });
        }

        const product = new Product({
            name,
            description,
            price: Number(price),
            category: category || 'Uncategorized',
            imageUrl,
            brand: req.user._id,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Brand (owner only - RLS)
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // RLS: Ensure the brand owns this product
        if (product.brand.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to edit this product' });
        }

        const { name, price, description, category } = req.body;

        product.name = name || product.name;
        product.price = price !== undefined ? Number(price) : product.price;
        product.description = description || product.description;
        product.category = category || product.category;

        if (req.file) {
            // Delete old image if it's a local upload
            if (product.imageUrl && product.imageUrl.startsWith('/uploads/')) {
                const oldPath = path.join(__dirname, '..', product.imageUrl);
                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                }
            }
            product.imageUrl = `/uploads/${req.file.filename}`;
        } else if (req.body.imageUrl) {
            product.imageUrl = req.body.imageUrl;
        }

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Brand (owner only - RLS)
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // RLS: Ensure the brand owns this product
        if (product.brand.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this product' });
        }

        // Delete image file if local
        if (product.imageUrl && product.imageUrl.startsWith('/uploads/')) {
            const imgPath = path.join(__dirname, '..', product.imageUrl);
            if (fs.existsSync(imgPath)) {
                fs.unlinkSync(imgPath);
            }
        }

        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    getProductById,
    getMyProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};
