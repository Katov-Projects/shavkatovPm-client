"use client";
export const dynamic = "force-static";

import HeaderSection from "@/components/UserComponents/HeaderSection";
import AboutComponent from "@/components/UserComponents/AboutComponent";
import ServiceSection from "@/components/UserComponents/ServiceSection";
import BlogComponent from "@/components/UserComponents/BlogComponent";
import ContactComponent from "@/components/UserComponents/ContactComponent";
import { NavbarLayout } from "@/layout";
import FooterLayout from "@/layout/Footer";
import { FAQSectionComponents } from "@/components";

export default function Home() {

  return (
    <div className="">
      <NavbarLayout />
      <HeaderSection />
      <AboutComponent />
      <ServiceSection />
      <FAQSectionComponents />
      <BlogComponent />
      <ContactComponent />
      <FooterLayout />
    </div>
  );
}
