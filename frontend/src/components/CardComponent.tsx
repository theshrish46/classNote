import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type TProps = {
  title: String;
  description: String;
  category: String;
  views: Number;
  author: String;
  className: String;
};

const CardComponent = ({
  title,
  description,
  author,
  category,
  views,
  className,
}: TProps) => {
  return (
    <div className={cn(className, "w-full")}>
      <Card className="flex flex-col min-h-48 justify-between items-stretch hover:cursor-pointer">
        <CardHeader className="flex gap-y-3 text-justify">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between items-center">
          <p className="text-sm font-semibold text-gray-600">{category}</p>
          <p className="text-sm font-semibold text-gray-600 hover:text-blue-600">
            {author}
          </p>
          <p className="text-sm font-semibold text-gray-600">{views}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardComponent;
