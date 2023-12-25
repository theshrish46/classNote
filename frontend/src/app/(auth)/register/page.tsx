"use client";

import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const page = () => {
  const formObject = z.object({
    name: z
      .string()
      .min(4, { message: "Name must be atleast four characters." }),
    email: z.string().email({ message: "Enter a valid email" }),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formObject>>({
    resolver: zodResolver(formObject),
    defaultValues: {
      name: "test name",
      email: "test@test.com",
      password: "12345",
    },
  });

  const router = useRouter();
  async function handler(values: z.infer<typeof formObject>) {
    console.log(values);
    try {
      const res = await axios.post(
        "http://localhost:8000/auth/register",
        values
      );
      const { data } = await res;
      console.log(data);
      router.push("/login");
    } catch (error) {
      console.log("Error in axios", error);
    }
  }
  return (
    <MaxWidthWrapper className="py-10">
      <Form {...form}>
        <form className="w-1/2 mx-auto" onSubmit={form.handleSubmit(handler)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>
                <FormDescription>Enter your name here!</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormDescription>Enter your email</FormDescription>
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </MaxWidthWrapper>
  );
};

export default page;
