"use client";
import React from "react";
import { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import NextImage, { StaticImageData } from 'next/image';

interface ProntoVistaPrevGalProps {
  imagenesLista: (string | StaticImageData)[];
  seleccionColor?: string;
  maxAltura?: number;
  iteracionTiempo?: number;
}

interface GalleryIndexes {
    newCurrent: number; newBefore1: number; newBefore2: number; newAfter1: number; newAfter2: number; prevCurrent: number; prevBefore1: number; prevBefore2: number; prevAfter1: number; prevAfter2: number; newSet: Set<number>; prevSet: Set<number>; commonElements: number[]; exclusiveNewElements: number[]; nonCommonElements: number[];
}

const DEFAULT_SCREEN_SIZE = 1024;

const ProntoVistaPrevGal: React.FC<ProntoVistaPrevGalProps> = ({ imagenesLista, seleccionColor = "#000", maxAltura = 32, iteracionTiempo = 4000 }) => {

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


    const [currentGalleryIndex, setCurrentGalleryIndex] = useState<number>(2);
    const [isMdScreen, setIsMdScreen] = useState<boolean>(false);
    const [isLgScreen, setIsLgScreen] = useState<boolean>(false);
    const [isXlScreen, setIsXlScreen] = useState<boolean>(false);
    const [screenReady, setScreenReady] = useState(false);

    const sobreCapaRefs = useRef<(HTMLDivElement | null)[]>([]);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const innerSpanDiscRefs = useRef<(HTMLSpanElement)[]>([]);
    const outerSpanDiscRefs = useRef<(HTMLSpanElement)[]>([]);
    const totalStylesUpdate = useCallback((indexes: GalleryIndexes) => {
        const { newCurrent, newBefore1, newBefore2, newAfter1, newAfter2,
            prevCurrent, commonElements, exclusiveNewElements, nonCommonElements } = indexes;

            if (innerSpanDiscRefs.current[newCurrent]) {
                innerSpanDiscRefs.current[newCurrent].style.opacity = "1";
                innerSpanDiscRefs.current[newCurrent].style.width = "100%";
                innerSpanDiscRefs.current[prevCurrent].style.opacity = "0";
                innerSpanDiscRefs.current[prevCurrent].style.width = isLgScreen ? '1rem' : isMdScreen ? '0.75rem' : '0.75rem'; }

            if (outerSpanDiscRefs.current[newCurrent]) {
                outerSpanDiscRefs.current[newCurrent].style.cursor = "default";
                outerSpanDiscRefs.current[newCurrent].style.width = isLgScreen ? '4rem' : isMdScreen ? '3rem' : '3rem';
                outerSpanDiscRefs.current[prevCurrent].style.cursor = "pointer";
                outerSpanDiscRefs.current[prevCurrent].style.width = isLgScreen ? '1rem' : isMdScreen ? '0.75rem' : '0.75rem'; }

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
                el2.style.left = "50%";
                el2.style.transform = "translateX(-50%) scale(0.01)"; }

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
                    el2.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.6)";
                    el2.style.left = "50%";
                    el2.style.transform = "translateX(-50%) scale(1.1)"; }
                else {
                    el2.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.4)";
                    if (index === newBefore2 || index === newAfter2) {
                        el2.style.zIndex = "30";
                        if (index === newBefore2) {
                            el2.style.left = "0%";
                            el2.style.transform = "translateX(0%) scale(0.95)"; }
                        else {
                            el2.style.left = "100%";
                            el2.style.transform = "translateX(-100%) scale(0.95)"; } }
                    else {
                        el2.style.zIndex = "40";
                        if (index === newBefore1) {
                            el2.style.left = "25%";
                            el2.style.transform = "translateX(-25%) scale(1.05)"; }
                        else {
                            el2.style.left = "75%";
                            el2.style.transform = "translateX(-75%) scale(1.05)"; } } } }

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
                if (index === newBefore2 || index === newAfter2) applyStyleIfDifferent(el,"backgroundColor","rgba(255, 255, 255, 0.7)");
                else applyStyleIfDifferent(el,"backgroundColor","rgba(255, 255, 255, 0.3)"); } 

            const el2 = imageRefs.current[index];
            if (!el2 || !(index === newBefore2 || index === newBefore1 || index === newCurrent || index === newAfter1 || index === newAfter2)) return;

            applyStyleIfDifferent(el2, "opacity","1");
            if (index === newCurrent) {
                applyStyleIfDifferent(el2, "zIndex","50");
                applyStyleIfDifferent(el2, "boxShadow","0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.6)");
                applyStyleIfDifferent(el2, "left","50%");
                applyStyleIfDifferent(el2, "transform","translateX(-50%) scale(1.1)"); }
            else {
                applyStyleIfDifferent(el2, "boxShadow","0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.4)");
                if (index === newBefore2 || index === newAfter2) {
                    applyStyleIfDifferent(el2, "zIndex","30");
                    if (index === newBefore2) {
                        applyStyleIfDifferent(el2, "left","0%");
                        applyStyleIfDifferent(el2, "transform","translateX(0%) scale(0.95)"); }
                    else {
                        applyStyleIfDifferent(el2, "left","100%");
                        applyStyleIfDifferent(el2, "transform","translateX(-100%) scale(0.95)"); } }
                else {
                    applyStyleIfDifferent(el2, "zIndex","40");
                    if (index === newBefore1) {
                        applyStyleIfDifferent(el2, "left","25%");
                        applyStyleIfDifferent(el2, "transform","translateX(-25%) scale(1.05)"); }
                    else {
                        applyStyleIfDifferent(el2, "left","75%");
                        applyStyleIfDifferent(el2, "transform","translateX(-75%) scale(1.05)"); } } } 

        } ) }, [isLgScreen, isMdScreen]);

    const galAlturaXl = Math.min(32, Math.max(18, maxAltura));
    const galAlturaLg = Math.min(32, Math.max(18, galAlturaXl - 4));
    const galAlturaMd = Math.min(32, Math.max(18, galAlturaLg - 8));
    const galAlturaSm = Math.min(32, Math.max(18, galAlturaMd - 2));

    const [loadedImages, setLoadedImages] = useState<boolean[]>(new Array(imagenesLista.length).fill(false));
    const handleImageLoad = (index: number) => {
        setLoadedImages((prev) => {
            if (prev[index]) return prev; // Avoid unnecessary updates
            const updated = [...prev];
            updated[index] = true;
            return updated;
        });
    };

    useEffect(() => {
        const handleResize = () => {
            const screenSize = typeof window === "undefined" ? DEFAULT_SCREEN_SIZE : window.innerWidth;
            setIsMdScreen(screenSize >= 640);
            setIsLgScreen(screenSize >= 768);
            setIsXlScreen(screenSize >= 1024);
        }
        handleResize();
        setScreenReady(true);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startInterval = useCallback(() => {
        intervalRef.current = setInterval(() => {
            setCurrentGalleryIndex((prevIndex) => {
                const newIndex = (prevIndex + 1) % imagenesLista.length;
                return newIndex;
            })
        }, iteracionTiempo);
    }, [ imagenesLista.length, iteracionTiempo]);

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

    }, [imagenesLista.length, currentGalleryIndex, totalStylesUpdate, handleNavClick]); 

    const visibleImages = useMemo(() => {

        return imagenesLista.map((item, index) => {

                const imageBlockStyleA = {
                    display: "block", position: "absolute", top: "1.25rem", height: "calc(100% - 4rem)", aspectRatio: "1 / 1", borderRadius: "0.125rem", willChange: "transform, opacity", transition: "all 700ms linear", overflow: "hidden",
                    opacity: 0, zIndex: 10, boxShadow: "none", left: "50%", transform: "translateX(-50%) scale(0.01)" }
                const sobreCapaStyle = {
                    willChange: "opacity", position: "absolute", inset: "0", transition: "all 700ms linear", backdropFilter: "grayscale(100%)", opacity: "0", backgroundColor: "transparent", cursor: "default" }
                const imageBlockStyleB = {
                    position: 'relative', width: '100%', height: '100%', backgroundColor: "white", display: 'flex', justifyContent: 'center', alignItems: 'center' }
                const imageBlockStyleC = {
                    width: '10%', height: 'auto', transition: 'all 700ms linear', fontWeight: '500', color: seleccionColor }
                const imageElementStyle: React.CSSProperties = {
                    objectFit: 'cover', transition: 'opacity 700ms linear', willChange: "opacity", opacity: loadedImages[index] ? 1 : 0 }

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
                position: 'relative', margin: isLgScreen ? '0.5rem' : isMdScreen ? '0.375rem' : '0.375rem', display: 'inline-block', borderRadius: '9999px', overflow: 'hidden', height: isLgScreen ? '1rem' : isMdScreen ? '0.75rem' : '0.75rem', transition: 'all 300ms linear', backgroundColor: 'rgba(0, 0, 0, 0.2)',
                cursor: 'pointer', width: isLgScreen ? '1rem' : isMdScreen ? '0.75rem' : '0.75rem' }
            const innerSpanDisc = {
                willChange: "opacity", pointerEvents: 'none', display: 'inline-block', position: 'absolute', left: '0', top: '0', borderRadius: '9999px', height: isLgScreen ? '1rem' : isMdScreen ? '0.75rem' : '0.75rem', backgroundColor: seleccionColor, transition: 'width '+iteracionTiempo+'ms linear, opacity 700ms linear',
                opacity: '0', width: isLgScreen ? '1rem' : isMdScreen ? '0.75rem' : '0.75rem' }
            
            return React.createElement("span", { key: index, onClick: () => handleNavClick(index), ref: (el) => { outerSpanDiscRefs.current[index] = el as HTMLSpanElement }, style: outerSpanDisc },
                                      React.createElement("span", { ref: (el) => { innerSpanDiscRefs.current[index] = el as HTMLSpanElement }, style: innerSpanDisc })
                                      ) } )
    }, [imagenesLista, isLgScreen, isMdScreen, seleccionColor, handleNavClick, iteracionTiempo]);


    const mainContainerStyle: React.CSSProperties = { position: 'relative' };
    const scndContainerStyle: React.CSSProperties = {
        position: 'relative', maxWidth: '64rem', width: '100%', height: 'auto', marginLeft: 'auto', marginRight: 'auto' }
    const hghtContainerStyle = (): React.CSSProperties => ({
        transition: 'all 700ms linear', overflowY: 'visible', overflowX: 'hidden', width: '100%', position: 'relative', height: isXlScreen ? `${galAlturaXl}rem` : isLgScreen ? `${galAlturaLg}rem` : isMdScreen ? `${galAlturaMd}rem` : `${galAlturaSm}rem` })
    const outerImagenesLista: React.CSSProperties = {
        position: "relative", width: "100%", height: "100%", overflow: "hidden", transition: "all 700ms linear" }

    const discContainerStyle: React.CSSProperties = {
        maxWidth: '64rem', width: '100%', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', paddingTop: '1.25rem', position: 'relative' }

    if (!screenReady) return null;
    return React.createElement( "div", { style: mainContainerStyle }, 
        React.createElement( "div", { style: scndContainerStyle },
            React.createElement( "div", { style: hghtContainerStyle() },
                !!imagenesLista.length && React.createElement("div", { style: outerImagenesLista }, visibleImages ) ) ),
        React.createElement( "div", { style: discContainerStyle },
            !!imagenesLista.length && React.createElement( "div", null, visibleSelectores )
            )
        )
    }

export default ProntoVistaPrevGal;
