import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://shavkatov.pm";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/success`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch("http://localhost:4000/api/blog/all", {
      // Revalidate once per hour
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      const blogs = (data?.data as any[]) ?? (data?.blog as any[]) ?? [];
      blogRoutes = blogs
        .filter((b: any) => b?._id)
        .map((b: any) => ({
          url: `${baseUrl}/blog/${b._id}`,
          lastModified: b?.updatedAt
            ? new Date(b.updatedAt)
            : b?.createdAt
            ? new Date(b.createdAt)
            : new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        }));
    }
  } catch {
    // If API is unavailable, fall back to only static routes
  }

  return [...staticRoutes, ...blogRoutes];
}
