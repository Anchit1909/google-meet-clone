import type { Metadata } from "next";
import { IBM_Plex_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { SocketProvider } from "@/context/socket";
import Header from "@/components/Navigation/Header";
import Footer from "@/components/Navigation/Footer";
import { cx } from "class-variance-authority";
// import { GeistSans } from "geist/font/sans";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meetsync",
  description:
    "Connect, collaborate, and celebrate from anywhere with MeetSync",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cx(
          ibmPlexMono.variable,
          poppins.variable,
          "overflow-x-hidden min-h-[100dvh] grid grid-rows-[auto_1fr_auto]"
        )}
      >
        <SocketProvider>
          <Header />
          <main>{children}</main>
          {/* <Footer /> */}
        </SocketProvider>
      </body>
    </html>
  );
}
