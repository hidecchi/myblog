import Header from "components/Header";
import Sidebar from "components/Sidebar";
import Loading from "components/Loading";
import { ReactNode } from "react";
import "styles/globals.css";

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
