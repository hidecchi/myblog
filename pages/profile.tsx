import Head from "next/head";

export default function profile(): JSX.Element {
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
          ホームページ制作の仕事を中心にフリーランスとして仕事をしつつ、個人開発でモダンJavaScriptも少し触っています。
          <br />
          このブログはNext.js×Contentfulで制作いたしました。
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
}
