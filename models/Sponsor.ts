import mongoose, { Schema, Document } from "mongoose";

export interface ISponsor extends Document {
  name: string;
  logo: string;
  url?: string;
  tier?: "platinum" | "gold" | "silver" | "community";
}

const SponsorSchema = new Schema(
  {
    name: { type: String, required: true },
    logo: { type: String, required: true },
    url: { type: String },
    tier: {
      type: String,
      enum: ["platinum", "gold", "silver", "community"],
      default: "community",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Sponsor || mongoose.model<ISponsor>("Sponsor", SponsorSchema);
