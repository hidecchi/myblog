import { getBlog } from "libs/contentful";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { Contents } from "./_components/Contents";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return;
  return {
    title: `${blog.fields.title} | Kitsune Blog`,
    description: blog.fields.description
      ? blog.fields.description
      : "WebエンジニアKitsuneのブログです。",
    openGraph: {
      images: "https:" + blog.fields.thumbnail?.fields.file.url,
      type: "article",
    },
  };
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const { isEnabled } = await draftMode();
  const blog = await getBlog(slug, isEnabled);
  if (!blog) return notFound();
  return <Contents blog={blog} />;
};

export default Page;
