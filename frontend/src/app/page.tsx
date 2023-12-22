import CardComponent from "@/components/CardComponent";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import Link from "next/link";

const blog = [
  {
    id: 1,
    title: "Title One",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quam nobis ullam ad eos quasi facere reprehenderit nihil eveniet ipsa mollitia ipsum, ratione unde expedita! Recusandae ex soluta sequi rem?",
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

export default function Home() {
  return (
    <main>
      <MaxWidthWrapper>
        <div className="py-20 text-center">
          <div className="flex flex-wrap justify-center items-center gap-x-5">
            {blog.map((item, index) => (
              <Link href={`/blog/${item.id}`} target="_blank">
                <CardComponent
                  className={"my-3"}
                  title={item.title}
                  description={item.description}
                  category={item.category}
                  author={item.author}
                  views={item.views}
                  key={index}
                />
              </Link>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  );
}
