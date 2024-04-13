import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "contentful";
import BlogCards from "components/BlogCards";
import { Entry } from "contentful";
import { IBlogFields } from "../../../@types/generated/contentful";

export const Contents = () => {
  const [blogs, setBlogs] = useState<Entry<IBlogFields>[]>([]);
  const router = useRouter();

  async function csrFetchData() {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID as string,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
    });
    const res = await client.getEntries<IBlogFields>({
      content_type: "blog",
      order: "-sys.createdAt",
      query: router.query.keyword,
    });
    setBlogs(res.items);
  }

  useEffect(() => {
    if (!router.isReady) return;
    try {
      csrFetchData();
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.keyword, router.isReady]);

  const heading = "検索結果";
  return (
    <div className="main">
      <h1 className="heading">{heading}</h1>
      <h3 className="search-text">キーワード：{router.query.keyword}</h3>
      {blogs ? <BlogCards blogs={blogs} /> : null}
    </div>
  );
};
