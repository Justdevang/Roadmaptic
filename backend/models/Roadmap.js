import mongoose from 'mongoose';

const roadmapSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetRole: { type: String, required: true },
  currentSkills: { type: String, required: true },
  hoursPerWeek: { type: Number, required: true },
  roadmapData: { type: Object, required: true },
}, { timestamps: true });

const Roadmap = mongoose.model('Roadmap', roadmapSchema);
export default Roadmap;
