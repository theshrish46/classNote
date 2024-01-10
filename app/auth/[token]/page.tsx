"use client";
import MaxWidthWrapper from "@/components/site-components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Page = ({ params }: { params: { token: string } }) => {
  const token = params.token;
  const onSubmit = async () => {
    const response = await axios.post(`/api/register/${token}`);
    console.log(response)
    const { data } = await response;
    console.log(data)
  };
  return (
    <div className="container">
      <MaxWidthWrapper>
        {params.token}
        <Button onClick={onSubmit}>Authorize email</Button>
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
