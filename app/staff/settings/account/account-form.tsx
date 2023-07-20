"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { changeEmployeePassword } from "@/api/employees";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const passwordFormSchema = z
  .object({
    oldPassword: z.string(),
    newPassword: z.string(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type AccountFormValues = z.infer<typeof passwordFormSchema>;

export default function AccountForm({ username }: { username: string }) {
  const { toast } = useToast();

  const router = useRouter();

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate: change } = useMutation(
    (data: z.infer<typeof passwordFormSchema>) =>
      changeEmployeePassword(username, data.oldPassword, data.newPassword),
    {
      onSuccess: (res) => {
        toast({
          title: "Password changed!",
          description: "Now you can log in with your new password.",
        });
        router.push("/staff");
      },
      onError: (err: unknown) => {
        if (axios.isAxiosError(err)) {
          toast({
            variant: "destructive",
            title: "Oops, wait a minute!",
            description: err?.response?.data?.Message,
          });
        }
      },
    }
  );

  function onSubmit(data: AccountFormValues) {
    change(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-md"
      >
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Old password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your old password"
                  type="password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your new password"
                  type="password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Re-enter your password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Your confirmation password must match your password.
              </FormDescription>
            </FormItem>
          )}
        />
        <Button type="submit">Update password</Button>
      </form>
    </Form>
  );
}
