import "styles/globals.css";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";

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
        <meta name="robots" content="noindex,nofollow" />
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
        <footer>
          <p className="copyright">Copyright kitsune All Right Reserved</p>
        </footer>
      </drawerContext.Provider>
    </>
  );
}

export default MyApp;
