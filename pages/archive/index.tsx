import Head from "next/head";
import type { NextPage } from "next";
import { createClient } from "contentful";
import BlogCards from "../../components/BlogCards";
import Pager from "../../modules/Pager";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});
const displayNumber = 6;

export async function getStaticProps({ params }: any) {
  const res = await client.getEntries({
    content_type: "blog",
    order: "-sys.createdAt",
    // 'metadata.sys.id': 'news',
  });
  const maxPageNumber = Math.ceil(res.items.length / displayNumber);
  return {
    props: {
      blogs: res.items,
      pageNumber: 1,
      maxPageNumber: maxPageNumber,
    },
  };
}

const Page: NextPage = ({ blogs, pageNumber, maxPageNumber }: any) => {
  const startNumber = displayNumber * (pageNumber - 1);
  const displays = blogs.slice(startNumber, startNumber + displayNumber);
  const heading = "アーカイブ";
  const pagers: number[] = [];
  for (let i = 1; i <= blogs.maxPageNumber; i++) {
    pagers.push(i);
  }

  return (
    <>
      <Head>
        <title>アーカイブ | kitsune Blog</title>
        <meta property="og:title" content="アーカイブ | kitsune Blog" />
      </Head>
      <div className="main">
        <h1 className="heading">{heading}</h1>
        <BlogCards blogs={displays} />
        <Pager pagers={pagers} />
      </div>
    </>
  );
};
export default Page;
