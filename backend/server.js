import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { generateRoadmap } from './services/geminiService.js';

dotenv.config();

const app = express();
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    // Allow any Render or Vercel deployed frontend
    if (origin.endsWith('.onrender.com') || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Health Check Endpoint for Diagnostics
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: {
      geminiKey: !!process.env.GEMINI_API_KEY,
      youtubeKey: !!process.env.YOUTUBE_API_KEY,
      nodeVersion: process.version,
      port: process.env.PORT || 3001
    }
  });
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please wait 15 minutes and try again.' }
});
app.use('/api', limiter);

app.post('/api/generate-roadmap', async (req, res) => {
  try {
    const { currentSkills, targetRole, hoursPerWeek, resourcePreference, includeYouTube, language } = req.body;
    
    if (!currentSkills || !targetRole || !hoursPerWeek) {
      return res.status(400).json({ error: 'Missing required fields: currentSkills, targetRole, hoursPerWeek' });
    }

    if (typeof targetRole !== 'string' || targetRole.length > 200) {
      return res.status(400).json({ error: 'targetRole must be under 200 chars.' });
    }

    if (typeof currentSkills !== 'string' || currentSkills.length > 500) {
      return res.status(400).json({ error: 'currentSkills must be under 500 chars.' });
    }

    const parsedHours = Number(hoursPerWeek);
    if (isNaN(parsedHours) || parsedHours < 1 || parsedHours > 100) {
      return res.status(400).json({ error: 'hoursPerWeek must be 1–100.' });
    }

    const pref = resourcePreference || "mixed";
    const roadmap = await generateRoadmap(currentSkills, targetRole, hoursPerWeek, pref, includeYouTube, language);
    res.json({ roadmap });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate roadmap', 
      details: error.message || 'Unknown error'
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
