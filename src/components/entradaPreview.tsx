import React from "react";
import useIndividualStyling from "@/hooks/useindividualstyling";
import EntradaSeccion from "./entradaSection";
import Link from "next/link";

interface EntradaProps {
  title: string;
  href: string;
  description: (React.ReactNode | string)[]; }

const EntradaPreview = ({ title, href, description }: EntradaProps ) => {
  const { pStyleB } = useIndividualStyling();

  return React.createElement(EntradaSeccion, {
    articuloTitulo: title,
    href,
    articuloTexto: [
      React.createElement('p', { style: { ...pStyleB } },
        ...description),
      React.createElement('p', { style: { ...pStyleB, fontWeight: '500', color: 'rgba(51,65,85,1)' } }, '— ', 
        React.createElement(Link, { href: href, title: 'Ver artículo' + title, lang: 'es', style: {  cursor: 'pointer' } }, React.createElement('span',{ className: `hover:underline` }, 'Leer más') ) ),
    ] } ) };

export default EntradaPreview;

/*
    return React.createElement('section', { key: title, style: { display: 'block', padding: '0', margin: '0', boxSizing: 'border-box', position: 'relative', transition: 'opacity 400ms ease-in-out', fontFamily: '"Pangea Trial", sans-serif', letterSpacing: '-0.008rem' } },
            React.createElement('div', { style: { display: 'block', margin: '0', boxSizing: 'border-box', position: 'relative', transition: 'all 300ms ease-in-out', padding: '0 ' + dynSzGttr( '3', '2.5', '2.0', '1.5', '1.0', '0.5') + 'rem 0 ' + dynSzGttr('3', '2.5', '2.0', '1.5', '1.0', '0.5') + 'rem' } },
              React.createElement('h3', { style: { display: 'block', padding: '0', boxSizing: 'border-box', margin: '2.9rem 1.45rem ' + dynSzGttr( '1.3', '1.2', '1.1', '1', '0.9', '0.8') + 'rem 1.45rem', textAlign: 'left', transition: 'all 300ms ease-in-out', fontWeight: '600', color: 'rgba(50,66,89,1)', fontSize: dynSzGttr( '2.2', '2.2', '2', '1.7', '1.5', '1.5') + 'rem', lineHeight: 1 } },
                title),
              React.createElement('div', { style: { display: 'block', margin: '0', boxSizing: 'border-box', position: 'relative', transition: 'all 300ms ease-in-out', padding: '1.5rem', borderTopLeftRadius: '0.3rem', overflow: 'hidden' } },
                React.createElement('div', { style: { display: 'block', padding: '0', margin: '0', boxSizing: 'border-box', position: 'absolute', inset: '0', background: 'linear-gradient( to bottom, rgba(51,65,85,0.05) 0%, rgba(51,65,85,0.005) 2rem, rgba(51,65,85,0) 100%), linear-gradient( to bottom, rgba(0,0,0,0.1) 0%, rgba(51,65,85,0.01) 0.4rem, rgba(51,65,85,0) 100%)', maskImage: 'linear-gradient( to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 2%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' } }),
                React.createElement('div', { style: { display: 'block', padding: '0', margin: '0', boxSizing: 'border-box', position: 'absolute', inset: '0', background: 'linear-gradient( to right, rgba(51,65,85,0.05) 0%, rgba(51,65,85,0.005) 2rem, rgba(51,65,85,0) 100%), linear-gradient( to right, rgba(0,0,0,0.1) 0%, rgba(51,65,85,0.01) 0.4rem, rgba(51,65,85,0) 100%)', maskImage: 'linear-gradient( to bottom, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' } } ),

                React.createElement('p', { style: { ...pStyleB } },
                  ...description),
                React.createElement('p', { style: { ...pStyleB, fontWeight: '500', color: 'rgba(51,65,85,1)' } }, '— ', 
                  React.createElement(Link, { href: href, title: `Ver artículo ${title}`, lang: 'es', style: {  cursor: 'pointer' } }, React.createElement('span',{ className: `hover:underline` }, 'Leer más') ) ),

                ) ) ) */