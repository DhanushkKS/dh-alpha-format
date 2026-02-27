import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
//
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://alpha-format.vercel.app";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "AlphaFormat | Professional LinkedIn Post Formatter",
    template: "%s | AlphaFormat",
  },
  description:
    "Elevate your LinkedIn presence. Format your posts with bold, italic, and monospace text to stand out and drive more engagement.",
  keywords: [
    "LinkedIn formatter",
    "bold text on LinkedIn",
    "LinkedIn post editor",
    "Unicode text converter",
    "LinkedIn engagement",
  ],
  authors: [{ name: "Shyaman Dhanushka" }],
  openGraph: {
    title: "AlphaFormat | Stand Out on LinkedIn",
    description:
      "Format your LinkedIn posts with bold and italic text effortlessly.",
    url: baseUrl,
    siteName: "AlphaFormat",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "AlphaFormat Preview Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
       
         ${plusJakartaSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
