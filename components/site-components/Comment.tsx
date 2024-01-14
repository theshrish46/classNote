"use client";
import axios from "axios";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

import { comment } from "@/actions/comment";

type CommentPageProps = {
  postId: string;
  decodedToken: any;
};

const Comment = ({ postId, decodedToken }: CommentPageProps) => {
  const [commentText, setComment] = useState("");

  async function commentHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = await axios.post(`/api/comment/${postId}`, {
      commentText,
      decodedToken,
    });
    comment(commentText, postId)
    console.log(res);
    const { data } = await res;
    console.log("data", data);
  }
  return (
    <div className="my-6">
      <form onSubmit={commentHandler}>
        <div className="flex flex-col justify-center items-start gap-y-3">
          <Textarea
            className="resize-none focus-visible:ring-0 ring-1 ring-offset-1 ring-offset-gray-400 border-none"
            value={commentText}
            onChange={(e) => setComment(e.target.value)}
          ></Textarea>
          <Button type="submit">Comment</Button>
        </div>
      </form>
    </div>
  );
};

export default Comment;
