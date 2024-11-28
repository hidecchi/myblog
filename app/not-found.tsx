import Header from "components/Header";
import Sidebar from "components/Sidebar";
import type { NextPage } from "next";
import Link from "next/link";

const Page: NextPage = () => {
  return (
    <>
      <Header />
      <main>
        <div className="inner top-contents">
          <div className="main">
            <h1>404</h1>
            <p>このページは存在しません。</p>
            <Link href="/">トップに戻る</Link>
          </div>
          <Sidebar />
        </div>
      </main>
      <footer>
        <p className="copyright">Copyright kitsune All Right Reserved</p>
      </footer>
    </>
  );
};

export default Page;
