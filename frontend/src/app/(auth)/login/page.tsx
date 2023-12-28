"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import axios from "axios";

import { useDispatch } from "react-redux";
import { clearUser, setUser } from "./../../../redux/features/auth-slice";

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

const page = () => {
  const dispatch = useDispatch();

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

  const router = useRouter();
  async function handler(values: z.infer<typeof formObject>) {
    try {
      const res = await axios.post("http://localhost:8000/auth/login", values);
      const { data } = await res;

      dispatch(
        setUser({
          id: data.data.loggedUser._id,
          name: data.data.loggedUser.name,
          email: data.data.loggedUser.email,
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        })
      );

      router.push("/");
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
