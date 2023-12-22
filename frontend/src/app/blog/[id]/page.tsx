import MaxWidthWrapper from "@/components/MaxWidthWrapper";

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
  const post = blog.find((item) => item.id == params.id);
  return (
    <div className="my-10">
      <MaxWidthWrapper>
        <div>
          <div>{post?.id}</div>
          <div className="flex flex-col justify-center">
            <div className="text-7xl text-muted-foreground font-semibold">
              {post?.title}
            </div>
            <div className="text-lg font-medium italic tracking-wider self-end">
              /{post?.category}
            </div>
          </div>

          <div className="my-5 flex flex-col justify-start items-start gap-y-5">
            <div className="text-2xl font-bold tracking-wide">
              {post?.author}
            </div>
            <div className="text-2xl tracking-wide leading-9 text-left">
              {post?.description}
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
