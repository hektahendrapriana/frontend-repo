import type { Metadata } from "next";
import { Html, Head, Main, NextScript } from "next/document";
import "./globals.css";
import ThemeRegistry from "@/utils/ThemeRegistry";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <ThemeRegistry options={{ key: 'mui-theme' }}>
          <NextScript />
        </ThemeRegistry>
      </body>
    </Html>
  );
}