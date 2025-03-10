"use client";

import AuthForm from "@/components/auth/auth-form";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginSchema } from "@/types/login-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { login } from "@/server/actions/login-actions";
import { cn } from "@/lib/utils";

const Login = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { execute, status, result } = useAction(login);

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    console.log(values);
    const { email, password } = values;
    execute({ email, password });
  };

  return (
    <AuthForm
      formTitle="Login"
      showProvider={true}
      footerLabel="Don't have an account?"
      footerHref="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button size={"sm"} variant={"link"}>
              <Link href={"/auth/forgot-password"}>Forgot Password</Link>
            </Button>
            <Button
              className={cn(
                "w-full my-4",
                status === "executing" && "animate-pulse bg-yellow-300"
              )}
              disabled={status === "executing"}
            >
              {status === "executing"
                ? "Loading...................."
                : "Login"}
            </Button>
          </div>
        </form>
      </Form>
    </AuthForm>
  );
};

export default Login;
