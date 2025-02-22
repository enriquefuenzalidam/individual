import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "individual.cl",
  description: "| Componentes Next.Js",
};
 
const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) =>{
  return React.createElement('html', {lang: 'es', style: { WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", backgroundColor: 'white', fontFamily: '"Pangea Trial", sans-serif' }},
          React.createElement('body', {style: { WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", backgroundColor: 'white', background: 'linear-gradient(to bottom, #fffaf4, white)', hyphens: 'auto', fontFamily: '"Pangea Trial", sans-serif' }},
            React.createElement(Header, null),
            children,
            React.createElement(Footer, null))
  );
}

export default RootLayout;

