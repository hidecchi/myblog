import type { Metadata, NextPage } from "next";
import { Suspense } from "react";

import { Contents } from "./_components/Contents";

export const metadata: Metadata = {
  title: "検索ページ | Kitsune Blog",
  description: "WebエンジニアKitsuneのブログの検索ページです。",
};

const Page: NextPage = () => {
  return (
    <Suspense fallback={<div className="main" />}>
      <Contents />
    </Suspense>
  );
};

export default Page;
