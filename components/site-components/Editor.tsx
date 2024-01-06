"use client";
import React, { ReactHTMLElement, useState } from "react";
// import axios, { Method } from "axios";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import "react-quill/dist/quill.bubble.css";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios, { Method } from "axios";

type DataProps = {
  _id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  content: string;
  authorId: string;
  likes: any;
  createdAt: any;
  updatedAt: any;
};

type TProps = {
  // propTitle?: string;
  // propAuthor?: string;
  // propCategory?: string;
  // propDescription?: string;
  // propValue?: string;
  data?: DataProps | any;
};

const Editor = ({ data }: TProps) => {
  // TODO: Make selector type safe
  type User = {
    id: string | null;
    name: string | null;
    email: string | null;
    accessToken: string | null;
    refreshToken: string | null;
  };

  const [title, setTitle] = useState(data?.title);
  const [author, setAuthor] = useState(data?.authorName);
  const [category, setCategory] = useState(data?.category);
  const [description, setDescription] = useState(data?.description);
  const [value, setValue] = useState(data?.content);
  const router = useRouter();

  async function handler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("value", value);
    const postData = {
      title,
      author,
      description,
      category,
      value,
    };
    console.log(data.id);
    console.log(data);
    const url = data ? `/api/post/${data.id}` : "/api/post";
    const method = data ? "put" : "post";

    const res = await axios({
      method: method as Method,
      url: url,
      data: postData,
    });
    console.log(res);
    console.log(res.data);

    router.push("/");
  }

  return (
    <div className="my-10 flex justify-center flex-col items-stretch w-full">
      <form
        className="flex flex-col gap-y-5 justify-center items-center"
        onSubmit={handler}
      >
        <Textarea
          name="title"
          className="p-1 h-auto text-4xl font-semibold break-words border-none focus-visible:ring-offset-0 shadow-none placeholder:text-gray-400 scroll-smooth resize-none focus-visible:ring-0"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="w-full flex justify-between items-center">
          <Input
            name="author"
            className="px-1 py-0 h-auto text-xl font-medium border-none shadow-none placeholder:text-gray-400 focus-visible:ring-offset-0 focus-visible:ring-0"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Input
            name="category"
            className="ppx-1 py-0 h-auto text-xl font-medium border-none shadow-none placeholder:text-gray-400 focus-visible:ring-offset-0 focus-visible:ring-0"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <Textarea
          name="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="resize-none placeholder:text-gray-400 font-semibold focus-visible:ring-0 border-none focus-visible:ring-offset-0"
        ></Textarea>
        <ReactQuill
          className={cn("border-none w-full")}
          theme="snow"
          formats={formats}
          modules={modules}
          // placeholder="Tell your story..."
          value={value}
          onChange={setValue}
        />
        <div className="flex justify-start items-center gap-x-5 w-full">
          <Button type="submit" className={cn(buttonVariants(), "self-start")}>
            Submit
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className={"bg-destructive"}>Delete</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Post</DialogTitle>
                <DialogDescription>
                  Do you really want to delete the post?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="bg-destructive">Delete</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </div>
  );
};

export default Editor;

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
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
