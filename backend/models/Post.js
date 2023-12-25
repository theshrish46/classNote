import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    content: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    authorId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    likes: {
      type: [mongoose.Types.ObjectId],
      ref: "user",
      default: [],
    },
  },
  { timestamps: true },
);

const Post = mongoose.model("post", PostSchema);

export default Post;
