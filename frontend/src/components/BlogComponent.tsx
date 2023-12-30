import axios from "axios";
import BlogCard from "./BlogCard";

type Tprops = {
  id: string | number;
  user?: any;
};

const BlogComponent = async ({ id, user }: Tprops) => {
  const res = await axios.get(`http://localhost:8000/blog/getpost/${id}`);
  const { data } = await res;
  console.log(data);
  return (
    <div className="flex flex-col gap-y-5">
      <BlogCard data={data} id={id} />
    </div>
  );
};

export default BlogComponent;
