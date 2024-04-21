import type { Metadata, NextPage } from "next";

import { Contents } from "./_components/Contents";

export const metadata: Metadata = {
  title: "検索ページ | kitsune Blog",
  description: "Webエンジニアkitsuneのブログの検索ページです。",
};

const Page: NextPage = () => {
  return <Contents />;
};

export default Page;
