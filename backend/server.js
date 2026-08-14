import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateHustleSuggestions, generateHustleRoadmap, chatWithBot } from './services/aiService.js';

dotenv.config();

// Global process error handlers
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
});

const app = express();
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

// Middleware
const allowedOrigin = process.env.FRONTEND_URL || '*';
app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Health Check Endpoints
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'AI Side Hustle Finder API',
    message: 'Backend service is active and running',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API is healthy',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API is healthy',
    timestamp: new Date().toISOString()
  });
});

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

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Express Error Handler caught:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

try {
  app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
    console.log(`Health check available at http://${HOST}:${PORT}/health`);
  });
} catch (startupError) {
  console.error('Server startup failed:', startupError);
  process.exit(1);
}

