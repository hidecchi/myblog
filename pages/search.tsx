import Head from "next/head";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "contentful";
import BlogCards from "components/BlogCards";

const Page: NextPage = () => {
  const [blogs, setBlogs] = useState<{}[]>([]);
  const router = useRouter();

  async function csrFetchData() {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID as string,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
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
          content="Webエンジニアkitsuneのブログの検索ページです。"
        />
        <meta property="og:title" content="検索ページ | kitsune Blog" />
      </Head>
      <div className="main">
        <h1 className="heading">{heading}</h1>
        <h3 className="search-text">キーワード：{router.query.keyword}</h3>
        {blogs ? <BlogCards blogs={blogs} /> : null}
      </div>
    </>
  );
};

export default Page;
