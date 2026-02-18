const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const passport = require('passport');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();
app.set('trust proxy', 1);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Passport Config
require('./config/passport');

// CORS configuration
app.use(
    cors({
        origin: (origin, callback) => {
            const allowedOrigins = [
                'http://localhost:5173',
                process.env.FRONTEND_URL
            ];

            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);

            // Check if origin checks out
            if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
                return callback(null, true);
            }

            // Optional: Block others or allow for debugging
            // return callback(new Error('Not allowed by CORS'));
            // For now, in case of issues, let's log and allow or strict block. 
            // Better to strict block but maybe the user has a custom domain?
            return callback(new Error('Not allowed by CORS'));
        },
        credentials: true,
    })
);

app.use(passport.initialize());

// Serve uploaded images statically
app.use('/uploads', express.static(uploadsDir));

app.get('/', (req, res) => {
    res.send('MarketNest API is running...');
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

// Error Handling Middleware
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
}

module.exports = app;
