const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: (process.env.BACKEND_URL || '') + '/api/auth/google/callback',
            passReqToCallback: true,
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                // Check if user exists
                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    return done(null, user);
                }

                // Check if user exists with same email but no googleId
                user = await User.findOne({ email: profile.emails[0].value });

                if (user) {
                    // Link google account
                    user.googleId = profile.id;
                    await user.save();
                    return done(null, user);
                }

                // Get role from state (passed from frontend -> auth route -> google -> callback)
                const role = req.query.state || 'user';

                // Create new user
                const newUser = {
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    role: role,
                    // Basic password placeholder since they login via Google
                    // In a real app, you might want a random string or handle this differently
                    password: '$2a$10$abcdefghijklmnopqrstuvwxyz123456',
                    // Note: We need to handle password validation carefully if we don't set a real password
                    // However, since we defined password as required in model, we need something.
                    // Better approach: Make password not required if googleId exists, or set a random hash.
                    // For now, let's set a random strong password that user doesn't know.
                    password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8),
                };

                user = await User.create(newUser);
                done(null, user);
            } catch (err) {
                console.error(err);
                done(err, null);
            }
        }
    )
);

// We are not using sessions, so we don't strictly need serialize/deserialize
// But Passport might complain without them if we initialize with sessions (default).
// Since we use JWT, we'll handle token generation in the callback route.
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
});
