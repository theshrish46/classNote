import Post from "./../models/Post.js";
import { APIResponse } from "./../utils/APIResponse.js";

const write = async (req, res) => {
  const { userId, title, author, description, category, content } = req.body;
  console.log(userId);
  console.log(JSON.stringify(req.body.userId));
  console.log(title, author);
  console.log(req.body);

  const post = await Post.create({
    title,
    author,
    description,
    category,
    content,
    authorId: req.body.userId,
  });

  return res.json(new APIResponse(200, post, "Successfully created a post"));
};

export { write };
