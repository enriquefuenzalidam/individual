"use client";
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Header from "@/components/header";
import Footer from "@/components/footer";
import UsePantallaTamagnos from '@/hooks/usepantallatamagnos';

const Home: React.FC = () => {

  const { screenReady, xlScreen, lgScreen, mdScreen, smScreen } = UsePantallaTamagnos();

  const nullStyle: React.CSSProperties = useMemo(() => ({
    boxSizing: 'border-box'
  }), []);

  const nullBlockStyle: React.CSSProperties = useMemo(() => ({
    ...nullStyle, display: 'block', position: 'relative'
  }), [nullStyle]);

  const pStyle: React.CSSProperties = useMemo(() => ({
    ...nullBlockStyle, hyphens: 'auto', textAlign: 'left', textIndent: lgScreen || xlScreen ? '1.5rem' : mdScreen ? '1.25rem' : '1rem', fontSize: xlScreen || lgScreen ? '1.5rem' : mdScreen ? '1.4rem' : smScreen ? '1.21rem' : '1.13rem', fontWeight: 400, color: 'rgba(51,65,85,0.6)', lineHeight: 1.625
  }), [nullBlockStyle, lgScreen, xlScreen, mdScreen, smScreen]);

  const pStyleB: React.CSSProperties = useMemo(() => ({
    ...pStyle, padding: '0', margin: xlScreen || lgScreen ? '1rem 0' : mdScreen ? '0.75rem 0' : smScreen ? '0.5rem 0' : '0.5rem 0'
  }), [pStyle, lgScreen, xlScreen, mdScreen, smScreen]);

  const pBold: React.CSSProperties = useMemo(() => ({
    ...pStyle, display: 'inline', boxSizing: 'border-box', position: 'relative', margin: '0', padding: '0', fontWeight: '500', color: 'rgba(51,65,85,1)'
  }), [pStyle]);

  const dinamicSize = useCallback((value: number) => {
    return xlScreen ? value * 1.4118 : lgScreen ? value * 1.2941 : mdScreen ? value * 1.1765 : smScreen ? value * 1.1176 : value;
  }, [xlScreen, lgScreen, mdScreen, smScreen]);

  const [pageLoaded, setPageLoaded] = useState(false);
  useEffect(() => {
    if (!screenReady) return;
    const timeout = setTimeout(() => setPageLoaded(true), 500);
    return () => clearTimeout(timeout); }, [screenReady]);

  return React.createElement('div', { style: { position: 'relative', margin: '0', padding: '0', boxSizing: 'border-box', display: 'block', height:'auto', width: '100%', backgroundColor: 'white', background: 'linear-gradient( 54deg, white 15%, #fffaf4 38%, white)' } },
    React.createElement('div', { style: { position: 'relative', margin: '0', padding: '0', boxSizing: 'border-box', display: 'block', maxWidth: '64rem', height:'auto', width: '100%', } },
      React.createElement(Header, null),
      React.createElement('main', null,

        React.createElement('section', { style: { display: 'block', padding: '0', margin: '0', boxSizing: 'border-box', position: 'relative', transition: 'opacity 400ms ease-in-out', opacity: pageLoaded ? 1 : 0, pointerEvents: pageLoaded ? 'auto' : 'none', fontFamily: '"Pangea Trial", sans-serif', letterSpacing: dinamicSize(-0.008) + 'rem' } },
            React.createElement('div', { style: { display: 'block', margin: '0', boxSizing: 'border-box', position: 'relative', transition: 'all 300ms ease-in-out', padding: lgScreen ? '5rem 3rem 3rem 3rem' : mdScreen ? '3.5rem 2.1rem 2rem 2.1rem' : smScreen ? '3rem 1.75rem 3rem 1.75rem' : '1.8rem 0.5rem 1rem 0.5rem' } },
              React.createElement('h3', { style: { display: 'block', padding: '0', boxSizing: 'border-box', margin: lgScreen ? '2.8rem 1.4rem 1.3rem 1.4rem' : mdScreen ? '2.8rem 1.4rem 0.8rem 1.4rem' : smScreen ? '3rem 1.5rem 0.8rem 1.5rem' : '3rem 1.5rem 0.8rem 1.5rem', textAlign: 'left', transition: 'all 300ms ease-in-out', fontWeight: '600', color: 'rgba(50,66,89,1)', fontSize: lgScreen ? '2.2rem' : mdScreen ? '2rem' : smScreen ? '1.7rem' : '1.5rem', lineHeight: lgScreen ? '1' : mdScreen ? '2.5rem' : smScreen ? '2.25rem' : '2rem' } },
                "LayeredTabs"),
              React.createElement('div', { style: { display: 'block', margin: '0', boxSizing: 'border-box', position: 'relative', transition: 'all 300ms ease-in-out', padding: '1.5rem', borderTopLeftRadius: '0.3rem', overflow: 'hidden' } },
                React.createElement('div', { style: { display: 'block', padding: '0', margin: '0', boxSizing: 'border-box', position: 'absolute', inset: '0', background: 'linear-gradient( to bottom, rgba(51,65,85,0.05) 0%, rgba(51,65,85,0.005) 2rem, rgba(51,65,85,0) 100%), linear-gradient( to bottom, rgba(0,0,0,0.1) 0%, rgba(51,65,85,0.01) 0.4rem, rgba(51,65,85,0) 100%)', maskImage: 'linear-gradient( to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 2%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' } }),
                React.createElement('div', { style: { display: 'block', padding: '0', margin: '0', boxSizing: 'border-box', position: 'absolute', inset: '0', background: 'linear-gradient( to right, rgba(51,65,85,0.05) 0%, rgba(51,65,85,0.005) 2rem, rgba(51,65,85,0) 100%), linear-gradient( to right, rgba(0,0,0,0.1) 0%, rgba(51,65,85,0.01) 0.4rem, rgba(51,65,85,0) 100%)', maskImage: 'linear-gradient( to bottom, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' } } ),
                React.createElement('p', { style: { ...pStyleB } },
                  'Presentar contenido en capas navegables a través de pestañas, es una forma tradicional de ordenamiento en páginas y sitios webs. ', React.createElement('span', { style: { ...pBold } }, 'LayeredTabs'), ' procura hacer muy simple la implementación de esta forma de organizar contenido web, proporciona formatos distintos y apariencia personalizable. Un repositorio demo ya se encuentra disponible y, pronto, un paquete npm instalable.'),
                React.createElement(Link, { href: '/layeredtabsarticulo', title: 'Ver artículo LayeredTabs', lang: 'es', style: { ...pStyleB } }, React.createElement('span', { style: {  ...pBold, cursor: 'pointer' } }, '— ', React.createElement('span',{ className: `hover:underline` }, 'Leer más') ) ),
                ) ) ),

        React.createElement('section', { style: { display: 'block', padding: '0', margin: '0', boxSizing: 'border-box', position: 'relative', transition: 'opacity 400ms ease-in-out', opacity: pageLoaded ? 1 : 0, pointerEvents: pageLoaded ? 'auto' : 'none', fontFamily: '"Pangea Trial", sans-serif', letterSpacing: dinamicSize(-0.008) + 'rem' } },
            React.createElement('div', { style: { display: 'block', margin: '0', boxSizing: 'border-box', position: 'relative', transition: 'all 300ms ease-in-out', padding: lgScreen ? '0 3rem 5rem 3rem' : mdScreen ? '0 2.1rem 3.5rem 2.1rem' : smScreen ? '0 1.75rem 3rem 1.75rem' : '0 0.5rem 1.8rem 0.5rem' }},
              React.createElement('h3', { style: { display: 'block', padding: '0', boxSizing: 'border-box', margin: lgScreen ? '0 1.4rem 1.3rem 1.4rem' : mdScreen ? '0 1.4rem 0.8rem 1.4rem' : smScreen ? '0 1.5rem 0.8rem 1.5rem' : '0 1.5rem 0.8rem 1.5rem', textAlign: 'left', transition: 'all 300ms ease-in-out', fontWeight: '600', color: 'rgba(50,66,89,1)', fontSize: lgScreen ? '2.2rem': mdScreen ? '2rem' : smScreen ? '1.7rem' : '1.5rem', lineHeight: lgScreen ? '1' : mdScreen ? '2.5rem' : smScreen ? '2.25rem' : '2rem' } },
                "Quick'n'Full"),
              React.createElement('div', { style: { display: 'block', margin: '0', boxSizing: 'border-box', position: 'relative', transition: 'all 300ms ease-in-out', padding: '1.5rem', borderTopLeftRadius: '0.3rem', overflow: 'hidden' }  },
                React.createElement('div', { style: { display: 'block', padding: '0', margin: '0', boxSizing: 'border-box', position: 'absolute', inset: '0', background: 'linear-gradient( to bottom, rgba(51,65,85,0.05) 0%, rgba(51,65,85,0.005) 2rem, rgba(51,65,85,0) 100%), linear-gradient( to bottom, rgba(0,0,0,0.1) 0%, rgba(51,65,85,0.01) 0.4rem, rgba(51,65,85,0) 100%)', maskImage: 'linear-gradient( to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 2%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' } }),
                React.createElement('div', { style: { display: 'block', padding: '0', margin: '0', boxSizing: 'border-box', position: 'absolute', inset: '0', background: 'linear-gradient( to right, rgba(51,65,85,0.05) 0%, rgba(51,65,85,0.005) 2rem, rgba(51,65,85,0) 100%), linear-gradient( to right, rgba(0,0,0,0.1) 0%, rgba(51,65,85,0.01) 0.4rem, rgba(51,65,85,0) 100%)', maskImage: 'linear-gradient( to bottom, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' } }),
                React.createElement('p', { style: { ...pStyleB } },
                  'Componente constituido por una ', React.createElement('span', { style: {  ...pBold } }, 'galería de previsualización') , ' para cinco imágenes, más una ', React.createElement('span', { style: { ...pBold } }, 'galería principal') , ' para navegar a través de toda la lista de imágenes y verlas en formato completo. Tiene opciones personalizables y se adapta a las dimensiones del elemento contenedor.' ),
                React.createElement(Link, { href: '/quicknfullarticulo', title: 'Ver artículo Quick\'n\'Full', lang: 'es', style: { ...pStyleB } }, React.createElement('span', { style: {  ...pBold, cursor: 'pointer' } }, '— ', React.createElement('span',{ className: `hover:underline` }, 'Leer más') ) ),
                ) ) ) ),
      React.createElement(Footer, null) ) )

}

export default Home;

