const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dotenv = require('dotenv');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const connectDB = require('../config/db');

dotenv.config();

const users = [
    {
        name: 'Rohit Kumar',
        email: 'rohit@admin.com',
        password: 'Rohit@123',
        role: 'admin',
    },
    {
        name: 'Test User',
        email: 'user@test.com',
        password: 'User@123',
        role: 'user',
    },
];

const products = [
    {
        name: 'Emerald Geometric Planter',
        imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
        description: 'A beautiful 3D printed emerald green planter with geometric shapes. Perfect for succulents and small indoor plants.',
        price: 45.99,
        stock: 10,
    },
    {
        name: 'Abstract Canvas Art',
        imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80',
        description: 'Modern abstract art with soft emerald and brown tones. Ready to hang, gallery-wrapped canvas.',
        price: 129.99,
        stock: 5,
    },
    {
        name: 'Minimalist Desk Lamp',
        imageUrl: 'https://images.unsplash.com/photo-1507473888900-52e1ad145959?auto=format&fit=crop&w=800&q=80',
        description: 'Sleek brown and brass desk lamp. Adjustable arm with warm LED light for modern workspaces.',
        price: 89.99,
        stock: 15,
    },
    {
        name: 'Handcrafted Ceramic Mug',
        imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80',
        description: 'Artisanal ceramic mug with a green matte glaze. Holds 350ml, microwave and dishwasher safe.',
        price: 24.99,
        stock: 25,
    },
    {
        name: 'Vintage Leather Satchel',
        imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
        description: 'Genuine brown leather messenger bag with brass buckles. Fits a 15" laptop with room to spare.',
        price: 199.99,
        stock: 8,
    },
    {
        name: 'Indoor Herb Garden Kit',
        imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
        description: 'Complete self-watering herb garden with basil, mint, and parsley seeds. Grows on any kitchen counter.',
        price: 39.99,
        stock: 20,
    },
];

const importData = async () => {
    try {
        await connectDB();

        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.create(users);
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        await Product.create(sampleProducts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await connectDB();

        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
