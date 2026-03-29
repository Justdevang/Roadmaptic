import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateRoadmap } from './services/geminiService.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate-roadmap', async (req, res) => {
  try {
    const { currentSkills, targetRole, hoursPerWeek, resourcePreference, includeYouTube, language } = req.body;
    
    if (!currentSkills || !targetRole || !hoursPerWeek) {
      return res.status(400).json({ error: 'Missing required fields: currentSkills, targetRole, hoursPerWeek' });
    }

    const pref = resourcePreference || "mixed";
    const roadmap = await generateRoadmap(currentSkills, targetRole, hoursPerWeek, pref, includeYouTube, language);
    res.json({ roadmap });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to generate roadmap' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
