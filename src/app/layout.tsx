import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "individual.cl",
  description: "Componentes Next.Js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={` antialiased bg-white font-pangea `}>
      <body className={` antialiased bg-white bg-gradient-to-b from-[#fffaf4] to-white font-pangea hyphens-auto `} >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
