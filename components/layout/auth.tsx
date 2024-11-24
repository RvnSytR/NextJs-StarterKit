"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { ClientRedirect } from "@/server/action";
import { Check } from "@/server/action-user";

import { z } from "zod";
import { zodUserSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { LABEL } from "../content";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LogIn } from "lucide-react";

export function LoginForm() {
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const loginSchema = zodUserSchema.pick({ email: true, password: true });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const formHandler = async (data: z.infer<typeof loginSchema>) => {
    const { email, password } = data;
    setIsLoad(true);

    toast.promise(Check(email, password), {
      loading: LABEL.loading,
      success: () => {
        ClientRedirect("/protected-route");
        return LABEL.login;
      },
      error: (e: Error) => {
        setIsLoad(false);
        return e.message;
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(formHandler)}
        className="flex flex-col gap-y-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Masukkan Email" {...field} />
              </FormControl>
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
                <Input
                  type="password"
                  placeholder="Masukkan Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-2 gap-x-2" disabled={isLoad}>
          <LogIn />
          Login
        </Button>
      </form>
    </Form>
  );
}
