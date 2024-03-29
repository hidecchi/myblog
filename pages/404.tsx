import Link from "next/link";
import { useRouter } from "next/router";
import type { NextPage } from "next";

const Page: NextPage = () => {
  const router = useRouter();
  const redirection = function () {
    setTimeout(() => {
      router.push("/");
    }, 4000);
  };
  redirection();

  return (
    <div className="main">
      <h1>404</h1>
      <p>このページは存在しません</p>
      <p>
        <Link href="/">トップに戻る</Link>
      </p>
    </div>
  );
};

export default Page;
