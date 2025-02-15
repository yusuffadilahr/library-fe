import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TanstackProvider from "@/providers/TanstackProvider"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ReduxProvider from "@/providers/reduxproviders";
// import ReduxProvider from "@/providers/reduxproviders";

// import { useRouter } from "next/router";



const geistSans = localFont({
  src: "./admin/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./admin/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanstackProvider>
          <ToastContainer />
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
