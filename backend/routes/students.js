import express from 'express';
import Subject from '../models/Subject.js';
import Unit from '../models/Unit.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all subjects
router.get('/subjects', authMiddleware, async (req, res) => {
  try {
    const subjects = await Subject.find().populate('units');
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get unit details
router.get('/units/:unitId', authMiddleware, async (req, res) => {
  try {
    const unit = await Unit.findById(req.params.unitId).populate('subject');
    res.json(unit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
