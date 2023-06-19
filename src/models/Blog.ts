import mongoose, { Model } from "mongoose";

interface Blog {
  _id: string;
  userId: mongoose.Schema.Types.ObjectId;
  title: string;
  content: string;
  coverImage: string;
}

const blogSchema = new mongoose.Schema<Blog>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      minLength: [5, "must be atleast 5 chars"],
      maxLength: [75, "must be atmost 75 chars"],
      required: true,
      trim: true,
    },
    content: {
      type: String,
      minLength: [5, "must be atleast 5 chars"],
      maxLength: [10000, "maximum characters is 10000 chars"],
      required: true,
    },
    coverImage: String,
  },
  { timestamps: true }
);

export default mongoose.model<Blog>("Blog", blogSchema);
