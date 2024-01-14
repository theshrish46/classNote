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
import { writeBlog } from "@/actions/post-actions/post";
import { toast } from "sonner";
import { updateBlog } from "@/actions/post-actions/updatepost";

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
  const [title, setTitle] = useState(data?.title);
  const [author, setAuthor] = useState(data?.authorName);
  const [category, setCategory] = useState(data?.category);
  const [description, setDescription] = useState(data?.description);
  const [value, setValue] = useState(data?.content);
  const router = useRouter();

  async function handler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("value", value);
    if (data) {
      updateBlog(data.id, title, author, category, description, value)
        .then((data) => {
          if (data.success) {
            toast.success(data.success);
          }
          if (data.error) {
            toast.error(data.error);
          }
        })
        .catch((error) => {
          console.log("Error while updating the post in catch block", error);
        });
    }
    writeBlog(title, author, category, description, value)
      .then((data) => {
        if (data.success) {
          toast.success(data.success);
        }
        if (data.error) {
          toast.error(data.error);
        }
      })
      .catch((error) => {
        console.log("Error while writing blog in catch block", error);
      });
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
          className="p-1 h-auto text-xl lg:text-4xl font-semibold break-words border-none focus-visible:ring-offset-0 shadow-none placeholder:text-gray-400 scroll-smooth resize-none focus-visible:ring-0"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="w-full flex justify-between items-center">
          <Input
            name="author"
            className="px-1 py-0 h-auto text-sm lg:text-xl font-medium border-none shadow-none placeholder:text-gray-400 focus-visible:ring-offset-0 focus-visible:ring-0"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Input
            name="category"
            className="ppx-1 py-0 h-auto text-sm lg:text-xl font-medium border-none shadow-none placeholder:text-gray-400 focus-visible:ring-offset-0 focus-visible:ring-0"
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
          className="placeholder:text-gray-400 font-semibold focus-visible:ring-0 border-none focus-visible:ring-offset-0 text-sm lg:text-base resize-y"
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
