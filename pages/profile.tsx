import Head from "next/head";
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
          フロントエンドが主戦場のエンジニアです。React、Next.jsを用いて仕事をすることが多く、WebサイトもWebアプリもどちらも開発しています。
          <br />
          このブログはNext.js×Contentfulで制作しました。
          <br />
          いわゆるHeadless CMSというものです。
          <br />
          WordPressなどの従来のCMSの方が手軽かつ、カスタマイズはしやすかいもしれませんが、Headless
          CMSは高速なページ遷移が魅力といったところです。
          <br />
          カテゴリにあるように、フリーランス、プログラミング、その他ざっくばらんについて発信する予定ですので、
          <br />
          良かったら当ブログを楽しんでいってくださいませ。
        </p>
      </div>
    </>
  );
};

export default Page;
