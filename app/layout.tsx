import "styles/globals.css";

import Loading from "components/Loading";
import { Sawarabi_Mincho } from "next/font/google";
import { ReactNode } from "react";

export const dynamic = "force-static";

const SawarabiMincho = Sawarabi_Mincho({
  weight: "400",
  subsets: ["latin"],
  variable: "--mincho-font",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body className={SawarabiMincho.variable}>
        <Loading />
        {children}
      </body>
    </html>
  );
}
