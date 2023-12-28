import axios from "axios";
import BlogCard from "./BlogCard";
import Comment from "./Comment";

type Tprops = {
  id: string | number;
  user?: any;
};

const BlogComponent = async ({ id, user }: Tprops) => {
  //
  const res = await axios.get(`http://localhost:8000/blog/getpost/${id}`);
  const { data } = await res;
  return (
    <div className="flex flex-col gap-y-5">
      <BlogCard data={data} id={id} />
      <Comment />
    </div>
  );
};

export default BlogComponent;
