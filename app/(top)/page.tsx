import BlogCards from "components/BlogCards";
import { getBlogList } from "libs/contentful";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kitsune Blog",
  description:
    "WebエンジニアKitsuneのブログです。フリーランス、プログラミング、その他について発信しています。",
  openGraph: {
    images: "https://kitsuneblog.vercel.app/ogp.png",
  },
};

const Page = async () => {
  const heading = "新着記事";
  const blogs = await getBlogList({ limit: 6 });

  return (
    <div className="main">
      <h2 className="heading">{heading}</h2>
      <BlogCards blogs={blogs} />
    </div>
  );
};

export default Page;
