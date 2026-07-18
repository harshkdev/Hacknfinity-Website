import mongoose, { Schema, Document } from "mongoose";

export interface IGallery extends Document {
  caption: string;
  event: string;
  type: "image" | "video";
  url: string;
  thumbnail: string;
  date: string;
}

const GallerySchema = new Schema(
  {
    caption: { type: String, required: true },
    event: { type: String, required: true },
    type: {
      type: String,
      enum: ["image", "video"],
      default: "image",
    },
    url: { type: String, required: true },
    thumbnail: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Gallery || mongoose.model<IGallery>("Gallery", GallerySchema);
