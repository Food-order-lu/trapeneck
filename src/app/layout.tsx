import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
    title: "Am Trapeneck - Restaurant Italien | Hesperange, Luxembourg",
    description: "Restaurant italien et brasserie à Hesperange. Cuisine authentique 7j/7 (10h-14h, 18h-22h). Brasserie ouverte du lundi au samedi dès 10h00.",
    keywords: "restaurant italien, Hesperange, Luxembourg, pizza, pâtes, livraison, brasserie, Am Trapeneck, Alzingen",
    openGraph: {
        title: "Am Trapeneck - Restaurant Italien",
        description: "Cuisine italienne authentique à Hesperange, Luxembourg",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr">
            <body>
                <Navbar />
                {children}
                <Footer />
                <Script
                    src="https://www.fbgcdn.com/embedder/js/ewm2.js"
                    strategy="afterInteractive"
                />
            </body>
        </html>
    );
}
