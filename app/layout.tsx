import Header from "components/Header";
import Sidebar from "components/Sidebar";
import { ReactNode } from "react";
import "styles/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>
          <div className="inner top-contents">
            {children}
            <Sidebar />
          </div>
        </main>
      </body>
    </html>
  );
}
