import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Vnitřní kompas · soukromý návrh",
  description: "Soukromý návrh rozhraní Vnitřního kompasu.",
  robots: { index: false, follow: false },
  icons: { icon: "/vnitrni-kompas-app-icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="cs"><body><Providers>{children}</Providers></body></html>;
}
