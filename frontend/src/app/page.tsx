import CardComponent from "@/components/CardComponent";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Home() {
  return (
    <main>
      <MaxWidthWrapper>
        <div className="py-20 text-center">
          <div className="flex flex-wrap justify-center items-center gap-x-5">
            <CardComponent className={"my-10"} />
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  );
}
