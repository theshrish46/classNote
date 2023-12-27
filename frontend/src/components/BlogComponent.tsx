import axios from "axios";
import DOMPurify from "dompurify";
import ReactHtmlParser from "react-html-parser";

type Tprops = {
  id: string | number;
};

const BlogComponent = async ({ id }: Tprops) => {
  console.log(id);
  const res = await axios.get(`http://localhost:8000/blog/getpost/${id}`);
  const { data } = await res;
  const sanitizedContent = DOMPurify(data.content);
  return (
    <div>
      <div>
        <div>{data?.id}</div>
        <div className="flex flex-col justify-center">
          <div className="text-7xl text-muted-foreground font-semibold">
            {data?.title}
          </div>
          <div className="text-lg font-medium italic tracking-wider self-end">
            /{data?.category}
          </div>
        </div>

        <div className="my-5 flex flex-col justify-start items-start gap-y-5">
          <div className="text-2xl font-bold tracking-wide">{data?.author}</div>
          <div className="text-2xl tracking-wide leading-9 text-left">
            {data?.description}
          </div>
        </div>
        {/* <div
          className="text-3xl"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        /> */}
        <div>{ReactHtmlParser(data.content)}</div>
        <div>{data.content}</div>
      </div>
    </div>
  );
};

export default BlogComponent;
