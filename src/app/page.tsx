"use client";
import React from 'react';
import ProntoVistaPrevGal from '@/components/prontoVistaPrevGal';
import ProntoVistaImgsList from '@/components/prontoVistaImgsList';
import usePantallaTamagnos from '@/hooks/usepantallatamagnos';

const Home: React.FC = () => {
  const { screenReady, lgScreen, mdScreen, smScreen } = usePantallaTamagnos();
  if (!screenReady) return null;
  return React.createElement('main', { style: { position: 'relative', width: '100%', maxWidth: '64rem' } },  
    React.createElement('section', { style: { position: 'relative', padding: lgScreen ? '3rem' : mdScreen ? '2.1rem' : smScreen ? '1.75rem' : '0.5rem', transition: 'all 300ms ease-in-out'} },
      React.createElement('h3', { style: { marginLeft: lgScreen ? '1.5rem' : mdScreen ? '1.25rem' : '1rem', marginBottom: lgScreen ? '1.5rem' : mdScreen ? '1rem' : smScreen ? '0.5rem' : '0.25rem', textAlign: 'left', fontWeight: '400', color: 'rgb(100,116,139)', transition: 'all 300ms ease-in-out', marginTop: '2rem', fontSize: lgScreen ? '2.2rem': mdScreen ? '2rem' : smScreen ? '1.7rem' : '1.5rem', lineHeight: lgScreen ? '1' : mdScreen ? '2.5rem' : smScreen ? '2.25rem' : '2rem' } },
        "ProntoVista"),               
      React.createElement('p', { style: { fontWeight: '300', color: 'rgba(51,65,85,0.6)', textAlign: 'left', fontSize: lgScreen ? '1.5rem' : mdScreen ? '1.5rem' : smScreen ? '1.25rem' : '1.125rem', lineHeight: '1.5', textIndent: lgScreen ? '1.5rem' : mdScreen ? '1.25rem' : smScreen ? '1rem' : '1rem', margin: lgScreen ? '1rem' : mdScreen ? '0.75rem' : smScreen ? '0.5rem' : '0.5rem' } },
        'Componente conformado por una galería de previsualización para cinco imágenes, más una galería principal para navegar a través de la lista de imágenes y verlas en formato completo. Su propósito es ser un recurso fácil de implementar, con algunos ajustes personalizables y estar contenida en un bloque cuyas dimensiones se adapten a la situación.'),
      React.createElement('p', { style: { fontWeight: '300', color: 'rgba(51,65,85,0.6)', textAlign: 'left', fontSize: lgScreen ? '1.5rem' : mdScreen ? '1.5rem' : smScreen ? '1.25rem' : '1.125rem', lineHeight: '1.5', textIndent: lgScreen ? '1.5rem' : mdScreen ? '1.25rem' : smScreen ? '1rem' : '1rem', margin: lgScreen ? '1rem' : mdScreen ? '0.75rem' : smScreen ? '0.5rem' : '0.5rem' } },
        'En desarrollo. 40% de avance.'),
      React.createElement('div', { style: { position: 'relative', display: 'block', padding: '1.5rem', borderTopLeftRadius: '0.5rem', marginTop: lgScreen ? '1.75rem' : mdScreen ? '1.5rem' : smScreen ? '1.25rem' : '1.25rem', overflow: 'hidden' }  },
        React.createElement('div', { style: { position: 'absolute', inset: '0', background: 'linear-gradient( to bottom, rgba(51,65,85,0.05) 0%, rgba(51,65,85,0.005) 2rem, rgba(51,65,85,0) 100%), linear-gradient( to bottom, rgba(0,0,0,0.1) 0%, rgba(51,65,85,0.01) 0.4rem, rgba(51,65,85,0) 100%)', maskImage: 'linear-gradient( to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 2%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 100%)'} }),
        React.createElement('div', { style: { position: 'absolute', inset: '0', background: 'linear-gradient( to right, rgba(51,65,85,0.05) 0%, rgba(51,65,85,0.005) 2rem, rgba(51,65,85,0) 100%), linear-gradient( to right, rgba(0,0,0,0.1) 0%, rgba(51,65,85,0.01) 0.4rem, rgba(51,65,85,0) 100%)', maskImage: 'linear-gradient( to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)' } }),
        React.createElement(ProntoVistaPrevGal, {
          imagenesLista: ProntoVistaImgsList,
          seleccionColor: 'rgb(51,65,85)',
          iteracionTiempo: 6000
        })
      )
    )
  )
}
export default Home;


/*


, 

      React.createElement('div', { className: 'relative  block p-6 rounded-tl-lg overflow-hidden mt-5 md:mt-6 lg:mt-7' },
        React.createElement('div', { className: 'absolute fade-mask-toright  inset-0 bg-[linear-gradient(to_bottom,rgba(51,65,85,0.05)_0%,rgba(51,65,85,0.005)_2rem,rgba(51,65,85,0)_100%),_linear-gradient(to_bottom,rgba(0,0,0,0.1)_0%,rgba(51,65,85,0.01)_0.4rem,rgba(51,65,85,0)_100%)]' }),
        React.createElement('div', { className: 'absolute fade-mask-tobottom inset-0 bg-[linear-gradient(_to_right,rgba(51,65,85,0.05)_0%,rgba(51,65,85,0.005)_2rem,rgba(51,65,85,0)_100%),_linear-gradient(_to_right,rgba(0,0,0,0.1)_0%,rgba(51,65,85,0.01)_0.4rem,rgba(51,65,85,0)_100%)]' }),
      
      React.createElement('div', { style: { postion: 'relative', display: 'block', padding: '1.5rem', borderTopLeftRadius: '0.5rem', marginTop: lgScreen ? '1.75rem' : mdScreen ? '1.5rem' : smScreen ? '1.25rem' : '1.25rem', overflow: 'hidden' }  },
        React.createElement('div', { style: { position: 'absolute', inset: '0', background: 'linear-gradient( to bottom, rgba(51,65,85,0.05) 0%, rgba(51,65,85,0.005) 2rem, rgba(51,65,85,0) 100%), linear-gradient( to bottom, rgba(0,0,0,0.1) 0%, rgba(51,65,85,0.01) 0.4rem, rgba(51,65,85,0) 100%)', maskImage: 'linear-gradient( to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 2%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 100%)'} }),
        React.createElement('div', { style: { position: 'absolute', inset: '0', background: 'linear-gradient( to right, rgba(51,65,85,0.05) 0%, rgba(51,65,85,0.005) 2rem, rgba(51,65,85,0) 100%), linear-gradient( to right, rgba(0,0,0,0.1) 0%, rgba(51,65,85,0.01) 0.4rem, rgba(51,65,85,0) 100%)', maskImage: 'linear-gradient( to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)' } }),

        React.createElement('div', { className: 'absolute fade-mask-tobottom inset-0 bg-[]' }),
*/