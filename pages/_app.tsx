import "styles/globals.css";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { gsap } from "gsap";

export const drawerContext = React.createContext<{
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>(
  {} as {
    drawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }
);

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const router = useRouter();
  const value = {
    drawerOpen,
    setDrawerOpen,
  };

  useEffect(() => {
    setDrawerOpen(false);
  }, [router.pathname]);

  useEffect(() => {
    loadingTextRefs.current.forEach((item: any) => {
      gsap.set(item.current, {
        x: "random(-200,200)",
        y: "random(-200,200)",
        rotationX: "random(-90,90)",
        rotationY: "random(-90,90)",
        // rotationZ: "random(-90,90)",
        opacity: 0,
        color: `hsl(${gsap.utils.random(0, 360, 1)}, 90%, 60%)`,
      });
    });
    const tl = gsap.timeline();
    const ctx = gsap.context(() => {
      tl.to(".loading-text", {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        // rotationZ: 0,
        opacity: 1,
        duration: 3,
        color: "#333",
        ease: "power2.out",
        stagger: {
          amount: 1,
          from: "center",
        },
      })
        .to(
          ".loading-text",
          {
            ease: "sign.out",
            stagger: {
              amount: 1,
              from: "center",
            },
          },
          "<"
        )
        .to(
          ".loading-text",
          {
            opacity: 0,
            scale: 1.5,
            ease: "power3.in",
            duration: 1.5,
            stagger: {
              amount: 1.2,
              from: "edges",
            },
          },
          "-=0.2"
        )
        .to(".loading", {
          opacity: 0,
          visibility: "hidden",
          duration: 1.5,
        });
    });

    return () => ctx.revert();
  }, []);

  const LOADING_TEXT = "Kitsune Blog";
  const loadingTextRefs = useRef<any>([]);
  LOADING_TEXT.split("").forEach((_, index) => {
    loadingTextRefs.current[index] = React.createRef();
  });

  return (
    <>
      <Head>
        <link
          href="https://use.fontawesome.com/releases/v5.6.1/css/all.css"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sawarabi+Mincho&display=auto"
          rel="stylesheet"
        ></link>
        <meta property="og:site_name" content="kitsune Blog" />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <drawerContext.Provider value={value}>
        <Header />
        <main>
          <div className="inner top-contents">
            <Component {...pageProps} />
            <Sidebar />
          </div>
        </main>
        <div className="loading">
          {LOADING_TEXT.split("").map((text, index) => {
            return (
              <span
                className={text === "e" ? "loading-text mr" : "loading-text"}
                key={index}
                ref={loadingTextRefs.current[index]}
              >
                {text}
              </span>
            );
          })}
        </div>
        <footer>
          <p className="copyright">Copyright kitsune All Right Reserved</p>
        </footer>
      </drawerContext.Provider>
      <style jsx>
        {`
          .loading {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f7f7f7;
            transition: 0.3s;
            z-index: 3000;
          }
          .loading-text {
            font-size: 48px;
            letter-spacing: 0.16em;

            opacity: 0;
          }
          .mr {
            margin-right: 0.5em;
          }
          @media screen and (max-width: 540px) {
            .loading-text {
              font-size: 9vw;
            }
          }
        `}
      </style>
    </>
  );
}

export default MyApp;
