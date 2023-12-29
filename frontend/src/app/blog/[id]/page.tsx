import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import BlogComponent from "@/components/BlogComponent";
// import { useSelector } from "react-redux";

const blog = [
  {
    id: 1,
    title: "Title One",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quam nobis ullam ad eos quasi facere reprehenderit nihil eveniet ipsa mollitia ipsum, ratione unde expedita! Recusandae ex soluta sequi rem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quam nobis ullam ad eos quasi facere reprehenderit nihil eveniet ipsa mollitia ipsum, ratione unde expedita! Recusandae ex soluta sequi rem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quam nobis ullam ad eos quasi facere reprehenderit nihil eveniet ipsa mollitia ipsum, ratione unde expedita! Recusandae ex soluta sequi rem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quam nobis ullam ad eos quasi facere reprehenderit nihil eveniet ipsa mollitia ipsum, ratione unde expedita! Recusandae ex soluta sequi rem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quam nobis ullam ad eos quasi facere reprehenderit nihil eveniet ipsa mollitia ipsum, ratione unde expedita! Recusandae ex soluta sequi rem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quam nobis ullam ad eos quasi facere reprehenderit nihil eveniet ipsa mollitia ipsum, ratione unde expedita! Recusandae ex soluta sequi rem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quam nobis ullam ad eos quasi facere reprehenderit nihil eveniet ipsa mollitia ipsum, ratione unde expedita! Recusandae ex soluta sequi rem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quam nobis ullam ad eos quasi facere reprehenderit nihil eveniet ipsa mollitia ipsum, ratione unde expedita! Recusandae ex soluta sequi rem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quam nobis ullam ad eos quasi facere reprehenderit nihil eveniet ipsa mollitia ipsum, ratione unde expedita! Recusandae ex soluta sequi rem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quam nobis ullam ad eos quasi facere reprehenderit nihil eveniet ipsa mollitia ipsum, ratione unde expedita! Recusandae ex soluta sequi rem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quam nobis ullam ad eos quasi facere reprehenderit nihil eveniet ipsa mollitia ipsum, ratione unde expedita! Recusandae ex soluta sequi rem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quam nobis ullam ad eos quasi facere reprehenderit nihil eveniet ipsa mollitia ipsum, ratione unde expedita! Recusandae ex soluta sequi rem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quam nobis ullam ad eos quasi facere reprehenderit nihil eveniet ipsa mollitia ipsum, ratione unde expedita! Recusandae ex soluta sequi rem? Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quam nobis ullam ad eos quasi facere reprehenderit nihil eveniet ipsa mollitia ipsum, ratione unde expedita! Recusandae ex soluta sequi rem?",
    category: "Slug One",
    views: 21313,
    author: "Shrish kerur",
  },
  {
    id: 2,
    title: "Title One",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quam nobis ullam ad eos quasi facere reprehenderit nihil eveniet ipsa mollitia ipsum, ratione unde expedita! Recusandae ex soluta sequi rem?",
    category: "Slug One",
    views: 21313,
    author: "Shrish kerur",
  },
  {
    id: 3,
    title: "Title One",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quam nobis ullam ad eos quasi facere reprehenderit nihil eveniet ipsa mollitia ipsum, ratione unde expedita! Recusandae ex soluta sequi rem?",
    category: "Slug One",
    views: 21313,
    author: "Shrish kerur",
  },
  {
    id: 4,
    title: "Title One",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quam nobis ullam ad eos quasi facere reprehenderit nihil eveniet ipsa mollitia ipsum, ratione unde expedita! Recusandae ex soluta sequi rem?",
    category: "Slug One",
    views: 21313,
    author: "Shrish kerur",
  },
  {
    id: 5,
    title: "Title One",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quam nobis ullam ad eos quasi facere reprehenderit nihil eveniet ipsa mollitia ipsum, ratione unde expedita! Recusandae ex soluta sequi rem?",
    category: "Slug One",
    views: 21313,
    author: "Shrish kerur",
  },
  {
    id: 6,
    title: "Title One",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quam nobis ullam ad eos quasi facere reprehenderit nihil eveniet ipsa mollitia ipsum, ratione unde expedita! Recusandae ex soluta sequi rem?",
    category: "Slug One",
    views: 21313,
    author: "Shrish kerur",
  },
];

export default function ({ params }: { params: { id: number } }) {
  // const user = useSelector((state) => state.userAuth);
  return (
    <div className="my-10">
      <MaxWidthWrapper>
        <BlogComponent id={params.id} />
      </MaxWidthWrapper>
    </div>
  );
}
