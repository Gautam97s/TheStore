import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Script from "next/script"; // ✅ Import Script component

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

        {/* ✅ Google Analytics (new ID: G-YZPSDZ2WZ7) */}
        {isProd && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-YZPSDZ2WZ7"
              strategy="afterInteractive"
            />
            <Script id="ga-tracking" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-YZPSDZ2WZ7');
              `}
            </Script>
          </>
        )}
        {/* ✅ Maze User Experience Analytics */}
        {isProd && (
          <Script id="maze-tracking" strategy="afterInteractive">
            {`
              (function (m, a, z, e) {
                var s, t;
                try {
                  t = m.sessionStorage.getItem('maze-us');
                } catch (err) {}
                if (!t) {
                  t = new Date().getTime();
                  try { m.sessionStorage.setItem('maze-us', t); } catch (err) {}
                }
                s = a.createElement('script');
                s.src = z + '?apiKey=' + e;
                s.async = true;
                a.getElementsByTagName('head')[0].appendChild(s);
                m.mazeUniversalSnippetApiKey = e;
              })(window, document, 'https://snippet.maze.co/maze-universal-loader.js', '991fb3e0-e4b6-4908-b3b2-8dad16b19cd8');
            `}
          </Script>
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
