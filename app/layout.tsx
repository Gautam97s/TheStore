import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "SaveIt - Smart Cloud Storage",
  description: "Securely manage and organize your cloud files with SaveIt",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "icon",
      url: "/icon.png",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  
}>) {
  const isProd = process.env.NODE_ENV === "production";
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`${poppins.variable} font-poppins antialiased`}>
        {children}

        {/* ✅ Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "tzfom45j11");
          `}
        </Script>

        {/* ✅ Google Analytics (new ID: G-LRLLRGEWZ3) */}
        {isProd && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-LRLLRGEWZ3"
              strategy="afterInteractive"
            />
            <Script id="ga-tracking" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-LRLLRGEWZ3');
              `}
            </Script>
          </>
        )}
        {/* ✅ Contentsquare UX Analytics (replacing Maze) */}
        {isProd && (
          <Script
            id="contentsquare-tracking"
            src="https://t.contentsquare.net/uxa/82949c4b58b46.js"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
