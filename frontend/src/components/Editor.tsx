"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { Button } from "./ui/button";

const Editor = () => {
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

  const [value, setValue] = useState("");
  function handler() {
    console.log(value);
  }

  return (
    <>
      <ReactQuill
        className="my-10 border-none"
        theme="snow"
        formats={formats}
        modules={modules}
        value={value}
        onChange={(value) => setValue(value)}
      />
      <Button onClick={handler}>Submit</Button>
    </>
  );
};

export default Editor;
