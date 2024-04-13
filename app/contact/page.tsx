import type { Metadata, NextPage } from "next";
import { Contents } from "./_components/Contents";

export const metadata: Metadata = {
  title: "お問い合わせ | kitsune Blog",
  description: "Webエンジニアkitsuneのブログの問い合わせページです。",
};

const Page: NextPage = () => {
  return <Contents />;
};

export default Page;
