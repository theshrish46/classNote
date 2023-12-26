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
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "user",
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
);

const Post = mongoose.model("post", PostSchema);

export default Post;
