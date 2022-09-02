import Head from "next/head";
import { createClient } from "contentful";
import BlogCards from "../../../components/BlogCards";
import Pager2 from "../../../modules/Pager2";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});
const displayNumber: number = 6;

export const getStaticPaths = async () => {
  const paths = [];
  const res = await client.getEntries({
    content_type: "blog",
    order: "-sys.createdAt",
    "metadata.tags.sys.id[all]": "programing",
  });
  const maxPageNumber: number = Math.ceil(res.items.length / displayNumber);
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
    "metadata.tags.sys.id[all]": "programing",
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

export default function archive(blogs: any): JSX.Element {
  const startNumber = displayNumber * (blogs.pageNumber - 1);
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
        <Pager2 pagers={pagers} blogs={blogs} />
      </div>
    </>
  );
}
