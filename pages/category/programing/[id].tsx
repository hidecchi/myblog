import Head from "next/head";
import type {
  NextPage,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { createClient } from "contentful";
import BlogCards from "components/BlogCards";
import Pager from "components/Pager";
import { IBlogFields } from "../../../@types/generated/contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});
const displayNumber: number = 6;

export const getStaticPaths = async () => {
  const paths: { params: { id: string } }[] = [];
  const res = await client.getEntries<IBlogFields>({
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

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const res = await client.getEntries<IBlogFields>({
    content_type: "blog",
    order: "-sys.createdAt",
    "metadata.tags.sys.id[all]": "programing",
  });
  const maxPageNumber: number = Math.ceil(res.items.length / displayNumber);
  return {
    props: {
      blogs: res.items,
      pageNumber: Number(params?.id),
      maxPageNumber: maxPageNumber,
    },
  };
};

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<Props> = ({ blogs, pageNumber, maxPageNumber }) => {
  const startNumber = displayNumber * (pageNumber - 1);
  const displays = blogs.slice(startNumber, startNumber + displayNumber);
  const heading = "プログラミング";
  const pagers: number[] = [];
  for (let i = 1; i <= maxPageNumber; i++) {
    pagers.push(i);
  }
  return (
    <>
      <Head>
        <title>プログラミング | kitsune Blog</title>
        <meta property="og:title" content="プログラミング | kitsune Blog" />
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
