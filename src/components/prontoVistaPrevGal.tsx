import { useRouter } from "next/navigation";
import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import NextImage, { StaticImageData } from 'next/image';

interface ProntoVistaPrevGalProps {
  imagenesLista: (string | StaticImageData)[];
  discosColor?: string;
  maxAltura?: number;
  iteracionTiempo?: number;
  navegador?: boolean;
}

interface GalleryIndexes {
    newCurrent: number; prevCurrent: number;
    newBefore1: number; newBefore2: number;
    newAfter1: number; newAfter2: number;
    prevBefore1: number; prevBefore2: number;
    prevAfter1: number; prevAfter2: number;
    newSet: Set<number>; prevSet: Set<number>;
    commonElements: number[]; exclusiveNewElements: number[]; nonCommonElements: number[];
}

const isValidColor = (color: string) => {
    const s = new Option().style;
    s.color = color;
    return s.color !== ""; };

const ProntoVistaPrevGal: React.FC<ProntoVistaPrevGalProps> = ({ imagenesLista, discosColor = "#000", maxAltura = 32, iteracionTiempo = 3400, navegador = true }) => {

    const router = useRouter();

    const seleccionColor =  isValidColor(discosColor) ? discosColor : "#000" ;

    const computeGalleryIndexes = (newIndex: number, prevIndex: number, total: number): GalleryIndexes => {

        const newCurrent = newIndex;
        const newBefore1 = (newIndex - 1 + total) % total;
        const newBefore2 = (newIndex - 2 + total) % total;
        const newAfter1 = (newIndex + 1) % total;
        const newAfter2 = (newIndex + 2) % total;

        const prevCurrent = prevIndex;
        const prevBefore1 = (prevIndex - 1 + total) % total;
        const prevBefore2 = (prevIndex - 2 + total) % total;
        const prevAfter1 = (prevIndex + 1) % total;
        const prevAfter2 = (prevIndex + 2) % total;

        const newSet = new Set([newCurrent, newBefore1, newBefore2, newAfter1, newAfter2]);
        const prevSet = new Set([prevCurrent, prevBefore1, prevBefore2, prevAfter1, prevAfter2]);

        const commonElements = [...newSet].filter(index => prevSet.has(index));
        const exclusiveNewElements = [...newSet].filter(index => !commonElements.includes(index));
        const nonCommonElements = [...newSet, ...prevSet].filter(index => !commonElements.includes(index));

        return {
            newCurrent, newBefore1, newBefore2, newAfter1, newAfter2,
            prevCurrent, prevBefore1, prevBefore2, prevAfter1, prevAfter2,
            newSet, prevSet, commonElements, exclusiveNewElements, nonCommonElements } };

    const tiempoIntervalo = iteracionTiempo;
    const [currentGalleryIndex, setCurrentGalleryIndex] = useState<number>(0);
    const [isMdParent, setIsMdParent] = useState<boolean>(false);
    const [isLgParent, setIsLgParent] = useState<boolean>(false);
    const [isXlParent, setIsXlParent] = useState<boolean>(false);
    const [screenReady, setScreenReady] = useState(false);

    const cajaAltura = maxAltura;
    const galAlturaXl = Math.min(32, Math.max(18, cajaAltura));
    const galAlturaLg = Math.min(32, Math.max(18, galAlturaXl - 4));
    const galAlturaMd = Math.min(32, Math.max(18, galAlturaLg - 8));
    const galAlturaSm = Math.min(32, Math.max(18, galAlturaMd - 2));

    const sobreCapaRefs = useRef<(HTMLDivElement | null)[]>([]);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const innerSpanDiscRefs = useRef<(HTMLSpanElement)[]>([]);
    const outerSpanDiscRefs = useRef<(HTMLSpanElement)[]>([]);
    const totalStylesUpdate = useCallback((indexes: GalleryIndexes) => {
        const { newCurrent, newBefore1, newBefore2, newAfter1, newAfter2,
            prevCurrent, commonElements, exclusiveNewElements, nonCommonElements } = indexes;

        if (innerSpanDiscRefs.current[newCurrent]) {
            innerSpanDiscRefs.current[newCurrent].style.opacity = "1";
            innerSpanDiscRefs.current[newCurrent].style.width = "100%"; }

        if (outerSpanDiscRefs.current[newCurrent]) {
            outerSpanDiscRefs.current[newCurrent].style.cursor = "default";
            outerSpanDiscRefs.current[newCurrent].style.width = isXlParent || isLgParent ? '4rem' : isMdParent ? '3rem' : '3rem'; }
        
        if ( prevCurrent !== newCurrent) {
            if (innerSpanDiscRefs.current[prevCurrent]) {
                innerSpanDiscRefs.current[prevCurrent].style.opacity = "0";
                innerSpanDiscRefs.current[prevCurrent].style.width = isXlParent || isLgParent ? '1rem' : isMdParent ? '0.75rem' : '0.75rem'; }
            if (outerSpanDiscRefs.current[prevCurrent]) {
                outerSpanDiscRefs.current[prevCurrent].style.cursor = "pointer";
                outerSpanDiscRefs.current[prevCurrent].style.width = isXlParent || isLgParent ? '1rem' : isMdParent ? '0.75rem' : '0.75rem'; } }

        const remToPixels = (remValue: number): number => {
            const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            return remValue * rootFontSize; };
        const currentAltura = (isXlParent ? galAlturaXl : isLgParent ? galAlturaLg : isMdParent ? galAlturaMd : galAlturaSm)-4;
        const elementAltura = remToPixels(currentAltura ?? 0);
        
        nonCommonElements.forEach(index => {

            const el = sobreCapaRefs.current[index];
            if (el) {
                el.style.opacity = "0";
                el.style.backgroundColor = "transparent"; }

            const el2 = imageRefs.current[index];
            if (el2) {
                el2.style.opacity = "0";
                el2.style.zIndex = "10";
                el2.style.boxShadow = "none";
                el2.style.transform = "scale(0.01)";
                el2.style.left = `calc( 50% - ${elementAltura * 0.5}px )`; }

        });

        exclusiveNewElements.forEach(index => {

            const el = sobreCapaRefs.current[index];
            if (!el || !(index === newCurrent || index === newBefore2 || index === newAfter2 || index === newBefore1 || index === newAfter1)) return;
            else {
                if (index === newCurrent) {
                    el.style.opacity = "0";
                    el.style.backgroundColor = "transparent"; }
                else {
                    el.style.opacity = "0.9";
                    el.style.cursor = "pointer";
                    el.style.backgroundColor = (index === newBefore2 || index === newAfter2) ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.3)" }}

            const el2 = imageRefs.current[index];
            if (!el2 || !(index === newBefore2 || index === newBefore1 || index === newCurrent || index === newAfter1 || index === newAfter2) ) return;
            else {
                el2.style.opacity = "1";
                if (index === newCurrent) {
                    el2.style.zIndex = "50";
                    el2.style.boxShadow = "0 10px 12px -3px rgba(0, 0, 0, 0.6), 0 4px 3px -2px rgba(0, 0, 0, 0.6)";
                    el2.style.transform = "scale(1.1)";
                    el2.style.left = `calc( 50% - ${elementAltura * 0.5}px )`; }
                else {
                    if (index === newBefore2 || index === newAfter2) {
                        el2.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.2)";
                        el2.style.zIndex = "30";
                        el2.style.transform = "scale(0.92)";
                        el2.style.left = (index === newBefore2) ? `0%` : `calc( 100% - ${elementAltura}px )`; }
                    else {
                        el2.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.4)";
                        el2.style.zIndex = "40";
                        el2.style.transform = "scale(1.05)";
                        el2.style.left = (index === newBefore1) ? `calc( 20% - ${elementAltura * 0.2}px )` : `calc( 80% - ${elementAltura * 0.8}px )`; } } }
        });

        commonElements.forEach(index => {

            const applyStyleIfDifferent = <T extends keyof CSSStyleDeclaration>( el: HTMLElement, prop: T, value: CSSStyleDeclaration[T] ) => {
                if (el.style[prop] !== value) el.style[prop] = value; };
            
            const el = sobreCapaRefs.current[index];
            if (!el || !( index === newCurrent || index === newBefore2 || index === newAfter2 || index === newBefore1 || index === newAfter1 )) return;

            if (index === newCurrent) {
                applyStyleIfDifferent(el,"opacity","0");
                applyStyleIfDifferent(el,"backgroundColor","transparent"); }
            else {
                applyStyleIfDifferent(el,"opacity","0.9");
                applyStyleIfDifferent(el,"backgroundColor", (index === newBefore2 || index === newAfter2) ?  "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.3)"); } 

            const el2 = imageRefs.current[index];
            if (!el2 || !(index === newBefore2 || index === newBefore1 || index === newCurrent || index === newAfter1 || index === newAfter2)) return;

            applyStyleIfDifferent(el2, "opacity","1");
            if (index === newCurrent) {
                applyStyleIfDifferent(el2, "zIndex","50");
                applyStyleIfDifferent(el2, "boxShadow","0 10px 12px -3px rgba(0, 0, 0, 0.6), 0 4px 3px -2px rgba(0, 0, 0, 0.6)");
                applyStyleIfDifferent(el2, "transform","scale(1.1)");
                applyStyleIfDifferent(el2, "left",`calc( 50% - ${elementAltura * 0.5}px )`); }
            else {
                
                if (index === newBefore2 || index === newAfter2) {
                    applyStyleIfDifferent(el2, "boxShadow","0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.2)");
                    applyStyleIfDifferent(el2, "zIndex","30");
                    applyStyleIfDifferent(el2, "transform","scale(0.92)");
                    applyStyleIfDifferent(el2, "left", (index === newBefore2) ? "0%" : `calc( 100% - ${elementAltura}px )`); }
                else {
                    applyStyleIfDifferent(el2, "boxShadow","0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.4)");
                    applyStyleIfDifferent(el2, "zIndex","40");
                    applyStyleIfDifferent(el2, "transform","scale(1.05)");
                    applyStyleIfDifferent(el2, "left", (index === newBefore1) ? `calc( 20% - ${elementAltura * 0.2}px )` : `calc( 80% - ${elementAltura * 0.8}px )`); } } 

        } ) }, [isXlParent, isLgParent, isMdParent, galAlturaXl, galAlturaLg, galAlturaMd, galAlturaSm]);

    const [loadedImages, setLoadedImages] = useState<boolean[]>(new Array(imagenesLista.length).fill(false));
    const handleImageLoad = (index: number) => {
        setLoadedImages((prev) => {
            if (prev[index]) return prev;
            const updated = [...prev];
            updated[index] = true;
            return updated; });
    };

    const [discosNavegador, setDiscosNavegador] = useState(true);
    useEffect(() => {
    setDiscosNavegador(navegador);
    }, [navegador]);

    const scndContainerCapaRef = useRef<(HTMLDivElement | null)>(null);
    const getContainerWidth = useCallback(() => scndContainerCapaRef.current?.offsetWidth ?? 0, [] );
    const scndContainerCapaWidth = getContainerWidth();

    useEffect(() => {
        const handleResize = () => {
            if (!scndContainerCapaRef.current) return;
            setIsMdParent(scndContainerCapaWidth >= 640 && scndContainerCapaWidth < 768);
            setIsLgParent(scndContainerCapaWidth >= 768 && scndContainerCapaWidth < 1024);
            setIsXlParent(scndContainerCapaWidth >= 1024);
        }
        handleResize();
        setScreenReady(true);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isMdParent,isLgParent,isXlParent,scndContainerCapaWidth]);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const startInterval = useCallback(() => {
        intervalRef.current = setInterval(() => {
            setCurrentGalleryIndex((prevIndex) => {
                const newIndex = (prevIndex + 1) % imagenesLista.length;
                return newIndex;
            })
        }, tiempoIntervalo);
    }, [ imagenesLista.length, tiempoIntervalo]);

    const clearIntervalTimer = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        startInterval();
        return () => clearIntervalTimer();
    }, [startInterval, clearIntervalTimer]);

    const handleNavClick = useCallback((newIndex: number) => {
        const indexes = computeGalleryIndexes(newIndex, currentGalleryIndex, imagenesLista.length);
        totalStylesUpdate(indexes);
        clearIntervalTimer();
        setCurrentGalleryIndex(newIndex);
        startInterval();
    }, [imagenesLista.length, currentGalleryIndex, totalStylesUpdate, clearIntervalTimer, startInterval]);

    useEffect(() => {
        
        const indexes = computeGalleryIndexes(
            currentGalleryIndex,
            (currentGalleryIndex - 1 + imagenesLista.length) % imagenesLista.length,
            imagenesLista.length
        );
    
        totalStylesUpdate(indexes);

        indexes.nonCommonElements
        .filter(index => index !== indexes.newCurrent)
        .forEach(index => {
            const el = sobreCapaRefs.current[index];
            if (el) el.onclick = null; });

        [indexes.newBefore2, indexes.newBefore1, indexes.newAfter1, indexes.newAfter2].forEach(index => {
            const el = sobreCapaRefs.current[index];
            if (el) el.onclick = () => handleNavClick(index); });

        outerSpanDiscRefs.current.forEach((el, index) => {
            if (el) el.onclick = index !== indexes.newCurrent ? () => handleNavClick(index) : null });

        const currentElement = sobreCapaRefs.current[indexes.newCurrent];
        if (currentElement) {
            currentElement.onclick = () => {
                const newUrl = `/prontoVistaFull?page.tsx?list=default&index=${indexes.newCurrent}&color=${encodeURIComponent(discosColor)}`;
                router.push(newUrl);
            };
        }

    }, [imagenesLista.length, currentGalleryIndex, totalStylesUpdate, handleNavClick, discosColor, router]); 

    const loadingImage = useCallback(({ color = seleccionColor, alto = 24 }) => {
        return React.createElement('div', { style: { color: color, position: 'absolute', inset: '0', display: 'flex', alignContent: 'center', justifyContent: 'center', background: 'linear-gradient(0deg, rgba(187,187,187,1) 0%, rgba(245,245,245,1) 100%)', transition: 'all 300ms ease-in-out' } },
            React.createElement('svg', { style: { width: alto+'%', height: 'auto' }, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 512", fill: 'currentColor' },
                React.createElement('path', { fill: 'currentColor', d: 'M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z' } ) ) )
    }, [seleccionColor])

    const loadingImageThumbnail = useMemo(()  => loadingImage({ alto: 24 }), [loadingImage])

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
 
    const maximizeSign = useCallback(({ colors = seleccionColor, alto = 24, ndx = 0  }) => {
        return React.createElement('div', { style: { color: colors, position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', opacity: ndx === hoveredIndex ? 1 : 0, transition: 'opacity '+ tiempoIntervalo/8 +'ms ease-in-out' } },
            React.createElement('svg', { style: { width: alto+'%', height: alto+'%', background: 'rgba(0,0,0,0.24)', borderRadius: '0.125rem' }, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: 'transparent' },
                React.createElement('path', { stroke: 'currentColor', strokeWidth: '0.62', strokeLinejoin: 'butt', strokeLinecap: 'butt', d: 'M21 9V3H15' } ),
                React.createElement('path', { stroke: 'currentColor', strokeWidth: '0.62', strokeLinejoin: 'butt', strokeLinecap: 'butt', d: 'M3 15V21H9' } ),
                React.createElement('path', { stroke: 'currentColor', strokeWidth: '0.62', strokeLinejoin: 'butt', strokeLinecap: 'butt', d: 'M21 3L13.5 10.5' } ),
                React.createElement('path', { stroke: 'currentColor', strokeWidth: '0.62', strokeLinejoin: 'butt', strokeLinecap: 'butt', d: 'M10.5 13.5L3 21' } )
            ) )
    }, [seleccionColor, hoveredIndex, tiempoIntervalo])

    const visibleImages = useMemo(() => {

        return imagenesLista.map((item, index) => {

                const imageBlockStyleA = {
                    display: "block", position: "absolute", top: "1.25rem", height: "calc(100% - 4rem)", aspectRatio: "1 / 1", borderRadius: "0.125rem", transition: "all 700ms linear", overflow: "hidden",
                    opacity: 0, zIndex: 10, boxShadow: "none", left: "0", transform: "scale(0.01)" }
                const sobreCapaStyle = {
                    position: "absolute", inset: "0", transition: "all 700ms linear", backdropFilter: "grayscale(100%)",
                    opacity: "0", backgroundColor: "transparent", cursor: "pointer" }
                const imageBlockStyleB = {
                    position: 'relative', width: '100%', height: '100%', background: "linear-gradient(0deg, rgba(187,187,187,1) 0%, rgba(245,245,245,1) 100%)", display: 'flex', justifyContent: 'center', alignItems: 'center' }
                // const imageBlockStyleC = {
                //   width: '15%', height: 'auto', transition: 'all 700ms linear', fontWeight: '500', color: seleccionColor }
                const imageElementStyle: React.CSSProperties = {
                    objectFit: 'cover', transition: 'opacity 700ms linear', opacity: loadedImages[index] ? 1 : 0 }

                return React.createElement("div", { key: index, ref: (el) => { imageRefs.current[index] = el as HTMLDivElement | null }, style: imageBlockStyleA, ...(currentGalleryIndex === index && { onMouseEnter: () => setHoveredIndex(index), onMouseLeave: () => setHoveredIndex(null) }) },
                    React.createElement("div", { style: imageBlockStyleB },
                        !loadedImages[index] && loadingImageThumbnail,
                        React.createElement(NextImage, { onLoad: () => handleImageLoad(index), sizes: '(max-width: 1024px) 50vw, 512px', src: typeof item === "string" ? item : item.src, alt: 'Gallery Image', fill: true, style: imageElementStyle }),
                        currentGalleryIndex === index && maximizeSign({ colors: 'rgba(255,255,255,0.76)', alto: 24, ndx: index }),
                        React.createElement("div", { ref: (el) => { sobreCapaRefs.current[index] = el as HTMLDivElement | null }, style: sobreCapaStyle })
                    )
                )
            });
    }, [currentGalleryIndex, imagenesLista, loadedImages, loadingImageThumbnail, maximizeSign ]);

    const visibleSelectores = useMemo(() => {

        if(!discosNavegador) return;
        return imagenesLista.map((_, index) => {

            const outerSpanDisc = {
                position: 'relative', margin: isXlParent || isLgParent ? '0.5rem' : isMdParent ? '0.375rem' : '0.375rem', display: 'inline-block', borderRadius: isXlParent || isLgParent ? '0.5rem' : isMdParent ? '0.375rem' : '0.375rem', overflow: 'hidden', height: isXlParent || isLgParent ? '1rem' : isMdParent ? '0.75rem' : '0.75rem', transition: 'all 300ms linear', backgroundColor: 'rgba(0, 0, 0, 0.2)',
                cursor: 'pointer', width: isXlParent || isLgParent ? '1rem' : isMdParent ? '0.75rem' : '0.75rem' }
            const innerSpanDisc = {
                pointerEvents: 'none', display: 'inline-block', position: 'absolute', left: '0', top: '0', borderRadius: isXlParent || isLgParent ? '0.5rem' : isMdParent ? '0.375rem' : '0.375rem', height: '100%', backgroundColor: seleccionColor, transition: 'width '+tiempoIntervalo+'ms linear, opacity 700ms linear',
                opacity: '0', width: isXlParent || isLgParent ? '1rem' : isMdParent ? '0.75rem' : '0.75rem' }

            return React.createElement("span", { key: index, ref: (el) => { outerSpanDiscRefs.current[index] = el as HTMLSpanElement }, style: outerSpanDisc },
                                      React.createElement("span", { ref: (el) => { innerSpanDiscRefs.current[index] = el as HTMLSpanElement }, style: innerSpanDisc })
                                      ) } )
    }, [discosNavegador, imagenesLista, isXlParent, isLgParent, isMdParent, seleccionColor, tiempoIntervalo]);

    const mainContainerStyle: React.CSSProperties = {
        position: 'relative' };
    const scndContainerStyle: React.CSSProperties = {
        position: 'relative', maxWidth: '64rem', width: '100%', height: 'auto', marginLeft: 'auto', marginRight: 'auto' }
    const hghtContainerStyle = useMemo(() => ({
        transition: 'all 700ms linear', overflowY: 'visible', overflowX: 'hidden', width: '100%', position: 'relative', height: isXlParent ? `${galAlturaXl}rem` : isLgParent ? `${galAlturaLg}rem` : isMdParent ? `${galAlturaMd}rem` : `${galAlturaSm}rem` }),
        [isXlParent, isLgParent, isMdParent, galAlturaXl, galAlturaLg, galAlturaMd, galAlturaSm]);
    const outerImagenesLista: React.CSSProperties = {
        position: "relative", width: "100%", height: "100%", overflow: "hidden", transition: "all 700ms linear" }

    if (!screenReady) return null;

    return React.createElement( "div", { style: mainContainerStyle },

        React.createElement( "div", { ref: scndContainerCapaRef, style: scndContainerStyle },
            React.createElement( "div", { style: hghtContainerStyle },
                !!imagenesLista.length && React.createElement("div", { style: outerImagenesLista }, visibleImages ) ) ),

        !!discosNavegador && ( React.createElement( "div", { style: { maxWidth: '64rem', width: '100%', margin: '0 auto', textAlign: 'center', paddingTop: '1.25rem', position: 'relative' } },
                !!imagenesLista.length && React.createElement( "div", null, visibleSelectores ) ) ),

        )
    }

export default ProntoVistaPrevGal;
