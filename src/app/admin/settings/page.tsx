"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useAuthUpdate,
  useCheckAuth,
  useSettings,
  useUpdateSettings,
} from "@/service";
import toast from "react-hot-toast";
import { SuccessComponent } from "@/components/adminComponents";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

type FormValues = {
  login: string;
  confirmLogin: string;
  password: string;
  confirmPassword: string;
  heroTitle: string;
  heroSubtitleOne: string;
  heroSubtitleTwo: string;
  blogSortBy: "newest" | "oldest" | "mostViewed";
  aboutSectionTitle: string;
  aboutSectionParagraphOne: string;
  aboutSectionParagraphTwo: string;
  faqSectionTitle: string;
  faqOneTitle: string;
  faqOneContent: string;
  faqTwoTitle: string;
  faqTwoContent: string;
  faqThreeTitle: string;
  faqThreeContent: string;
  faqFourTitle: string;
  faqFourContent: string;
  faqFiveTitle: string;
  faqFiveContent: string;
  faqSixTitle: string;
  faqSixContent: string;
};

const SettingsPage = () => {
  const { mutateAsync: updateAuth } = useAuthUpdate();
  const { mutateAsync: updateSettings } = useUpdateSettings();
  const { data: settings, isLoading: loadingSettings } = useSettings();
  const [success, setSuccess] = useState(false);
  const [currentSortBy, setCurrentSortBy] = useState<string>("newest");

  const { error: tokenError, isLoading: loadingToken } = useCheckAuth();
  const router = useRouter();

  useEffect(() => {
    const savedSort = localStorage.getItem("blogSortBy");
    if (savedSort) {
      setCurrentSortBy(savedSort);
    }
  }, []);

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
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      login: "",
      confirmLogin: "",
      password: "",
      confirmPassword: "",
      heroTitle: settings?.heroTitle || "",
      heroSubtitleOne: settings?.heroSubtitleOne || "",
      heroSubtitleTwo: settings?.heroSubtitleTwo || "",
      aboutSectionTitle: settings?.aboutSectionTitle || "",
      aboutSectionParagraphOne: settings?.aboutSectionParagraphOne || "",
      aboutSectionParagraphTwo: settings?.aboutSectionParagraphTwo || "",
      faqSectionTitle: settings?.faqSectionTitle || "",
      faqOneTitle: settings?.faqItems?.[0]?.title || "",
      faqOneContent: settings?.faqItems?.[0]?.content || "",
      faqTwoTitle: settings?.faqItems?.[1]?.title || "",
      faqTwoContent: settings?.faqItems?.[1]?.content || "",
      faqThreeTitle: settings?.faqItems?.[2]?.title || "",
      faqThreeContent: settings?.faqItems?.[2]?.content || "",
      faqFourTitle: settings?.faqItems?.[3]?.title || "",
      faqFourContent: settings?.faqItems?.[3]?.content || "",
      faqFiveTitle: settings?.faqItems?.[4]?.title || "",
      faqFiveContent: settings?.faqItems?.[4]?.content || "",
      faqSixTitle: settings?.faqItems?.[5]?.title || "",
      faqSixContent: settings?.faqItems?.[5]?.content || "",
      blogSortBy: currentSortBy as any,
    },
  });

  useEffect(() => {
    if (settings) {
      reset({
        login: "",
        confirmLogin: "",
        password: "",
        confirmPassword: "",
        heroTitle: settings.heroTitle || "",
        heroSubtitleOne: settings.heroSubtitleOne || "",
        heroSubtitleTwo: settings.heroSubtitleTwo || "",
        aboutSectionTitle: settings.aboutSectionTitle || "",
        aboutSectionParagraphOne: settings.aboutSectionParagraphOne || "",
        aboutSectionParagraphTwo: settings.aboutSectionParagraphTwo || "",
        faqSectionTitle: settings?.faqSectionTitle || "",
        faqOneTitle: settings?.faqItems?.[0]?.title || "",
        faqOneContent: settings?.faqItems?.[0]?.content || "",
        faqTwoTitle: settings?.faqItems?.[1]?.title || "",
        faqTwoContent: settings?.faqItems?.[1]?.content || "",
        faqThreeTitle: settings?.faqItems?.[2]?.title || "",
        faqThreeContent: settings?.faqItems?.[2]?.content || "",
        faqFourTitle: settings?.faqItems?.[3]?.title || "",
        faqFourContent: settings?.faqItems?.[3]?.content || "",
        faqFiveTitle: settings?.faqItems?.[4]?.title || "",
        faqFiveContent: settings?.faqItems?.[4]?.content || "",
        faqSixTitle: settings?.faqItems?.[5]?.title || "",
        faqSixContent: settings?.faqItems?.[5]?.content || "",
        blogSortBy: settings.blogSortBy || (currentSortBy as any),
      });
    }
  }, [settings, reset, currentSortBy]);

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
      // Update auth
      await updateAuth({
        login: values.login,
        password: values.password,
      });

      // Build faqItems array
      const faqItems = [
        { id: "1", title: values.faqOneTitle, content: values.faqOneContent },
        { id: "2", title: values.faqTwoTitle, content: values.faqTwoContent },
        { id: "3", title: values.faqThreeTitle, content: values.faqThreeContent },
        { id: "4", title: values.faqFourTitle, content: values.faqFourContent },
        { id: "5", title: values.faqFiveTitle, content: values.faqFiveContent },
        { id: "6", title: values.faqSixTitle, content: values.faqSixContent },
      ];

      // Update settings
      await updateSettings({
        blogSortBy: values.blogSortBy,
        heroTitle: values.heroTitle,
        heroSubtitleOne: values.heroSubtitleOne,
        heroSubtitleTwo: values.heroSubtitleTwo,
        aboutSectionTitle: values.aboutSectionTitle,
        aboutSectionParagraphOne: values.aboutSectionParagraphOne,
        aboutSectionParagraphTwo: values.aboutSectionParagraphTwo,
        faqSectionTitle: values.faqSectionTitle,
        faqItems: faqItems,
      });

      localStorage.setItem("blogSortBy", values.blogSortBy);
      setSuccess(true);
    } catch (error: any) {
      toast.error(error?.message || "Xatolik yuz berdi");
    }
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
    // All Settings Section start
    <section className="px-4 py-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-3xl space-y-8">
        <h2 className="text-center text-3xl font-extrabold text-[#C2C2C2]">
          SETTINGS
        </h2>

        {/* Admin Login start */}
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
        {/* Admin Login end */}

        {/* Admin Password start */}
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
        {/* Admin Password end */}

        {/* Home Page Settings start */}
        <div className="space-y-5 pt-4">
          <h3 className="text-xl font-bold text-[#C2C2C2]">Home Page Texts</h3>
          <div>
            <input
              {...register("heroTitle")}
              placeholder="HERO TITLE"
              className="w-full rounded border border-[#3F3F3F] bg-[#1F1F1F] px-4 py-3 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
            />
            {errors.heroTitle && (
              <p className="mt-1 text-xs text-red-400">
                {errors.heroTitle.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("heroSubtitleOne")}
              placeholder="HERO SUBTITLE ONE"
              className="w-full rounded border border-[#3F3F3F] bg-[#1F1F1F] px-4 py-3 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
            />
            {errors.heroSubtitleOne && (
              <p className="mt-1 text-xs text-red-400">
                {errors.heroSubtitleOne.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("heroSubtitleTwo")}
              placeholder="HERO SUBTITLE TWO"
              className="w-full rounded border border-[#3F3F3F] bg-[#1F1F1F] px-4 py-3 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
            />
            {errors.heroSubtitleTwo && (
              <p className="mt-1 text-xs text-red-400">
                {errors.heroSubtitleTwo.message}
              </p>
            )}
          </div>
        </div>
        {/* Home Page Settings end */}

        {/* About Page Settings start */}
        <div className="space-y-5 pt-4">
          <h3 className="text-xl font-bold text-[#C2C2C2]">About Page Texts</h3>
          <div>
            <input
              {...register("aboutSectionTitle")}
              placeholder="ABOUT PAGE SECTION TITLE"
              className="w-full rounded border border-[#3F3F3F] bg-[#1F1F1F] px-4 py-3 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
            />
            {errors.aboutSectionTitle && (
              <p className="mt-1 text-xs text-red-400">
                {errors.aboutSectionTitle.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("aboutSectionParagraphOne")}
              placeholder="ABOUT PAGE SECTION PARAGRAPH ONE"
              className="w-full rounded border border-[#3F3F3F] bg-[#1F1F1F] px-4 py-3 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
            />
            {errors.aboutSectionParagraphOne && (
              <p className="mt-1 text-xs text-red-400">
                {errors.aboutSectionParagraphOne.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("aboutSectionParagraphTwo")}
              placeholder="ABOUT PAGE SECTION PARAGRAPH TWO"
              className="w-full rounded border border-[#3F3F3F] bg-[#1F1F1F] px-4 py-3 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
            />
            {errors.aboutSectionParagraphTwo && (
              <p className="mt-1 text-xs text-red-400">
                {errors.aboutSectionParagraphTwo.message}
              </p>
            )}
          </div>
        </div>
        {/* About Page Settings end */}

        {/* Faq Page Settings start */}
        <div className="space-y-5 pt-4">
          <h3 className="text-xl font-bold text-[#C2C2C2]">FAQ Page Texts</h3>
          <div>
            <input
              {...register("faqSectionTitle")}
              placeholder="FAQ PAGE SECTION TITLE"
              className="w-full rounded border border-[#3F3F3F] bg-[#1F1F1F] px-4 py-3 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
            />
            {errors.faqSectionTitle && (
              <p className="mt-1 text-xs text-red-400">
                {errors.faqSectionTitle.message}
              </p>
            )}
          </div>

          {/* FAQ 1 */}
          <div className="space-y-3 border-t border-[#3F3F3F] pt-4">
            <h4 className="text-sm font-semibold text-[#A0A0A0]">FAQ 1</h4>
            <input
              {...register("faqOneTitle")}
              placeholder="FAQ 1 - SAVOL"
              className="w-full rounded border border-[#3F3F3F] bg-[#1F1F1F] px-4 py-3 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
            />
            <textarea
              {...register("faqOneContent")}
              placeholder="FAQ 1 - JAVOB"
              rows={3}
              className="w-full rounded border border-[#3F3F3F] bg-[#1F1F1F] px-4 py-3 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none resize-none"
            />
          </div>

          {/* FAQ 2 */}
          <div className="space-y-3 border-t border-[#3F3F3F] pt-4">
            <h4 className="text-sm font-semibold text-[#A0A0A0]">FAQ 2</h4>
            <input
              {...register("faqTwoTitle")}
              placeholder="FAQ 2 - SAVOL"
              className="w-full rounded border border-[#3F3F3F] bg-[#1F1F1F] px-4 py-3 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
            />
            <textarea
              {...register("faqTwoContent")}
              placeholder="FAQ 2 - JAVOB"
              rows={3}
              className="w-full rounded border border-[#3F3F3F] bg-[#1F1F1F] px-4 py-3 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none resize-none"
            />
          </div>

          {/* FAQ 3 */}
          <div className="space-y-3 border-t border-[#3F3F3F] pt-4">
            <h4 className="text-sm font-semibold text-[#A0A0A0]">FAQ 3</h4>
            <input
              {...register("faqThreeTitle")}
              placeholder="FAQ 3 - SAVOL"
              className="w-full rounded border border-[#3F3F3F] bg-[#1F1F1F] px-4 py-3 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
            />
            <textarea
              {...register("faqThreeContent")}
              placeholder="FAQ 3 - JAVOB"
              rows={3}
              className="w-full rounded border border-[#3F3F3F] bg-[#1F1F1F] px-4 py-3 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none resize-none"
            />
          </div>

          {/* FAQ 4 */}
          <div className="space-y-3 border-t border-[#3F3F3F] pt-4">
            <h4 className="text-sm font-semibold text-[#A0A0A0]">FAQ 4</h4>
            <input
              {...register("faqFourTitle")}
              placeholder="FAQ 4 - SAVOL"
              className="w-full rounded border border-[#3F3F3F] bg-[#1F1F1F] px-4 py-3 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
            />
            <textarea
              {...register("faqFourContent")}
              placeholder="FAQ 4 - JAVOB"
              rows={3}
              className="w-full rounded border border-[#3F3F3F] bg-[#1F1F1F] px-4 py-3 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none resize-none"
            />
          </div>

          {/* FAQ 5 */}
          <div className="space-y-3 border-t border-[#3F3F3F] pt-4">
            <h4 className="text-sm font-semibold text-[#A0A0A0]">FAQ 5</h4>
            <input
              {...register("faqFiveTitle")}
              placeholder="FAQ 5 - SAVOL"
              className="w-full rounded border border-[#3F3F3F] bg-[#1F1F1F] px-4 py-3 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
            />
            <textarea
              {...register("faqFiveContent")}
              placeholder="FAQ 5 - JAVOB"
              rows={3}
              className="w-full rounded border border-[#3F3F3F] bg-[#1F1F1F] px-4 py-3 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none resize-none"
            />
          </div>

          {/* FAQ 6 */}
          <div className="space-y-3 border-t border-[#3F3F3F] pt-4">
            <h4 className="text-sm font-semibold text-[#A0A0A0]">FAQ 6</h4>
            <input
              {...register("faqSixTitle")}
              placeholder="FAQ 6 - SAVOL"
              className="w-full rounded border border-[#3F3F3F] bg-[#1F1F1F] px-4 py-3 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none"
            />
            <textarea
              {...register("faqSixContent")}
              placeholder="FAQ 6 - JAVOB"
              rows={3}
              className="w-full rounded border border-[#3F3F3F] bg-[#1F1F1F] px-4 py-3 text-[#E5E5E5] placeholder:text-[#7B7B7B] focus:outline-none resize-none"
            />
          </div>
        </div>
        {/* Faq Page Settings end */}

        {/* Blog Page Settings start */}
        <div className="space-y-3 pt-4">
          <h3 className="text-xl font-bold text-[#C2C2C2]">Blog Sort Order</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                value="newest"
                {...register("blogSortBy")}
                className="w-4 h-4"
              />
              <span className="text-[#E5E5E5]">New Posts</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                value="oldest"
                {...register("blogSortBy")}
                className="w-4 h-4"
              />
              <span className="text-[#E5E5E5]">Old Posts</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                value="mostViewed"
                {...register("blogSortBy")}
                className="w-4 h-4"
              />
              <span className="text-[#E5E5E5]">Most Viewed Posts</span>
            </label>
          </div>
        </div>
        {/* Blog Page Settings end */}

        {/* Submit button start */}
        <div className="pt-6 flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-60 rounded border border-[#3F3F3F] bg-transparent px-5 py-3 text-sm font-semibold text-[#E5E5E5] hover:bg-[#2f2f2f] disabled:opacity-70">
            {isSubmitting ? "UPDATING..." : "UPDATE"}
          </button>
        </div>
        {/* Submit button end */}
      </form>
    </section>
    // All Settings Section end
  );
};

export default SettingsPage;
