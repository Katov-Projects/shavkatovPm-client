"use client";
// app/admin/layout.tsx
import NavBarAdmin from "@/layout/admin/Navbar";
import SideBarAdmin from "@/layout/admin/SideBar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname = usePathname();
  const isLoginPage = pathname === "/admin";
  return (
    <div className="min-h-screen bg-[#2A2A2A]">
      {!isLoginPage && (
        <>
          <NavBarAdmin />
          <SideBarAdmin />
        </>
      )}
      <main className={!isLoginPage ? "pt-14 md:pl-52" : ""}>{children}</main>
    </div>
  );
}
