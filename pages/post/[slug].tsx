import Head from "next/head";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { useRouter } from "next/router";
import Image from "next/image";
import SyntaxHighlighter from "react-syntax-highlighter";
import { foundation } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import React from "react";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

export const getStaticPaths = async () => {
  const res: any = await client.getEntries({ content_type: "blog" });
  const paths = res.items.map((item: any) => {
    return {
      params: { slug: item.fields.slug },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export async function getStaticProps({ params }: any) {
  const items = await client.getEntries({
    content_type: "blog",
    "fields.slug": params.slug,
  });
  return {
    props: {
      blog: items.items[0],
    },
  };
}

export default function BlogDetails({ blog }: any): JSX.Element {
  const router = useRouter();
  // console.log(router.query.name);
  const twitterShare = function (e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const url = location.href;
    const shareUrl = `https://twitter.com/share?url=${url}&text=${blog.fields.title}`;
    window.open(shareUrl, "_blank");
  };
  const facebookShare = function (e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const url = location.href;
    const shareUrl = `http://www.facebook.com/share.php?u=${url}`;
    window.open(shareUrl, "_blank");
  };
  const lineShare = function (e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const url = location.href;
    const shareUrl = `https://social-plugins.line.me/lineit/share?url=${url}`;
    window.open(shareUrl, "_blank");
  };

  if (!blog)
    return (
      <>
        <div className="main">
          <div>loading</div>
        </div>
      </>
    );
  return (
    <>
      <Head>
        <title>{blog.fields.title} | kitsune Blog</title>
        <meta
          name="description"
          content={
            blog.fields.description
              ? blog.fields.description
              : "Webエンジニアkitsuneのブログです。"
          }
        />
        <meta
          property="og:title"
          content={blog.fields.title + " | kitsune Blog"}
        />
        <meta
          property="og:image"
          content={"https:" + blog.fields.thumbnail.fields.file.url}
        />
        <meta property="og:type" content="article" />
      </Head>
      <div className="main">
        <h2>{blog.fields.title}</h2>
        <div className="sns-share">
          <a className="twitter" onClick={twitterShare} href="#">
            <i className="fab fa-twitter"></i>
            <span>ツイート</span>
          </a>
          <a className="facebook" onClick={facebookShare} href="#">
            <i className="fab fa-facebook-f"></i>
            <span>シェア</span>
          </a>
          <a className="line" onClick={lineShare} href="#">
            <span>LINE</span>
          </a>
        </div>
        <p className="thumbnail">
          <Image
            src={"https:" + blog.fields.thumbnail.fields.file.url}
            layout="fill"
            objectFit="cover"
            alt=""
            width={850}
            height={500}
            priority={true}
            sizes={"450px"}
          />
        </p>

        <div className="contents">
          {documentToReactComponents(blog.fields.blogcontent, {
            renderNode: {
              // eslint-disable-next-line react/display-name

              [BLOCKS.PARAGRAPH]: (node: any, children) => {
                if (node.content[0].marks.find((x: any) => x.type === "code")) {
                  return (
                    <SyntaxHighlighter language="javascript" style={foundation}>
                      {node.content[0]?.value}
                    </SyntaxHighlighter>
                  );
                }
                return <p>{children}</p>;
              },
              [BLOCKS.EMBEDDED_ASSET]: (node) => (
                <div className="imageContainer">
                  <Image
                    src={"https:" + node.data.target.fields.file.url}
                    alt=""
                    layout="fill"
                    sizes={"450px"}
                  />
                </div>
              ),
            },
          })}
        </div>
      </div>
      <style jsx>
        {`
          h2 {
            margin-bottom: 0.7em;
            font-size: 22px;
          }
          .box {
            display: flex;
          }
          .thumbnail {
            margin-bottom: 24px;
            max-width: 450px;
          }
          .sns-share {
            display: flex;
            margin-top: 10px;
            margin-bottom: 16px;
          }
          .sns-share a {
            display: inline-block;
            width: 92px;
            height: 26px;
            margin-right: 16px;
            font-size: 12px;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 4px;
          }
          .sns-share a i {
            margin-right: 2px;
            vertical-align: middle;
          }
          .twitter {
            background-color: #1b95e0;
          }
          .facebook {
            background-color: #4267b2;
          }
          .line {
            background-color: #00b900;
          }
          .contents img {
            max-width: 450px;
          }
          .contents p {
            min-height: 1.6em;
          }

          @media screen and (max-width: 540px) {
            h2 {
              font-size: 18px;
            }
            .sns-share a {
              font-size: 11px;
              width: 80px;
              height: 25px;
              margin-right: 12px;
            }
            .contents img {
              max-width: 100%;
            }
          }
        `}
      </style>
    </>
  );
}
