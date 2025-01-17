import mongoose, { Schema, models } from "mongoose";

const FeedbackSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    text: {
      type: String,
      required: true,
      minlength: [4, 'Message must be at least 4 characters long'],
      maxlength: [1000, 'Message cannot be longer than 1000 characters'],
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = models.Feedback || mongoose.model('Feedback', FeedbackSchema);
export default Feedback;
