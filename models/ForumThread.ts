import mongoose, { Schema, Document } from "mongoose";

export interface IForumThread extends Document {
  title: string;
  body: string;
  author: {
    name: string;
    avatar: string;
    role?: string;
    badge?: string;
  };
  category: string;
  tags: string[];
  upvotes: number;
  replies: number;
  views: number;
  createdAt: Date;
  isAnswered: boolean;
  isPinned: boolean;
}

const ForumThreadSchema = new Schema<IForumThread>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: {
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    role: { type: String, default: "" },
    badge: { type: String, default: "" }
  },
  category: { type: String, required: true },
  tags: { type: [String], default: [] },
  upvotes: { type: Number, default: 0 },
  replies: { type: Number, default: 0 },
  views: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
  isAnswered: { type: Boolean, default: false },
  isPinned: { type: Boolean, default: false },
});

delete mongoose.models.ForumThread;
export default mongoose.model<IForumThread>("ForumThread", ForumThreadSchema);
