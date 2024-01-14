import { Car } from "lucide-react";

import { Button } from "../../../components/ui/button";

export const Social = () => {
  const onClick = (provider: "google" | "github") => {
    console.log("google");
  };
  return (
    <div className="flex items-center gap-x-2 w-full">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <Car />
      </Button>
      <Button
        className="flex items-center gap-x-2 w-full"
        size="lg"
        variant="outline"
        onClick={() => onClick("github")}
      >
        <Car />
      </Button>
    </div>
  );
};
