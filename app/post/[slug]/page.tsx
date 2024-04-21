import { createClient } from "contentful";
import { notFound } from "next/navigation";

import { IBlogFields } from "../../../@types/generated/contentful";
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
    title: `${blog.fields.title} | kitsune Blog`,
    description: blog.fields.description
      ? blog.fields.description
      : "Webエンジニアkitsuneのブログです。",
    openGraph: {
      images: "https:" + blog.fields.thumbnail?.fields.file.url,
      type: "article",
    },
  };
};

const Page = async ({ params }: { params: { slug: string } }) => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  });
  const res = await client.getEntries<IBlogFields>({
    content_type: "blog",
    "fields.slug": params?.slug,
  });
  const blog = res.items[0];
  if (!blog) return notFound();

  return <Contents blog={blog} />;
};

export default Page;
