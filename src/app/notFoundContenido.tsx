import React, { useEffect, useState } from 'react';
import UsePantallaTamagnos from '@/hooks/usepantallatamagnos';

const NotFoundContenido: React.FC = () => {

  const { screenReady, xlScreen, lgScreen, mdScreen, smScreen } = UsePantallaTamagnos();
  const [ pageLoaded, setPageLoaded] = useState(false);
  useEffect(() => {
    if (!screenReady) return;
    const timeout = setTimeout(() => setPageLoaded(true), 100);
    return () => clearTimeout(timeout); }, [screenReady]);

  if (!screenReady) return null;
    return React.createElement('section', { style: { display: 'block', boxSizing: 'border-box', position: 'relative', transition: 'opacity 400ms ease-in-out', opacity: pageLoaded ? 1 : 0, pointerEvents: pageLoaded ? 'auto' : 'none' } },
            React.createElement('div', { style: { display: 'block', boxSizing: 'border-box', position: 'relative', transition: 'all 300ms ease-in-out', padding: lgScreen ? '5rem 3rem' : mdScreen ? '3.5rem 2.1rem' : smScreen ? '3rem 1.75rem' : '1.8rem 0.5rem' }},
                React.createElement('h3', { style: { display: 'block', boxSizing: 'border-box', position: 'relative', margin: lgScreen ? '2.8rem 1.45rem 1.3rem 1.45rem' : mdScreen ? '2.8rem 1.45rem 0.8rem 1.45rem' : smScreen ? '3rem 1.45rem 0.8rem 1.45rem' : '3rem 1.45rem 0.8rem 1.45rem', textAlign: 'left', transition: 'all 300ms ease-in-out', fontWeight: '600', color: 'rgba(50,66,89,0.8)', fontSize: lgScreen ? '2.2rem': mdScreen ? '2rem' : smScreen ? '1.7rem' : '1.5rem', lineHeight: lgScreen ? '1' : mdScreen ? '2.5rem' : smScreen ? '2.25rem' : '2rem' } },
                  "404"),
                React.createElement('div', { style: { display: 'block', boxSizing: 'border-box', transition: 'all 300ms ease-in-out', position: 'relative', padding: '1.5rem', borderTopLeftRadius: '0.3rem', overflow: 'hidden' }  },
                    React.createElement('div', { style: { display: 'block', boxSizing: 'border-box', position: 'absolute', inset: '0', background: 'linear-gradient( to bottom, rgba(51,65,85,0.05) 0%, rgba(51,65,85,0.005) 2rem, rgba(51,65,85,0) 100%), linear-gradient( to bottom, rgba(0,0,0,0.1) 0%, rgba(51,65,85,0.01) 0.4rem, rgba(51,65,85,0) 100%)', maskImage: 'linear-gradient( to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 2%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' } } ),
                    React.createElement('div', { style: { display: 'block', boxSizing: 'border-box', position: 'absolute', inset: '0', background: 'linear-gradient( to right, rgba(51,65,85,0.05) 0%, rgba(51,65,85,0.005) 2rem, rgba(51,65,85,0) 100%), linear-gradient( to right, rgba(0,0,0,0.1) 0%, rgba(51,65,85,0.01) 0.4rem, rgba(51,65,85,0) 100%)', maskImage: 'linear-gradient( to bottom, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' } } ),
                    React.createElement('p', { style: { margin: xlScreen || lgScreen ? '1rem 0' : mdScreen ? '0.75rem 0' : smScreen ? '0.5rem 0' : '0.5rem 0', textIndent: lgScreen || xlScreen ? '1.5rem' : mdScreen ? '1.25rem' : '1rem', fontSize: lgScreen || xlScreen ? '1.5rem' : mdScreen || smScreen ? '1.24rem' : '1.125rem', fontWeight: 300, textAlign: 'left', lineHeight: 1.625, color: 'rgba(51,65,85,0.7)' } },
                        'La página buscada no existe.') ) ) )

};

export default NotFoundContenido;
