"use client";
import React from 'react';
import ProntoVistaPrevGal from '@/components/prontoVistaPrevGal';
import ProntoVistaImgsList from '@/components/prontoVistaImgsList';
import usePantallaTamagnos from '@/hooks/usepantallatamagnos';

const Home: React.FC = () => {
  const { screenReady, lgScreen, mdScreen, smScreen } = usePantallaTamagnos();
  if (!screenReady) return null;
  return React.createElement('main', { style: { position: 'relative', width: '100%', maxWidth: '64rem', transition: 'all 300ms ease-in-out' } },
    React.createElement('section', { style: { position: 'relative', transition: 'all 300ms ease-in-out' } },
      React.createElement('div', { style: { transition: 'all 300ms ease-in-out', padding: lgScreen ? '6rem 3rem 9rem 3rem' : mdScreen ? '4.2rem 2.1rem 6.3rem 2.1rem' : smScreen ? '3.5rem 1.75rem 5.25rem 1.75rem' : '2rem 0.5rem 1.5rem 0.5rem' }},
        React.createElement('h3', { style: { margin: lgScreen ? '0 1.5rem' : mdScreen ? '0 1.25rem' : '0 1rem' /*, marginBottom: lgScreen ? '1.5rem' : mdScreen ? '1rem' : smScreen ? '0.5rem' : '0.25rem'*/, textAlign: 'left', transition: 'all 300ms ease-in-out', fontWeight: '400', color: 'rgb(100,116,139)', fontSize: lgScreen ? '2.2rem': mdScreen ? '2rem' : smScreen ? '1.7rem' : '1.5rem', lineHeight: lgScreen ? '1' : mdScreen ? '2.5rem' : smScreen ? '2.25rem' : '2rem' } },
          "ProntoVista"),
        React.createElement('div', { style: { transition: 'all 300ms ease-in-out', position: 'relative', display: 'block', padding: '1.5rem', borderTopLeftRadius: '0.3rem', margin: lgScreen ? '1.3rem 0' : mdScreen ? '1.6rem 0' : smScreen ? '1.1rem 0' : '0.6rem 0', overflow: 'hidden' }  },
          React.createElement('div', { style: { position: 'absolute', inset: '0', background: 'linear-gradient( to bottom, rgba(51,65,85,0.05) 0%, rgba(51,65,85,0.005) 2rem, rgba(51,65,85,0) 100%), linear-gradient( to bottom, rgba(0,0,0,0.1) 0%, rgba(51,65,85,0.01) 0.4rem, rgba(51,65,85,0) 100%)', maskImage: 'linear-gradient( to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 2%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 100%)'} }),
          React.createElement('div', { style: { position: 'absolute', inset: '0', background: 'linear-gradient( to right, rgba(51,65,85,0.05) 0%, rgba(51,65,85,0.005) 2rem, rgba(51,65,85,0) 100%), linear-gradient( to right, rgba(0,0,0,0.1) 0%, rgba(51,65,85,0.01) 0.4rem, rgba(51,65,85,0) 100%)', maskImage: 'linear-gradient( to bottom, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)' } }),
          React.createElement(ProntoVistaPrevGal, {
            imagenesLista: ProntoVistaImgsList,
            discosColor: 'rgb(51,65,85)',
            iteracionTiempo: 2100,
            maxAltura: 32 } ) ) ) ) )
}

export default Home;

