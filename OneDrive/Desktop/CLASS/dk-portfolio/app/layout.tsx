import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PageWrapper from "@/components/layout/PageWrapper";
import SmoothScroll from "@/components/ui/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DINESH KUMAR S — AI Automation Engineer",
  description: "AI Automation Engineer & Python Backend Developer building LLM-powered systems and full-stack applications.",
  alternates: {
    canonical: "https://radi-tech.vercel.app/",
  },
  openGraph: {
    type: "profile",
    firstName: "Dinesh",
    lastName: "Kumar S",
    username: "DINESHREX",
    gender: "male",
  },
  verification: {
    google: "FdT7h8Hqty51oOrdlQ1IgqRg2mwrX5EO5AaJJc285gY",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "DINESH KUMAR S",
              url: "https://radi-tech.vercel.app/",
              sameAs: [
                "https://github.com/DINESHREX",
                "https://linkedin.com/in/dinesh1203",
              ],
              jobTitle: "AI Automation Engineer",
              knowsAbout: ["Python", "React", "LLM", "Automation"],
            }),
          }}
        />
      </head>
      <body
        className={cn(
          inter.variable,
          outfit.variable,
          "antialiased bg-background text-foreground min-h-screen selection:bg-accent selection:text-accent-foreground flex flex-col"
        )}
      >
        <SmoothScroll />
        <Navbar />
        <main className="flex-grow">
          <PageWrapper>{children}</PageWrapper>
        </main>
        <Footer />
      </body>
    </html>
  );
}
