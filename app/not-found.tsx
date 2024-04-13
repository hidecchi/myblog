import Link from "next/link";
import type { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <div className="main">
      <h1>404</h1>
      <p>このページは存在しません。</p>
      <p>
        <Link href="/">トップに戻る</Link>
      </p>
    </div>
  );
};

export default Page;
