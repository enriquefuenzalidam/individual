import React, { useState, useEffect} from "react";
import usePantallaTamagnos from "@/hooks/usepantallatamagnos";
import Link from "next/link";
import PayPalLogo from "./paypal";

const Footer: React.FC = () => {
    const { screenReady, xlScreen, lgScreen, mdScreen, smScreen, tnScreen } = usePantallaTamagnos();

    const [pageLoaded, setPageLoaded] = useState(false);
    useEffect(() => {
        if (!screenReady) return;
        const timeout = setTimeout(() => setPageLoaded(true), 100);
        return () => clearTimeout(timeout); }, [screenReady]);

    if (!screenReady) return null;
    return React.createElement( 'footer', { style: { boxSizing: 'border-box', maxWidth: '64rem', position: 'relative', display: 'block', clear: 'both', paddingBottom: lgScreen ? '3rem': mdScreen ? '2.75rem' : smScreen ? '2.5rem' :  '2.25rem', fontWeight: '400', color: 'rgba(15, 23, 42, 0.5)', textAlign: 'left', paddingLeft: lgScreen ? '4rem' : mdScreen ? '3.1rem' : smScreen ? '2.75rem' : '1.5rem', paddingTop: lgScreen ? '2.25rem' : mdScreen ? '1.75rem' : smScreen ? '1.625rem' : '1.5rem', fontSize: lgScreen ? '1.15rem' : mdScreen ? '1.05rem' : smScreen ? '0.95rem' : '0.85rem', lineHeight: 'normal', transition: 'opacity 400ms ease-in-out', opacity: pageLoaded ? 1 : 0, pointerEvents: pageLoaded ? 'auto' : 'none' } },
        React.createElement( 'div', { style: { pointerEvents: 'none', boxSizing: 'border-box', position: 'absolute', inset: '0', display: 'block', backgroundImage: 'linear-gradient(to bottom, transparent, #f1f5f9)', maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)' }} ),
        React.createElement( 'div', { style: { pointerEvents: 'none', boxSizing: 'border-box', position: 'absolute', inset: '0', display: 'block', backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.005) 1rem, rgba(0,0,0,0) 100%), linear-gradient( to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.01) 0.3rem, rgba(0,0,0,0) 100%)', maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)'}} ),
        React.createElement( 'p', { style: { boxSizing: 'border-box', position: 'relative', display: 'block', lineHeight: '1.6', margin: '0', padding: '0' } },
            'individual.cl es diseño y desarrollo propio.', React.createElement('br', { style: { display: tnScreen ? 'inline' : 'none' } } ) ,' Corre en ', React.createElement('a', { style: { position: 'relative', fontWeight: '700' }, href: 'https://nextjs.org'}, 'Next.js'), ' y es hospedado por ', React.createElement('a', { style: { position: 'relative', fontWeight: '700' }, href: 'https://www.netlify.com'} , 'Netlify'), '.'),
        React.createElement( 'p', { style: { boxSizing: 'border-box', position: 'relative', display: 'block', lineHeight: '1.6', margin: '0' } },
            '© 2025 individual.cl. Distribuido bajo ',
            React.createElement( Link, { style: { position: 'relative', fontWeight: '700' }, href: '/license.txt'} , 'Licencia MIT'),
            '. ', React.createElement('br', { style: { display: tnScreen ? 'inline' : 'none' } } ) ,'Contribuciones ', React.createElement(Link, { href: "https://paypal.me/enriquefuenzalidacl", style: { display: 'inline-block', position: 'relative', boxSizing: 'border-box', height: 'auto', width: xlScreen || lgScreen ? '5rem' : mdScreen ? '4.5rem' : smScreen ? '4rem' : '3.5rem', verticalAlign: 'middle', marginLeft: '0.3rem' } }, React.createElement(PayPalLogo, null ) ) ) ) }
export default Footer;