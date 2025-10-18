"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthUpdate, useCheckAuth } from "@/service";
import toast from "react-hot-toast";
import { SuccessComponent } from "@/components/adminComponents";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

type FormValues = {
  login: string;
  confirmLogin: string;
  password: string;
  confirmPassword: string;
};

const SettingsPage = () => {
  const { mutateAsync: updateAuth } = useAuthUpdate();
  const [success, setSuccess] = useState(false);

  const { error: tokenError, isLoading: loadingToken } = useCheckAuth();
  const router = useRouter();

  useEffect(() => {
    if (tokenError && tokenError instanceof AxiosError) {
      console.log(tokenError.response?.data?.message);
      if (tokenError.response?.data?.message === "token not found") {
        router.push("/");
      }
    }
  }, [tokenError]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      login: "",
      confirmLogin: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (values.login !== values.confirmLogin) {
      toast.error("Confirm Login mos emas");
      return;
    }
    if (values.password !== values.confirmPassword) {
      toast.error("Confirm Password mos emas");
      return;
    }

    try {
      const data = await updateAuth({
        login: values.login,
        password: values.password,
      });
      console.log(data, "bu data");
      setSuccess(true);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Xatolik yuz berdi");
    }
    console.log(errors);
  };

  if (loadingToken) {
    return (
      <div className="flex w-full pt-30 flex-col items-center justify-center gap-4">
        <div className="flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-black text-4xl text-black">
          <div className="flex h-12 w-12 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-white text-2xl text-white"></div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <SuccessComponent backHref="/admin">
        Updated Successfully
      </SuccessComponent>
    );
  }

  return (
    <section className="px-4 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-8"
      >
        <h2 className="text-center text-3xl font-extrabold text-[#C2C2C2]">
          CHANGE LOGIN
        </h2>

        <div className="space-y-5">
          <div>
            <input
              {...register("login", { required: "Login majburiy" })}
              placeholder="NEW LOGIN"
              className="w-full rounded border border-[#3F3F3F] bg-[#1F1F1F] px-4 py-3 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
            />
            {errors.login && (
              <p className="mt-1 text-xs text-red-400">
                {errors.login.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("confirmLogin", { required: "Tasdiqlang" })}
              placeholder="CONFIRM LOGIN"
              className="w-full rounded border border-[#3F3F3F] bg-[#1F1F1F] px-4 py-3 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
            />
            {errors.confirmLogin && (
              <p className="mt-1 text-xs text-red-400">
                {errors.confirmLogin.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-5 pt-4">
          <div>
            <input
              type="password"
              {...register("password", { required: "Parol majburiy" })}
              placeholder="NEW PASSWORD"
              className="w-full rounded border border-[#3F3F3F] bg-[#1F1F1F] px-4 py-3 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              {...register("confirmPassword", { required: "Tasdiqlang" })}
              placeholder="CONFIRM PASSWORD"
              className="w-full rounded border border-[#3F3F3F] bg-[#1F1F1F] px-4 py-3 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div className="pt-6 flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-60 rounded border border-[#3F3F3F] bg-transparent px-5 py-3 text-sm font-semibold text-[#E5E5E5] hover:bg-[#2f2f2f] disabled:opacity-70"
          >
            {isSubmitting ? "UPDATING..." : "UPDATE"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default SettingsPage;
