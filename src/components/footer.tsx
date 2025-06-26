import React, { useState, useEffect} from "react";
import useIndividualStyling from "@/hooks/useindividualstyling";
import Link from "next/link";
import PayPalLogo from "./paypal";

const Footer: React.FC = () => {

    const { screenReady, dynSzGttr } = useIndividualStyling();

    const [pageLoaded, setPageLoaded] = useState(false);
    useEffect(() => {
        if (!screenReady) return;
        const timeout = setTimeout(() => setPageLoaded(true), 500);
        return () => clearTimeout(timeout); }, [screenReady]);

    if (!screenReady) return null;

    return React.createElement( 'footer', { style: { boxSizing: 'border-box', maxWidth: '64rem', position: 'relative', display: 'block', clear: 'both', fontWeight: '400', color: 'rgba(15, 23, 42, 0.5)', textAlign: 'left', paddingBottom: dynSzGttr('3','3','2.75','2.5','2.25','2.25') + 'rem', paddingLeft: dynSzGttr('4','4','3.1','2.75','1.5','1.5') + 'rem', paddingTop: dynSzGttr('2.25','2.25','1.75','1.625','1.5','1.5') + 'rem', fontSize: dynSzGttr('1.15','1.15','1.05','0.95','0.85','0.85') + 'rem', lineHeight: 'normal', transition: 'opacity 500ms ease-in-out', opacity: pageLoaded ? 1 : 0, pointerEvents: pageLoaded ? 'auto' : 'none' } },
        React.createElement( 'div', { style: { pointerEvents: 'none', boxSizing: 'border-box', position: 'absolute', inset: '0', display: 'block', backgroundImage: 'linear-gradient(to bottom, transparent, #f1f5f9)', maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)' }} ),
        React.createElement( 'div', { style: { pointerEvents: 'none', boxSizing: 'border-box', position: 'absolute', inset: '0', display: 'block', backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.005) 1rem, rgba(0,0,0,0) 100%), linear-gradient( to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.01) 0.3rem, rgba(0,0,0,0) 100%)', maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)'}} ),
        React.createElement( 'p', { style: { boxSizing: 'border-box', position: 'relative', display: 'block', lineHeight: '1.6', margin: '0' } },
            '© 2025 individual.cl. Distribuido bajo ',
            React.createElement( Link, { style: { position: 'relative', fontWeight: '600', color: 'rgba(51,65,85,1)' }, href: '/license.txt'} , 'Licencia MIT'),
            '. ', React.createElement('br', { style: { display: dynSzGttr('none','none','none','none','inline','inline') } } ) ,'Contribuciones ', React.createElement(Link, { href: "https://paypal.me/enriquefuenzalidacl", style: { display: 'inline-block', position: 'relative', boxSizing: 'border-box', height: 'auto', width: dynSzGttr('5','5','4.5','4','3.5','3.5') + 'rem', verticalAlign: 'middle', marginLeft: '0.3rem' } }, React.createElement(PayPalLogo, null ) ) ),
        React.createElement( 'p', { style: { boxSizing: 'border-box', position: 'relative', display: 'block', lineHeight: '1.6', margin: '0', padding: '0' } },
            'individual.cl es diseño y desarrollo propio.', React.createElement('br', { style: { display: dynSzGttr('none','none','none','none','inline','inline') } } ) ,' Corre en ', React.createElement('a', { style: { position: 'relative', fontWeight: '600', color: 'rgba(51,65,85,1)' }, href: 'https://nextjs.org'}, 'Next.js'), ' y es hospedado por ', React.createElement('a', { style: { position: 'relative', fontWeight: '600', color: 'rgba(51,65,85,1)' }, href: 'https://www.netlify.com'} , 'Netlify'), '.') ) }

export default Footer;
