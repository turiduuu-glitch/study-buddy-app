import express from 'express';
import User from '../models/User.js';
import Subject from '../models/Subject.js';
import Unit from '../models/Unit.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Approve student
router.put('/approve/:userId', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { isApproved: true }, { new: true });
    res.json({ message: 'Student approved', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get pending students
router.get('/pending-students', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const students = await User.find({ role: 'student', isApproved: false });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create subject
router.post('/subjects', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, description } = req.body;
    const subject = new Subject({ name, description });
    await subject.save();
    res.status(201).json(subject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create unit
router.post('/units', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, description, subject, content } = req.body;
    const unit = new Unit({ name, description, subject, content });
    await unit.save();
    await Subject.findByIdAndUpdate(subject, { $push: { units: unit._id } });
    res.status(201).json(unit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
