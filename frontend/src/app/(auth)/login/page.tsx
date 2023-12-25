"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

const page = () => {
  const formObject = z.object({
    email: z.string().email(),
    password: z.string(),
  });
  const form = useForm<z.infer<typeof formObject>>({
    resolver: zodResolver(formObject),
    defaultValues: {
      email: "test@test.com",
      password: "12345",
    },
  });

  async function handler(values: z.infer<typeof formObject>) {
    console.log(values);
    try {
      const res = await axios.post("http://localhost:8000/auth/login", values);
      const { data } = await res;
      console.log(data);
      console.log(res);
    } catch (error) {
      console.log("Something went wrong while logging in", error);
    }
  }
  return (
    <MaxWidthWrapper className="py-10">
      <Form {...form}>
        <form
          className="w-1/2 mx-auto flex flex-col justify-center items-stretch gap-y-5"
          onSubmit={form.handleSubmit(handler)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormDescription>Enter you email here!</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormDescription>Enter your password here!</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Login</Button>
        </form>
      </Form>
    </MaxWidthWrapper>
  );
};

export default page;
