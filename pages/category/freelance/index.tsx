import Head from "next/head";
import type { NextPage, InferGetStaticPropsType } from "next";
import { createClient } from "contentful";
import BlogCards from "components/BlogCards";
import Pager from "components/Pager";
import { IBlogFields } from "../../../@types/generated/contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});
const displayNumber: number = 6;

export const getStaticProps = async () => {
  const res = await client.getEntries<IBlogFields>({
    content_type: "blog",
    order: "-sys.createdAt",
    "metadata.tags.sys.id[all]": "freelance",
  });
  const maxPageNumber: number = Math.ceil(res.items.length / displayNumber);
  return {
    props: {
      blogs: res.items,
      pageNumber: 1,
      maxPageNumber: maxPageNumber,
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<Props> = ({ blogs, pageNumber, maxPageNumber }) => {
  const startNumber = displayNumber * (pageNumber - 1);
  const displays = blogs.slice(startNumber, startNumber + displayNumber);
  const heading = "フリーランス";
  const pagers: number[] = [];
  for (let i = 1; i <= maxPageNumber; i++) {
    pagers.push(i);
  }

  return (
    <>
      <Head>
        <title>フリーランス | kitsune Blog</title>
        <meta property="og:title" content="フリーランス | kitsune Blog" />
      </Head>
      <div className="main">
        <h1 className="heading">{heading}</h1>
        <BlogCards blogs={displays} />
        <Pager pagers={pagers} pageNumber={pageNumber} />
      </div>
    </>
  );
};

export default Page;
