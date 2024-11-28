"use client";

import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { Entry } from "contentful";
import Image from "next/image";
import SyntaxHighlighter from "react-syntax-highlighter";
import { foundation } from "react-syntax-highlighter/dist/cjs/styles/hljs";

import { IBlogFields } from "../../../../../@types/generated/contentful";
import styles from "./Contents.module.scss";

export const Contents = ({ blog }: { blog: Entry<IBlogFields> }) => {
  const twitterShare = function (e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const url = location.href;
    const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${livePost.fields.title}`;
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

  const livePost = useContentfulLiveUpdates(blog);

  return (
    <div className="main">
      <h1 className={styles.heading}>{livePost.fields.title}</h1>
      <div className={styles.snsShare}>
        <a
          className={styles.twitter}
          onClick={twitterShare}
          href="#"
          aria-label="Xでポストする"
        >
          <span>X(twitter)</span>
        </a>
        <a
          className={styles.facebook}
          onClick={facebookShare}
          href="#"
          aria-label="Facebookでシェアする"
        >
          <span>Facebook</span>
        </a>
        <a
          className={styles.line}
          onClick={lineShare}
          href="#"
          aria-label="lineでシェアする"
        >
          <span>LINE</span>
        </a>
      </div>

      <p
        className={`thumbnail ${styles.thumbnail}`}
        style={{ maxWidth: "450PX" }}
      >
        <Image
          src={"https:" + blog.fields.thumbnail?.fields.file?.url}
          fill
          style={{ objectFit: "cover" }}
          alt=""
          priority={true}
          sizes={"450px"}
          loading="eager"
        />
      </p>

      <div className={styles.contents}>
        {documentToReactComponents(livePost.fields.blogcontent, {
          renderNode: {
            [BLOCKS.HEADING_2]: (_, children) => {
              return <h2>{children}</h2>;
            },
            [BLOCKS.PARAGRAPH]: (node: any, children) => {
              if (node.content[0].marks.find((x: any) => x.type === "code")) {
                return (
                  <SyntaxHighlighter language="javascript" style={foundation}>
                    {node.content[0]?.value}
                  </SyntaxHighlighter>
                );
              }
              if (node.content[0].marks.find((x: any) => x.type === "h2")) {
                return <h2>{children}</h2>;
              }

              return <p>{children}</p>;
            },
            [BLOCKS.EMBEDDED_ASSET]: (node) => (
              <div className="imageContainer">
                <Image
                  src={"https:" + node.data.target.fields.file.url}
                  alt=""
                  fill
                  sizes={"450px"}
                />
              </div>
            ),
          },
        })}
      </div>
    </div>
  );
};
