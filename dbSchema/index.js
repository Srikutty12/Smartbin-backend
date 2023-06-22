import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const pointsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  points: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("users", userSchema);
const Points = mongoose.model("points", pointsSchema);

export { User, Points };
