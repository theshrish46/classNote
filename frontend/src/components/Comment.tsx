"use client";
import { useForm } from "react-hook-form";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Textarea } from "./ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const Comment = () => {
  const commetnSchema = z.object({
    postId: z.string(),
    userId: z.string(),
    comment: z.string(),
  });
  const form = useForm<z.infer<typeof commetnSchema>>({
    resolver: zodResolver(commetnSchema),
  });

  function commentHandler(values) {
    console.log(values);
  }
  return (
    <div className="w-full mx-auto">
      <Form {...form}>
        <form
          className="flex flex-col gap-y-5"
          onSubmit={form.handleSubmit(commentHandler)}
        >
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    className="resize-none h-24 w-full text-base text-gray-800"
                    placeholder="Comment..."
                  ></Textarea>
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="w-1/5">Comment</Button>
        </form>
      </Form>
    </div>
  );
};

export default Comment;
