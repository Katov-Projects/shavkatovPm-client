"use client";

import React, { Suspense } from "react";
import { SuccessComponent } from "@/components/adminComponents";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

function SuccessContent() {
  const search = useSearchParams();
  const from = search.get("from");

  let title =
    from === "delete"
      ? "Deleted Successfully"
      : from === "archive"
      ? "Archived Successfully"
      : "Posted Successfully";

  if (from === "exit-archive") {
    title = "Successfully Unarchived";
  }

  return (
    <SuccessComponent backHref="/admin/blog/all">{title}</SuccessComponent>
  );
}

export default function AdminBlogSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
