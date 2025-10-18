export const metadata = {
  title: "Bloglar | Shavkatov PM",
  description:
    "IT, dasturlash va loyiha boshqaruvi bo'yicha bloglar va foydali maqolalar.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Bloglar | Shavkatov PM",
    description:
      "IT, dasturlash va loyiha boshqaruvi bo'yicha bloglar va foydali maqolalar.",
    url: "/blog",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Shavkatov PM - Blog",
      },
    ],
  },
};
import BlogFooterLayout from "@/layout/blog/BlogFooter";
import BlogNavbarLayout from "@/layout/blog/BlogNavbar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <BlogNavbarLayout />
      {children}
      <BlogFooterLayout />
    </div>
  );
}
