import "styles/globals.css";

import Loading from "components/Loading";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Loading />
        {children}
      </body>
    </html>
  );
}
