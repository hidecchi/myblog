import Head from "next/head";
import { createClient } from "contentful";
import BlogCards from "../components/BlogCards";

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
  });
  const res = await client.getEntries({
    content_type: "blog",
    order: "-sys.createdAt",
    limit: 6,
  });
  return {
    props: {
      blogs: res.items,
    },
  };
}

export default function Home({ blogs }: any): JSX.Element {
  const heading = "新着記事";
  return (
    <>
      <Head>
        <title>kitsune Blog</title>
        <meta
          name="description"
          content="Webエンジニアkitsuneのブログです。フリーランス、プログラミング、その他について発信しています。"
        />
        <meta property="og:title" content="kitsune Blog" />
        <meta
          property="og:image"
          content={`https://kitsuneblog.vercel.app/ogp.jpg`}
        />
        <meta property="og:type" content="website" />
      </Head>
      <div className="main">
        <h2 className="heading">{heading}</h2>
        <BlogCards blogs={blogs} />
      </div>
    </>
  );
}
