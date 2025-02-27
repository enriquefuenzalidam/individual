import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ogImage from '@/assets/individualcl_ogimage.jpg';
import individualIcon230 from '@/assets/individualcl_icon_230x230.jpg';
import individualIcon85 from '@/assets/individualcl_icon_85x85.jpg';
import individualIcon32 from '@/assets/individualcl_icon_32x32.jpg';
import individualIcon34 from '@/assets/individualcl_icon_34x34.jpg';
import individualIcon16 from '@/assets/individualcl_icon_16x16.jpg';

export const metadata: Metadata = {
  title: {
    template: "%s | individual.cl",
    default: "individual.cl"
  },
  description: 'Componentes Next.Js',
  keywords: 'ProntoVista, Next.JS, Next.js Components, Next.js UI Components, Next.js Image Gallery, Next.js Image Slider, React Next.js, Next.js Open Source, Next.js Carousel, Next.js Slider, Next.js UI Library, React Components, UI Components, Web Components, Open Source UI, Image Carousel, Galería de Imágenes, Deslizador de Imágenes, Carrusel de Imágenes, JavaScript UI, Vercel Components, Componentes de React, Next.js Frontend, Frontend Development, Reusable UI Components, Next.js Free Component',
  icons: {
    icon: [
      { rel: 'icon', type: 'image/png', sizes: '16x16', url: individualIcon16.src },
      { rel: 'icon', type: 'image/png', sizes: '32x32', url: individualIcon32.src },
      { rel: 'icon', type: 'image/png', sizes: '34x34', url: individualIcon34.src },
      { rel: 'icon', type: 'image/png', sizes: '85x85', url: individualIcon85.src },
      { rel: 'icon', type: 'image/png', sizes: '230x230', url: individualIcon230.src },
      { rel: 'apple-touch-icon', sizes: '230x230', url: individualIcon230.src },
    ],
  },
  metadataBase: new URL('https://individual.cl'),
  openGraph: {
    title: 'individual.cl',
    description: 'Componentes Next.Js',
    type: 'website',
    siteName: 'individual.cl',
    locale: 'es_ES',
    images: [
      { url: ogImage.src, alt: 'individual.cl OG Image' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'individual.cl',
    description: 'Componentes Next.Js',
    images: [ogImage.src],
  },
}
 
const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) =>{
  return React.createElement('html', {lang: 'es', style: { WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", backgroundColor: 'white', fontFamily: '"Pangea Trial", sans-serif' }},
          React.createElement('body', {style: { WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", backgroundColor: 'white', background: 'linear-gradient(to bottom, #fffaf4, white)', hyphens: 'auto', fontFamily: '"Pangea Trial", sans-serif' }},
            React.createElement(Header, null),
            children,
            React.createElement(Footer, null))
  );
}

export default RootLayout;

