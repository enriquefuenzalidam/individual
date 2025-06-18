import React, { useEffect, useCallback, useState, useRef, useMemo } from 'react';
import { ExampleImagesLists } from '@/components/quicknfull/exampleImagesLists';
import UsePantallaTamagnos from '@/hooks/usepantallatamagnos';
import QuicknfullPrev from '@/components/quicknfull/quicknfullPrev';
import QuicknfullMain from '@/components/quicknfull/quicknfullMain';
import Link from 'next/link';
import ExtLink from '@/components/extLink';

const QuicknFullArticulo: React.FC = () => {

  const { screenReady, xlScreen, lgScreen, mdScreen, smScreen } = UsePantallaTamagnos();
  const isValidColor = (color: string) => typeof window !== "undefined" && CSS.supports("color", color);
  const [cajaAltura, setCajaAltura] = useState(32);
  const [tiempoIntervalo, setTiempoIntervalo] = useState(3400);
  const [seleccionColor, setSeleccionColor] = useState(() => isValidColor("rgb(51,65,85)") ? "rgb(51,65,85)" : "#000");
  const [discosNavegador, setDiscosNavegador] = useState<boolean>(true);
  const verOcultarDiscosNavRef = useRef<HTMLDivElement>(null);

  const [repIsHovered, setRepIsHovered] = useState(false);

  const prevGalTtl = useRef<HTMLHeadingElement>(null);
  const persOpcTtl = useRef<HTMLHeadingElement>(null);
  const altAcecTtl = useRef<HTMLHeadingElement>(null);
  const prinGalTtl = useRef<HTMLHeadingElement>(null);
  const repDemoTtl = useRef<HTMLHeadingElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    const el = ref.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 48;
    window.scrollTo({ top: y, behavior: 'smooth' } ) };

  useEffect(() => {
    if (isValidColor(seleccionColor)) setSeleccionColor(seleccionColor)
  }, [seleccionColor]);

  const [pageLoaded, setPageLoaded] = useState(false);
  useEffect(() => {
    if (!screenReady) return;
    const timeout = setTimeout(() => setPageLoaded(true), 500);
    return () => clearTimeout(timeout); }, [screenReady]);

  const nullStyle: React.CSSProperties = useMemo(() => ({
    boxSizing: 'border-box' 
  }), []);

  const nullBlockStyle: React.CSSProperties = useMemo(() => ({
    ...nullStyle, display: 'block', position: 'relative' 
  }), [nullStyle]);

  const pStyle: React.CSSProperties = useMemo(() => ({
    ...nullBlockStyle, hyphens: 'auto', textAlign: 'left', textIndent: lgScreen || xlScreen ? '1.5rem' : mdScreen ? '1.25rem' : '1rem', fontSize: lgScreen || xlScreen ? '1.5rem' : mdScreen || smScreen ? '1.25rem' : '1.125rem', fontWeight: 400, color: 'rgba(51,65,85,0.6)', lineHeight: 1.625
  }), [nullBlockStyle, lgScreen, xlScreen, mdScreen, smScreen]);

  const pStyleB: React.CSSProperties = useMemo(() => ({
    ...pStyle, padding: '0', margin: xlScreen || lgScreen ? '1rem 0' : mdScreen ? '0.75rem 0' : smScreen ? '0.5rem 0' : '0.5rem 0'
  }), [pStyle, lgScreen, xlScreen, mdScreen, smScreen]);

  const pStyleC: React.CSSProperties = useMemo(() => ({
    marginTop: xlScreen || lgScreen ? '0.5rem' : '0.25rem', textAlign: 'left', fontSize: '1.125rem', lineHeight: '1.5'
  }), [lgScreen, xlScreen])

  const pBold: React.CSSProperties = useMemo(() =>({
    ...pStyle, display: 'inline', boxSizing: 'border-box', position: 'relative', margin: '0', padding: '0', fontWeight: '500', color: 'rgba(51,65,85,1)'
  }),[pStyle])

  const h4Style: React.CSSProperties = useMemo(() =>({
    ...nullBlockStyle, hyphens: 'none', textAlign: 'left', color: 'rgba(51,65,85,1)', fontWeight: '600', lineHeight: '1.5', fontSize: xlScreen || lgScreen ? '1.5rem' : '1.25rem'
  }),[nullBlockStyle, lgScreen, xlScreen ]);

  const h4StyleB: React.CSSProperties = useMemo(() => ({
    ...h4Style, marginTop: xlScreen || lgScreen ? '3.5rem' : mdScreen ? '2.5rem' : smScreen ? '2rem' : '2rem'
  }), [h4Style, xlScreen, lgScreen, mdScreen, smScreen])

  const h4BStyle: React.CSSProperties = useMemo(() =>({
    ...nullBlockStyle, hyphens: 'none', textAlign: 'left', color: 'rgba(51,65,85,1)', fontWeight: '500', lineHeight: '1.5', fontSize: xlScreen || lgScreen ? '1.5rem' : '1.25rem', padding: '0', margin: xlScreen || lgScreen ? '1.7rem 0 0.5rem 1.5rem' : mdScreen ? '1.3rem 0 0.5rem 1.25rem' : '1rem 0 0.5rem 1rem'
  }),[nullBlockStyle, mdScreen, lgScreen, xlScreen ]);

  const navRapLi: React.CSSProperties = useMemo(() => ({
    ...nullBlockStyle, hyphens: 'auto', fontSize: lgScreen || xlScreen ? '1.175rem' : mdScreen || smScreen ? '1.125rem' : '1rem', fontWeight: 400, color: 'rgba(51,65,85,0.7)', lineHeight: 1.625, padding: '0', margin: xlScreen || lgScreen ? '1rem 0 0 1.5rem' : mdScreen ? '0.75rem 0 0 1.25rem' : smScreen ? '0.5rem 0 0 0' : '0.5rem 0 0 1rem'
  }), [ nullBlockStyle, xlScreen, lgScreen, mdScreen, smScreen]);

  const navRapSp: React.CSSProperties = useMemo(() => ({
    ...nullStyle, cursor: 'pointer', display: 'inline', padding: '0', margin: '0'
  }), [nullStyle]);

  const imgsDesc: React.CSSProperties = useMemo(() => ({
    ...nullBlockStyle, hyphens: 'none', padding: '0', margin: xlScreen || lgScreen ? '0.5rem' : mdScreen ? '0.375rem 0 0 0' : smScreen ? '0.25rem 0 0 0' : '0.25rem 0 0 0', textAlign: 'center', fontSize: lgScreen || xlScreen ? '1.175rem' : mdScreen || smScreen ? '1.125rem' : '1rem', fontWeight: 300, color: 'rgba(51,65,85,0.4)', lineHeight: 1.625
  }), [nullBlockStyle, xlScreen, lgScreen, mdScreen, smScreen]);

  const h5Style: React.CSSProperties = useMemo(() =>({
    hyphens: 'none', textAlign: 'left', color: 'rgba(51,65,85,0.8)', fontWeight: 400, lineHeight: '1.5', fontSize: lgScreen || xlScreen ? '1.25rem' : mdScreen || smScreen ? '1.125rem' : '1.125rem', margin: lgScreen || xlScreen ? '2rem 0 0 0' : mdScreen ? '1.5rem 0 0 0' : smScreen ? '1.25rem 0 0 0' : '1.25rem 0 0 0',
  }), [xlScreen, lgScreen, mdScreen, smScreen]);

  const intrfzSelecc: React.CSSProperties = useMemo(() =>({
    display: 'inline-block', height: '1.5rem', width: '6rem', borderRadius: '0.375rem', textAlign: 'center', verticalAlign: 'top', paddingBottom: '1.75rem', margin: '0.5rem 0.5rem 0 0', borderStyle: 'solid', borderWidth: '2px',  
  }), []);

  const maxAltSpn = (value: number): React.CSSProperties => ({
    ...intrfzSelecc, fontWeight: cajaAltura === value ? 600 : 400, color: cajaAltura === value ? 'rgba(51,65,85,0.8)' : 'rgba(51,65,85,0.6)', borderColor: cajaAltura === value ? 'rgba(51,65,85,0.9)' : 'rgba(51,65,85,0.5)', cursor: cajaAltura === value ? 'default' : 'pointer' });

  const iterVelSpn = (value: number): React.CSSProperties => ({
    ...intrfzSelecc, fontWeight: tiempoIntervalo === value ? 600 : 400, color: tiempoIntervalo === value ? 'rgba(51,65,85,0.8)' : 'rgba(51,65,85,0.6)', borderColor: tiempoIntervalo === value ? 'rgba(51,65,85,0.9)' : 'rgba(51,65,85,0.5)', cursor: tiempoIntervalo === value ? 'default' : 'pointer' });

  const navDiscClrs = (colorValue: string): React.CSSProperties => ({
    ...intrfzSelecc, fontWeight: seleccionColor === colorValue ? 500 : 400, color: seleccionColor === colorValue ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)', borderColor: seleccionColor === colorValue ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,0.4)', cursor: seleccionColor === colorValue ? 'default' : 'pointer', backgroundColor: colorValue });

  const mostrOculNav = (dscNavg: boolean): React.CSSProperties => ({
    ...intrfzSelecc, fontWeight: dscNavg ? 600 : 400, color: dscNavg ? 'rgba(51,65,85,0.8)' : 'rgba(51,65,85,0.6)', borderColor: dscNavg ? 'rgba(51,65,85,0.9)' : 'rgba(51,65,85,0.5)', cursor: dscNavg ? 'default' : 'pointer'
  })

  const dinamicSize = useCallback((value: number) => {
    return xlScreen ? value * 1.4118 : lgScreen ? value * 1.2941 : mdScreen ? value * 1.1765 : smScreen ? value * 1.1176 : value;
  }, [xlScreen, lgScreen, mdScreen, smScreen])
  
  if (!screenReady) return null;

  return React.createElement('section', { style: { display: 'block', padding: '0', margin: '0', boxSizing: 'border-box', position: 'relative', transition: 'opacity 400ms ease-in-out', opacity: pageLoaded ? 1 : 0, pointerEvents: pageLoaded ? 'auto' : 'none', fontFamily: '"Pangea Trial", sans-serif', letterSpacing: dinamicSize(-0.008) + 'rem' } },
    React.createElement('div', { style: { display: 'block', margin: '0', boxSizing: 'border-box', position: 'relative', transition: 'all 300ms ease-in-out', padding: lgScreen ? '5rem 3rem 5rem 3rem' : mdScreen ? '3.5rem 2.1rem 3.5rem 2.1rem' : smScreen ? '3rem 1.75rem 3rem 1.75rem' : '1.8rem 0.5rem 1.8rem 0.5rem' } },
      React.createElement('h3', { style: { display: 'block', padding: '0', boxSizing: 'border-box', margin: lgScreen ? '2.8rem 1.4rem 1.3rem 1.4rem' : mdScreen ? '2.8rem 1.4rem 0.8rem 1.4rem' : smScreen ? '3rem 1.5rem 0.8rem 1.5rem' : '3rem 1.5rem 0.8rem 1.5rem', textAlign: 'left', transition: 'all 300ms ease-in-out', fontWeight: '600', color: 'rgba(50,66,89,1)', fontSize: lgScreen ? '2.2rem' : mdScreen ? '2rem' : smScreen ? '1.7rem' : '1.5rem', lineHeight: lgScreen ? '1' : mdScreen ? '2.5rem' : smScreen ? '2.25rem' : '2rem' } },
        "Quick'n'Full"),
        React.createElement('div', { style: { display: 'block', margin: '0', boxSizing: 'border-box', position: 'relative', transition: 'all 300ms ease-in-out', padding: '1.5rem', borderTopLeftRadius: '0.3rem', overflow: 'hidden' }  },
          React.createElement('div', { style: { display: 'block', padding: '0', margin: '0', boxSizing: 'border-box', position: 'absolute', inset: '0', background: 'linear-gradient( to bottom, rgba(51,65,85,0.05) 0%, rgba(51,65,85,0.005) 2rem, rgba(51,65,85,0) 100%), linear-gradient( to bottom, rgba(0,0,0,0.1) 0%, rgba(51,65,85,0.01) 0.4rem, rgba(51,65,85,0) 100%)', maskImage: 'linear-gradient( to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 2%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' } }),
          React.createElement('div', { style: { display: 'block', padding: '0', margin: '0', boxSizing: 'border-box', position: 'absolute', inset: '0', background: 'linear-gradient( to right, rgba(51,65,85,0.05) 0%, rgba(51,65,85,0.005) 2rem, rgba(51,65,85,0) 100%), linear-gradient( to right, rgba(0,0,0,0.1) 0%, rgba(51,65,85,0.01) 0.4rem, rgba(51,65,85,0) 100%)', maskImage: 'linear-gradient( to bottom, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' } }),

          React.createElement('p', { style: { ...pStyleB } },
            'Componente constituido por una ', React.createElement('span', { style: {  ...pBold } }, 'galería de previsualización') , ' para cinco imágenes, más una ', React.createElement('span', { style: { ...pBold } }, 'galería principal') , ' para navegar a través de toda la lista de imágenes y verlas en formato completo. Tiene opciones personalizables y se adapta a las dimensiones del elemento contenedor.' ),

          React.createElement('h4', { style: { ...h4BStyle } },
            'Navegación rápida:' ),
          React.createElement('ul', { style: { ...nullBlockStyle, padding: '0', margin: xlScreen || lgScreen ? '1rem 0 3.8rem 0' : mdScreen ? '0.75rem 0 3rem 0' : smScreen ? '0.5rem 0 2.2rem 0' : '0.5rem 0 2rem 0' } },
            [ { label: 'La galería de previsualización', ref: prevGalTtl },
              { label: 'Opciones personalizables', ref: persOpcTtl },
              { label: 'Acerca de la altura de la galería de previsualización', ref: altAcecTtl },
              { label: 'La galería principal', ref: prinGalTtl },
              { label: 'Repositorio demo', ref: repDemoTtl } ].map(({ label, ref }, index) =>
              React.createElement('li', { key: index, style: { ...navRapLi } },
                `${index + 1}.— `, React.createElement('span', { onClick: () => scrollTo(ref), style: { ...navRapSp }, className: `hover:underline` }, label ) ) ) ),

          React.createElement('hr', { style: { ...nullBlockStyle, border: 'none', height: xlScreen || lgScreen ? '0.1rem' : mdScreen ? '0.075rem' :  '0.05rem', background: 'rgba(51,65,85,0.3)' } } ), 

          React.createElement('h4', { ref: prevGalTtl, style: { ...h4Style, padding: '0', margin: xlScreen || lgScreen ? '4rem 0 0.5rem 0' : mdScreen ? '3rem 0 0.5rem 0' : '2rem 0 0.5rem 0' } },
            'La galería de previsualización' ),
          React.createElement('p', { style: { ...pStyle, padding: '0', margin: xlScreen || lgScreen ? '1rem 0 4rem 0' : mdScreen ? '0.75rem 0 3rem 0' : smScreen ? '0.5rem 0 2rem 0' : '0.5rem 0 2rem 0' } },
            'La galería de previsualización incluye en su parte inferior una fila de navegación la cual indica la imagen principal en exhibición y el tiempo de iteración.'),

          React.createElement('div', { ref: verOcultarDiscosNavRef, style: { display: 'block', padding: '0', margin: '0', position: 'relative', boxSizing: 'border-box', width: `100%`, transition: discosNavegador ? `height 500ms ease-in-out, opacity 1600ms ease-in-out` : `height 500ms ease-in-out, opacity 300ms ease-in-out` } },
            React.createElement('div', { style: { display: 'block', padding: '0', margin: '0', position: 'relative', boxSizing: 'border-box', width: `100%` } },
              React.createElement(QuicknfullPrev, {
                imagesList: ExampleImagesLists,
                listKey: 'A1',
                initialIndex: 6,
                discosColor: seleccionColor,

                iteracionTiempo: tiempoIntervalo,
                maxAltura: cajaAltura,
                navegador: discosNavegador } ) ) ),

          React.createElement('p', { style: { ...imgsDesc }}, 'Imágenes cortesía de ', React.createElement(Link, { style: { fontWeight: '500' }, href: 'https://www.pexels.com/' }, 'Pexels', React.createElement('span', { style: { display: 'inline-block', boxSizing: 'border-box', position: 'relative', margin: '0 0 0 0.35rem', padding: '0', width: lgScreen || xlScreen ? '1.25rem' : mdScreen || smScreen ? '1.125rem' : '1.1rem', height: 'auto', verticalAlign: 'text-bottom' } }, React.createElement(ExtLink, null) ) ) ),

          React.createElement('h4', { ref: persOpcTtl, style: { ...h4Style, padding: '0', margin: xlScreen || lgScreen ? '4rem 0 0 0' : mdScreen ? '3rem 0 0 0' : '2rem 0 0 0' } },
            `Opciones personalizables` ),
          React.createElement('p', { style: { ...pStyleB } },
            'En esta interfaz se pueden conocer las opciones personalizables que dispone el componente.'),

          React.createElement('h5', { style: { ...h5Style } },
            `Apariencia de los selectores de navegación` ),
          React.createElement('p', { style: { ...pStyleC } },
              [ { label: "Amber",   color: "rgb(180,83,9)"   },
                { label: "Slate",   color: "rgb(51,65,85)"   },
                { label: "Sky",     color: "rgb(3,105,161)"  },
                { label: "Indigo",  color: "rgb(67,56,202)"  },
                { label: "Fuchsia", color: "rgb(162,28,175)" } ].map(({ label, color }) => React.createElement( 'span', { key: color, onClick: () => setSeleccionColor(color), style: { ...navDiscClrs(color) } }, label ) ) ),

          React.createElement('h5', { style: { ...h5Style } },
            `Visualización de los selectores de navegación` ),
          React.createElement('p', { style: { ...pStyleC }  },
            [ { label: discosNavegador ? 'Visible' : 'Mostrar', shouldShow: true, active: discosNavegador },
              { label: discosNavegador ? 'Ocultar' : 'Oculto', shouldShow: false, active: !discosNavegador } ].map(({ label, shouldShow, active }) => React.createElement( 'span', { key: label, onClick: discosNavegador !== shouldShow ? () => setDiscosNavegador(shouldShow) : undefined, style: { ...mostrOculNav(active) } }, label ) ) ),

          React.createElement('h5', { style: { ...h5Style } },
            `Velocidad del iteración` ),
          React.createElement('p', { style: { ...pStyleC } },
            [500, 800, 1300, 2100, 3400, 5600].map((ms) => React.createElement( 'span', { key: ms, onClick: () => setTiempoIntervalo(ms), style: { ...iterVelSpn(ms) } }, `${ms} ms` ) ) ),

          React.createElement('h5', { style: { ...h5Style } },
            `Altura máxima de la galería de previsualización ` ),
          React.createElement('p', { style: { marginTop: lgScreen ? '0.75rem' : '0.25rem', textAlign: 'left', fontSize: '1.125rem', lineHeight: '1.5' } },
            [ {label: 'A', value: 32},
              {label: 'B', value: 28},
              {label: 'C', value: 20},
              {label: 'D', value: 18} ].map(({label, value}, index) => React.createElement( 'span', { key: index, onClick: () => setCajaAltura(value), style: { ...maxAltSpn(value) } }, `Altura ${label}` ) ) ),

          React.createElement('h4', { ref: altAcecTtl, style: { ...h4StyleB } },
            `Acerca de la altura de la galería de previsualización` ),
          React.createElement('p', { style: { ...pStyle, margin: xlScreen || lgScreen ? '1rem 0' : mdScreen ? '0.75rem 0' : smScreen ? '0.5rem 0' : '0.5rem 0' } },
            'El alto de la galería de previsualización se ajusta en relación su ancho, que es el ancho del bloque dentro del cual se encuentra inscrita. Su altura tiene tres medidas fijas: A, B, C y D, de modo que, por ejemplo, si se elige la menor, la D, esa será la altura para todos lo anchos que alcance la galería de previsualización. Pero si se eligiera la más alta, la A, esa altura solo se alcanzará si el ancho del elemento contenedor de la galería de previsualización, fuera igual o mayor a 1024 pixeles; para los anchos inferiores, se auto ajustará siguiendo las cuatro alturas predeterminadas.'),
          React.createElement('h4', { ref: prinGalTtl, style: { ...h4StyleB } },
              `La galería principal` ),
          React.createElement('p', { style: { ...pStyle, padding: '0', margin: xlScreen || lgScreen ? '1rem 0 2.25rem' : mdScreen ? '0.75rem 0 2rem 0' : smScreen ? '0.5rem 0 1.75rem 0' : '0.5rem 0 1.75rem 0' } },
               'Al hacer click en la fotografía central de la ', React.createElement('span', { style: {  ...pBold } }, 'galería de previsualización'), ' se es dirigido a la ', React.createElement('span', { style: {  ...pBold } }, 'galería de principal'), ' donde se muestra la fotografía seleccionada en formato completo y una fila inferior deslizable con todas las imagenes miniaturas de la lista para seleccionar y ver en formato completo. La imagen miniatura seleccionada es presentada con un borde cuyo color corresponde al seleccionado en la galería de previsualización. La fila inferior se invisibiliza luego de un momento de inactividad del usuario.'),

          React.createElement('div', { style: { display: 'block', boxSizing: 'border-box', width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '0.375rem', margin: '0', padding: '0' } },
            React.createElement(QuicknfullMain, {
              imagesList: ExampleImagesLists,
              listKey: 'A2',
              indiceInicial: 6,
              seleccColor: seleccionColor } ) ),

          React.createElement('p', { style: { ...imgsDesc }}, 'Imágenes cortesía de ', React.createElement(Link, { style: { fontWeight: '500' }, href: 'https://www.pexels.com/' }, 'Pexels', React.createElement('span', { style: { display: 'inline-block', boxSizing: 'border-box', position: 'relative', margin: '0 0 0 0.35rem', padding: '0', width: lgScreen || xlScreen ? '1.25rem' : mdScreen || smScreen ? '1.125rem' : '1.1rem', height: 'auto', verticalAlign: 'text-bottom' } }, React.createElement(ExtLink, null) ) ) ),

          React.createElement('h4', { ref: repDemoTtl, style: { ...h4StyleB  } },
              `Repositorio demo` ),
          React.createElement('p', { style: { ...pStyle, padding: '0', margin: xlScreen || lgScreen ? '1rem 0 2.25rem' : mdScreen ? '0.75rem 0 2rem 0' : smScreen ? '0.5rem 0 1.75rem 0' : '0.5rem 0 1.75rem 0' } },
              'En el siguiente enlace se encuentra un respositorio GitHub el cual contiene un proyecto Next.js en blanco, solo con el componente ', React.createElement('span', { style: { ...pBold } }, 'Quick\'n\'Full'), ' implementado. Al descargarlo y seguir las instrucciones del archivo README.md, el proyecto corre de forma local y muestra a ', React.createElement('span', { style: {  ...pBold } }, 'Quick\'n\'Full'), ' en funcionamiento. Permite controlar las opciones personalizables, conocer el código fuente y usarlo en proyectos Next.js.'),
          React.createElement('p', { style: { display: 'block', boxSizing: 'border-box', position: 'relative', textIndent: lgScreen || xlScreen ? '-1.5rem' : mdScreen ? '-1.25rem' : '-1rem', hyphens: 'auto', textAlign: 'left', fontSize: lgScreen || xlScreen ? '1.5rem' : mdScreen || smScreen ? '1.25rem' : '1.125rem', fontWeight: 400, color: 'rgba(51,65,85,0.6)', lineHeight: 1.625, padding: '0', margin: xlScreen || lgScreen ? '1rem 0 2.25rem 3rem' : mdScreen ? '0.75rem 0 2rem 2.5rem' : '0.5rem 0 1.75rem 2rem' } },
            React.createElement('span', { style: { ...pBold } }, '—'), React.createElement(Link, { lang: 'en', onMouseEnter: () => setRepIsHovered(true), onMouseLeave: () => setRepIsHovered(false), href: 'https://github.com/enriquefuenzalidam/quicknfulldemo', target: '_blank', rel: 'noopener noreferrer', title: 'Ir repositorio en GitHub de Quick\'n\'Full', style: { ...pBold, fontStyle: 'italic', textDecoration: repIsHovered ? 'underline' : 'none', } }, 'github.com/enriquefuenzalidam/quicknfulldemo', React.createElement('span', { style: { display: 'inline-block', boxSizing: 'border-box', position: 'relative', margin: '0 0 0 0.35rem', padding: '0', width: lgScreen || xlScreen ? '1.5rem' : mdScreen || smScreen ? '1.25rem' : '1.125rem', height: 'auto', verticalAlign: 'text-bottom' } }, React.createElement(ExtLink, null) ) ) )

        ) ) )
}

export default QuicknFullArticulo;
