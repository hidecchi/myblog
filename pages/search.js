import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "contentful";
import BlogCards from "../components/BlogCards";

export default function Home() {
  const [blogs, setBlogs] = useState(null);
  const router = useRouter();

  async function csrFetchData() {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    });
    const res = await client.getEntries({
      content_type: "blog",
      order: "-sys.createdAt",
      query: router.query.keyword,
    });
    setBlogs(res.items);
  }

  useEffect(() => {
    if (!router.isReady) return;
    csrFetchData();
  }, [router.query.keyword]);

  const heading = "検索結果";
  return (
    <>
      <Head>
        <title>検索ページ | kitsune Blog</title>
        <meta
          name="description"
          content="Web系フリーランスkitsuneのブログの検索ページです。"
        />
        <meta property="og:site_name" content="kitsune Blog" />
        <meta property="og:title" content="検索ページ | kitsune Blog" />
        <meta property="og:type" content="article" />
      </Head>
      <div className="main">
        <h2 className="heading">{heading}</h2>
        <h3 className="search-text">キーワード：{router.query.keyword}</h3>
        {blogs ? <BlogCards blogs={blogs} /> : null}
      </div>
    </>
  );
}
