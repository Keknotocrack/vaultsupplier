import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();

// Security middleware
app.use((req, res, next) => {
    // Disable right-click
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';");
    
    // Prevent code viewing
    res.setHeader('X-Content-Type-Options', 'nosniff');
    
    // Disable browser caching
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    next();
});

app.use(cors({
    origin: '*', // Consider restricting this to specific domains
    methods: ['GET', 'POST']
}));

// Serve static files with protection
app.use(express.static('public', {
    setHeaders: (res, path) => {
        // Add protection headers for static files
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('X-XSS-Protection', '1; mode=block');
    }
}));

// Discord API proxy endpoint
app.get('/api/discord/user/:userId', async (req, res) => {
    try {
        const response = await fetch(`https://discord.com/api/v9/users/${req.params.userId}`, {
            headers: {
                'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`
            }
        });
        const data = await response.json();
        res.json({
            id: data.id,
            avatar: data.avatar
        });
    } catch (error) {
        console.error('Error fetching Discord user:', error);
        res.status(500).json({ error: 'Failed to fetch Discord user' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 