import mongoose, { Schema, Document } from "mongoose";

export interface IMember extends Document {
  name: string;
  role: string;
  team: string;
  college: string;
  bio: string;
  avatar: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

const MemberSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    team: { type: String, required: true },
    college: { type: String, required: true },
    bio: { type: String, required: true },
    avatar: { type: String, required: true },
    linkedin: { type: String, default: "" },
    github: { type: String, default: "" },
    twitter: { type: String, default: "" },
  },
  { timestamps: true }
);

delete mongoose.models.Member;
export default mongoose.model<IMember>("Member", MemberSchema);
