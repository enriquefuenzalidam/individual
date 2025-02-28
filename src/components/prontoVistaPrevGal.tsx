"use client";
import React from "react";
import { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import NextImage, { StaticImageData } from 'next/image';

interface ProntoVistaPrevGalProps {
  imagenesLista: (string | StaticImageData)[];
  discosColor?: string;
  maxAltura?: number;
  iteracionTiempo?: number;
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

const ProntoVistaPrevGal: React.FC<ProntoVistaPrevGalProps> = ({ imagenesLista, discosColor = "#000", maxAltura = 32, iteracionTiempo = 3400 }) => {

    const isValidColor = (color: string) => {
        const s = new Option().style;
        s.color = color;
        return s.color !== ""; };
    
    const [seleccionColor, setSeleccionColor] = useState(() => isValidColor(discosColor) ? discosColor : "#000" );
    useEffect(() => { if (isValidColor(discosColor)) setSeleccionColor(discosColor) }, [discosColor]);

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

    const [tiempoIntervalo, setTiempoIntervalo] = useState<number>(iteracionTiempo);
    const [currentGalleryIndex, setCurrentGalleryIndex] = useState<number>(2);
    const [isMdParent, setIsMdParent] = useState<boolean>(false);
    const [isLgParent, setIsLgParent] = useState<boolean>(false);
    const [isXlParent, setIsXlParent] = useState<boolean>(false);
    const [screenReady, setScreenReady] = useState(false);

    const [cajaAltura, setCajaAltura] = useState<number>(maxAltura);
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
                el.style.backgroundColor = "transparent";
                el.style.cursor = "default"; }

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
                    el.style.backgroundColor = "transparent";
                    el.style.cursor = "default"; }
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
                        el2.style.transform = "scale(0.95)";
                        el2.style.left = (index === newBefore2) ? `0%` : `calc( 100% - ${elementAltura}px )`; }
                    else {
                        el2.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.4)";
                        el2.style.zIndex = "40";
                        el2.style.transform = "scale(1.05)";
                        el2.style.left = (index === newBefore1) ? `calc( 25% - ${elementAltura * 0.25}px )` : `calc( 75% - ${elementAltura * 0.75}px )`; } } }

        });

        commonElements.forEach(index => {

            const applyStyleIfDifferent = <T extends keyof CSSStyleDeclaration>( el: HTMLElement, prop: T, value: CSSStyleDeclaration[T] ) => {
                if (el.style[prop] !== value) el.style[prop] = value;
            };
            
            const el = sobreCapaRefs.current[index];
            if (!el || !( index === newCurrent || index === newBefore2 || index === newAfter2 || index === newBefore1 || index === newAfter1 )) return;

            if (index === newCurrent) {
                applyStyleIfDifferent(el,"opacity","0");
                applyStyleIfDifferent(el,"backgroundColor","transparent");
                applyStyleIfDifferent(el,"cursor","default"); }
            else {
                applyStyleIfDifferent(el,"opacity","0.9");
                applyStyleIfDifferent(el,"cursor","pointer");
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
                    applyStyleIfDifferent(el2, "transform","scale(0.95)");
                    applyStyleIfDifferent(el2, "left", (index === newBefore2) ? "0%" : `calc( 100% - ${elementAltura}px )`); }
                else {
                    applyStyleIfDifferent(el2, "boxShadow","0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.4)");
                    applyStyleIfDifferent(el2, "zIndex","40");
                    applyStyleIfDifferent(el2, "transform","scale(1.05)");
                    applyStyleIfDifferent(el2, "left", (index === newBefore1) ? `calc( 25% - ${elementAltura * 0.25}px )` : `calc( 75% - ${elementAltura * 0.75}px )`); } } 

        } ) }, [isXlParent, isLgParent, isMdParent, galAlturaXl, galAlturaLg, galAlturaMd, galAlturaSm]);

    const [loadedImages, setLoadedImages] = useState<boolean[]>(new Array(imagenesLista.length).fill(false));
    const handleImageLoad = (index: number) => {
        setLoadedImages((prev) => {
            if (prev[index]) return prev;
            const updated = [...prev];
            updated[index] = true;
            return updated; });
    };


