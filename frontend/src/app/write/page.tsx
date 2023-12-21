import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Editor from "@/components/Editor";

const page = () => {
  return (
    <>
      <MaxWidthWrapper className="border-2 border-gray-400 w-full">
        <Editor />
      </MaxWidthWrapper>
    </>
  );
};

export default page;
