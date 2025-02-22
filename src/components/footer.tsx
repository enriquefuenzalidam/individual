"use client";
import React from "react";
import usePantallaTamagnos from "@/hooks/usepantallatamagnos";

const Footer: React.FC = () => {
    const { lgScreen, mdScreen, smScreen } = usePantallaTamagnos();
    return React.createElement('footer', { style: { maxWidth: '64rem', position: 'relative', display: 'block', paddingBottom: lgScreen ? '3rem': mdScreen ? '2.75rem' : smScreen ? '2.5rem' :  '2.25rem', fontWeight: '400', color: 'rgba(15, 23, 42, 0.5)', textAlign: 'left', paddingLeft: lgScreen ? '6rem' : mdScreen ? '4.5rem' : smScreen ? '3rem' : '1.5rem', paddingRight: lgScreen ? '6rem' : mdScreen ? '4.5rem' : smScreen ? '3rem' : '1.5rem', paddingTop: lgScreen ? '2.25rem' : mdScreen ? '1.75rem' : smScreen ? '1.25rem' : '1rem', fontSize: lgScreen ? '1.25rem' : mdScreen ? '1.125rem' : smScreen ? '1rem' : '0.875rem', lineHeight: 'normal', marginTop: lgScreen ? '1rem' : mdScreen ? '0.75rem' : '0.5rem' } },
        React.createElement('div', { style: { pointerEvents: 'none', position: 'absolute', inset: '0', display: 'block', backgroundImage: 'linear-gradient(to bottom, transparent, #f1f5f9)', maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)' }} ),
        React.createElement('div', { style: { pointerEvents: 'none', position: 'absolute', inset: '0', display: 'block', backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.005) 1rem, rgba(0,0,0,0) 100%), linear-gradient( to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.01) 0.3rem, rgba(0,0,0,0) 100%)', maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)'}} ),
        React.createElement('p', { style: { position: 'relative' } }, '© 2025 individual.cl. Distribuido bajo ', React.createElement('a', { style: { position: 'relative', fontWeight: '700' }, href: '/license.txt'} , 'Licencia MIT'), '.') ) }
export default Footer;