import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Editor from "@/components/Editor";

const page = () => {
  return (
    <>
      <MaxWidthWrapper className="w-full">
        <Editor />
      </MaxWidthWrapper>
    </>
  );
};

export default page;
