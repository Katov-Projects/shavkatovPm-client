import BlogDetalsPage from "./BlogDetalsPage";
import { generateBlogMetadata } from "./seo";

interface BlogParams {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: BlogParams) {
  const resolvedParams = await params;
  return await generateBlogMetadata(resolvedParams.id);
}

export default async function BlogDetailsPageWrapper({ params }: BlogParams) {
  const resolvedParams = await params;
  return <BlogDetalsPage id={resolvedParams.id} />;
}
