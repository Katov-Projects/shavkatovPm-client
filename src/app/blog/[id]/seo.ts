import { getByIdBlog } from "@/service/api/blog";

export async function generateBlogMetadata(id: string) {
  try {
    const response = await getByIdBlog(id);

    const blog = response?.blog;

    if (!blog) {
      throw new Error("Blog topilmadi");
    }

    const seo = Array.isArray(blog?.seo) ? blog.seo : [];

    const seoKeywords =
      seo.length > 0
        ? seo
            .map((item: any) => item?.value)
            .filter(Boolean)
            .join(", ")
        : "blog, maqola, yangiliklar";

    return {
      title: blog?.title || "Blog tafsilotlari",
      description: blog?.subtitle || "Blog haqida ma'lumot",
      keywords: seoKeywords,
      openGraph: {
        title: blog?.title || "Blog",
        description: blog?.subtitle || "",
        url: `https://shavkatovpm.uz/blog/${id}`,
        type: "article",
        images: [
          {
            url: "/logo.png",
            width: 1200,
            height: 630,
            alt: blog?.title || "Blog image",
          },
        ],
      },
      alternates: {
        canonical: `https://shavkatovpm.uz/blog/${id}`,
      },
    };
  } catch (err) {
    console.error("SEO metadata olishda xatolik:", err);
    return {
      title: "Blog topilmadi",
      description: "Bu blog mavjud emas",
      keywords: "blog, topilmadi, xatolik",
    };
  }
}
