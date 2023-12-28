import ReactHtmlParser from "react-html-parser";

type TProps = {
  id: any;
  data: any;
};

const BlogCard = ({ data, id }: TProps) => {
  return (
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
  );
};

export default BlogCard;
