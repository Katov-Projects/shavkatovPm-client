"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import iconSrc from "../../../public/adminSuccess.svg";

type SuccessComponentProps = {
  children: React.ReactNode;
  backHref: string;
  backLabel?: string;
};

export default function SuccessComponent({
  children,
  backHref,
  backLabel = "BACK",
}: SuccessComponentProps) {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <div className="mb-8 rounded-full p-8">
          <Image
            src={iconSrc.src}
            alt="success"
            width={120}
            height={120}
            className="opacity-80"
            priority
          />
        </div>
        <h2 className="mb-6 text-3xl font-extrabold tracking-wide text-[#C2C2C2] md:text-4xl">
          {children}
        </h2>
        <hr className="mb-8 w-full border-[#3F3F3F]" />
        <Link
          href={backHref}
          className="inline-block w-56 rounded border border-[#6F6F6F] px-6 py-3 text-center text-base font-bold text-[#C2C2C2] hover:bg-[#2F2F2F]"
        >
          {backLabel}
        </Link>
      </div>
    </section>
  );
}
