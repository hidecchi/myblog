"use client";

import BlogCards from "components/BlogCards";
import { Entry } from "contentful";
import { getBlogList } from "libs/contentful";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { IBlogFields } from "../../../../@types/generated/contentful";

export const Contents = () => {
  const [blogs, setBlogs] = useState<Entry<IBlogFields>[]>([]);
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");

  const fetchBlogsByKeyword = async (_keyword: string | null) => {
    try {
      const _blogs = await getBlogList({ query: _keyword || undefined });
      setBlogs(_blogs);
    } catch (error) {
      console.log(error);
      alert("記事を取得できませんでした。");
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
