import express from 'express';
import Message from '../models/Message.js';
import { authMiddleware } from '../middleware/auth.js';
import { OpenAI } from 'openai';

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Ask AI assistant
router.post('/ask', authMiddleware, async (req, res) => {
  try {
    const { userMessage, unitId } = req.body;
    const studentId = req.user.id;

    // Get AI response
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful tutor. Answer student questions clearly and concisely.',
        },
        { role: 'user', content: userMessage },
      ],
      max_tokens: 500,
    });

    const aiResponse = completion.choices[0].message.content;

    // Save message
    const message = new Message({ student: studentId, unit: unitId, userMessage, aiResponse });
    await message.save();

    res.json({ userMessage, aiResponse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get chat history
router.get('/history/:unitId', authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({ student: req.user.id, unit: req.params.unitId });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
