import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  slug: string;
  date: string;
  category: string;
  mode: string;
  location: string;
  duration?: string;
  description: string;
  status: "upcoming" | "ongoing" | "past";
  banner: string;
  isFeatured: boolean;
  attendees: number;
}

const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    date: { type: String, required: true },
    category: { type: String, required: true },
    mode: { type: String, required: true },
    location: { type: String, required: true },
    duration: { type: String, default: "" },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "past"],
      default: "upcoming",
    },
    banner: { type: String, required: true },
    isFeatured: { type: Boolean, default: false },
    attendees: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
