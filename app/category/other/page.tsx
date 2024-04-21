import BlogCards from "components/BlogCards";
import Pager from "components/Pager";
import { createClient } from "contentful";
import type { Metadata, NextPage } from "next";

import { IBlogFields } from "../../../@types/generated/contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});
const displayNumber = 6;

export const metadata: Metadata = {
  title: "その他 | kitsune Blog",
  description: "Webエンジニアkitsuneのブログのアーカイブページです。",
};

const Page: NextPage = async () => {
  const res = await client.getEntries<IBlogFields>({
    content_type: "blog",
    order: "-sys.createdAt",
    "metadata.tags.sys.id[all]": "other",
  });
  const maxPageNumber = Math.ceil(res.items.length / displayNumber);
  const startNumber = 0;
  const displays = res.items.slice(startNumber, startNumber + displayNumber);
  const heading = "その他";
  const pagers: number[] = [];
  for (let i = 1; i <= maxPageNumber; i++) {
    pagers.push(i);
  }
  return (
    <div className="main">
      <h1 className="heading">{heading}</h1>
      <BlogCards blogs={displays} />
      <Pager pagers={pagers} pageNumber={1} />
    </div>
  );
};

export default Page;
