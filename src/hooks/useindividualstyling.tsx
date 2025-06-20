import usePantallaTamagnos from "./usepantallatamagnos";
import React, { useCallback, useMemo } from "react";

const useIndividualStyling = () => {

  const { screenReady, xlScreen, lgScreen, mdScreen, smScreen, tnScreen, xtScreen } = usePantallaTamagnos();

  const dynSzGttr = useCallback((xl: string, lg: string, md: string, sm: string, tn: string, xt: string) => {
    return xlScreen ? xl : lgScreen ? lg : mdScreen ? md : smScreen ? sm : tnScreen ? tn : xt
  }, [xlScreen, lgScreen, mdScreen, smScreen, tnScreen]);

  const dinamicSize = useCallback((value: number) => {
    return xlScreen ? value * 1.4118 : lgScreen ? value * 1.2941 : mdScreen ? value * 1.1765 : smScreen ? value * 1.1176 : value;
  }, [xlScreen, lgScreen, mdScreen, smScreen]);

  const nullStyle: React.CSSProperties = useMemo(() => ({
    boxSizing: 'border-box'
  }), []);

  const nullBlockStyle: React.CSSProperties = useMemo(() => ({
    ...nullStyle, display: 'block', position: 'relative'
  }), [ nullStyle]);

  const pStyle: React.CSSProperties = useMemo(() => ({
    ...nullBlockStyle, hyphens: 'auto', textAlign: 'left', textIndent: dynSzGttr( '1.5', '1.5', '1.25', '1', '1', '1') + 'rem', fontSize: dynSzGttr( '1.5', '1.5', '1.4', '1.21', '1.13', '1.13') + 'rem', fontWeight: 400, color: 'rgba(51,65,85,0.6)', lineHeight: 1.625
  }), [ nullBlockStyle, dynSzGttr]);

  const pStyleB: React.CSSProperties = useMemo(() => ({
    ...pStyle, padding: '0', margin: dynSzGttr( '1', '1', '0.75', '0.5', '0.5', '0.5') + 'rem 0'
  }), [ pStyle, dynSzGttr]);

  const pBold: React.CSSProperties = useMemo(() => ({
    ...pStyle, display: 'inline', boxSizing: 'border-box', position: 'relative', margin: '0', padding: '0', fontWeight: '500', color: 'rgba(51,65,85,1)'
  }), [ pStyle]);

  const pStyleC: React.CSSProperties = useMemo(() => ({
    margin: dynSzGttr( '0.5', '0.5', '0.25', '0.25', '0.25', '0.25') + 'rem 0 0 0', textAlign: 'left', fontSize: '1.125rem', lineHeight: '1.5'
  }), [ dynSzGttr])

  const h4Style: React.CSSProperties = useMemo(() =>({
    ...nullBlockStyle, hyphens: 'none', textAlign: 'left', color: 'rgba(51,65,85,1)', fontWeight: '600', lineHeight: '1.5', fontSize: dynSzGttr( '1.5', '1.5', '1.25', '1.25', '1.25', '1.25') + 'rem'
  }), [ nullBlockStyle, dynSzGttr]);

  const h4StyleB: React.CSSProperties = useMemo(() => ({
    ...h4Style, margin: dynSzGttr( '3.5', '3.5', '2.5', '2', '2', '2' ) + 'rem 0 0 0'
  }), [ h4Style, dynSzGttr])

  const h4BStyle: React.CSSProperties = useMemo(() =>({
    ...nullBlockStyle, hyphens: 'none', textAlign: 'left', color: 'rgba(51,65,85,1)', fontWeight: '500', lineHeight: '1.5', fontSize: dynSzGttr( '1.5', '1.5', '1.25', '1.25', '1.25', '1.25') + 'rem', padding: '0', margin: dynSzGttr( '1.7', '1.7', '1.3', '1', '1', '1') + 'rem 0 0.5rem ' + dynSzGttr( '1.5', '1.5', '1.25', '1', '1', '1') + 'rem'
  }), [ nullBlockStyle, dynSzGttr]);

  const navRapLi: React.CSSProperties = useMemo(() => ({
    ...nullBlockStyle, hyphens: 'auto', fontSize: dynSzGttr( '1.175', '1.175','1.125', '1', '1', '1') + 'rem', fontWeight: 400, color: 'rgba(51,65,85,0.7)', lineHeight: 1.625, padding: '0', margin: dynSzGttr( '1', '1', '0.75', '0.5', '0.5', '0.5') + 'rem 0 0 ' + dynSzGttr( '1.5', '1.5', '1.25', '1', '1', '1') + 'rem'
  }), [ nullBlockStyle, dynSzGttr]);

  const navRapSp: React.CSSProperties = useMemo(() => ({
    ...nullStyle, cursor: 'pointer', display: 'inline', padding: '0', margin: '0'
  }), [ nullStyle]);

  const imgsDesc: React.CSSProperties = useMemo(() => ({
    ...nullBlockStyle, hyphens: 'none', padding: '0', margin: dynSzGttr( '0.5', '0.5', '0.375', '0.25', '0.25', '0.25' ) + 'rem 0 0 0', textAlign: 'center', fontSize: dynSzGttr( '1.175', '1.175', '1.125', '1', '1', '1' ) + 'rem', fontWeight: 300, color: 'rgba(51,65,85,0.4)', lineHeight: 1.625
  }), [ nullBlockStyle, dynSzGttr]);

  const h5Style: React.CSSProperties = useMemo(() =>({
    hyphens: 'none', textAlign: 'left', color: 'rgba(51,65,85,0.8)', fontWeight: 400, lineHeight: '1.5', fontSize: dynSzGttr( '1.25', '1.25', '1.125', '1.125', '1.125', '1.125') + 'rem', margin: dynSzGttr( '2', '2', '1.5', '1.25', '1.25', '1.25') + 'rem 0 0 0',
  }), [dynSzGttr]);

  const intrfzSelecc: React.CSSProperties = {
    display: 'inline-block', height: '1.5rem', width: '6.3rem', borderRadius: '0.375rem', textAlign: 'center', verticalAlign: 'top', paddingBottom: '1.75rem', margin: '0.5rem 0.5rem 0 0', borderStyle: 'solid', borderWidth: '2px',  
  };

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    const el = ref.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 48;
    window.scrollTo({ top: y, behavior: 'smooth' } ) };

  return {
      screenReady, xlScreen, lgScreen, mdScreen, smScreen, tnScreen, xtScreen,
      nullStyle, nullBlockStyle, pStyle, pStyleB, pBold,
      pStyleC, h4Style, h4StyleB, h4BStyle, navRapLi, navRapSp, imgsDesc, h5Style, intrfzSelecc,
      dinamicSize, scrollTo, dynSzGttr } }

export default useIndividualStyling;
