"use client";
import { useCheckAuth, useLogin } from "@/service";
import { log } from "console";
import { prototype } from "events";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type AdminLoginForm = {
  login: string;
  password: string;
};

const AdminPage = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { mutateAsync: login } = useLogin();
  const { data, isLoading } = useCheckAuth();

    useEffect(() => {
      try {
        console.log();
        if(data?.message === "success"){
          router.push("/admin/blog");
        }
      } catch (error) {
        console.log(error, "bu error");
      }
    }, [data]);


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginForm>({
    defaultValues: { login: "", password: "" },
    mode: "onSubmit",
  });


  const onSubmit = async (data: AdminLoginForm) => {
    try {
      setLoading(true);
      const res = await login(data)
      router.push("/admin/blog");
    } catch (error: any) {
      console.log(error, "onSubmit error");
      if (typeof error?.response?.data?.message === "string") {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="flex w-full pt-30 flex-col items-center justify-center gap-4">
        <div className="flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-black text-4xl text-black">
          <div className="flex h-12 w-12 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-white text-2xl text-white"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2A2A2A] pt-20 md:pt-40 text-gray-200 2xl:flex items-center justify-center px-4">
      <div className="w-full mx-auto max-w-md">
        <h1 className="text-center text-[#C2C2C2E5] text-xl md:text-3xl font-semibold tracking-wider mb-8">
          ADMIN
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          autoComplete="off"
        >
          <div>
            <input
              type="text"
              placeholder="LOGIN"
              className="w-full bg-transparent text-gray-200 placeholder-[#737373] border border-[#57595D] focus:border-gray-300 focus:outline-none px-4 py-2 rounded-[2px]"
              {...register("login", { required: true, minLength: 3 })}
            />
            {errors.login && (
              <p className="mt-1 text-xs text-red-400">Login majburiy</p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="PASSWORD"
              className="w-full bg-transparent text-gray-200 placeholder-[#737373] border border-[#57595D] focus:border-gray-300 focus:outline-none px-4 py-2 rounded-[2px]"
              {...register("password", { required: true, minLength: 3 })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-400">Parol majburiy</p>
            )}
          </div>

          <div className="pt-2 w-[70%] mt-10 mx-auto">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full border border-[#6A6C70] text-[#737373] rounded-[2px] py-2 tracking-wide disabled:opacity-60 shadow-hover hover:bg-white/5 transition-colors"
            >
              KIRISH
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
