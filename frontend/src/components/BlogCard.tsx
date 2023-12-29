"use client";
import ReactHtmlParser from "react-html-parser";
import { useSelector } from "react-redux";
import Editor from "./Editor";

type TProps = {
  id: any;
  data: any;
};

const BlogCard = ({ data, id }: TProps) => {
  const user = useSelector((state) => state.userAuth);
  const userID = user.id;
  const { authorId } = data;

  return (
    <div>
      {userID == authorId ? (
        <div>
          He is the author
          <ul>
            <li>{userID}</li>
            <li>{authorId}</li>
          </ul>
          <Editor data={data} />
        </div>
      ) : (
        <div>
          He is not the author
          <ul>
            <li>{userID}</li>
            <li>{id}</li>
          </ul>
          <div className="py-10">
            <div className="py-10">{id}</div>
            <div className="flex flex-col justify-center">
              <div className="text-7xl text-muted-foreground font-semibold">
                {data?.title}
              </div>
            </div>

            <div className="my-5 flex justify-between items-stretch gap-y-5">
              <div className="text-2xl tracking-wide leading-9 text-left text-muted-foreground">
                {data?.description}
              </div>
            </div>
            <div className="my-5 flex justify-between items-center">
              <div className="italic text-xl font-bold tracking-wide">
                {data?.author}
              </div>
              <div className="text-lg font-medium italic tracking-wider">
                {data?.category}
              </div>
            </div>
            <div>{ReactHtmlParser(data.content)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
