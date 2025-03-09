import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import ogImage from '@/assets/icons/individualcl_ogimage.jpg';
import individualIcon230 from '@/assets/icons/individualcl_icon_230x230.jpg';
import individualIcon85 from '@/assets/icons/individualcl_icon_85x85.jpg';
import individualIcon32 from '@/assets/icons/individualcl_icon_32x32.jpg';
import individualIcon34 from '@/assets/icons/individualcl_icon_34x34.jpg';
import individualIcon16 from '@/assets/icons/individualcl_icon_16x16.jpg';

export const metadata: Metadata = {
  title: {
    template: "%s | individual.cl",
    default: "individual.cl"
  },
  description: 'Componentes Next.Js',
  keywords: 'ProntoVista, Next.JS, Next.js Components, Next.js UI Components, Next.js Image Gallery, Next.js Image Slider, React Next.js, Next.js Open Source, Next.js Carousel, Next.js Slider, Next.js UI Library, React Components, UI Components, Web Components, Open Source UI, Image Carousel, Galería de Imágenes, Deslizador de Imágenes, Carrusel de Imágenes, JavaScript UI, Vercel Components, Componentes de React, Next.js Frontend, Frontend Development, Reusable UI Components, Next.js Free Component',
  authors: [
    { name: "Enrique Fuenzalida", url: "https://individual.cl/" } 
    ],
  icons: {
    icon: [
      { rel: 'icon', type: 'image/jpg', sizes: '16x16', url: individualIcon16.src },
      { rel: 'icon', type: 'image/jpg', sizes: '32x32', url: individualIcon32.src },
      { rel: 'icon', type: 'image/jpg', sizes: '34x34', url: individualIcon34.src },
      { rel: 'icon', type: 'image/jpg', sizes: '85x85', url: individualIcon85.src },
      { rel: 'icon', type: 'image/jpg', sizes: '230x230', url: individualIcon230.src },
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
  verification: {
    google: "mdmaekCp2DOJ9GrrIRMmuDSQjprFrE7UNAdw0gRsVok"
  }
}
 
const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) =>{
  return React.createElement('html', {lang: 'es', style: { WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", backgroundColor: 'white', fontFamily: '"Pangea Trial", sans-serif', scrollBehavior: 'smooth' }},
          React.createElement('body', {style: { WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", backgroundColor: 'white', background: 'linear-gradient( 54deg, white 15%, #fffaf4 38%, white)', hyphens: 'auto', fontFamily: '"Pangea Trial", sans-serif', scrollBehavior: 'smooth'  }},
            children )
  );
}

export default RootLayout;

