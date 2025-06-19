import UsePantallaTamagnos from "./usepantallatamagnos";
import React, { useCallback, useMemo } from "react";

const IndividualStyling = () => {

  const { screenReady, xlScreen, lgScreen, mdScreen, smScreen, tnScreen, xtScreen } = UsePantallaTamagnos();

  const dinamicSize = useCallback((value: number) => {
    return xlScreen ? value * 1.4118 : lgScreen ? value * 1.2941 : mdScreen ? value * 1.1765 : smScreen ? value * 1.1176 : value;
  }, [xlScreen, lgScreen, mdScreen, smScreen]);

  const nullStyle: React.CSSProperties = useMemo(() => ({
    boxSizing: 'border-box'
  }), []);

  const nullBlockStyle: React.CSSProperties = useMemo(() => ({
    ...nullStyle, display: 'block', position: 'relative'
  }), [nullStyle]);

  const pStyle: React.CSSProperties = useMemo(() => ({
    ...nullBlockStyle, hyphens: 'auto', textAlign: 'left', textIndent: lgScreen || xlScreen ? '1.5rem' : mdScreen ? '1.25rem' : '1rem', fontSize: xlScreen || lgScreen ? '1.5rem' : mdScreen ? '1.4rem' : smScreen ? '1.21rem' : '1.13rem', fontWeight: 400, color: 'rgba(51,65,85,0.6)', lineHeight: 1.625
  }), [nullBlockStyle, lgScreen, xlScreen, mdScreen, smScreen]);

  const pStyleB: React.CSSProperties = useMemo(() => ({
    ...pStyle, padding: '0', margin: xlScreen || lgScreen ? '1rem 0' : mdScreen ? '0.75rem 0' : smScreen ? '0.5rem 0' : '0.5rem 0'
  }), [pStyle, lgScreen, xlScreen, mdScreen, smScreen]);

  const pBold: React.CSSProperties = useMemo(() => ({
    ...pStyle, display: 'inline', boxSizing: 'border-box', position: 'relative', margin: '0', padding: '0', fontWeight: '500', color: 'rgba(51,65,85,1)'
  }), [pStyle]);

  const pStyleC: React.CSSProperties = useMemo(() => ({
    marginTop: xlScreen || lgScreen ? '0.5rem' : '0.25rem', textAlign: 'left', fontSize: '1.125rem', lineHeight: '1.5'
  }), [lgScreen, xlScreen])

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
    display: 'inline-block', height: '1.5rem', width: '6.3rem', borderRadius: '0.375rem', textAlign: 'center', verticalAlign: 'top', paddingBottom: '1.75rem', margin: '0.5rem 0.5rem 0 0', borderStyle: 'solid', borderWidth: '2px',  
  }), []);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    const el = ref.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 48;
    window.scrollTo({ top: y, behavior: 'smooth' } ) };

  return {
      screenReady, xlScreen, lgScreen, mdScreen, smScreen, tnScreen, xtScreen,
      nullStyle, nullBlockStyle, pStyle, pStyleB, pBold,
      pStyleC, h4Style, h4StyleB, h4BStyle, navRapLi, navRapSp, imgsDesc, h5Style, intrfzSelecc,
      dinamicSize, scrollTo } }

export default IndividualStyling;