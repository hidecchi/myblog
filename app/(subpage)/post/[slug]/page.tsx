import { createClient } from "contentful";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { IBlogFields } from "../../../../@types/generated/contentful";
import { Contents } from "./_components/Contents";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

// export const getStaticPaths = async () => {
//   const res = await client.getEntries<IBlogFields>({
//     content_type: "blog",
//   });
//   const paths = res.items.map((item) => {
//     return {
//       params: { slug: item.fields.slug },
//     };
//   });
//   return {
//     paths,
//     fallback: false,
//   };
// };

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const res = await client.getEntries<IBlogFields>({
    content_type: "blog",
    "fields.slug": params?.slug,
  });
  const blog = res.items[0];
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
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: isEnabled
      ? (process.env.CONTENTFUL_PREVIEW_TOKEN as string)
      : (process.env.CONTENTFUL_ACCESS_TOKEN as string),
    host: isEnabled ? "preview.contentful.com" : "cdn.contentful.com",
  });
  const res = await client.getEntries<IBlogFields>({
    content_type: "blog",
    "fields.slug": params?.slug,
  });
  const blog = res.items[0];
  if (!blog) return notFound();

  return (
    <>
      <Contents blog={blog} />
    </>
  );
};

export default Page;