////////////////////////////
// elemento demostración ///

    const verOcultarDiscosNavRef = useRef<HTMLDivElement | null>(null);
    const [discosNavegador, setDiscosNavegador] = useState(true);
    const discNav = verOcultarDiscosNavRef.current;
    const discosNavInnerHeight = verOcultarDiscosNavRef.current?.querySelector("div")?.offsetHeight;

    useEffect(() => {
    
        if (!discNav) return;
        if (!discosNavInnerHeight) return;

        discNav.style.overflow = 'hidden';
        discNav.style.opacity = discosNavegador ? `1` : `0`;
        discNav.style.transition = discosNavegador ? `height 500ms ease-in-out, opacity 1600ms ease-in-out` : `height 500ms ease-in-out, opacity 300ms ease-in-out`;
        discNav.style.height = discosNavegador ? discosNavInnerHeight + "px" : "0";

    }, [discNav, discosNavInnerHeight, discosNavegador]);

////////////////////////////
////////////////////////////

    const scndContainerCapaRef = useRef<(HTMLDivElement | null)>(null);
    const getContainerWidth = () => {
        return scndContainerCapaRef.current ? scndContainerCapaRef.current.offsetWidth : 0 };
    const scndContainerCapaWidth = getContainerWidth();

    useEffect(() => {
        const handleResize = () => {
            if (!scndContainerCapaRef.current) return;
            setIsMdParent(scndContainerCapaWidth >= 640 && scndContainerCapaWidth < 768);
            setIsLgParent(scndContainerCapaWidth >= 768 && scndContainerCapaWidth < 1024);
            setIsXlParent(scndContainerCapaWidth >= 1024);
            console.log("isMdParent is " + isMdParent);
            console.log("isLgParent is " + isLgParent);
            console.log("isXlParent is " + isXlParent);
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
        console.log("handleNavClick clicked")
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
   

    }, [imagenesLista.length, currentGalleryIndex, totalStylesUpdate, handleNavClick]); 

    const visibleImages = useMemo(() => {

        return imagenesLista.map((item, index) => {

                const imageBlockStyleA = {
                    display: "block", position: "absolute", top: "1.25rem", height: "calc(100% - 4rem)", aspectRatio: "1 / 1", borderRadius: "0.125rem", transition: "all 700ms linear", overflow: "hidden",
                    opacity: 0, zIndex: 10, boxShadow: "none", left: "0", transform: "scale(0.01)" }
                const sobreCapaStyle = {
                    position: "absolute", inset: "0", transition: "all 700ms linear", backdropFilter: "grayscale(100%)", opacity: "0", backgroundColor: "transparent", cursor: "default" }
                const imageBlockStyleB = {
                    position: 'relative', width: '100%', height: '100%', backgroundColor: "white", display: 'flex', justifyContent: 'center', alignItems: 'center' }
                const imageBlockStyleC = {
                    width: '10%', height: 'auto', transition: 'all 700ms linear', fontWeight: '500', color: seleccionColor }
                const imageElementStyle: React.CSSProperties = {
                    objectFit: 'cover', transition: 'opacity 700ms linear', opacity: loadedImages[index] ? 1 : 0 }

                return React.createElement("div", { key: index, ref: (el) => { imageRefs.current[index] = el as HTMLDivElement | null }, style: imageBlockStyleA },
                    React.createElement("div", { style: imageBlockStyleB },
                        !loadedImages[index] && (React.createElement('div', { style: imageBlockStyleC },
                            React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 512", fill: 'currentColor' },
                                React.createElement('path', { fill: 'currentColor', d: 'M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z' })))),
                        React.createElement(NextImage, { onLoad: () => handleImageLoad(index), sizes: '(max-width: 1024px) 50vw, 512px', src: typeof item === "string" ? item : item.src, alt: 'Gallery Image', fill: true, style: imageElementStyle }),
                        React.createElement("div", { ref: (el) => { sobreCapaRefs.current[index] = el as HTMLDivElement | null }, style: sobreCapaStyle })
                    )
                )
            });
    }, [imagenesLista, loadedImages, seleccionColor]);

    const visibleSelectores = useMemo(() => {

        return imagenesLista.map((_, index) => {

            const outerSpanDisc = {
                position: 'relative', margin: isXlParent || isLgParent ? '0.5rem' : isMdParent ? '0.375rem' : '0.375rem', display: 'inline-block', borderRadius: '9999px', overflow: 'hidden', height: isXlParent || isLgParent ? '1rem' : isMdParent ? '0.75rem' : '0.75rem', transition: 'all 300ms linear', backgroundColor: 'rgba(0, 0, 0, 0.2)',
                cursor: 'pointer', width: isXlParent || isLgParent ? '1rem' : isMdParent ? '0.75rem' : '0.75rem' }
            const innerSpanDisc = {
                pointerEvents: 'none', display: 'inline-block', position: 'absolute', left: '0', top: '0', borderRadius: '9999px', height: '100%', backgroundColor: seleccionColor, transition: 'width '+tiempoIntervalo+'ms linear, opacity 700ms linear',
                opacity: '0', width: isXlParent || isLgParent ? '1rem' : isMdParent ? '0.75rem' : '0.75rem' }

            return React.createElement("span", { key: index, ref: (el) => { outerSpanDiscRefs.current[index] = el as HTMLSpanElement }, style: outerSpanDisc },
                                      React.createElement("span", { ref: (el) => { innerSpanDiscRefs.current[index] = el as HTMLSpanElement }, style: innerSpanDisc })
                                      ) } )
    }, [imagenesLista, isXlParent, isLgParent, isMdParent, seleccionColor, tiempoIntervalo]);

    const mainContainerStyle: React.CSSProperties = { position: 'relative' };
    const scndContainerStyle: React.CSSProperties = {
        position: 'relative', maxWidth: '64rem', width: '100%', height: 'auto', marginLeft: 'auto', marginRight: 'auto' }
    const hghtContainerStyle = (): React.CSSProperties => ({
        transition: 'all 700ms linear', overflowY: 'visible', overflowX: 'hidden', width: '100%', position: 'relative', height: isXlParent ? `${galAlturaXl}rem` : isLgParent ? `${galAlturaLg}rem` : isMdParent ? `${galAlturaMd}rem` : `${galAlturaSm}rem` })
    const outerImagenesLista: React.CSSProperties = {
        position: "relative", width: "100%", height: "100%", overflow: "hidden", transition: "all 700ms linear" }
    const discContainerStyle: React.CSSProperties = {
        maxWidth: '64rem', width: '100%', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', paddingTop: '1.25rem', position: 'relative' }

    if (!screenReady) return null;

    return React.createElement( "div", { style: mainContainerStyle },

//////////////////////////////
/// elemento demostración
        React.createElement('p', { className: '  lg:text-2xl md:text-xl sm:text-xl text-lg font-light text-slate-700/70 text-justify lg:indent-6 md:indent-5 sm:indent-4 indent-4 lg:m-4 md:m-3 sm:m-2 m-2 lg:leading-relaxed md:leading-relaxed sm:leading-relaxed leading-relaxed  '},
          'Componente aun en desarrollo, conformado por una ', React.createElement('span', { className: 'font-medium' },'galería de previsualización') ,' para cinco imágenes, más una ', React.createElement('span', { className: 'font-medium' },'galería principal') ,' para navegar a través de la lista de imágenes y verlas en formato completo. Dispone de algunos ajustes personalizables y está contenida en un bloque cuyas dimensiones se adaptan a la situación.'),
        React.createElement('h4', { className: ` mt-8 mb-10 text-left text-slate-700/80 lg:ml-10 md:ml-8 ml-6 font-semibold leading-normal lg:text-2xl md:text-xl sm:text-xl text-xl ` }, `Galería de previsualización` ),
//////////////////////////////
//////////////////////////////

        React.createElement( "div", { ref: scndContainerCapaRef, style: scndContainerStyle },
            React.createElement( "div", { style: hghtContainerStyle() },
                !!imagenesLista.length && React.createElement("div", { style: outerImagenesLista }, visibleImages ) ) ),

        React.createElement('div', { ref: verOcultarDiscosNavRef, style: { maxWidth: `64rem`, margin: `0 auto` } },  /// elemento demostración
            React.createElement( "div", { style: discContainerStyle },
                !!imagenesLista.length && React.createElement( "div", null, visibleSelectores ) ) ),

////////////////////////////
// elemento demostración ///
        React.createElement('h5', { className: ` mt-8 text-left text-slate-700/80 lg:ml-10 md:ml-8 ml-6 font-semibold leading-normal lg:text-2xl md:text-xl sm:text-xl text-xl ` }, `Opciones personalizables` ),
        React.createElement('h6', { className: ` mt-8 text-left text-slate-700/80 lg:ml-10 md:ml-8 ml-6 font-regular leading-normal lg:text-xl md:text-lg sm:text-lg text-lg  `}, `Visualización de lista de navegación` ),
        React.createElement('p', { className: ` mt-2 text-left text-lg lg:ml-4 md:ml-3 ml-2 leading-normal ` },
            React.createElement('span', { onClick: () => setDiscosNavegador(true),  className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7 mr-2 mt-2 border-solid border-2 border-slate-700 ${  discosNavegador ? 'font-semibold text-slate-700/80 border-opacity-90 cursor-default' : 'font-regular text-slate-700/60 border-opacity-50 cursor-pointer ' }` }, 'Mostrar' ),
            React.createElement('span', { onClick: () => setDiscosNavegador(false), className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7      mt-2 border-solid border-2 border-slate-700 ${ !discosNavegador ? 'font-semibold text-slate-700/80 border-opacity-90 cursor-default' : 'font-regular text-slate-700/60 border-opacity-50 cursor-pointer ' }` }, 'Ocultar' ) ),
        React.createElement('h6', { className: ` mt-8 text-left text-slate-700/80 lg:ml-10 md:ml-8 ml-6 font-regular leading-normal lg:text-xl md:text-lg sm:text-lg text-lg  `}, `Apariencia de los selectores` ),
        React.createElement('p', { className: ` mt-2 text-left text-lg lg:ml-4 md:ml-3 ml-2 leading-normal ` },
            React.createElement('span', { className: `inline-block  ` }, 
                React.createElement('span', { onClick: () => setSeleccionColor("rgb(180,83,9)"),   className: ` inline-block h-6 w-24 bg-amber-700   rounded-md text-center align-top text-white pb-7 mr-2 mt-2 border-solid border-2 ${seleccionColor === "rgb(180,83,9)"   ? ' font-medium border-black text-opacity-100 cursor-default' : 'font-regular border-amber-700   text-opacity-60 cursor-pointer '} ` }, `Amber` ),
                React.createElement('span', { onClick: () => setSeleccionColor("rgb(51,65,85)"),   className: ` inline-block h-6 w-24 bg-slate-700   rounded-md text-center align-top text-white pb-7 mr-2 mt-2 border-solid border-2 ${seleccionColor === "rgb(51,65,85)"   ? ' font-medium border-black text-opacity-100 cursor-default' : 'font-regular border-slate-700   text-opacity-60 cursor-pointer '}  ` }, `Slate` ),
                React.createElement('span', { onClick: () => setSeleccionColor("rgb(3,105,161)"),  className: ` inline-block h-6 w-24 bg-sky-700     rounded-md text-center align-top text-white pb-7 mr-2 mt-2 border-solid border-2 ${seleccionColor === "rgb(3,105,161)"  ? ' font-medium border-black text-opacity-100 cursor-default' : 'font-regular border-sky-700     text-opacity-60 cursor-pointer '}  ` }, `Sky` ),
                React.createElement('span', { onClick: () => setSeleccionColor("rgb(67,56,202)"),  className: ` inline-block h-6 w-24 bg-indigo-700  rounded-md text-center align-top text-white pb-7 mr-2 mt-2 border-solid border-2 ${seleccionColor === "rgb(67,56,202)"  ? ' font-medium border-black text-opacity-100 cursor-default' : 'font-regular border-indigo-700  text-opacity-60 cursor-pointer '}  ` }, `Indigo` ),
                React.createElement('span', { onClick: () => setSeleccionColor("rgb(162,28,175)"), className: ` inline-block h-6 w-24 bg-fuchsia-700 rounded-md text-center align-top text-white pb-7 mt-2      border-solid border-2 ${seleccionColor === "rgb(162,28,175)" ? ' font-medium border-black text-opacity-100 cursor-default' : 'font-regular border-fuchsia-700 text-opacity-60 cursor-pointer '}  ` }, `Fuchsia` ) ) ),
        React.createElement('h6', { className: ` mt-8 text-left text-slate-700/80 lg:ml-10 md:ml-8 ml-6 font-regular leading-normal lg:text-xl md:text-lg sm:text-lg text-lg  `}, `Velocidad del iteración` ),
        React.createElement('p', { className: ` mt-2 text-left text-lg lg:ml-4 md:ml-3 ml-2 leading-normal ` },
            React.createElement('span', { className: `inline-block  ` }, 
                React.createElement('span', { onClick: () => setTiempoIntervalo(500),  className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7 mr-2 mt-2 border-solid border-2 border-slate-700 ${ tiempoIntervalo === 500 ?  ` font-semibold text-slate-700/80 border-opacity-90 cursor-default ` : ` font-regular text-slate-700/60 border-opacity-50 cursor-pointer ` }` }, `500 ms` ),
                React.createElement('span', { onClick: () => setTiempoIntervalo(800),  className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7 mr-2 mt-2 border-solid border-2 border-slate-700 ${ tiempoIntervalo === 800 ?  ` font-semibold text-slate-700/80 border-opacity-90 cursor-default ` : ` font-regular text-slate-700/60 border-opacity-50 cursor-pointer ` }` }, `800 ms` ),
                React.createElement('span', { onClick: () => setTiempoIntervalo(1300), className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7 mr-2 mt-2 border-solid border-2 border-slate-700 ${ tiempoIntervalo === 1300 ? ` font-semibold text-slate-700/80 border-opacity-90 cursor-default ` : ` font-regular text-slate-700/60 border-opacity-50 cursor-pointer ` }` }, `1300 ms` ),
                React.createElement('span', { onClick: () => setTiempoIntervalo(2100), className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7 mr-2 mt-2 border-solid border-2 border-slate-700 ${ tiempoIntervalo === 2100 ? ` font-semibold text-slate-700/80 border-opacity-90 cursor-default ` : ` font-regular text-slate-700/60 border-opacity-50 cursor-pointer ` }` }, `2100 ms` ),
                React.createElement('span', { onClick: () => setTiempoIntervalo(3400), className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7 mr-2 mt-2 border-solid border-2 border-slate-700 ${ tiempoIntervalo === 3400 ? ` font-semibold text-slate-700/80 border-opacity-90 cursor-default ` : ` font-regular text-slate-700/60 border-opacity-50 cursor-pointer ` }` }, `3400 ms` ),
                React.createElement('span', { onClick: () => setTiempoIntervalo(5600), className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7 mr-2 mt-2 border-solid border-2 border-slate-700 ${ tiempoIntervalo === 5600 ? ` font-semibold text-slate-700/80 border-opacity-90 cursor-default ` : ` font-regular text-slate-700/60 border-opacity-50 cursor-pointer ` }` }, `5600 ms` ) ) ),
        React.createElement('h6', { className: ` mt-8 text-left text-slate-700/80 lg:ml-10 md:ml-8 ml-6 font-regular leading-normal lg:text-xl md:text-lg sm:text-lg text-lg  `}, `Altura máxima de la galería de previsualización ` ),
        React.createElement('p', { className: ` mt-2 text-left text-lg lg:ml-4 md:ml-3 ml-2 leading-normal ` },
            React.createElement('span', { onClick: () => setCajaAltura(32), className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7 mr-2 mt-2 border-solid border-2 border-slate-700 ${ cajaAltura === 32 ? 'font-semibold text-slate-700/80 border-opacity-90 cursor-default ' : 'font-regular text-slate-700/60 border-opacity-50 cursor-pointer ' } `}, `Altura A`),
            React.createElement('span', { onClick: () => setCajaAltura(28), className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7 mr-2 mt-2 border-solid border-2 border-slate-700 ${ cajaAltura === 28 ? 'font-semibold text-slate-700/80 border-opacity-90 cursor-default ' : 'font-regular text-slate-700/60 border-opacity-50 cursor-pointer ' } `}, `Altura B`),
            React.createElement('span', { onClick: () => setCajaAltura(20), className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7 mr-2 mt-2 border-solid border-2 border-slate-700 ${ cajaAltura === 20 ? 'font-semibold text-slate-700/80 border-opacity-90 cursor-default ' : 'font-regular text-slate-700/60 border-opacity-50 cursor-pointer ' } `}, `Altura C`),
            React.createElement('span', { onClick: () => setCajaAltura(18), className: ` inline-block h-6 w-24 rounded-md text-center align-top pb-7 mr-2 mt-2 border-solid border-2 border-slate-700 ${ cajaAltura === 18 ? 'font-semibold text-slate-700/80 border-opacity-90 cursor-default ' : 'font-regular text-slate-700/60 border-opacity-50 cursor-pointer ' } `}, `Altura D`) ),
            React.createElement('p', { className: ` mt-2 text-left text-slate-700/60 text-lg lg:ml-10 md:ml-8 ml-6 leading-normal font-light ` }, `Altura resultante: `, React.createElement('span', { className: `font-semibold text-slate-700/80` }, `${isXlParent ? `${galAlturaXl} rem` : isLgParent ? `${galAlturaLg} rem` : isMdParent ? `${galAlturaMd} rem` : `${galAlturaSm} rem`}`)),
        React.createElement('h5', { className: ` mt-8 text-left text-slate-700/80 lg:ml-10 md:ml-8 ml-6 font-semibold leading-normal lg:text-2xl md:text-xl sm:text-xl text-xl ` }, `Acerca de la altura de la galería de previsualización` ),
        React.createElement('div', { style: { }},
        React.createElement('p', { className: `   lg:text-2xl md:text-xl sm:text-xl text-lg font-light text-slate-700/70 text-justify lg:indent-6 md:indent-5 sm:indent-4 indent-4 lg:m-4 md:m-3 sm:m-2 m-2 lg:leading-relaxed md:leading-relaxed sm:leading-relaxed leading-relaxed `}, 'El alto de la galería de previsualización se ajusta en relación su ancho, que es el ancho del bloque dentro del cual se encuentra inscrita. Su altura tiene tres medidas fijas: A, B, C y D, de modo que, por ejemplo, si se elige la menor, la D, esa será la altura para todos lo anchos que alcance la galería de previsualización. Pero si se eligiera la más alta, la A, esa altura solo se alcanzará si el ancho de la galería de previsualización supera los 1280 pixeles; para los anchos inferiores, se auto ajustará siguiendo las cuatro alturas predeterminadas. Aquí, puede ser apreciado el dinamismo descrito, seleccionando una de las alturas predeterminadas, redimesionando la ventana y viendo el alto resultante.') )
////////////////////////////
////////////////////////////

        )
    }

export default ProntoVistaPrevGal;

