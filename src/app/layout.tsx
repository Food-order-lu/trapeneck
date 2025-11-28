import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
    title: "Am Trapeneck - Restaurant Italien | Hesperange, Luxembourg",
    description: "Restaurant italien et brasserie à Hesperange. Cuisine italienne authentique, pizzas, pâtes et livraison à domicile. Ouvert tous les jours de 11h30 à 14h et 18h à 22h.",
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
            </body>
        </html>
    );
}
