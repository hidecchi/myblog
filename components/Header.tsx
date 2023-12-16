"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { useEffect, FormEvent } from "react";
import { usePathname } from "next/navigation";

const Header = (): JSX.Element => {
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
      {true ? (
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
      >
        <span></span>
        <span></span>
      </button>
      <style jsx>
        {`
          header {
            padding: 20px;
            position: relative;
          }
          .site-title {
            display: table;
            margin: 0 auto 0.5em auto;
            font-size: 24px;

            letter-spacing: 0.1em;
            font-family: "Sawarabi Mincho", sans-serif;
          }
          header nav ul {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          header nav ul li {
            margin: 0 0.7em;
          }
          header nav ul li a {
            position: relative;
          }
          header nav ul li a::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0%;
            height: 1px;
            background-color: #050505;
            transition: 0.4s;
          }
          header nav ul li a:hover::after {
            width: 100%;
          }
          .menu-btn {
            display: none;
          }
          .menu-btn::after {
            content: "Menu";
          }
          .menu-btn.is-open::after {
            content: "Close";
          }
          .search-form {
            display: none;
          }
          @media screen and (max-width: 540px) {
            header {
              padding: 10px 0;
              border-bottom: 1px solid #d3cece;
            }
            .site-title {
              margin-bottom: 0;
              font-size: 22px;
            }
            .menus {
              width: 180px;
              padding: 30px 10px 30px 10px;
              position: fixed;
              right: 0;
              top: 0;
              visibility: hidden;
              opacity: 0;
              background-color: rgba(255, 255, 255, 0.97);
              border-bottom: 1px solid #d3cece;
              border-left: 1px solid #d3cece;
              z-index: 100;
              transition: opacity 0.2s;
            }
            @keyframes fade-in {
              0% {
                opacity: 0;
                visibility: hidden;
              }
              100% {
                opacity: 1;
                visibility: visible;
              }
            }
            .menus.is-open {
              animation: fade-in 0.3s forwards;
            }
            header nav {
              margin-bottom: 10px;
            }
            header nav ul {
              display: table;
            }
            header nav ul li {
              margin-bottom: 12px;
            }
            header nav ul li a::after {
              display: none;
            }
            .search-form {
              display: block;
              position: relative;
            }
            .search-form input {
              appearance: none;
              outline: none;
              display: block;
              width: 100%;
              max-width: 400px;
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
            .menu-btn {
              width: 45px;
              display: block;
              position: fixed;
              right: 10px;
              top: 6px;
              padding: 8px 0px 2px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              font-size: 12px;
              z-index: 200;
              appearance: none;
              border: none;
              background-color: transparent;
            }
            .menu-btn span:nth-of-type(1) {
              display: table;
              width: 18px;
              height: 1px;
              margin-right: 11px;
              margin-bottom: 6px;
              background-color: #505050;
            }
            .menu-btn span:nth-of-type(2) {
              display: table;
              width: 30px;
              height: 1px;
              margin-bottom: 6px;
              background-color: #505050;
            }
          }
        `}
      </style>
    </header>
  );
};

export default Header;
