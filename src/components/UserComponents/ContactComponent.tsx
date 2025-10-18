"use client";

import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingComponent from "../LoadingComponent";
import { useBot } from "@/service";
import { useSectionStats } from "@/service/hooks/useSectionStats";
import { v4 as uuidv4 } from "uuid";


interface ContactForm {
  firstName: string;
  lastName: string;
  phone: string;
  telegram: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { mutate } = useBot();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let storedId = localStorage.getItem("userId");
    if (!storedId) {
      storedId = uuidv4();
      localStorage.setItem("userId", storedId);
    }
    setUserId(storedId);
  }, []);

  // const sectionRef = userId ? useSectionStats("contact", userId) : null;
  const sectionRef = useSectionStats("contact", userId ?? "");
  


  const onSubmit = async (data: ContactForm) => {
    // Form submission logic
    console.log("Form data:", data);

    try {
      setLoading(true);
      await fetch(
        "https://script.google.com/macros/s/AKfycbxFMLt8KkiGyLdmOYt6Ngtvazv9xppRyamVOWUA5tMRhPJxIkHzkJoFXUJmgmFhy0lwXw/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      mutate(data);
      router.push("/success");
    } catch (error) {
      console.log(error);
      toast.error("Xatolik yuz berdi");
      setLoading(false);
    } finally {
      reset();
    }
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Faqat raqamlarni qabul qilish
    let value = e.target.value.replace(/\D/g, "");
    // maksimal 9 ta raqam
    if (value.length > 9) value = value.slice(0, 9);

    // formatlash: 2-3-2-2 (33 333 33 33)
    let formatted = value;
    if (value.length > 2) formatted = value.slice(0, 2) + " " + value.slice(2);
    if (value.length > 5)
      formatted = formatted.slice(0, 6) + " " + formatted.slice(6);
    if (value.length > 7)
      formatted = formatted.slice(0, 9) + " " + formatted.slice(9);
    if (value.length > 9)
      formatted = formatted.slice(0, 12) + " " + formatted.slice(12);

    e.target.value = formatted;
  };

  if (loading === true) {
    return <LoadingComponent />;
  }

  return (
    <section
      ref={sectionRef ?? undefined}
      id="contact"
      className="py-16 md:py-24 bg-[#EDEBE6]"
    >
      <div className="mx-auto max-w-4xl px-4">
        {/* Title */}
        <h2 className="text-4xl text-center md:text-6xl font-bold text-[#4A4A4A] mb-12">
          Gaplashamizmi?
        </h2>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 md:w-1/2 mx-auto"
        >
          {/* Name Row */}
          <div className="flex justify-between">
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Ism"
                className="w-full px-4 focus:outline-none text-[#737373] py-3 border border-[#737373] rounded-tl-[1px] rounded-bl-[1px]"
                {...register("firstName", {
                  required: "Ism kiritish majburiy",
                  minLength: {
                    value: 2,
                    message: "Ism kamida 2 ta harf bo'lishi kerak",
                  },
                })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Familya"
                className="w-full px-4 py-3 border text-[#737373] focus:outline-none border-[#737373] rounded-tr-[1px] rounded-br-[1px]"
                {...register("lastName", {
                  required: "Familya kiritish majburiy",
                  minLength: {
                    value: 2,
                    message: "Familya kamida 2 ta harf bo'lishi kerak",
                  },
                })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          {/* Phone */}
          <div>
            <div className="flex">
              <span className="inline-flex items-center pl-3 pr-1 py-3 border border-r-0 border-[#737373] text-[#b3b3b3] rounded-bl-[1px] rounded-tl-[1px]">
                +998
              </span>
              <input
                type="text"
                placeholder=""
                maxLength={12}
                className="flex-1  py-3 border text-[#737373] border-[#737373] border-l-0 focus:outline-none  rounded-br-[1px] rounded-tr-[1px]"
                {...register("phone", {
                  required: "Telefon raqam kiritish majburiy",
                  pattern: {
                    value: /^[\d\s]+$/,
                    message: "9 ta raqam kiriting",
                  },
                })}
                onInput={handlePhoneInput}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          {/* Telegram */}
          <div>
            <input
              type="text"
              placeholder="Telegram Username"
              className="w-full px-4 focus:outline-none py-3 border text-[#737373] border-[#737373] rounded-[1px]"
              {...register("telegram", {
                required: "Telegram username kiritish majburiy",
                pattern: {
                  value: /^@[a-zA-Z0-9_]{5,}$/,
                  message:
                    "Telegram username @ bilan boshlanishi va kamida 6 belgidan iborat bo‘lishi kerak",
                },
              })}
              onClick={(e) => {
                if (!(e.target as HTMLInputElement).value.startsWith("@")) {
                  (e.target as HTMLInputElement).value = "@";
                }
              }}
              onChange={(e) => {
                const input = e.target as HTMLInputElement;
                input.value = "@" + input.value.replace(/@/g, "").slice(0);
              }}
            />
            {errors.telegram && (
              <p className="text-red-500 text-sm mt-1">
                {errors.telegram.message}
              </p>
            )}
          </div>
          {/* Email */}
          {/* focus:ring-2 focus:ring-blue-500 focus:border-transparent */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 focus:outline-none py-3 text-[#737373] border border-[#737373] rounded-[1px]"
              {...register("email", {
                required: "Email kiritish majburiy",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "To'g'ri email kiriting",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* Subject */}
          <div>
            <input
              type="text"
              placeholder="Mavzu Nomi"
              className="w-full px-4 py-3 focus:outline-none border text-[#737373] border-[#737373] rounded-[1px]"
              {...register("subject", {
                required: "Mavzu nomini kiritish majburiy",
                minLength: {
                  value: 3,
                  message: "Mavzu nomi kamida 3 ta harf bo'lishi kerak",
                },
              })}
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>
          {/* Message */}
          <div>
            <textarea
              placeholder="Izoh"
              rows={3}
              className="w-full px-4 py-3 focus:outline-none border text-[#737373] border-[#737373] rounded-[1px]"
              {...register("message", {
                required: "Izoh kiritish majburiy",
                minLength: {
                  value: 10,
                  message: "Izoh kamida 10 ta harf bo'lishi kerak",
                },
              })}
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.message.message}
              </p>
            )}
          </div>
          {/* Submit Button */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="text-[#737373] hover:opacity-100 opacity-[50%] font-bold w-1/2 border-2 shadow-hover border-[#737373]  py-3 px-12 rounded-[1px] transition-colors duration-200"
            >
              Yuborish
            </button>
          </div>
        </form>

        <Toaster position="top-right" />
      </div>
    </section>
  );
}
