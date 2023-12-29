import { APIError } from "../utils/ApiError.js";
import Post from "./../models/Post.js";
import { APIResponse } from "./../utils/APIResponse.js";

const getPost = async (req, res) => {
  const post = await Post.find();
  return res.json(post);
};

const write = async (req, res) => {
  const { userId, title, author, description, category, value } = req.body;
  console.log(userId);
  console.log(JSON.stringify(req.body.userId));
  console.log("Title and author", title, author);
  console.log("req.body", req.body);
  console.log("req.user", req.user);

  const post = await Post.create({
    title,
    author,
    description,
    category,
    content: value,
    authorId: req.user._id,
  });

  return res.json(new APIResponse(200, post, "Successfully created a post"));
};

const getPostWithId = async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  return res.json(post);
};

const editPostWithId = async (req, res) => {
  const postID = req.params.id;
  const post = await Post.findById(id);
  if (!post) {
    throw new APIError(400, `Post with the post id ${id} doesn't exits`);
  }
  // const updatedPost = await Post.update
  return res.json({ msg: "ok" });
};

export { write, getPost, getPostWithId, editPostWithId };
