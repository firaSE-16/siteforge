import type { Metadata } from "next";
import { DM_Sans,  } from "next/font/google";
import "./globals.css";

import { ThemeWrapper } from "@/providers/theme-wrapper";


const font = DM_Sans({
  subsets:['latin']
})



export const metadata: Metadata = {
  title: "SiteForge",
  description: "All in one Agency Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <html lang="en">
        <body className={font.className}>
          <ThemeWrapper>
            {children}
          </ThemeWrapper>
        </body>
      </html>
   
  );
}
