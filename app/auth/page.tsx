import MaxWidthWrapper from "@/components/site-components/MaxWidthWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const page = async () => {
  return (
    <div>
      <MaxWidthWrapper className="py-20">
        <Label>skdfjdk</Label>
        <Input className="focus-visible:ring-offset-0 focus-visible:ring-blue-500" />
      </MaxWidthWrapper>
    </div>
  );
};
export default page;
