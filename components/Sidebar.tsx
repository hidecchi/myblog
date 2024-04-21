"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent,useState } from "react";

const Sidebar = (): JSX.Element => {
  const router = useRouter();
  const [input, setInput] = useState<string>("");
  const search = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    router.push(`/search?keyword=${input}`);
  };

  return (
    <aside className="sidebar">
      <div>
        <h2 className="sidebar-title">カテゴリー</h2>
        <ul className="tags">
          <li>
            <Link href="/category/freelance">フリーランス</Link>
          </li>
          <li>
            <Link href="/category/programing">プログラミング</Link>
          </li>
          <li>
            <Link href="/category/other">その他</Link>
          </li>
        </ul>
      </div>
      <form className="search-form" onSubmit={search}>
        <input
          type="text"
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)} /*変更時inputに値をセット*/
        />
        <button type="submit" disabled={!input}>
          <Image src="/search.png" alt="" width={18} height={14} />
        </button>
      </form>
    </aside>
  );
};

export default Sidebar;
