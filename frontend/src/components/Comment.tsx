"use client";
import { useForm } from "react-hook-form";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

type TProps = {
  postId: string;
};

const Comment = ({ postId }: TProps) => {
  const user = useSelector((state) => state.userAuth);
  const userId = user.id;
  const [comment, setComment] = useState("");
  async function commentHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const res = axios.post(`http://localhost:8000/blog/comment/${postId}`, {
      userId,
      postId,
      comment,
    });
    console.log(res);
    const { data } = await res;
    console.log(data);
  }
  return (
    <div className="w-full mx-auto">
      <form className="flex flex-col gap-y-5" onSubmit={commentHandler}>
        <Textarea
          className="resize-none h-24 w-full text-base text-gray-900 font-medium"
          placeholder="Comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></Textarea>
        <Button type="submit" className="w-1/5">
          Comment
        </Button>
      </form>
    </div>
  );
};

export default Comment;
