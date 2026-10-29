"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { registerUser } from "@/app/api/actions";
import { TFormRegisterValues, formRegisterSchema } from "./schemas";
import { FormInput } from "../../../form";
import { Button } from "@/shared/components/ui";

interface Props {
  onClose?: VoidFunction;
  onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose, onClickLogin }) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser(data);
      toast.success("User registered successfully");
      if (onClose) {
        onClose();
      }
    } catch (error) {
      toast.error("Failed to register user");
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput
          name="fullName"
          label="Full Name"
          placeholder="Enter your full name"
        />
        <FormInput name="email" label="Email" placeholder="Enter your email" />
        <FormInput
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
        />
        <FormInput
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          type="password"
        />

        <Button loading={form.formState.isSubmitting} type="submit" className="h-12 text-base">
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};
