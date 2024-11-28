"use client";

import BlogCards from "components/BlogCards";
import { createClient, Entry } from "contentful";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { IBlogFields } from "../../../../@types/generated/contentful";

export const Contents = () => {
  const [blogs, setBlogs] = useState<Entry<IBlogFields>[]>([]);
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");

  const fetchBlogsByKeyword = async (_keyword: string | null) => {
    try {
      const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID as string,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
      });
      const res = await client.getEntries<IBlogFields>({
        content_type: "blog",
        order: "-sys.createdAt",
        query: _keyword,
      });
      setBlogs(res.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogsByKeyword(keyword);
  }, [keyword]);

  const heading = "検索結果";
  return (
    <div className="main">
      <h1 className="heading">{heading}</h1>
      <h3 className="search-text">キーワード：{keyword}</h3>
      {blogs ? <BlogCards blogs={blogs} /> : null}
    </div>
  );
};
