"use client";
import React, { useCallback, useEffect, useState, useRef } from 'react';
import ProntoVistaPrevGal from '@/components/prontoVistaPrevGal';
import { ProntoVistaImgsList } from '@/components/prontoVistaImgsLists';
import usePantallaTamagnos from '@/hooks/usepantallatamagnos';

const Home: React.FC = () => {
  const { screenReady, lgScreen, mdScreen, smScreen } = usePantallaTamagnos();


  const isValidColor = (color: string) => typeof window !== "undefined" && CSS.supports("color", color);

  const [isMdParent, setIsMdParent] = useState<boolean>(false);
  const [isLgParent, setIsLgParent] = useState<boolean>(false);
  const [isXlParent, setIsXlParent] = useState<boolean>(false);

  const [cajaAltura, setCajaAltura] = useState(32);
  // const galAlturaXl = Math.min(32, Math.max(18, cajaAltura));
  // const galAlturaLg = Math.min(32, Math.max(18, galAlturaXl - 4));
  // const galAlturaMd = Math.min(32, Math.max(18, galAlturaLg - 8));
  // const galAlturaSm = Math.min(32, Math.max(18, galAlturaMd - 2));
  const [tiempoIntervalo, setTiempoIntervalo] = useState(2100);
  const [seleccionColor, setSeleccionColor] = useState(() => isValidColor("rgb(51,65,85)") ? "rgb(51,65,85)" : "#000");

  const verOcultarDiscosNavRef = useRef<HTMLDivElement | null>(null);
  const [verOcultarDiscosNavWidth, setVerOcultarDiscosNavWidth] = useState<number>(verOcultarDiscosNavRef.current?.offsetWidth ?? 880);
  // console.log("verOcultarDiscosNavWidth is " + verOcultarDiscosNavWidth);
  // const [resultanteAlto, setResultanteAlto] = useState<number>(28);


  const handleResize = useCallback(() => {
    if (!verOcultarDiscosNavRef.current) return;
    setVerOcultarDiscosNavWidth(verOcultarDiscosNavRef.current?.offsetWidth);
    setIsMdParent(verOcultarDiscosNavWidth >= 640 && verOcultarDiscosNavWidth < 768);
    setIsLgParent(verOcultarDiscosNavWidth >= 768 && verOcultarDiscosNavWidth < 1024);
    setIsXlParent(verOcultarDiscosNavWidth >= 1024);
    console.log("isMdParent is " + isMdParent);
    console.log("isLgParent is " + isLgParent);
    console.log("isXlParent is " + isXlParent);
    // setResultanteAlto(isXlParent ? galAlturaXl : isLgParent ? galAlturaLg : isMdParent ? galAlturaMd : galAlturaSm);
    // console.log("setResultanteAlto is " + setResultanteAlto);
  }, [isMdParent, isLgParent, isXlParent, verOcultarDiscosNavWidth]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    if (isValidColor(seleccionColor)) setSeleccionColor(seleccionColor)
  }, [seleccionColor]);


  const [discosNavegador, setDiscosNavegador] = useState<boolean>(true);


  if (!screenReady) return null;
  return React.createElement('main', { style: { position: 'relative', width: '100%', maxWidth: '64rem', transition: 'all 300ms ease-in-out' } },
    React.createElement('section', { style: { position: 'relative', transition: 'all 300ms ease-in-out' } },
      React.createElement('div', { style: { transition: 'all 300ms ease-in-out', padding: lgScreen ? '5rem 3rem' : mdScreen ? '3.5rem 2.1rem' : smScreen ? '3rem 1.75rem' : '1.8rem 0.5rem' }},
        React.createElement('h3', { style: { margin: lgScreen ? '1.5rem' : mdScreen ? '1.25rem' : '1rem' /*, marginBottom: lgScreen ? '1.5rem' : mdScreen ? '1rem' : smScreen ? '0.5rem' : '0.25rem'*/, textAlign: 'left', transition: 'all 300ms ease-in-out', fontWeight: '400', color: 'rgb(100,116,139)', fontSize: lgScreen ? '2.2rem': mdScreen ? '2rem' : smScreen ? '1.7rem' : '1.5rem', lineHeight: lgScreen ? '1' : mdScreen ? '2.5rem' : smScreen ? '2.25rem' : '2rem' } },
          "ProntoVista"),
        React.createElement('div', { style: { transition: 'all 300ms ease-in-out', position: 'relative', display: 'block', padding: '1.5rem', borderTopLeftRadius: '0.3rem', overflow: 'hidden' }  },
          React.createElement('div', { style: { position: 'absolute', inset: '0', background: 'linear-gradient( to bottom, rgba(51,65,85,0.05) 0%, rgba(51,65,85,0.005) 2rem, rgba(51,65,85,0) 100%), linear-gradient( to bottom, rgba(0,0,0,0.1) 0%, rgba(51,65,85,0.01) 0.4rem, rgba(51,65,85,0) 100%)', maskImage: 'linear-gradient( to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 2%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' } }),
          React.createElement('div', { style: { position: 'absolute', inset: '0', background: 'linear-gradient( to right, rgba(51,65,85,0.05) 0%, rgba(51,65,85,0.005) 2rem, rgba(51,65,85,0) 100%), linear-gradient( to right, rgba(0,0,0,0.1) 0%, rgba(51,65,85,0.01) 0.4rem, rgba(51,65,85,0) 100%)', maskImage: 'linear-gradient( to bottom, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' } }),

          React.createElement('p', { className: ' lg:text-2xl md:text-xl sm:text-xl text-lg font-light text-slate-700/70 text-left lg:indent-6 md:indent-5 sm:indent-4 indent-4 lg:my-4 md:my-3 sm:my-2 my-2 lg:leading-relaxed md:leading-relaxed sm:leading-relaxed leading-relaxed  '},
            'Componente aun en desarrollo, conformado por una ',
            React.createElement('span', { className: 'font-medium' },
                'galería de previsualización') ,
            ' para cinco imágenes, más una ',
            React.createElement('span', { className: 'font-medium' },
                'galería principal') ,
            ' para navegar a través de la lista de imágenes y verlas en formato completo. Dispone de algunos ajustes personalizables y está contenida en un bloque cuyas dimensiones se adaptan a las dimensiones del elemento que la contiene.'),
          React.createElement('h4', { className: `hyphens-none lg:mt-14 md:mt-10 sm:mt-6 mt-6 mb-2 text-left text-slate-700/80 font-semibold leading-normal lg:text-2xl md:text-xl sm:text-xl text-xl ` },
            `Galería de previsualización` ),
          React.createElement('p', { className: ' lg:text-2xl md:text-xl sm:text-xl text-lg font-light text-slate-700/70 text-left lg:indent-6 md:indent-5 sm:indent-4 indent-4 lg:mt-4 md:mt-3 sm:mt-2 mt-2 lg:mb-16 md:mb-12 sm:mb-8 mb-8 lg:leading-relaxed md:leading-relaxed sm:leading-relaxed leading-relaxed  '},
            'La galería de previsualización incluye en su parte inferior una fila de navegación la cual indica la imagen principal en exhibición y el tiempo de iteración.'),
          
          React.createElement('div', { ref: verOcultarDiscosNavRef, style: { maxWidth: `880px`, width: `100%`, transition: discosNavegador ? `height 500ms ease-in-out, opacity 1600ms ease-in-out` : `height 500ms ease-in-out, opacity 300ms ease-in-out`} },
            React.createElement('div', { style: { maxWidth: `880px`, width: `100%` }},
              React.createElement(ProntoVistaPrevGal, {
                imagenesLista: ProntoVistaImgsList,
                discosColor: seleccionColor,
                iteracionTiempo: tiempoIntervalo,
                maxAltura: cajaAltura,
                navegador: discosNavegador, } ) ) ),


          React.createElement('h4', { className: ` hyphens-none lg:mt-16 md:mt-12 sm:mt-8 mt-8 text-left text-slate-700/80 font-semibold leading-normal lg:text-2xl md:text-xl sm:text-xl text-xl ` },
            `Opciones personalizables` ),
          React.createElement('p', { className: 'lg:text-2xl md:text-xl sm:text-xl text-lg font-light text-slate-700/70 text-left lg:indent-6 md:indent-5 sm:indent-4 indent-4 lg:my-4 md:my-3 sm:my-2 my-2 lg:leading-relaxed md:leading-relaxed sm:leading-relaxed leading-relaxed  ' },
            'En esta interfaz se pueden apreciar las opciones personalizables que dispone el componente.'),
          React.createElement('h5', { className: ` hyphens-none lg:mt-8 md:mt-6 sm:mt-5 mt-5 text-left text-slate-700/80 font-regular leading-normal lg:text-xl md:text-lg sm:text-lg text-lg  `},
            `Apariencia de los selectores de navegación` ),
          React.createElement('p', { className: ` lg:mt-2 mt-1 text-left text-lg leading-normal ` },
            React.createElement('span', { className: `inline-block  ` }, 
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
            React.createElement('span', { onClick: () => setDiscosNavegador(true),  className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7 mr-2 mt-2 border-solid border-2 border-slate-700 ${  discosNavegador ? 'font-semibold text-slate-700/80 border-opacity-90 cursor-default' : 'font-regular text-slate-700/60 border-opacity-50 cursor-pointer ' }` },
              'Mostrar' ),
            React.createElement('span', { onClick: () => setDiscosNavegador(false), className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7      mt-2 border-solid border-2 border-slate-700 ${ !discosNavegador ? 'font-semibold text-slate-700/80 border-opacity-90 cursor-default' : 'font-regular text-slate-700/60 border-opacity-50 cursor-pointer ' }` },
              'Ocultar' ) ),
          React.createElement('h5', { className: ` hyphens-none lg:mt-8 md:mt-6 sm:mt-5 mt-5 text-left text-slate-700/80 font-regular leading-normal lg:text-xl md:text-lg sm:text-lg text-lg  `},
            `Velocidad del iteración` ),
          React.createElement('p', { className: ` lg:mt-2 mt-1 text-left text-lg leading-normal ` },
            React.createElement('span', { className: `inline-block  ` }, 
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
              `Altura D`) ), /*
          React.createElement('p', { className: ` mt-2 text-left text-slate-700/80 text-lg lg:ml-6 md:ml-5 ml-4 leading-normal font-light `},
            `Altura resultante: `,
            React.createElement('span', { className: `font-semibold text-slate-700/80` },
              `${resultanteAlto} rem`)), 
          React.createElement('p', { className: ` mt-1 text-left text-slate-700/80 text-lg lg:ml-6 md:ml-5 ml-4 leading-normal font-light `},
            `Ancho del elemento contenedor: `,
            React.createElement('span', { className: `font-semibold text-slate-700/80` },
              `${verOcultarDiscosNavWidth} px`)), */
          React.createElement('h4', { className: ` hyphens-none lg:mt-14 md:mt-10 sm:mt-8 mt-8 text-left text-slate-700/80 font-semibold leading-normal lg:text-2xl md:text-xl sm:text-xl text-xl ` },
            `Acerca de la altura de la galería de previsualización` ),
          React.createElement('p', { className: ` lg:text-2xl md:text-xl sm:text-xl text-lg font-light text-slate-700/70 text-left lg:indent-6 md:indent-5 sm:indent-4 indent-4 lg:my-4 md:my-3 sm:my-2 my-2 lg:leading-relaxed md:leading-relaxed sm:leading-relaxed leading-relaxed `},
            'El alto de la galería de previsualización se ajusta en relación su ancho, que es el ancho del bloque dentro del cual se encuentra inscrita. Su altura tiene tres medidas fijas: A, B, C y D, de modo que, por ejemplo, si se elige la menor, la D, esa será la altura para todos lo anchos que alcance la galería de previsualización. Pero si se eligiera la más alta, la A, esa altura solo se alcanzará si el ancho del elemento que contiene a la galería de previsualización, fuera igual o mayor a los 1024 pixeles; para los anchos inferiores, se auto ajustará siguiendo las cuatro alturas predeterminadas.'),
          React.createElement('h4', { className: ` hyphens-none lg:mt-14 md:mt-10 sm:mt-8 mt-8 text-left text-slate-700/80 font-semibold leading-normal lg:text-2xl md:text-xl sm:text-xl text-xl ` },
              `La galería principal` ),
          React.createElement('p', { className: ` lg:text-2xl md:text-xl sm:text-xl text-lg font-light text-slate-700/70 text-left lg:indent-6 md:indent-5 sm:indent-4 indent-4 lg:my-4 md:my-3 sm:my-2 my-2 lg:leading-relaxed md:leading-relaxed sm:leading-relaxed leading-relaxed `},
               'Al hacer click en la foto central en muestra, se es dirigido a la página con la galería principal donde se muestra la foto seleccionada en formato completo, junto a una fila inferior con todas las imagenes de la lista para seleccionar y verla en formato completo. La imagen selecionada presenta un borde cuyo color corresponde al seleccionado en la galería de previsualización. Además, incluye en botón para ocultar la lista de imágenes y otro para volver a la página anterior. Aún en desarrollo. '),
              

        ) ) ) )
}

export default Home;

