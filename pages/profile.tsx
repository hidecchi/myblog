import Head from "next/head";
import Image from "next/image";
import type { NextPage } from "next";

const Page: NextPage = () => {
  const heading = "プロフィール";
  return (
    <>
      <Head>
        <title>プロフィール | kitsune Blog</title>
        <meta
          name="description"
          content="Webエンジニアkitsuneのブログのプロフィールページです。"
        />
      </Head>
      <div className="main">
        <h1 className="heading">{heading}</h1>
        <p>
          このブログの運営主のきつねと申します。
          <br />
          フロントエンドが主戦場のエンジニアです。
          <br />
          React、Next.jsを用いて仕事をすることが多く、WebサイトもWebアプリもどちらも開発しています。
          <br /> <br />
          このブログはNext.js×Contentfulで制作しました。
          <br />
          いわゆるHeadless CMSというものです。
          <br />
          WordPressなどの従来のCMSの方が手軽かつ、カスタマイズはしやすかいもしれませんが、Headless
          CMSは高速なページ遷移が魅力といったところです。
          <br />
          <br />
          カテゴリにあるように、フリーランス、プログラミング、その他ざっくばらんについて発信する予定ですので、
          <br />
          良かったら当ブログを楽しんでいってくださいませ。
        </p>
        <h2 className="heading heading2">制作実績</h2>
        <a
          className="image-wrap"
          href="https://fukuokatenpo.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/tenant.png"
            alt="飲食テナントナビ"
            width={1200}
            height={638}
            className="image"
          />
        </a>
        <a
          href="https://rendezvous-shisha.com/"
          className="image-wrap"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/randevouz.jpg"
            alt="shisha cafe&bar ランデヴー"
            width={1200}
            height={638}
            className="image"
          />
        </a>
        <a
          className="image-wrap"
          href="https://www.ichidai.co.jp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/ichidai.png"
            alt="株式会社一代"
            width={1200}
            height={638}
            className="image"
            onError={(event) => {
              // event.currentTarget.onerror = null;
              event.currentTarget.src = "/tenant.png";
            }}
          />
        </a>
        <img
          src="abc.jpg"
          alt=""
          style={{ maxWidth: "100%", display: "block" }}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/ichidai.png";
          }}
        />

        <Image
          src="abc.png"
          alt="株式会社一代"
          width={1200}
          height={638}
          className="image"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/tenant.png";
          }}
        />
      </div>
      <style jsx>
        {`
          .heading2 {
            margin-top: 2rem;
            margin-bottom: 1rem;
          }
          .image-wrap {
            margin-bottom: 1rem;
          }
          .image-wrap:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </>
  );
};

export default Page;
