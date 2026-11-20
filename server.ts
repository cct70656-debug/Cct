import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// AI Finance Analysis endpoint
app.post('/api/ai/analyze', async (req, res) => {
  try {
    const { financialData } = req.body;
    if (!apiKey) {
      return res.status(500).json({ error: 'Gemini API key not configured on server.' });
    }

    const prompt = `You are SmartFin AI, a world-class professional financial advisor and wealth management expert.
Analyze the following user financial data and provide 3-5 structured, actionable financial insights and recommendations.
Return the response as a JSON array of objects with keys: title, description, category ('spending' | 'savings' | 'budget' | 'behavior'), and severity ('low' | 'medium' | 'high').

User Financial Data:
${JSON.stringify(financialData, null, 2)}

Return ONLY valid JSON array.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text || '[]';
    // Clean markdown code blocks if present
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const insights = JSON.parse(cleaned);

    res.json({ insights });
  } catch (error: any) {
    console.error('AI Analysis Error:', error);
    res.status(500).json({ error: error.message || 'Failed to generate financial analysis.' });
  }
});

// AI Chatbot endpoint
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, financialContext, chatHistory } = req.body;
    if (!apiKey) {
      return res.status(500).json({ error: 'Gemini API key not configured on server.' });
    }

    const systemInstruction = `You are SmartFin AI, an expert, friendly, and precise personal finance assistant.
You help users manage budgets, analyze expenses, optimize savings, and grow their wealth.
You have access to the user's current financial context:
${JSON.stringify(financialContext, null, 2)}

Give concise, encouraging, accurate, and professional financial advice. Do not execute financial transactions. Always maintain fiduciary responsibility.`;

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction,
      },
      history: (chatHistory || []).map((msg: any) => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessage({ message });
    res.json({ reply: result.text });
  } catch (error: any) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ error: error.message || 'Failed to process AI chat message.' });
  }
});

// Serve frontend static files in production
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const PORT = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`SmartFin AI server running on port ${PORT}`);
});
