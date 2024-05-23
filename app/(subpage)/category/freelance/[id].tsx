import BlogCards from "components/BlogCards";
import Pager from "components/Pager";
import { createClient } from "contentful";
import type { Metadata } from "next";

import { IBlogFields } from "../../../../@types/generated/contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});
const displayNumber = 6;

export const metadata: Metadata = {
  title: "フリーランス | kitsune Blog",
  description: "Webエンジニアkitsuneのブログのアーカイブページです。",
};

const Page = async ({ params }: { params: { id: string } }) => {
  const res = await client.getEntries<IBlogFields>({
    content_type: "blog",
    order: "-sys.createdAt",
    "metadata.tags.sys.id[all]": "programing",
  });
  const maxPageNumber = Math.ceil(res.items.length / displayNumber);
  const pageNumber = params.id;
  const startNumber = 6 * (Number(pageNumber || 1) - 1);
  const displays = res.items.slice(startNumber, startNumber + displayNumber);
  const heading = "フリーランス";
  const pagers: number[] = [];
  for (let i = 1; i <= maxPageNumber; i++) {
    pagers.push(i);
  }
  return (
    <div className="main">
      <h1 className="heading">{heading}</h1>
      <BlogCards blogs={displays} />
      <Pager
        path="/category/freelance"
        pagers={pagers}
        pageNumber={Number(pageNumber)}
      />
    </div>
  );
};

export default Page;
