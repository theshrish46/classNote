"use client";
import MaxWidthWrapper from "@/components/site-components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { login, register } from "../actions/auth-action";
import { cn } from "@/lib/utils";
import Link from "next/link";
import axios from "axios";

const Page = () => {
  const [variant, setVariant] = useState("login");
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const url = variant == "register" ? "/api/register" : "api/login";
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("inside onsubmit");
    try {
      const response = await axios.post("http://localhost:3000/api/register", {
        name,
        email,
        password,
      });
      const { data } = await response;
      console.log(data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div>
          {variant == "register" ? (
            <h1 className="text-2xl font-semibold tracking-tight">
              Register your account
            </h1>
          ) : (
            <h1 className="text-2xl font-semibold tracking-tight">
              Login your account
            </h1>
          )}
        </div>

        <div className="grid gap-6">
          <Form {...form}>
            <form
              className="flex flex-col gap-y-3"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="grid gap-2">
                {variant == "register" && (
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="grid gap-1 py-2">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="focus-visible:ring-offset-0 dark:border-gray-600"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-1 py-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="focus-visible:ring-offset-0 dark:border-gray-600"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="grid gap-1 py-2">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="focus-visible:ring-offset-0 dark:border-gray-600"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </Form>
          <div
            className={cn(
              buttonVariants({ variant: "link" }),
              "cursor-pointer"
            )}
            onClick={toggleVariant}
          >
            {variant == "login"
              ? "Create a new account"
              : "Already have an account? Login"}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
