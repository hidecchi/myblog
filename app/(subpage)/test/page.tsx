import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ | Kitsune Blog",
  description: "WebエンジニアKitsuneのブログの問い合わせページです。",
};

const sleep = (waitTime: number) =>
  new Promise((resolve) => setTimeout(resolve, waitTime));
const Page: NextPage = async () => {
  await sleep(5000);
  return <div>コンテンツ</div>;
};

export default Page;
