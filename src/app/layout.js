import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local'
import PageProtection from "@/components/Pageprotection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// const inter = Inter({ subsets: ["latin"] });
const myFont = localFont({
  src: '../../public/Ubuntu-Regular.ttf',
  display: 'swap',
})

export const metadata = {
  title: "Secure File Loader",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={myFont.className}
      >
        <PageProtection>{children}</PageProtection>
      </body>
    </html>
  );
}
