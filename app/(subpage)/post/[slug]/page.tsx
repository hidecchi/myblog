import { getBlog } from "libs/contentful";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { Contents } from "./_components/Contents";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const blog = await getBlog(params.slug);
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

const Page = async ({ params }: { params: { slug: string } }) => {
  const { isEnabled } = draftMode();
  const blog = await getBlog(params.slug, isEnabled);
  if (!blog) return notFound();
  return <Contents blog={blog} />;
};

export default Page;
