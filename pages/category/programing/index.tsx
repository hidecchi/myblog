import Head from "next/head";
import { createClient } from "contentful";
import BlogCards from "../../../components/BlogCards";
import Pager from "../../../modules/Pager";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});
const displayNumber = 6;

export async function getStaticProps() {
  const res = await client.getEntries({
    content_type: "blog",
    order: "-sys.createdAt",
    "metadata.tags.sys.id[all]": "programing",
  });
  const maxPageNumber: number = Math.ceil(res.items.length / displayNumber);
  return {
    props: {
      blogs: res.items,
      pageNumber: 1,
      maxPageNumber: maxPageNumber,
    },
  };
}

export default function freelance(blogs: any): JSX.Element {
  const startNumber: number = displayNumber * (blogs.pageNumber - 1);
  const displays = blogs.blogs.slice(startNumber, startNumber + displayNumber);
  const heading = "プログラミング";
  const pagers: number[] = [];
  for (let i = 1; i <= blogs.maxPageNumber; i++) {
    pagers.push(i);
  }
  return (
    <>
      <Head>
        <title>プログラミング | kitsune Blog</title>
        <meta property="og:title" content="プログラミング | kitsune Blog" />
      </Head>
      <div className="main">
        <h2 className="heading">{heading}</h2>
        <BlogCards blogs={displays} />
        <Pager pagers={pagers} />
      </div>
    </>
  );
}