import Header from "components/Header";
import Sidebar from "components/Sidebar";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header top />
      <main>
        <div className="inner top-contents">
          {children}
          <Sidebar />
        </div>
      </main>
      <footer>
        <p className="copyright">Copyright kitsune All Right Reserved</p>
      </footer>
    </>
  );
}
