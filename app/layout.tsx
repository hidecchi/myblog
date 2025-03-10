import "styles/globals.scss";

import { GoogleTagManager } from "@next/third-parties/google";
import { LivePreviewProvider } from "components/LIvePreviewProvider";
import { Sawarabi_Mincho } from "next/font/google";
import { draftMode } from "next/headers";
import { ReactNode } from "react";

export const dynamic = "force-static";

const SawarabiMincho = Sawarabi_Mincho({
  weight: "400",
  subsets: ["latin"],
  variable: "--mincho-font",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const { isEnabled } = draftMode();
  return (
    <html lang="ja">
      <body className={SawarabiMincho.variable}>
        <LivePreviewProvider isEnabled={isEnabled}>
          {children}
        </LivePreviewProvider>
        <GoogleTagManager gtmId={process.env.GTM_ID as string} />
      </body>
    </html>
  );
}
