"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const Header = ({ top }: { top?: boolean }): JSX.Element => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  const router = useRouter(); //ルーターの取得
  const pathname = usePathname();
  const [input, setInput] = useState<string>("");
  const search = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) return;
    router.push(`/search?keyword=${input}`);
  };

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <header>
      {top ? (
        <h1 className="site-title">
          <Link href="/">Kitsune Blog</Link>
        </h1>
      ) : (
        <p className="site-title">
          <Link href="/">Kitsune Blog</Link>
        </p>
      )}

      <div className={drawerOpen ? "menus is-open" : "menus"}>
        <nav>
          <ul>
            <li>
              <Link href="/">ホーム</Link>
            </li>
            <li>
              <Link href="/archive">アーカイブ</Link>
            </li>
            <li>
              <Link href="/profile">プロフィール</Link>
            </li>
            <li>
              <Link href="/contact">お問い合わせ</Link>
            </li>
          </ul>
        </nav>
        <form className="search-form" onSubmit={search}>
          <input
            type="text"
            placeholder="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button type="submit" disabled={!input}>
            <Image
              src="/search.png"
              alt="Picture of the author"
              width={18}
              height={14}
            />
          </button>
        </form>
      </div>
      <button
        className={drawerOpen ? "menu-btn is-open" : "menu-btn"}
        onClick={toggleDrawer}
        aria-label="メニューボタン"
        aria-expanded={drawerOpen}
      >
        <span></span>
        <span></span>
      </button>
      <style jsx>{``}</style>
    </header>
  );
};

export default Header;
