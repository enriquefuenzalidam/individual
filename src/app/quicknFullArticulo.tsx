import React, { useEffect, useState, useRef, useMemo } from 'react';
import ExampleImagesList from '@/components/quicknfull/exampleImagesList';
import UsePantallaTamagnos from '@/hooks/usepantallatamagnos';
import QuicknfullPrev from '@/components/quicknfull/quicknfullPrev';
import QuicknfullMain from '@/components/quicknfull/quicknfullMain';

const QuicknFullArticulo: React.FC = () => {

  const { screenReady, xlScreen, lgScreen, mdScreen, smScreen } = UsePantallaTamagnos();
  const isValidColor = (color: string) => typeof window !== "undefined" && CSS.supports("color", color);
  const [cajaAltura, setCajaAltura] = useState(32);
  const [tiempoIntervalo, setTiempoIntervalo] = useState(3400);
  const [seleccionColor, setSeleccionColor] = useState(() => isValidColor("rgb(51,65,85)") ? "rgb(51,65,85)" : "#000");
  const [discosNavegador, setDiscosNavegador] = useState<boolean>(true);
  const verOcultarDiscosNavRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isValidColor(seleccionColor)) setSeleccionColor(seleccionColor)
  }, [seleccionColor]);

  const [pageLoaded, setPageLoaded] = useState(false);
  useEffect(() => {
    if (!screenReady) return;
    const timeout = setTimeout(() => setPageLoaded(true), 500);
    return () => clearTimeout(timeout); }, [screenReady]);

  const pStyle = useMemo(() => ({
      display: 'block', boxSizing: 'border-box', position: 'relative', padding: '0', textIndent: lgScreen || xlScreen ? '1.5rem' : mdScreen ? '1.25rem' : '1rem', fontSize: lgScreen || xlScreen ? '1.5rem' : mdScreen || smScreen ? '1.24rem' : '1.125rem', fontWeight: 300, textAlign: 'left', color: 'rgba(51,65,85,0.7)', lineHeight: 1.625
  }), [lgScreen, xlScreen, mdScreen, smScreen]);
  
  const h4Style = useMemo(() =>({
      hyphens: 'none', textAlign: 'left', color: 'rgba(51,65,85,0.8)', fontWeight: '600', lineHeight: '1.5', fontSize: xlScreen || lgScreen ? '1.5rem' : '1.25rem'
  }),[lgScreen, xlScreen ]);
  
  if (!screenReady) return null;

  return React.createElement('section', { style: { display: 'block', boxSizing: 'border-box', position: 'relative', transition: 'opacity 400ms ease-in-out', opacity: pageLoaded ? 1 : 0, pointerEvents: pageLoaded ? 'auto' : 'none', fontFamily: '"Pangea Trial", sans-serif' } },
      React.createElement('div', { style: { display: 'block', boxSizing: 'border-box', position: 'relative', transition: 'all 300ms ease-in-out', padding: lgScreen ? '5rem 3rem' : mdScreen ? '3.5rem 2.1rem' : smScreen ? '3rem 1.75rem' : '1.8rem 0.5rem' }},
        React.createElement('h3', { style: { display: 'block', boxSizing: 'border-box', margin: lgScreen ? '2.8rem 1.4rem 1.3rem 1.4rem' : mdScreen ? '2.8rem 1.4rem 0.8rem 1.4rem' : smScreen ? '3rem 1.5rem 0.8rem 1.5rem' : '3rem 1.5rem 0.8rem 1.5rem', textAlign: 'left', transition: 'all 300ms ease-in-out', fontWeight: '600', color: 'rgba(50,66,89,0.8)', fontSize: lgScreen ? '2.2rem': mdScreen ? '2rem' : smScreen ? '1.7rem' : '1.5rem', lineHeight: lgScreen ? '1' : mdScreen ? '2.5rem' : smScreen ? '2.25rem' : '2rem' } },
          "Quick'n'Full"),
        React.createElement('div', { style: { display: 'block', boxSizing: 'border-box', position: 'relative', transition: 'all 300ms ease-in-out', padding: '1.5rem', borderTopLeftRadius: '0.3rem', overflow: 'hidden' }  },
          React.createElement('div', { style: { display: 'block', boxSizing: 'border-box', position: 'absolute', inset: '0', background: 'linear-gradient( to bottom, rgba(51,65,85,0.05) 0%, rgba(51,65,85,0.005) 2rem, rgba(51,65,85,0) 100%), linear-gradient( to bottom, rgba(0,0,0,0.1) 0%, rgba(51,65,85,0.01) 0.4rem, rgba(51,65,85,0) 100%)', maskImage: 'linear-gradient( to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 2%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' } }),
          React.createElement('div', { style: { display: 'block', boxSizing: 'border-box', position: 'absolute', inset: '0', background: 'linear-gradient( to right, rgba(51,65,85,0.05) 0%, rgba(51,65,85,0.005) 2rem, rgba(51,65,85,0) 100%), linear-gradient( to right, rgba(0,0,0,0.1) 0%, rgba(51,65,85,0.01) 0.4rem, rgba(51,65,85,0) 100%)', maskImage: 'linear-gradient( to bottom, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' } }),

          React.createElement('p', { style: { ...pStyle, margin: xlScreen || lgScreen ? '1rem 0' : mdScreen ? '0.75rem 0' : smScreen ? '0.5rem 0' : '0.5rem 0' } },
            'Componente aun en desarrollo, conformado por una ', React.createElement('span', { style: { display: 'inline', boxSizing: 'border-box', position: 'relative', margin: '0', padding: '0', fontWeight: '500' } }, 'galería de previsualización') , ' para cinco imágenes, más una ', React.createElement('span', { style: { display: 'inline', boxSizing: 'border-box', position: 'relative', margin: '0', padding: '0', fontWeight: '500' } }, 'galería principal') , ' para navegar a través de toda la lista de imágenes y verlas en formato completo. Tiene opciones personalizables y se adapta a las dimensiones del elemento contenedor.' ),
          React.createElement('h4', { style: { ...h4Style, margin: xlScreen || lgScreen ? '3.5rem 0 0.5rem 0' : mdScreen ? '2.5rem 0 0.5rem 0' : '1.5rem 0 0.5rem 0' } },
            `Galería de previsualización` ),
          React.createElement('p', { style: { ...pStyle, margin: xlScreen || lgScreen ? '1rem 0 4rem 0' : mdScreen ? '0.75rem 0 3rem 0' : smScreen ? '0.5rem 0 2rem 0' : '0.5rem 0 2rem 0' } },
            'La galería de previsualización incluye en su parte inferior una fila de navegación la cual indica la imagen principal en exhibición y el tiempo de iteración.'),

          React.createElement('div', { ref: verOcultarDiscosNavRef, style: { display: 'block', boxSizing: 'border-box', position: 'relative', width: `100%`, transition: discosNavegador ? `height 500ms ease-in-out, opacity 1600ms ease-in-out` : `height 500ms ease-in-out, opacity 300ms ease-in-out`} },
            React.createElement('div', { style: { display: 'block', position: 'relative', boxSizing: 'border-box', width: `100%` } },
              React.createElement(QuicknfullPrev, {
                imagesList: ExampleImagesList,
                discosColor: seleccionColor,
                iteracionTiempo: tiempoIntervalo,
                maxAltura: cajaAltura,
                navegador: discosNavegador,
                listKey: 'default' } ) ) ),

          React.createElement('h4', { style: { ...h4Style, margin: xlScreen || lgScreen ? '4rem 0 0 0' : mdScreen ? '3rem 0 0 0' : '2rem 0 0 0' } },
            `Opciones personalizables` ),
          React.createElement('p', { style: { ...pStyle, margin: xlScreen || lgScreen ? '1rem 0' : mdScreen ? '0.75rem 0' : smScreen ? '0.5rem 0' : '0.5rem 0' } },
            'En esta interfaz se pueden conocer las opciones personalizables que dispone el componente.'),
          React.createElement('h5', { className: ` hyphens-none lg:mt-8 md:mt-6 sm:mt-5 mt-5 text-left text-slate-700/80 font-regular leading-normal lg:text-xl md:text-lg sm:text-lg text-lg  `},
            `Apariencia de los selectores de navegación` ),
          React.createElement('p', { className: ` lg:mt-2 mt-1 text-left text-lg leading-normal ` },
            React.createElement('span', { style: { display: 'inline', boxSizing: 'border-box', position: 'relative', margin: '0', padding: '0' } }, 
              React.createElement('span', { onClick: () => setSeleccionColor("rgb(180,83,9)"),   className: ` inline-block h-6 w-24 bg-amber-700   rounded-md text-center align-top text-white pb-7 mr-2 mt-2 border-solid border-2 border-white ${seleccionColor === "rgb(180,83,9)"   ? ' font-medium text-opacity-100 cursor-default border-opacity-0 ' : 'font-regular border-opacity-40 text-opacity-60 cursor-pointer '} ` },
                `Amber` ),
              React.createElement('span', { onClick: () => setSeleccionColor("rgb(51,65,85)"),   className: ` inline-block h-6 w-24 bg-slate-700   rounded-md text-center align-top text-white pb-7 mr-2 mt-2 border-solid border-2 border-white ${seleccionColor === "rgb(51,65,85)"   ? ' font-medium text-opacity-100 cursor-default border-opacity-0 ' : 'font-regular border-opacity-40 text-opacity-60 cursor-pointer '}  ` },
                `Slate` ),
              React.createElement('span', { onClick: () => setSeleccionColor("rgb(3,105,161)"),  className: ` inline-block h-6 w-24 bg-sky-700     rounded-md text-center align-top text-white pb-7 mr-2 mt-2 border-solid border-2 border-white ${seleccionColor === "rgb(3,105,161)"  ? ' font-medium text-opacity-100 cursor-default border-opacity-0 ' : 'font-regular border-opacity-40 text-opacity-60 cursor-pointer '}  ` },
                `Sky` ),
              React.createElement('span', { onClick: () => setSeleccionColor("rgb(67,56,202)"),  className: ` inline-block h-6 w-24 bg-indigo-700  rounded-md text-center align-top text-white pb-7 mr-2 mt-2 border-solid border-2 border-white ${seleccionColor === "rgb(67,56,202)"  ? ' font-medium text-opacity-100 cursor-default border-opacity-0 ' : 'font-regular border-opacity-40 text-opacity-60 cursor-pointer '}  ` },
                `Indigo` ),
              React.createElement('span', { onClick: () => setSeleccionColor("rgb(162,28,175)"), className: ` inline-block h-6 w-24 bg-fuchsia-700 rounded-md text-center align-top text-white pb-7 mt-2      border-solid border-2 border-white ${seleccionColor === "rgb(162,28,175)" ? ' font-medium text-opacity-100 cursor-default border-opacity-0 ' : 'font-regular border-opacity-40 text-opacity-60 cursor-pointer '}  ` },
                `Fuchsia` ) ) ),
          React.createElement('h5', { className: ` hyphens-none lg:mt-8 md:mt-6 sm:mt-5 mt-5 text-left text-slate-700/80 font-regular leading-normal lg:text-xl md:text-lg sm:text-lg text-lg  `},
            `Visualización de los selectores de navegación` ),
          React.createElement('p', { className: ` lg:mt-2 mt-1 text-left text-lg leading-normal ` },
            React.createElement('span', { onClick: !discosNavegador ? () => setDiscosNavegador(true) : undefined, className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7 mr-2 mt-2 border-solid border-2 border-slate-700 ${  discosNavegador ? 'font-semibold text-slate-700/80 border-opacity-90 cursor-default' : 'font-regular text-slate-700/60 border-opacity-50 cursor-pointer ' }` },
              discosNavegador ? 'Visible' : 'Mostrar' ),
            React.createElement('span', { onClick: discosNavegador ? () => setDiscosNavegador(false) : undefined, className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7      mt-2 border-solid border-2 border-slate-700 ${ !discosNavegador ? 'font-semibold text-slate-700/80 border-opacity-90 cursor-default' : 'font-regular text-slate-700/60 border-opacity-50 cursor-pointer ' }` },
              discosNavegador ? 'Ocultar' : 'Oculto' ) ),
          React.createElement('h5', { className: ` hyphens-none lg:mt-8 md:mt-6 sm:mt-5 mt-5 text-left text-slate-700/80 font-regular leading-normal lg:text-xl md:text-lg sm:text-lg text-lg  `},
            `Velocidad del iteración` ),
          React.createElement('p', { className: ` lg:mt-2 mt-1 text-left text-lg leading-normal ` },
            React.createElement('span', { style: { display: 'inline', boxSizing: 'border-box', position: 'relative', margin: '0', padding: '0' } }, 
              React.createElement('span', { onClick: () => setTiempoIntervalo(500),  className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7 mr-2 mt-2 border-solid border-2 border-slate-700 ${ tiempoIntervalo === 500 ?  ` font-semibold text-slate-700/80 border-opacity-90 cursor-default ` : ` font-regular text-slate-700/60 border-opacity-50 cursor-pointer ` }` },
                `500 ms` ),
              React.createElement('span', { onClick: () => setTiempoIntervalo(800),  className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7 mr-2 mt-2 border-solid border-2 border-slate-700 ${ tiempoIntervalo === 800 ?  ` font-semibold text-slate-700/80 border-opacity-90 cursor-default ` : ` font-regular text-slate-700/60 border-opacity-50 cursor-pointer ` }` },
                `800 ms` ),
              React.createElement('span', { onClick: () => setTiempoIntervalo(1300), className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7 mr-2 mt-2 border-solid border-2 border-slate-700 ${ tiempoIntervalo === 1300 ? ` font-semibold text-slate-700/80 border-opacity-90 cursor-default ` : ` font-regular text-slate-700/60 border-opacity-50 cursor-pointer ` }` },
                `1300 ms` ),
              React.createElement('span', { onClick: () => setTiempoIntervalo(2100), className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7 mr-2 mt-2 border-solid border-2 border-slate-700 ${ tiempoIntervalo === 2100 ? ` font-semibold text-slate-700/80 border-opacity-90 cursor-default ` : ` font-regular text-slate-700/60 border-opacity-50 cursor-pointer ` }` },
                `2100 ms` ),
              React.createElement('span', { onClick: () => setTiempoIntervalo(3400), className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7 mr-2 mt-2 border-solid border-2 border-slate-700 ${ tiempoIntervalo === 3400 ? ` font-semibold text-slate-700/80 border-opacity-90 cursor-default ` : ` font-regular text-slate-700/60 border-opacity-50 cursor-pointer ` }` },
                `3400 ms` ),
              React.createElement('span', { onClick: () => setTiempoIntervalo(5600), className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7 mr-2 mt-2 border-solid border-2 border-slate-700 ${ tiempoIntervalo === 5600 ? ` font-semibold text-slate-700/80 border-opacity-90 cursor-default ` : ` font-regular text-slate-700/60 border-opacity-50 cursor-pointer ` }` },
                `5600 ms` ) ) ),
          React.createElement('h5', { className: ` hyphens-none lg:mt-8 md:mt-6 sm:mt-5 mt-5 text-left text-slate-700/80 font-regular leading-normal lg:text-xl md:text-lg sm:text-lg text-lg  `},
            `Altura máxima de la galería de previsualización ` ),
          React.createElement('p', { className: ` lg:mt-3 mt-1 text-left text-lg leading-normal ` },
            React.createElement('span', { onClick: () => setCajaAltura(32), className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7 mr-2 mt-2 border-solid border-2 border-slate-700 ${ cajaAltura === 32 ? 'font-semibold text-slate-700/80 border-opacity-90 cursor-default ' : 'font-regular text-slate-700/60 border-opacity-50 cursor-pointer ' } `},
              `Altura A`),
            React.createElement('span', { onClick: () => setCajaAltura(28), className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7 mr-2 mt-2 border-solid border-2 border-slate-700 ${ cajaAltura === 28 ? 'font-semibold text-slate-700/80 border-opacity-90 cursor-default ' : 'font-regular text-slate-700/60 border-opacity-50 cursor-pointer ' } `},
              `Altura B`),
            React.createElement('span', { onClick: () => setCajaAltura(20), className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7 mr-2 mt-2 border-solid border-2 border-slate-700 ${ cajaAltura === 20 ? 'font-semibold text-slate-700/80 border-opacity-90 cursor-default ' : 'font-regular text-slate-700/60 border-opacity-50 cursor-pointer ' } `},
              `Altura C`),
            React.createElement('span', { onClick: () => setCajaAltura(18), className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7 mr-2 mt-2 border-solid border-2 border-slate-700 ${ cajaAltura === 18 ? 'font-semibold text-slate-700/80 border-opacity-90 cursor-default ' : 'font-regular text-slate-700/60 border-opacity-50 cursor-pointer ' } `},
              `Altura D`) ),
          React.createElement('h4', { style: { ...h4Style }, className: ` lg:mt-14 md:mt-10 sm:mt-8 mt-8 ` },
            `Acerca de la altura de la galería de previsualización` ),
          React.createElement('p', { style: { ...pStyle, margin: xlScreen || lgScreen ? '1rem 0' : mdScreen ? '0.75rem 0' : smScreen ? '0.5rem 0' : '0.5rem 0' } },
            'El alto de la galería de previsualización se ajusta en relación su ancho, que es el ancho del bloque dentro del cual se encuentra inscrita. Su altura tiene tres medidas fijas: A, B, C y D, de modo que, por ejemplo, si se elige la menor, la D, esa será la altura para todos lo anchos que alcance la galería de previsualización. Pero si se eligiera la más alta, la A, esa altura solo se alcanzará si el ancho del elemento contenedor de la galería de previsualización, fuera igual o mayor a 1024 pixeles; para los anchos inferiores, se auto ajustará siguiendo las cuatro alturas predeterminadas.'),
          React.createElement('h4', { style: { ...h4Style }, className: ` lg:mt-14 md:mt-10 sm:mt-8 mt-8 ` },
              `La galería principal` ),
          React.createElement('p', { style: { ...pStyle, margin: xlScreen || lgScreen ? '1rem 0 2.25rem' : mdScreen ? '0.75rem 0 2rem 0' : smScreen ? '0.5rem 0 1.75rem 0' : '0.5rem 0 1.75rem 0' } },
               'Al hacer click en la fotografía central de la ', React.createElement('span', { style: { display: 'inline', boxSizing: 'border-box', position: 'relative', margin: '0', padding: '0', fontWeight: '500' } }, 'galería de previsualización'), ' se es dirigido a la ', React.createElement('span', { style: { display: 'inline', boxSizing: 'border-box', position: 'relative', margin: '0', padding: '0', fontWeight: '500' } }, 'galería de principal'), ' donde se muestra la fotografía seleccionada en formato completo y una fila inferior deslizble con todas las imagenes miniaturas de la lista para seleccionar y ver en formato completo. La imagen miniatura seleccionada es presentada con un borde cuyo color corresponde al seleccionado en la galería de previsualización. La fila inferior se invisibiliza después un momento de inactividad del usuario.'),

          React.createElement('div', { style: { display: 'block', boxSizing: 'border-box', width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '0.375rem' } },
            React.createElement(QuicknfullMain, {
              imagesList: ExampleImagesList,
              indice: 11,
              seleccColor: seleccionColor } ) )

        ) ) )
}

export default QuicknFullArticulo;
