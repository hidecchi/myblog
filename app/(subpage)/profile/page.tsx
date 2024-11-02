import type { Metadata, NextPage } from "next";

import { WebglCanvasSlide } from "./_components/WebglCanvasSlide";

export const metadata: Metadata = {
  title: "プロフィール | Kitsune Blog",
  description: "WebエンジニアKitsuneのブログのプロフィールページです。",
};

const Page: NextPage = () => {
  const heading = "プロフィール";
  return (
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
      <WebglCanvasSlide />
    </div>
  );
};

export default Page;
