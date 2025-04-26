import React, { useEffect, useState, useMemo, useCallback } from 'react';
import UsePantallaTamagnos from '@/hooks/usepantallatamagnos';


const LayeredTabsArticulo: React.FC = () => {

  const tabShoulder = "polygon(76.901% 0.074%,76.901% 0.074%,73.551% 0.145%,70.366% 0.248%,67.343% 0.384%,64.479% 0.552%,61.773% 0.754%,59.222% 0.988%,56.826% 1.256%,54.581% 1.558%,52.485% 1.892%,50.537% 2.261%,50.537% 2.261%,49.096% 2.58%,47.729% 2.926%,46.439% 3.299%,45.228% 3.697%,44.099% 4.12%,43.054% 4.567%,42.096% 5.037%,41.228% 5.529%,40.452% 6.041%,39.77% 6.575%,39.77% 6.575%,39.026% 7.256%,38.377% 7.967%,37.81% 8.743%,37.311% 9.614%,36.87% 10.613%,36.472% 11.774%,36.105% 13.127%,35.757% 14.707%,35.414% 16.545%,35.063% 18.674%,35.063% 18.674%,34.705% 21.056%,34.277% 24.081%,33.791% 27.641%,33.263% 31.624%,32.707% 35.922%,32.136% 40.424%,31.564% 45.02%,31.007% 49.601%,30.476% 54.057%,29.988% 58.277%,29.988% 58.277%,29.394% 63.447%,28.835% 68.215%,28.312% 72.575%,27.826% 76.521%,27.376% 80.046%,26.965% 83.145%,26.593% 85.812%,26.26% 88.039%,25.968% 89.821%,25.717% 91.151%,25.717% 91.151%,25.548% 91.908%,25.368% 92.586%,25.171% 93.193%,24.954% 93.738%,24.712% 94.229%,24.44% 94.674%,24.133% 95.083%,23.788% 95.463%,23.399% 95.823%,22.961% 96.171%,22.961% 96.171%,22.115% 96.722%,21.125% 97.226%,19.985% 97.683%,18.688% 98.095%,17.23% 98.463%,15.604% 98.789%,13.804% 99.073%,11.826% 99.317%,9.662% 99.523%,7.308% 99.69%,7.308% 99.69%,6.713% 99.725%,6.039% 99.759%,5.303% 99.792%,4.524% 99.824%,3.722% 99.854%,2.916% 99.882%,2.123% 99.906%,1.363% 99.926%,0.654% 99.942%,0.016% 99.953%,0.016% 99.953%,0.476% 99.957%,2.207% 99.961%,5.105% 99.965%,9.066% 99.969%,13.989% 99.972%,19.768% 99.976%,26.3% 99.979%,33.482% 99.982%,41.211% 99.984%,49.382% 99.987%,100.016% 100%,100.016% 50%,100.016% 0%,90.007% 0.013%,90.007% 0.013%,88.346% 0.016%,86.69% 0.02%,85.066% 0.024%,83.501% 0.03%,82.023% 0.036%,80.659% 0.043%,79.437% 0.05%,78.385% 0.058%,77.531% 0.066%,76.901% 0.074%)";
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
  }), [pStyle])
  /*
    const h4Style: React.CSSProperties = useMemo(() =>({
      ...nullBlockStyle, hyphens: 'none', textAlign: 'left', color: 'rgba(51,65,85,1)', fontWeight: '600', lineHeight: '1.5', fontSize: xlScreen || lgScreen ? '1.5rem' : '1.25rem'
    }),[nullBlockStyle, lgScreen, xlScreen ]);
  
    const pStyleC: React.CSSProperties = useMemo(() => ({
      marginTop: lgScreen ? '0.5rem' : '0.25rem', textAlign: 'left', fontSize: '1.125rem', lineHeight: '1.5'
    }), [lgScreen])
  
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
  
    const h5Style: React.CSSProperties = useMemo(() =>({
      hyphens: 'none', textAlign: 'left', color: 'rgba(51,65,85,0.8)', fontWeight: 400, lineHeight: '1.5', fontSize: lgScreen || xlScreen ? '1.25rem' : mdScreen || smScreen ? '1.125rem' : '1.125rem', margin: lgScreen || xlScreen ? '2rem 0 0 0' : mdScreen ? '1.5rem 0 0 0' : smScreen ? '1.25rem 0 0 0' : '1.25rem 0 0 0',
    }), [xlScreen, lgScreen, mdScreen, smScreen]);
  
    const intrfzSelecc: React.CSSProperties = useMemo(() =>({
      display: 'inline-block', height: '1.5rem', width: '6rem', borderRadius: '0.375rem', textAlign: 'center', verticalAlign: 'top', paddingBottom: '1.75rem', margin: '0.5rem 0.5rem 0 0', borderStyle: 'solid', borderWidth: '2px',  
    }), []);
  */

    const dinamicSize = useCallback((value: number) => {
      return xlScreen ? value * 1.4118 : lgScreen ? value * 1.2941 : mdScreen ? value * 1.1765 : smScreen ? value * 1.1176 : value;
    }, [xlScreen, lgScreen, mdScreen, smScreen])
  
  // const shoulderHeight = useMemo(() => xlScreen ? 3 : lgScreen ? 2.75 : mdScreen ? 2.5 : smScreen ? 2.375 : 2.125, [xlScreen, lgScreen, mdScreen, smScreen] );
  const shoulderHeight = dinamicSize(2.125);
  const shoulderWidth = shoulderHeight * 0.7104;

  const [currentTab, setCurrentTab] = useState(0);

  if (!screenReady) return null;

  return React.createElement('section', { style: { display: 'block', padding: '0', margin: '0', boxSizing: 'border-box', position: 'relative', transition: 'opacity 400ms ease-in-out', opacity: pageLoaded ? 1 : 0, pointerEvents: pageLoaded ? 'auto' : 'none', fontFamily: '"Pangea Trial", sans-serif' } },
    React.createElement('div', { style: { display: 'block', margin: '0', boxSizing: 'border-box', position: 'relative', transition: 'all 300ms ease-in-out', padding: lgScreen ? '5rem 3rem 5rem 3rem' : mdScreen ? '3.5rem 2.1rem 3.5rem 2.1rem' : smScreen ? '3rem 1.75rem 3rem 1.75rem' : '1.8rem 0.5rem 1.8rem 0.5rem' } },
      React.createElement('h3', { style: { display: 'block', padding: '0', boxSizing: 'border-box', margin: lgScreen ? '2.8rem 1.4rem 1.3rem 1.4rem' : mdScreen ? '2.8rem 1.4rem 0.8rem 1.4rem' : smScreen ? '3rem 1.5rem 0.8rem 1.5rem' : '3rem 1.5rem 0.8rem 1.5rem', textAlign: 'left', transition: 'all 300ms ease-in-out', fontWeight: '600', color: 'rgba(50,66,89,1)', fontSize: lgScreen ? '2.2rem' : mdScreen ? '2rem' : smScreen ? '1.7rem' : '1.5rem', lineHeight: lgScreen ? '1' : mdScreen ? '2.5rem' : smScreen ? '2.25rem' : '2rem' } },
        "LayeredTabs"),
      React.createElement('div', { style: { display: 'block', margin: '0', boxSizing: 'border-box', position: 'relative', transition: 'all 300ms ease-in-out', padding: '1.5rem', borderTopLeftRadius: '0.3rem', overflow: 'hidden' } },
        React.createElement('div', { style: { display: 'block', padding: '0', margin: '0', boxSizing: 'border-box', position: 'absolute', inset: '0', background: 'linear-gradient( to bottom, rgba(51,65,85,0.05) 0%, rgba(51,65,85,0.005) 2rem, rgba(51,65,85,0) 100%), linear-gradient( to bottom, rgba(0,0,0,0.1) 0%, rgba(51,65,85,0.01) 0.4rem, rgba(51,65,85,0) 100%)', maskImage: 'linear-gradient( to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 2%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' } }),
        React.createElement('div', { style: { display: 'block', padding: '0', margin: '0', boxSizing: 'border-box', position: 'absolute', inset: '0', background: 'linear-gradient( to right, rgba(51,65,85,0.05) 0%, rgba(51,65,85,0.005) 2rem, rgba(51,65,85,0) 100%), linear-gradient( to right, rgba(0,0,0,0.1) 0%, rgba(51,65,85,0.01) 0.4rem, rgba(51,65,85,0) 100%)', maskImage: 'linear-gradient( to bottom, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)', pointerEvents: 'none' } }),

        React.createElement('p', { style: { ...pStyleB } },
          'Presentar contenido en capas facilita la navegación y en algunos casos se vuelve imprescindible.  ', ' Organizar textos, documentos y/o contenido web con ', React.createElement('span', { style: { ...pBold } }, 'LayeredTabs'), ' es simple y proporciona formatos distintos. Aún en desarrollo.'),

        React.createElement('div', { style: { borderRadius: '0.38rem', overflow: 'hidden', display: 'block', padding: '0', margin: xlScreen || lgScreen ? '3.5rem 0 0 0' : mdScreen ? '2.5rem 0 0 0' : smScreen ? '2rem 0 0 0' : '2rem 0 0 0', position: 'relative', boxSizing: 'border-box', width: `100%`, height: `auto`, background: '#fff' } },

// LayeredTabs

          React.createElement('div', { style: { display: 'block', padding: '0', margin: '0', position: 'relative', boxSizing: 'border-box', width: `100%`, height: `auto` } },

            React.createElement('div', { style: { display: 'block', padding: '0', margin: '0', position: 'relative', boxSizing: 'border-box', width: `100%`, height: dinamicSize(2.125) + dinamicSize(1.4164) + 'rem', maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 9%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 91%, rgba(0,0,0,0) 100%)' } },

              React.createElement("div", { style: { zIndex: 10, display: 'block', position: "absolute", boxSizing: 'border-box', inset: "0", backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.005) 5%, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.01) 21%, rgba(0,0,0,0) 100%)", pointerEvents: 'none' } }),

              React.createElement("div", { style: { display: 'block', padding: `${dinamicSize(1.4164)}rem ${dinamicSize(2.5)}rem 0 ${dinamicSize(2.5)}rem`, margin: `0`, boxSizing: 'border-box', position: 'relative', width: 'auto', height: '100%', whiteSpace: 'nowrap', overflowX: 'scroll', overflowY: 'hidden', scrollbarWidth: 'none' } },
                [ 'Lorem Ipsum', 'Dolor Sit Amet', 'Consectetur', 'Adipiscing Elit' ].map((titulo, index) => React.createElement('div', { key: index, onClick: () => setCurrentTab(index), style: { transform: `translateX(calc(-${shoulderWidth * index}rem))`, cursor: 'pointer', zIndex: currentTab === index ? 11 : 9 - index, filter: `drop-shadow(0 -${dinamicSize(0.3)}rem ${dinamicSize(0.5)}rem rgba(0,0,0,${currentTab === index ? 0.15 : 0.11}))`, display: 'inline-block', padding: '0', margin: '0', position: 'relative', boxSizing: 'border-box', width: `auto`, height: `100%` } },
                  React.createElement('div', { style: { transition: 'all 100ms ease-in-out', filter: `drop-shadow(0 -${dinamicSize(0.1)}em ${dinamicSize(0.1)}rem rgba(0,0,0,${currentTab === index ? 0.15 : 0.11}))`, display: 'block', whiteSpace: 'nowrap', padding: '0', margin: '0', position: 'relative', boxSizing: 'border-box', width: `100%`, height: `100%` } },
                    React.createElement('div', { style: { transition: 'all 100ms ease-in-out', display: 'inline-block', background: '#fff', padding: '0', margin: '0', position: 'relative', boxSizing: 'border-box', height: `100%`, aspectRatio: '1056 / 1486', clipPath: tabShoulder } }),
                    React.createElement('div', { style: { transition: 'all 200ms ease-in-out', transform: 'translateX(-0.05rem)', display: 'inline-block', background: '#fff', padding: '0', margin: '0', position: 'relative', boxSizing: 'border-box', height: `100%`, maxWidth: '21rem', textAlign: 'center', verticalAlign: 'top', alignContent: 'end', overflow: 'hidden' } },
                      React.createElement('span', { style: { transition: 'all 200ms ease-in-out', display: 'inline-block', padding: `0 ${dinamicSize(0.25)}rem`, margin: '0', boxSizing: 'border-box', fontWeight: '600', fontSize: `${dinamicSize(1.125)}rem`, color: 'rgba(51,65,85,1)', opacity: currentTab === index ? 1 : 0.3,  } },
                        titulo) ),
                    React.createElement('div', { style: { transition: 'all 200ms ease-in-out',transform: "translateX(-0.1rem) scaleX(-1)", display: 'inline-block', background: '#fff', padding: '0', margin: '0', position: 'relative', boxSizing: 'border-box', height: `100%`, aspectRatio: '1056 / 1486', clipPath: tabShoulder } } ) ) ), ),
              )
            ),

            React.createElement('div', { style: { zIndex: 11, display: 'block', background: '#fff', padding: dinamicSize(1.6)+ 'rem ' + dinamicSize(2) + 'rem', margin: '0', position: 'relative', boxSizing: 'border-box', width: `100%` } },
              React.createElement('p', { style: { transition: 'all 100ms ease-in-out', display: 'block', position: 'relative', boxSizing: 'border-box', hyphens: 'auto', textAlign: 'left', textIndent: dinamicSize(1) + 'rem', fontSize: dinamicSize(1.125) + 'rem', fontWeight: 400, color: 'rgba(51,65,85,0.6)', lineHeight: 1.625 } },
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse luctus egestas mi, quis mollis magna dapibus in. Aliquam non blandit nibh, vel mattis tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur arcu nulla, tincidunt et tincidunt nec, ornare ac ligula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean tempus congue augue, sit amet facilisis massa scelerisque nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec consectetur rhoncus purus sit amet scelerisque.") )

          ),

// 

          React.createElement('div', { style: { zIndex: 200, display: 'block', padding: '0', margin: '0', boxSizing: 'border-box', position: 'absolute', inset: 0, boxShadow: 'inset 0 0.1rem 0.6rem rgba(0, 0, 0, 0.15)', pointerEvents: 'none' } } )
        
        )
      )
    )
  )
}

export default LayeredTabsArticulo;
