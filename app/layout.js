import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
import HomepageLayout from "@/src/components/layouts/HomepageLayout";

export const metadata = {
  title: "Clothora",
  description: "Purchase your favourite clots",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0}}>
        <HomepageLayout>{children}</HomepageLayout>
      </body>
    </html>
  );
}
