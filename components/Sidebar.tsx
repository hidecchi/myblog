import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";

export default function Sidebar(): JSX.Element {
  const router = useRouter(); //ルーターの取得
  const [input, setInput] = useState<string>("");
  const search = (e: React.SyntheticEvent) => {
    e.preventDefault();
    //未入力の時
    if (!input) {
      return;
    }
    router.push({
      pathname: "/search", //URL
      query: { keyword: input }, //検索クエリ
    });
  };
  return (
    <aside className="sidebar">
      <div>
        <h2 className="sidebar-title">カテゴリー</h2>
        <ul className="tags">
          <li>
            <Link href="/category/freelance">
              <a>フリーランス</a>
            </Link>
          </li>
          <li>
            <Link href="/category/programing">
              <a>プログラミング</a>
            </Link>
          </li>
          <li>
            <Link href="/category/other">
              <a>その他</a>
            </Link>
          </li>
        </ul>
      </div>
      <form className="search-form" onSubmit={search}>
        {/* 入力項目 */}
        <input
          type="text"
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)} /*変更時inputに値をセット*/
        />

        {/* ボタン */}
        <button type="submit" disabled={!input}>
          {" "}
          {/*入力項目が未入力の場合、非活性*/}
          <Image
            src="/search.png"
            alt="Picture of the author"
            width={18}
            height={14}
          />
        </button>
      </form>
      <style jsx>
        {`
          .sidebar {
            width: 220px;
            margin-left: 40px;
            flex-shrink: 0;
          }
          .tags li {
            width: fit-content;
            margin-bottom: 0px;
          }
          .tags li a {
            padding: 2px 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1px dotted #6d5c5a;
            background-color: #f7f7f7;

            color: #6d5c5a;
            font-style: italic;
          }

          .sidebar-title {
            margin-bottom: 0.3em;
            font-family: "Sawarabi Mincho", sans-serif;
            display: flex;
            align-items: center;
            color: #6d5c5a;
          }
          .sidebar-title::before {
            content: "";
            width: 20px;
            height: 1px;
            margin-right: 10px;
            background-color: #6d5c5a;
          }
          .sidebar-title::after {
            content: "";
            width: 20px;
            height: 1px;
            margin-left: 10px;
            background-color: #6d5c5a;
          }
          .search-form {
            margin-top: 30px;
            max-width: 400px;
            position: relative;
          }
          .search-form input {
            appearance: none;
            outline: none;
            display: block;
            width: 100%;
            height: 26px;
            margin-bottom: 12px;
            padding-right: 30px;
            border-bottom: 1px solid;
            border-right: none;
            border-left: none;
            border-top: none;
            border-radius: 0px;
            background-color: transparent;
          }
          .search-form input:focus {
            border-bottom: 1px solid;
            border-right: none;
            border-left: none;
            border-top: none;
          }
          .search-form button {
            position: absolute;
            right: 0;
            top: 3px;
            background-color: transparent;
            border: none;
            cursor: pointer;
          }

          @media screen and (max-width: 1100px) {
            .sidebar {
              width: 100%;
              margin-left: 0;
            }
            .tags {
              display: flex;
              flex-wrap: wrap;
            }
            .tags li {
              margin-right: 20px;
            }
          }
          @media screen and (max-width: 540px) {
            .sidebar {
              width: 100%;
              position: fixed;
              left: 0;
              bottom: 0;
              z-index: 1000;
              border-top: 1px solid white;
            }
            .sidebar h2 {
              display: none;
            }
            .tags li {
              width: calc(100% / 3);
              margin: 0 !important;
            }
            .tags li:first-of-type a {
              border-right: 1px solid #d3cece;
            }
            .tags li:last-of-type a {
              border-left: 1px solid #d3cece;
            }
            .tags li a {
              width: 100%;
              height: 40px;
              padding: 4px;
              font-size: 14px;
              flex-direction: column;
              background-color: #eee;
              font-style: normal;
              border: none;
            }
            .search-form {
              display: none;
            }
          }
          @media screen and (max-width: 365px) {
            .tags li a {
              font-size: 3.8vw;
            }
          }
        `}
      </style>
    </aside>
  );
}
