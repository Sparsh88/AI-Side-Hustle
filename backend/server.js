import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateHustleSuggestions, generateHustleRoadmap, chatWithBot } from './services/aiService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/get-hustles', async (req, res) => {
  try {
    const { skills, interests, time, budget } = req.body;
    
    // Basic validation
    if (!skills || !interests || !time || !budget) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Call AI service
    const suggestions = await generateHustleSuggestions({ skills, interests, time, budget });
    
    res.json({ suggestions });
  } catch (error) {
    console.error('Error generating suggestions:', error);
    res.status(500).json({ error: 'Failed to generate suggestions. Please try again later.' });
  }
});

app.post('/api/get-hustle-details', async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required.' });
    }

    const details = await generateHustleRoadmap({ title, description });
    
    res.json({ details });
  } catch (error) {
    console.error('Error generating details:', error);
    res.status(500).json({ error: 'Failed to generate details. Please try again later.' });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const response = await chatWithBot({ message, history: history || [] });
    
    res.json(response);
  } catch (error) {
    console.error('Error in chat:', error);
    res.status(500).json({ error: 'Failed to get chat response. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
