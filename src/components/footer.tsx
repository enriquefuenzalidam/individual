import React, { JSX } from "react";

const Footer: React.FC = ({ }): JSX.Element => {
    return React.createElement ('footer', { className: 'max-w-[64rem] relative block pb-6 md:pb-9 lg:pb-12 pt-3 md:pt-6 lg:pt-9 px-6 sm:px-12 md:px-18 lg:px-24 font-normal text-slate-900/60 text-left text-sm sm:text-base md:text-lg lg:text-xl leading-normal sm:leading-normal md:leading-normal lg:leading-normal mt-2 md:mt-3 lg:mt-4'  },
        React.createElement('div', { style: { pointerEvents: 'none', position: 'absolute', inset: '0', display: 'block', backgroundImage: 'linear-gradient(to bottom, transparent, #f1f5f9)', maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)' }} ),
        React.createElement('div', { style: { pointerEvents: 'none', position: 'absolute', inset: '0', display: 'block', backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.005) 1rem, rgba(0,0,0,0) 100%), linear-gradient( to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.01) 0.3rem, rgba(0,0,0,0) 100%)', maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)'}} ),
        React.createElement('p', { style: { position: 'relative' } }, '© 2025 individual.cl. Distribuido bajo ', React.createElement('a', { style: { position: 'relative', fontWeight: 'bold' }, href: '/license.txt'} , 'Licencia MIT'), '.')) }

export default Footer;