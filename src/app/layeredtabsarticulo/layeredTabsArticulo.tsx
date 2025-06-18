import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import UsePantallaTamagnos from '@/hooks/usepantallatamagnos';
import LayeredTabs from '@/components/layeredTabs';
import ExtLink from '@/components/extLink';


const LayeredTabsArticulo: React.FC = () => {

  const tabsContentList = [ 
      { title: 'Next.js Website', titleLang: 'en', content: (<iframe src="https://nextjs.org" width="100%" height="100%" className={` w-full h-full `}/>) },
      { title: 'Modernize Template', titleLang: 'en', content: (<iframe src="https://modernize-nextjs-free.vercel.app/" width="100%" height="100%" className={` w-full h-full `}/>) },
//    { title: 'Netlify Website', content: (<iframe src="https://www.netlify.com" width="100%" height="100%" className={` w-full h-full `}/>) },
//    { title: 'K-Pop Stack Netlify Template', content: (<iframe src="https://kpop-stack.netlify.app" width="100%" height="100%" className={` w-full h-full `}/>) },
      { title: 'Lorem Ipsum', titleLang: 'la', independentBgColor: '#555555', independentTxColor: '#AAFFFF', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus scelerisque, odio ac consectetur tincidunt, nisi eros ornare nisl, varius consequat justo eros a purus. Sed quis pellentesque augue. Nulla scelerisque porttitor pulvinar. Pellentesque commodo, sem in pretium iaculis, nulla ex auctor elit, in accumsan nisi ante sed diam. Pellentesque semper cursus augue vitae suscipit. Suspendisse pulvinar leo diam, ultricies accumsan nibh molestie quis. Nulla eget efficitur nunc. Nullam iaculis a augue et finibus. Nunc tempor, nibh at interdum egestas, ligula massa vestibulum enim, quis facilisis arcu urna viverra justo. Curabitur cursus euismod sagittis. Aenean quis sapien lacus. Donec pellentesque ipsum turpis, sed ornare magna tincidunt ac. Sed sit amet nisl condimentum, mollis risus ac, molestie elit. Donec blandit, dui id mollis ullamcorper, ligula massa scelerisque diam, eget lobortis velit ante eget ipsum. Sed consectetur nunc nibh.' },
      { title: 'Proin Vitae Molestie', titleLang: 'la', content: 'Proin vitae molestie tellus, sit amet molestie dui. Cras rhoncus dui nec ante consequat, vel malesuada dui pharetra. Nunc sollicitudin interdum bibendum. Sed id posuere tortor. Mauris id metus in ante gravida finibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut finibus sed lacus et aliquet' },
      { title: 'Maecenas', titleLang: 'la', content: 'Maecenas lorem sapien, feugiat vitae gravida vel, lobortis sed libero. Ut mollis odio a sem malesuada, efficitur mollis mauris pharetra. Phasellus sem purus, commodo a dignissim vehicula, ultrices vel massa. Aliquam vulputate non urna id placerat. Donec tempor tristique neque id venenatis. Quisque malesuada nulla sed sem rutrum facilisis. Proin sit amet est urna. Ut vel dui faucibus, dapibus nunc nec, maximus justo.'},
      { title: 'Pellentesque Habitant', titleLang: 'la', content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum volutpat massa nec purus tempus placerat. Sed hendrerit pulvinar molestie. Nulla facilisi. Praesent non sagittis quam, sit amet vestibulum urna. Pellentesque sollicitudin eleifend ante, et finibus felis faucibus vitae. Suspendisse venenatis nisi et purus aliquet, id molestie tellus laoreet. Sed nunc est, varius in urna vitae, laoreet cursus nibh.'},
      { title: 'In At Aliquam Orci', content: 'In at aliquam orci, eget consequat enim. Nam ultricies faucibus auctor. In laoreet quis dolor vel suscipit. Donec ut pellentesque arcu. Phasellus magna felis, porttitor in neque nec, laoreet pretium purus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin mattis finibus mauris id interdum. Integer imperdiet feugiat vehicula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac leo id magna efficitur feugiat non nec justo. Nulla dapibus nulla suscipit justo pulvinar vestibulum. Donec aliquet arcu eu gravida rhoncus. Aliquam quis eleifend dolor, placerat fringilla neque. Suspendisse vel dolor quis erat hendrerit ullamcorper.'},
      { title: 'Quisque Luctus', content: 'Quisque luctus ac nulla feugiat egestas. Donec non felis sed enim aliquet gravida. Nam rhoncus sapien quis lacus bibendum sagittis. Sed ligula risus, porta sed venenatis et, interdum id sem. Proin viverra at eros non convallis. Nulla finibus mollis enim, in placerat lacus facilisis eget. Maecenas placerat elementum lectus, ultrices tristique justo cursus elementum. Donec dolor risus, accumsan ac nunc eu, volutpat feugiat libero. Ut id augue nisi. Pellentesque at felis non massa interdum rhoncus. Morbi consectetur blandit tincidunt. Curabitur a odio gravida, consectetur metus vitae, sagittis diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer non pulvinar nisl.'},
      { title: 'Vestibulum Hendrerit Metus', content: 'Vestibulum hendrerit metus sit amet maximus euismod. Sed nec elementum nisi, non lobortis tellus. Curabitur odio felis, commodo hendrerit dui ut, ultrices pretium odio. Nunc congue et nisl et facilisis. Etiam porta erat purus, nec cursus felis elementum a. Cras eu arcu commodo, lobortis nulla quis, porttitor ligula. Duis nec odio elit. Aenean sed viverra lorem, vitae mattis est. Donec fringilla sollicitudin nulla, sed fermentum elit sollicitudin sed. Sed ut ligula in urna lobortis lacinia. Phasellus nisl velit, euismod quis lorem at, aliquet tristique urna. Proin at pellentesque enim, ac finibus elit.'},
  ];


  const barrPstTtl = useRef<HTMLHeadingElement>(null);
  const responsTtl = useRef<HTMLHeadingElement>(null);
  const lasPestTtl = useRef<HTMLHeadingElement>(null);
  const cntColrTtl = useRef<HTMLHeadingElement>(null);
  const aparPerTtl = useRef<HTMLHeadingElement>(null);
  const repDemoTtl = useRef<HTMLHeadingElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    const el = ref.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 48;
    window.scrollTo({ top: y, behavior: 'smooth' } ) };

  const [repIsHovered, setRepIsHovered] = useState(false);

  const { screenReady, xlScreen, lgScreen, mdScreen, smScreen } = UsePantallaTamagnos();

  const [pageLoaded, setPageLoaded] = useState(false);
  useEffect(() => {
    if (!screenReady) return;
    const timeout = setTimeout(() => setPageLoaded(true), 500);
    return () => clearTimeout(timeout);
  }, [screenReady]);

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

  const pBold: React.CSSProperties = useMemo(() => ({
    ...pStyle, display: 'inline', boxSizing: 'border-box', position: 'relative', margin: '0', padding: '0', fontWeight: '500', color: 'rgba(51,65,85,1)'
  }), [pStyle]);

  const h4BStyle: React.CSSProperties = useMemo(() =>({
    ...nullBlockStyle, hyphens: 'none', textAlign: 'left', color: 'rgba(51,65,85,1)', fontWeight: '500', lineHeight: '1.5', fontSize: xlScreen || lgScreen ? '1.5rem' : '1.25rem', padding: '0', margin: xlScreen || lgScreen ? '1.7rem 0 0.5rem 1.5rem' : mdScreen ? '1.3rem 0 0.5rem 1.25rem' : '1rem 0 0.5rem 1rem'
  }),[nullBlockStyle, mdScreen, lgScreen, xlScreen ]);

  const h5Style: React.CSSProperties = useMemo(() =>({
    hyphens: 'none', textAlign: 'left', color: 'rgba(51,65,85,0.8)', fontWeight: 400, lineHeight: '1.5', fontSize: lgScreen || xlScreen ? '1.25rem' : mdScreen || smScreen ? '1.125rem' : '1.125rem', margin: lgScreen || xlScreen ? '2rem 0 0 0' : mdScreen ? '1.5rem 0 0 0' : smScreen ? '1.25rem 0 0 0' : '1.25rem 0 0 0',
  }), [xlScreen, lgScreen, mdScreen, smScreen]);

  const navRapLi: React.CSSProperties = useMemo(() => ({
    ...nullBlockStyle, hyphens: 'auto', fontSize: lgScreen || xlScreen ? '1.175rem' : mdScreen || smScreen ? '1.125rem' : '1rem', fontWeight: 400, color: 'rgba(51,65,85,0.7)', lineHeight: 1.625, padding: '0', margin: xlScreen || lgScreen ? '1rem 0 0 1.5rem' : mdScreen ? '0.75rem 0 0 1.25rem' : smScreen ? '0.5rem 0 0 0' : '0.5rem 0 0 1rem'
  }), [ nullBlockStyle, xlScreen, lgScreen, mdScreen, smScreen]);

  const navRapSp: React.CSSProperties = useMemo(() => ({
    ...nullStyle, cursor: 'pointer', display: 'inline', padding: '0', margin: '0'
  }), [nullStyle]);

  const pStyleC: React.CSSProperties = useMemo(() => ({
    marginTop: lgScreen ? '0.5rem' : '0.25rem', textAlign: 'left', fontSize: '1.125rem', lineHeight: '1.5'
  }), [lgScreen]);

  const h4Style: React.CSSProperties = useMemo(() =>({
    ...nullBlockStyle, hyphens: 'none', textAlign: 'left', color: 'rgba(51,65,85,1)', fontWeight: '600', lineHeight: '1.5', fontSize: xlScreen || lgScreen ? '1.5rem' : '1.25rem'
  }),[nullBlockStyle, lgScreen, xlScreen ]);

  const h4StyleB: React.CSSProperties = useMemo(() => ({
    ...h4Style, marginTop: xlScreen || lgScreen ? '3.5rem' : mdScreen ? '2.5rem' : smScreen ? '2rem' : '2rem'
  }), [h4Style, xlScreen, lgScreen, mdScreen, smScreen])

  /*
    const h4StyleB: React.CSSProperties = useMemo(() => ({
      ...h4Style, marginTop: lgScreen ? '3.5rem' : mdScreen ? '2.5rem' : smScreen ? '2rem' : '2rem'
    }), [h4Style, lgScreen, mdScreen, smScreen])
  
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
  
  */

    // botones
    const intrfzSelecc: React.CSSProperties = useMemo(() =>({
      display: 'inline-block', height: '1.5rem', minWidth: '7rem', borderRadius: '0.375rem', textAlign: 'center', verticalAlign: 'top', paddingBottom: '1.75rem', margin: '0.5rem 0.5rem 0 0', borderStyle: 'solid',  
    }), []);

    const tabBarPositionStyle = (state: number): React.CSSProperties => ({
      ...intrfzSelecc, borderWidth: '0.125rem', fontWeight: state === tabBarPosition ? 600 : 400, color: state === tabBarPosition ? 'rgba(51,65,85,0.8)' : 'rgba(51,65,85,0.6)', borderColor: state === tabBarPosition ? 'rgba(51,65,85,0.9)' : 'rgba(51,65,85,0.5)', cursor: state === tabBarPosition ? 'default' : 'pointer',
    });

    const maxSizeStyle = (label: string): React.CSSProperties => ({
      ...intrfzSelecc, borderWidth: '0.125rem', fontWeight: label === maxSize ? 600 : 400, color: label === maxSize ? 'rgba(51,65,85,0.8)' : 'rgba(51,65,85,0.6)', borderColor: label === maxSize ? 'rgba(51,65,85,0.9)' : 'rgba(51,65,85,0.5)', cursor: label === maxSize ? 'default' : 'pointer',
      });
  
    const fixedMaxSizeStyle = (value: boolean): React.CSSProperties => ({
      ...intrfzSelecc, borderWidth: '0.125rem', fontWeight: fixedMaxSize === value ? 600 : 400, color: fixedMaxSize === value ? 'rgba(51,65,85,0.8)' : 'rgba(51,65,85,0.6)', borderColor: fixedMaxSize === value ? 'rgba(51,65,85,0.9)' : 'rgba(51,65,85,0.5)', cursor: fixedMaxSize === value ? 'default' : 'pointer',
      });
  
    const tabWidthStyle = (label: number): React.CSSProperties => ({
      ...intrfzSelecc, borderWidth: '0.125rem', fontWeight: label === tabWidth ? 600 : 400, color: label === tabWidth ? 'rgba(51,65,85,0.8)' : 'rgba(51,65,85,0.6)', borderColor: label === tabWidth ? 'rgba(51,65,85,0.9)' : 'rgba(51,65,85,0.5)', cursor: label === tabWidth ? 'default' : 'pointer',
      });

    const fullWindowStyle = (value: boolean): React.CSSProperties => ({
      ...intrfzSelecc, borderWidth: '0.125rem', fontWeight: fullWindow === value ? 600 : 400, color: fullWindow === value ? 'rgba(51,65,85,0.8)' : 'rgba(51,65,85,0.6)', borderColor: fullWindow === value ? 'rgba(51,65,85,0.9)' : 'rgba(51,65,85,0.5)', cursor: fullWindow === value ? 'default' : 'pointer',
      });
  
  
    // colores botones
    const selccPgnClr = (colorValue: string): React.CSSProperties => ({
      ...intrfzSelecc, borderWidth: '0.125rem', fontWeight: slcPptgnColor === colorValue ? 500 : 400, color: slcPptgnColor === colorValue ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.4)', borderColor: slcPptgnColor === colorValue ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)', cursor: slcPptgnColor === colorValue ? 'default' : 'pointer', backgroundColor: colorValue === 'transparent' ? 'transparent' : '#' + colorValue });
  
    const pstgnClr = (colorValue: string): React.CSSProperties => ({
      ...intrfzSelecc, borderWidth: '0.125rem', fontWeight: ptgnBarColor === colorValue ? 500 : 400, color: ptgnBarColor === colorValue ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.4)', borderColor: ptgnBarColor === colorValue ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)', cursor: ptgnBarColor === colorValue ? 'default' : 'pointer', backgroundColor: colorValue === 'transparent' ? 'transparent' : '#' + colorValue });
  
    const fondoBarClr = (colorValue: string): React.CSSProperties => ({
      ...intrfzSelecc, borderWidth: '0.125rem', fontWeight: fondoBarColor === colorValue ? 500 : 400, color: fondoBarColor === colorValue ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.4)', borderColor: fondoBarColor === colorValue ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)', cursor: fondoBarColor === colorValue ? 'default' : 'pointer', backgroundColor: colorValue === 'transparent' ? 'transparent' : '#' + colorValue });
  
    const fondoClr = (colorValue: string): React.CSSProperties => ({
      ...intrfzSelecc, borderWidth: '0.125rem', fontWeight: fondoColor === colorValue ? 500 : 400, color: fondoColor === colorValue ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.4)', borderColor: fondoColor === colorValue ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.2)', cursor: fondoColor === colorValue ? 'default' : 'pointer', backgroundColor: colorValue === 'transparent' ? 'transparent' : '#' + colorValue });
  
    const [maxSize, setMaxSize] = useState("xl");
    const [fixedMaxSize, setFixedMaxSize] = useState<boolean>(false);
    const dinamicSize = useCallback((value: number) => {
      return xlScreen ? value * 1.4118 : lgScreen ? value * 1.2941 : mdScreen ? value * 1.1765 : smScreen ? value * 1.1176 : value;
    }, [ xlScreen, lgScreen, mdScreen, smScreen])
  
  const [fondoBarColor, setFondoBarColor] = useState("#FFFFFF");
  const [ptgnBarColor, setPtgnBarColor] = useState("#FFFFFF");
  const [fondoColor, setFondoColor] = useState("#FFFFFF");
  const [slcPptgnColor, setSlcPptgnColor] = useState("#FFFFFF");

  const [tabWidth, setTabWidth] = useState<number>(8);
  const [tabBarPosition, setTabBarPosition] = useState<number>(1);
  const [fullWindow, setFullWindow] = useState<boolean>(false);

  const [fwButtonMouseOver, setFwButtonMouseOver] = useState<boolean>(false);

  const bgExampleColors = [
    { label: "Transparent", hexCode: "transparent" },
    { label: "White", hexCode: "FFFFFF" },
    { label: "Alice Blue", hexCode: "EDF8FF" },
    { label: "Azureish", hexCode: "D9E4FB" },
    { label: "Lavender", hexCode: "E5E4F4" },
    { label: "Isabelline", hexCode: "F8F0EC" },
    { label: "Calcite", hexCode: "FDF9F0" },
    { label: "Peridot", hexCode: "E8F1DE" } ];

  if (!screenReady) return null;

  return React.createElement('section', { style: { display: 'block', padding: '0', margin: '0', boxSizing: 'border-box', position: 'relative', transition: 'opacity 400ms ease-in-out', opacity: pageLoaded ? 1 : 0, pointerEvents: pageLoaded ? 'auto' : 'none', fontFamily: '"Pangea Trial", sans-serif', letterSpacing: dinamicSize(-0.008) + 'rem' } },
    React.createElement('div', { style: { display: 'block', margin: '0', boxSizing: 'border-box', position: 'relative', transition: 'all 300ms ease-in-out', padding: lgScreen ? '5rem 3rem 5rem 3rem' : mdScreen ? '3.5rem 2.1rem 3.5rem 2.1rem' : smScreen ? '3rem 1.75rem 3rem 1.75rem' : '1.8rem 0.5rem 1.8rem 0.5rem' } },
      React.createElement('h3', { style: { display: 'block', padding: '0', boxSizing: 'border-box', margin: lgScreen ? '2.8rem 1.4rem 1.3rem 1.4rem' : mdScreen ? '2.8rem 1.4rem 0.8rem 1.4rem' : smScreen ? '3rem 1.5rem 0.8rem 1.5rem' : '3rem 1.5rem 0.8rem 1.5rem', textAlign: 'left', transition: 'all 300ms ease-in-out', fontWeight: '600', color: 'rgba(50,66,89,1)', fontSize: lgScreen ? '2.2rem' : mdScreen ? '2rem' : smScreen ? '1.7rem' : '1.5rem', lineHeight: lgScreen ? '1' : mdScreen ? '2.5rem' : smScreen ? '2.25rem' : '2rem' } },
        "LayeredTabs"),
      React.createElement('div', { style: { display: 'block', margin: '0', boxSizing: 'border-box', position: 'relative', transition: 'all 300ms ease-in-out', padding: '1.5rem', borderTopLeftRadius: '0.3rem', overflow: 'hidden' } },
        React.createElement('div', { style: { display: 'block', padding: '0', margin: '0', boxSizing: 'border-box', position: 'absolute', inset: '0', background: 'linear-gradient( to bottom, rgba(51,65,85,0.05) 0%, rgba(51,65,85,0.005) 2rem, rgba(51,65,85,0) 100%), linear-gradient( to bottom, rgba(0,0,0,0.1) 0%, rgba(51,65,85,0.01) 0.4rem, rgba(51,65,85,0) 100%)', maskImage: 'linear-gradient( to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 2%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' } }),
        React.createElement('div', { style: { display: 'block', padding: '0', margin: '0', boxSizing: 'border-box', position: 'absolute', inset: '0', background: 'linear-gradient( to right, rgba(51,65,85,0.05) 0%, rgba(51,65,85,0.005) 2rem, rgba(51,65,85,0) 100%), linear-gradient( to right, rgba(0,0,0,0.1) 0%, rgba(51,65,85,0.01) 0.4rem, rgba(51,65,85,0) 100%)', maskImage: 'linear-gradient( to bottom, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' } } ),

        React.createElement('p', { style: { ...pStyleB } },
          'Presentar contenido en capas navegables a través de pestañas, es una forma tradicional de ordenamiento en páginas y sitios webs. ', React.createElement('span', { style: { ...pBold } }, 'LayeredTabs'), ' procura hacer muy simple la implementación de esta forma de organizar contenido web, proporciona formatos distintos y apariencia personalizable. Un repositorio demo ya se encuentra disponible y, pronto, un paquete npm instalable.'),

          React.createElement('h4', { style: { ...h4BStyle } },
            'Navegación rápida:' ),
          React.createElement('ul', { style: { ...nullBlockStyle, padding: '0', margin: xlScreen || lgScreen ? '1rem 0 3.8rem 0' : mdScreen ? '0.75rem 0 3rem 0' : smScreen ? '0.5rem 0 2.2rem 0' : '0.5rem 0 2rem 0' } },
            [ { label: 'La barra de pestaña', ref: barrPstTtl },
              { label: 'Responsividad de la barra de pestañas', ref: responsTtl },
              { label: 'Las pestañas', ref: lasPestTtl },
              { label: 'El contenido y los colores', ref: cntColrTtl },
              { label: 'Apariencia personalizable', ref: aparPerTtl },
              { label: 'Repositorio demo', ref: repDemoTtl } ].map(({ label, ref }, index) =>
              React.createElement('li', { key: index, style: { ...navRapLi } },
                `${index + 1}.— `, React.createElement('span', { onClick: () => scrollTo(ref), style: { ...navRapSp }, className: `hover:underline` }, label ) ) ) ),

          React.createElement('hr', { style: { ...nullBlockStyle, border: 'none', height: xlScreen || lgScreen ? '0.1rem' : mdScreen ? '0.075rem' :  '0.05rem', background: 'rgba(51,65,85,0.3)' } } ), 

        React.createElement('h4', { ref: barrPstTtl, style: { ...h4Style, padding: '0', margin: xlScreen || lgScreen ? '3rem 0 0 0' : mdScreen ? '2rem 0 0 0' : '1rem 0 0 0' } },
          `La barra de pestaña` ),
        React.createElement('p', { style: { ...pStyleB } },
          'La barra de pestañas es deslizable desde un touchscreen, un trackpad o un mousewheel, puede posicionarse en la parte superior o inferior y su tamaño se ajusta siguiendo responsividad.'),

        React.createElement('h4', { ref: responsTtl, style: { ...h4Style, padding: '0', margin: xlScreen || lgScreen ? '3rem 0 0 0' : mdScreen ? '2rem 0 0 0' : '1rem 0 0 0' } },
          `Responsividad de la barra de pestañas` ),
        React.createElement('p', { style: { ...pStyleB } },
          'El tamaño de la barra de pestañas es responsivo y puede ajustarse a cinco tamaños máximos predefinidos. La responsividad puede ser inactivada dejando fijo el tamaño máximo seleccionado.'),

        React.createElement('h4', { ref: lasPestTtl, style: { ...h4Style, padding: '0', margin: xlScreen || lgScreen ? '3rem 0 0 0' : mdScreen ? '2rem 0 0 0' : '1rem 0 0 0' } },
          `Las pestañas` ),
        React.createElement('p', { style: { ...pStyleB } },
          'Todas las pestañas tienen ancho igual y fijo, excepto la seleccionada y la que tenga el cursor encima. Tanto la seleccionada como la que tenga el cursor encima, pueden tomar dos otros anchos conforme al largo del título el cual es acortado también. Los títulos demasiado largos son acortados en todos los casos.'),

        React.createElement('h4', { ref: cntColrTtl, style: { ...h4Style, padding: '0', margin: xlScreen || lgScreen ? '3rem 0 0 0' : mdScreen ? '2rem 0 0 0' : '1rem 0 0 0' } },
          `El contenido y los colores` ),
        React.createElement('p', { style: { ...pStyleB } },
          'Las capas pueden contener tanto texto plano como HTML. Los colores pueden ser asignados en general y/o para cada pestaña y capa por separado; las pestañas y capas sin colores asignados, toman los asignados en general.'),

        React.createElement('hr', { style: { ...nullBlockStyle, border: 'none', height: xlScreen || lgScreen ? '0.1rem' : mdScreen ? '0.075rem' :  '0.05rem', background: 'rgba(51,65,85,0.3)', margin: xlScreen || lgScreen ? '4rem 0 0 0' : mdScreen ? '3rem 0 0 0' : '2rem 0 0 0' } } ), 

        React.createElement('p', { style: { ...pStyleB, margin: xlScreen || lgScreen ? '4rem 0 0 0' : mdScreen ? '3rem 0 0 0' : '2rem 0 0 0' } },
          'Aquí se presenta el componente con seis pestañas, las dos primeras pestañas conteniendo otras páginas web y sin colores asignados, una tercera pestaña conteniendo texto plano y con colores asignados, y tres pestañas más con textos planos y sin colores asignados. Tanto las dos primeras pestañas como las tres últimas toman los colores asignados en general.'),

        React.createElement('div', { style: { width: '100%', height: dinamicSize(21.5414) + 'rem', boxSizing: 'border-box', display: 'block', padding: '0', margin: xlScreen || lgScreen ? '3.5rem 0 0 0' : mdScreen ? '2.5rem 0 0 0' : smScreen ? '2rem 0 0 0' : '2rem 0 0 0' } },
          React.createElement(LayeredTabs, { fondoBarColor, ptgnBarColor, fondoColor, slcPptgnColor, tabBarPostn: tabBarPosition, maxSize, tabWidth, fixedMaxSize, fullWindow },
            tabsContentList.map((tab, index) => React.createElement(LayeredTabs.Tab, { key: index, title: tab.title, ...(tab.independentBgColor && { independentBgColor: tab.independentBgColor }), ...(tab.independentTxColor && { independentTxColor: tab.independentTxColor }) }, tab.content ) ) ) ),

        fullWindow && React.createElement('div', { onClick: () => { setFullWindow(false); setFwButtonMouseOver(false) }, onMouseOver: () => setFwButtonMouseOver(true), onMouseOut: () => setFwButtonMouseOver(false), style: { boxSizing: 'border-box', borderRadius: '0.375rem', borderWidth: dinamicSize(0.1) + 'rem', borderStyle: 'solid', borderColor: fwButtonMouseOver ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.2)', position: 'fixed', left: '50%', bottom: dinamicSize(2) + 'rem', transform: 'translateX(-50%)', zIndex: '1001', textAlign: 'center', verticalAlign: 'top', background: fwButtonMouseOver ? 'black' : '#fffaf4', width: 'auto', height: 'auto', margin: '0', padding: dinamicSize(0.3) + 'rem ' + dinamicSize(1) + 'rem', fontWeight: 500, color: fwButtonMouseOver ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.4)', cursor: 'pointer', boxShadow: '0 ' + dinamicSize(0.625) + 'rem ' + dinamicSize(0.9375) + 'rem -' + dinamicSize(0.1875) + `rem rgb(0,0,0,${ fwButtonMouseOver ? '1' : '0.6' } ), 0 ` + dinamicSize(0.25) + 'rem ' + dinamicSize(0.375) + 'rem -' + dinamicSize(0.25) + 'rem rgb(0,0,0,0.1)', transition: 'all 100ms linear', fontSize: dinamicSize(0.9) + 'rem' } }, 'Cerrar ventana completa' ) ,

/*
        <LayeredTabs fondoBarColor={fondoBarColor} ptgnBarColor={ptgnBarColor} fondoColor={fondoColor} slcPptgnColor={slcPptgnColor} tabBarPosition={tabBarPosition} maxSize={maxSize}>
          <LayeredTabs.Tab title="Hola A">
            <div className="font-extralight text-blue-900">
              Nothing gonna change
            </div>
          </LayeredTabs.Tab>
          <LayeredTabs.Tab title="Hola B">
            <div className="font-extralight text-blue-900">
              Nothing gonna change
            </div>
          </LayeredTabs.Tab>
        </LayeredTabs>,
*/

        React.createElement('h4', { ref: aparPerTtl, style: { ...h4Style, padding: '0', margin: xlScreen || lgScreen ? '4rem 0 0 0' : mdScreen ? '3rem 0 0 0' : '2rem 0 0 0' } },
            `Apariencia personalizable` ),
        React.createElement('p', { style: { ...pStyleB } },
            'En esta interfaz se pueden conocer las opciones personalizables que dispone el componente.'),

        React.createElement('h5', { style: { ...h5Style } },
            'Ventana completa' ),
        React.createElement('p', { style: { ...pStyleC } },
              [ { label: "Ventana", value: true },
                { label: "Contenedor", value: false } ].map(({ label, value }, index) => React.createElement( 'span', { key: index, onClick: () => value !== fullWindow ? setFullWindow(value) : null, style: { ...fullWindowStyle(value) } }, label ) ) ),

        React.createElement('h5', { style: { ...h5Style } },
            `Posición de la barra de pestañas` ),
        React.createElement('p', { style: { ...pStyleC } },
              [ { label: "Arriba", state: 0 },
                { label: "Superior", state: 1 },
                { label: "Inferior", state: 2 },
                { label: "Abajo", state: 3 } ].map(({ label, state }, index) => React.createElement( 'span', { key: index, onClick: () => state !== tabBarPosition ? setTabBarPosition(state) : null, style: { ...tabBarPositionStyle(state) } }, label ) ) ),

        React.createElement('h5', { style: { ...h5Style } },
            'Tamaño máximo de la barra de pestañas' ),
        React.createElement('p', { style: { ...pStyleC } },
              [ { label: "xl" },
                { label: "lg" },
                { label: "md" },
                { label: "sm" },
                { label: "xs" } ].map(({ label }, index) => React.createElement( 'span', { key: index, onClick: () => label !== maxSize ? setMaxSize(label) : null, style: { ...maxSizeStyle(label) } }, label ) ) ),

        React.createElement('h5', { style: { ...h5Style } },
            'Tamaño fijo de la barra de pestañas' ),
        React.createElement('p', { style: { ...pStyleC } },
              [ { label: "Fijo", value: true },
                { label: "Dinámico", value: false } ].map(({ label, value }, index) => React.createElement( 'span', { key: index, onClick: () => value !== fixedMaxSize ? setFixedMaxSize(value) : null, style: { ...fixedMaxSizeStyle(value) } }, label ) ) ),

        React.createElement('h5', { style: { ...h5Style } },
            'Largo de las pestañas' ),
        React.createElement('p', { style: { ...pStyleC } },
              [ { label: 5 },
                { label: 8 },
                { label: 11 } ].map(({ label }, index) => React.createElement( 'span', { key: index, onClick: () => label !== tabWidth ? setTabWidth(label) : null, style: { ...tabWidthStyle(label) } }, label ) ) ),

        React.createElement('h5', { style: { ...h5Style } },
            'Color de la pestaña seleccionada' ),
        React.createElement('p', { style: { ...pStyleC } },
            bgExampleColors.map(({ label, hexCode }, index) => React.createElement( 'span', { key: index, onClick: () => hexCode !== slcPptgnColor ? setSlcPptgnColor(hexCode) : null, style: { ...selccPgnClr(hexCode) } }, label ) ) ),

        React.createElement('h5', { style: { ...h5Style } },
            'Color de las pestañas no seleccionadas' ),
        React.createElement('p', { style: { ...pStyleC } },
            bgExampleColors.map(({ label, hexCode }, index) => React.createElement( 'span', { key: index, onClick: () => hexCode !== ptgnBarColor ? setPtgnBarColor(hexCode) : null, style: { ...pstgnClr(hexCode) } }, label ) ) ),

        React.createElement('h5', { style: { ...h5Style } },
            'Color del fondo de la barra de pestañas' ),
        React.createElement('p', { style: { ...pStyleC } },
            bgExampleColors.map(({ label, hexCode }, index) => React.createElement( 'span', { key: index, onClick: () => hexCode !== fondoBarColor ? setFondoBarColor(hexCode) : null, style: { ...fondoBarClr(hexCode) } }, label ) ) ),

        React.createElement('h5', { style: { ...h5Style } },
            'Color de la capa de contenido' ),
        React.createElement('p', { style: { ...pStyleC } },
            bgExampleColors.map(({ label, hexCode }, index) => React.createElement( 'span', { key: index, onClick: () => hexCode !== fondoColor ? setFondoColor(hexCode) : null, style: { ...fondoClr(hexCode) } }, label ) ) ),

          React.createElement('h4', { ref: repDemoTtl, style: { ...h4StyleB  } },
              `Repositorio demo` ),
          React.createElement('p', { style: { ...pStyle, padding: '0', margin: xlScreen || lgScreen ? '1rem 0 2.25rem' : mdScreen ? '0.75rem 0 2rem 0' : smScreen ? '0.5rem 0 1.75rem 0' : '0.5rem 0 1.75rem 0' } },
              'En el siguiente enlace se encuentra un respositorio GitHub el cual contiene un proyecto Next.js en blanco, solo con el componente ', React.createElement('span', { style: { ...pBold } }, 'LayeredTabs'), ' implementado. Al descargarlo y seguir las instrucciones del archivo README.md, el proyecto corre de forma local y muestra a ', React.createElement('span', { style: {  ...pBold } }, 'LayeredTabs'), ' en funcionamiento. Permite controlar las opciones personalizables, conocer el código fuente y usarlo en proyectos Next.js.' ),
          React.createElement('p', { style: { display: 'block', boxSizing: 'border-box', position: 'relative', textIndent: lgScreen || xlScreen ? '-1.5rem' : mdScreen ? '-1.25rem' : '-1rem', hyphens: 'auto', textAlign: 'left', fontSize: lgScreen || xlScreen ? '1.5rem' : mdScreen || smScreen ? '1.25rem' : '1.125rem', fontWeight: 400, color: 'rgba(51,65,85,0.6)', lineHeight: 1.625, padding: '0', margin: xlScreen || lgScreen ? '1rem 0 2.25rem 3rem' : mdScreen ? '0.75rem 0 2rem 2.5rem' : '0.5rem 0 1.75rem 2rem' } },
            React.createElement('span', { style: { ...pBold } }, '—'), React.createElement(Link, { lang: 'en', onMouseEnter: () => setRepIsHovered(true), onMouseLeave: () => setRepIsHovered(false), href: 'https://github.com/enriquefuenzalidam/layeredtabs', target: '_blank', rel: 'noopener noreferrer', title: 'Ir repositorio en GitHub de LayeredTabs', style: { ...pBold, fontStyle: 'italic', textDecoration: repIsHovered ? 'underline' : 'none', } }, 'github.com/enriquefuenzalidam/layeredtabs', React.createElement('span', { style: { display: 'inline-block', boxSizing: 'border-box', position: 'relative', margin: '0 0 0 0.35rem', padding: '0', width: lgScreen || xlScreen ? '1.5rem' : mdScreen || smScreen ? '1.25rem' : '1.125rem', height: 'auto', verticalAlign: 'text-bottom' } }, React.createElement(ExtLink, null) ) ) )

      )
    )
  )
}

export default LayeredTabsArticulo;


