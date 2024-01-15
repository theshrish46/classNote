"use client";
import axios from "axios";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

import { comment } from "@/actions/comment-actions/comment";
import { toast } from "sonner";

type CommentPageProps = {
  postId: string;
  decodedToken: any;
};

const CommentBox = ({ postId, decodedToken }: CommentPageProps) => {
  const [commentText, setComment] = useState("");

  async function commentHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    comment(commentText, postId)
      .then((data) => {
        console.log(data);
        if (data.success) toast.success(data.success);
        if (data.error) toast.error(data.error);
      })
      .catch((error) => {
        console.log("Catch errors", error);
      });
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

export default CommentBox;
