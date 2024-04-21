import "styles/globals.css";

import Header from "components/Header";
import Loading from "components/Loading";
import Sidebar from "components/Sidebar";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Loading />
        <Header />
        <main>
          <div className="inner top-contents">
            {children}
            <Sidebar />
          </div>
        </main>
        <footer>
          <p className="copyright">Copyright kitsune All Right Reserved</p>
        </footer>
      </body>
    </html>
  );
}
