import BlogCards from "components/BlogCards";
import { createClient } from "contentful";
import { Metadata } from "next";

import { IBlogFields } from "../../@types/generated/contentful";

export const metadata: Metadata = {
  title: "kitsune Blog",
  description:
    "Webエンジニアkitsuneのブログです。フリーランス、プログラミング、その他について発信しています。",
  openGraph: {
    images: "https://kitsuneblog.vercel.app/ogp.png",
  },
};

const Page = async () => {
  const heading = "新着記事";

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  });
  const res = await client.getEntries<IBlogFields>({
    content_type: "blog",
    order: "-sys.createdAt",
    limit: 6,
  });
  const blogs = res.items;

  return (
    <div className="main">
      <h2 className="heading">{heading}</h2>
      <BlogCards blogs={blogs} />
    </div>
  );
};

export default Page;
