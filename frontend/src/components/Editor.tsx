"use client";
import React, { use, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { Button, buttonVariants } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import axios, { AxiosHeaders } from "axios";

const Editor = () => {
  const localUser = localStorage.getItem("user");
  const user = localUser ? JSON.parse(localUser) : null;
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block",
  ];
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const userID = user._id;
  async function handler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(value);
    const res = await axios.post("http://localhost:8000/blog/write", {
      userID,
      title,
      category,
      author,
      description,
      value,
    });
  }

  return (
    <div className="my-10 flex justify-center flex-col items-center">
      <form
        className="flex flex-col gap-y-5 justify-center items-center"
        onSubmit={handler}
      >
        <Textarea
          className="p-1 h-auto text-4xl font-semibold break-words border-none focus-visible:ring-0 shadow-none placeholder:text-gray-200 scroll-smooth resize-none"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="w-full flex justify-between items-center">
          <Input
            className="px-1 py-0 h-auto text-xl font-medium border-none focus-visible:ring-0 shadow-none placeholder:text-gray-200"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Input
            className="px-1 py-0 h-auto text-xl font-medium border-none focus-visible:ring-0 shadow-none placeholder:text-gray-200"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="resize-none"
        ></Textarea>
        <ReactQuill
          className={cn("border-none")}
          theme="snow"
          formats={formats}
          modules={modules}
          value={value}
          onChange={(value) => setValue(value)}
        />
        <Button type="submit" className={cn(buttonVariants(), "w-full")}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Editor;
