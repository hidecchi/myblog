import Head from "next/head";
import { createClient } from "contentful";
import BlogCards from "../../components/BlogCards";
import Pager from "../../components/Pager";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});
const displayNumber = 6;

export async function getStaticProps({ params }) {
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

export default function archive(blogs) {
  const startNumber = displayNumber * (blogs.pageNumber - 1);
  const displays = blogs.blogs.slice(startNumber, startNumber + displayNumber);
  const heading = "アーカイブ";
  const pagers = [];
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
        <h2 className="heading">{heading}</h2>
        <BlogCards blogs={displays} />
        <Pager pagers={pagers} />
      </div>
    </>
  );
}
