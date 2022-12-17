import Head from "next/head";
import type { NextPage } from "next";
import { createClient } from "contentful";
import BlogCards from "components/BlogCards";
import Pager2 from "modules/Pager2";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});
const displayNumber = 6;

export const getStaticPaths = async () => {
  const paths: { params: { id: string } }[] = [];
  const res = await client.getEntries({
    content_type: "blog",
    order: "-sys.createdAt",
    "metadata.tags.sys.id[all]": "other",
  });
  const maxPageNumber = Math.ceil(res.items.length / displayNumber);
  for (let i = 1; i <= maxPageNumber; i++) {
    paths.push({ params: { id: i.toString() } });
  }
  return {
    paths: paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }: any) {
  const res = await client.getEntries({
    content_type: "blog",
    order: "-sys.createdAt",
    "metadata.tags.sys.id[all]": "other",
  });
  const maxPageNumber: number = Math.ceil(res.items.length / displayNumber);
  return {
    props: {
      blogs: res.items,
      pageNumber: Number(params.id),
      maxPageNumber: maxPageNumber,
    },
  };
}

const Page: NextPage = ({ blogs, pageNumber, maxPageNumber }: any) => {
  const startNumber = displayNumber * (pageNumber - 1);
  const displays = blogs.slice(startNumber, startNumber + displayNumber);
  const heading = "その他";
  const pagers: number[] = [];
  for (let i = 1; i <= maxPageNumber; i++) {
    pagers.push(i);
  }
  return (
    <>
      <Head>
        <title>その他 | kitsune Blog</title>
        <meta property="og:title" content="その他 | kitsune Blog" />
      </Head>
      <div className="main">
        <h1 className="heading">{heading}</h1>
        <BlogCards blogs={displays} />
        <Pager2 pagers={pagers} blogs={blogs} />
      </div>
    </>
  );
};

export default Page;
