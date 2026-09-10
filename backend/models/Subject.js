import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  units: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Unit' }],
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Subject', subjectSchema);
