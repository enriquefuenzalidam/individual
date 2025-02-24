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

const DEFAULT_SCREEN_SIZE = 1024;

const ProntoVistaPrevGal: React.FC<ProntoVistaPrevGalProps> = ({ imagenesLista, seleccionColor = "#000", maxAltura = 32, iteracionTiempo = 4000 }) => {

    const computeGalleryIndexes = (newIndex: number, prevIndex: number, total: number) => {
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
            newSet, prevSet, commonElements, exclusiveNewElements, nonCommonElements
        };
    };

    const sobreCapaRefs = useRef<(HTMLDivElement | null)[]>([]);
    const updateSobreCapaStyles = useCallback((newIndex: number, prevIndex: number) => {
        const { newCurrent, newBefore1, newBefore2, newAfter1, newAfter2,
            commonElements, exclusiveNewElements, nonCommonElements } = computeGalleryIndexes(newIndex, prevIndex, imagenesLista.length);

        nonCommonElements.forEach(index => {
            const el = sobreCapaRefs.current[index];
            if (el) {
                el.style.opacity = "0";
                el.style.backgroundColor = "transparent";
                el.style.cursor = "default";
            }
        });

        exclusiveNewElements.forEach(index => {
            const el = sobreCapaRefs.current[index];
            if (el) {
                if (index === newCurrent) {
                    el.style.opacity = "0";
                    el.style.backgroundColor = "transparent";
                    el.style.cursor = "default";
                } else if (index === newBefore2 || index === newAfter2) {
                    el.style.opacity = "0.9";
                    el.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
                    el.style.cursor = "pointer";
                } else if (index === newBefore1 || index === newAfter1) {
                    el.style.opacity = "0.9";
                    el.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                    el.style.cursor = "pointer";
                }
            }
        });

        commonElements.forEach(index => {
            const el = sobreCapaRefs.current[index];
            if (el) {
                const computedStyle = window.getComputedStyle(el);

                if (index === newCurrent) {
                    if (computedStyle.opacity !== "0") el.style.opacity = "0";
                    if (computedStyle.backgroundColor !== "transparent") el.style.backgroundColor = "transparent";
                    if (computedStyle.cursor !== "default") el.style.cursor = "default";
                } else if (index === newBefore2 || index === newAfter2) {
                    if (computedStyle.opacity !== "0.9") el.style.opacity = "0.9";
                    if (computedStyle.backgroundColor !== "rgba(255, 255, 255, 0.7)") el.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
                    if (computedStyle.cursor !== "pointer") el.style.cursor = "pointer";
                } else if (index === newBefore1 || index === newAfter1) {
                    if (computedStyle.opacity !== "0.9") el.style.opacity = "0.9";
                    if (computedStyle.backgroundColor !== "rgba(255, 255, 255, 0.3)") el.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
                    if (computedStyle.cursor !== "pointer") el.style.cursor = "pointer";
                }
            }
        });

    }, [imagenesLista.length]);

    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const updateGalleryStyles = useCallback((newIndex: number, prevIndex: number) => {
        const { newCurrent, newBefore1, newBefore2, newAfter1, newAfter2,
            commonElements, exclusiveNewElements, nonCommonElements } = computeGalleryIndexes(newIndex, prevIndex, imagenesLista.length);

        nonCommonElements.forEach(index => {
            const el = imageRefs.current[index];
            if (el) {
                el.style.opacity = "0";
                el.style.zIndex = "10";
                el.style.boxShadow = "none";
                el.style.left = "50%";
                el.style.transform = "translateX(-50%) scale(0.01)";
            }
        });

        exclusiveNewElements.forEach(index => {
            const el = imageRefs.current[index];
            if (el) {
                if (index === newBefore2) {
                    el.style.opacity = "1";
                    el.style.zIndex = "30";
                    el.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.4)";
                    el.style.left = "0%";
                    el.style.transform = "translateX(0%) scale(0.95)";
                } else if (index === newBefore1) {
                    el.style.opacity = "1";
                    el.style.zIndex = "40";
                    el.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.4)";
                    el.style.left = "25%";
                    el.style.transform = "translateX(-25%) scale(1.05)";
                } else if (index === newCurrent) {
                    el.style.opacity = "1";
                    el.style.zIndex = "50";
                    el.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.6)";
                    el.style.left = "50%";
                    el.style.transform = "translateX(-50%) scale(1.1)";
                } else if (index === newAfter1) {
                    el.style.opacity = "1";
                    el.style.zIndex = "40";
                    el.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.4)";
                    el.style.left = "75%";
                    el.style.transform = "translateX(-75%) scale(1.05)";
                } else if (index === newAfter2) {
                    el.style.opacity = "1";
                    el.style.zIndex = "30";
                    el.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.4)";
                    el.style.left = "100%";
                    el.style.transform = "translateX(-100%) scale(0.95)";
                }
            }
        });

        commonElements.forEach(index => {
            const el = imageRefs.current[index];
            if (el) {
                const computedStyle = window.getComputedStyle(el);

                if (index === newBefore2) {
                    if (computedStyle.opacity !== "1") el.style.opacity = "1";
                    if (computedStyle.zIndex !== "30") el.style.zIndex = "30";
                    if (computedStyle.boxShadow !== "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.4)") el.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.4)";
                    if (computedStyle.left !== "0%") el.style.left = "0%";
                    if (computedStyle.transform !== "translateX(0%) scale(0.95)") el.style.transform = "translateX(0%) scale(0.95)";
                }
                else if (index === newBefore1) {
                    if (computedStyle.opacity !== "1") el.style.opacity = "1";
                    if (computedStyle.zIndex !== "40") el.style.zIndex = "40";
                    if (computedStyle.boxShadow !== "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.4)") el.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.4)";
                    if (computedStyle.left !== "25%") el.style.left = "25%";
                    if (computedStyle.transform !== "translateX(-25%) scale(1.05)") el.style.transform = "translateX(-25%) scale(1.05)";
                }
                else if (index === newCurrent) {
                    if (computedStyle.opacity !== "1") el.style.opacity = "1";
                    if (computedStyle.zIndex !== "50") el.style.zIndex = "50";
                    if (computedStyle.boxShadow !== "0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.6)") el.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.6)";
                    if (computedStyle.left !== "50%") el.style.left = "50%";
                    if (computedStyle.transform !== "translateX(-50%) scale(1.1)") el.style.transform = "translateX(-50%) scale(1.1)";
                }
                else if (index === newAfter1) {
                    if (computedStyle.opacity !== "1") el.style.opacity = "1";
                    if (computedStyle.zIndex !== "40") el.style.zIndex = "40";
                    if (computedStyle.boxShadow !== "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.4)") el.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.4)";
                    if (computedStyle.left !== "75%") el.style.left = "75%";
                    if (computedStyle.transform !== "translateX(-75%) scale(1.05)") el.style.transform = "translateX(-75%) scale(1.05)";
                }
                else if (index === newAfter2) {
                    if (computedStyle.opacity !== "1") el.style.opacity = "1";
                    if (computedStyle.zIndex !== "30") el.style.zIndex = "30";
                    if (computedStyle.boxShadow !== "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.4)") el.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.4)";
                    if (computedStyle.left !== "100%") el.style.left = "100%";
                    if (computedStyle.transform !== "translateX(-100%) scale(0.95)") el.style.transform = "translateX(-100%) scale(0.95)";
                }
            }
        });
    }, [imagenesLista.length]);

    const totalStylesUpdate = useCallback((newIndex: number, prevIndex: number) => {
        updateGalleryStyles(newIndex, prevIndex);
        updateSobreCapaStyles(newIndex, prevIndex);
    }, [updateGalleryStyles,updateSobreCapaStyles]);





    const galAlturaXl = Math.min(32, Math.max(18, maxAltura));
    const galAlturaLg = Math.min(32, Math.max(18, galAlturaXl - 4));
    const galAlturaMd = Math.min(32, Math.max(18, galAlturaLg - 8));
    const galAlturaSm = Math.min(32, Math.max(18, galAlturaMd - 2));

    const [currentGalleryIndex, setCurrentGalleryIndex] = useState<number>(2);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [isMdScreen, setIsMdScreen] = useState<boolean>(false);
    const [isLgScreen, setIsLgScreen] = useState<boolean>(false);
    const [isXlScreen, setIsXlScreen] = useState<boolean>(false);
    const [screenReady, setScreenReady] = useState(false);

    const [loadedImages, setLoadedImages] = useState<boolean[]>(new Array(imagenesLista.length).fill(false));
    useEffect(() => {
        imagenesLista.forEach((item, index) => {
            const img = new Image();
            img.src = typeof item === "string" ? item : item.src;
            img.onload = () => {
                setLoadedImages((prev) => {
                    if (prev[index]) return prev;
                    const updated = [...prev];
                    updated[index] = true;
                    return updated;
                });
            };
        });
    }, [imagenesLista]);

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

    const startInterval = useCallback(() => {
        intervalRef.current = setInterval(() => {
            setCurrentGalleryIndex((prevIndex) => {
                const newIndex = (prevIndex + 1) % imagenesLista.length;
                totalStylesUpdate(newIndex, prevIndex);
                return newIndex;
            })
        }, iteracionTiempo);
    }, [imagenesLista.length, iteracionTiempo, totalStylesUpdate]);

    const clearIntervalTimer = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        startInterval();
        return () => clearIntervalTimer();
    }, [startInterval, clearIntervalTimer]);

    const handleNavClick = useCallback((newIndex: number) => {
        clearIntervalTimer();
        setCurrentGalleryIndex(newIndex); 
        totalStylesUpdate(newIndex, currentGalleryIndex); 
        startInterval();
    }, [currentGalleryIndex, totalStylesUpdate, clearIntervalTimer, startInterval]);

//    const getCircularIndex = useCallback((index: number) => {
//      const len = imagenesLista.length;
//      return (index + len) % len;
//  }, [imagenesLista.length]);


    useEffect(() => {
        const { newCurrent, nonCommonElements, newBefore2, newBefore1, newAfter1, newAfter2 } = computeGalleryIndexes(currentGalleryIndex, (currentGalleryIndex - 1 + imagenesLista.length) % imagenesLista.length, imagenesLista.length);

        // Clear click events to the nonCommonElements except for
        // the newCurrent if it is between them
        nonCommonElements
        .filter(index => index !== newCurrent) // Exclude newCurrent
        .forEach(index => {
            const el = sobreCapaRefs.current[index];
            if (el) el.onclick = null;
        });


        // Attach click events only to the ones that need it
        [newBefore2, newBefore1, newAfter1, newAfter2].forEach(index => {
            const el = sobreCapaRefs.current[index];
            if (el) el.onclick = () => handleNavClick(index);
        });

    }, [imagenesLista.length, currentGalleryIndex, handleNavClick]); 

    const visibleImages = useMemo(() => {

        return imagenesLista.map((item, index) => {

                const imageBlockStyleA = {
                    display: "block", position: "absolute", top: "1.25rem", height: "calc(100% - 4rem)", aspectRatio: "1 / 1", borderRadius: "0.125rem", willChange: "transform, opacity", transition: "all 700ms ease-in-out", overflow: "hidden",
                    opacity: 0, zIndex: 10, boxShadow: "none", left: "50%", transform: "translateX(-50%) scale(0.01)"
                }
                const sobreCapaStyle = {
                    willChange: "opacity", position: "absolute", inset: "0", transition: "all 700ms ease-in-out", backdropFilter: "grayscale(100%)", opacity: "0", backgroundColor: "transparent", cursor: "default"
                }
                const imageBlockStyleB = {
                    position: 'relative', width: '100%', height: '100%', backgroundColor: "white", display: 'flex', justifyContent: 'center', alignItems: 'center'
                }
                const imageBlockStyleC = {
                    width: '10%', height: 'auto', transition: 'all 700ms ease-in-out', fontWeight: '500', color: seleccionColor
                }

                return React.createElement("div", { key: index, ref: (el) => { imageRefs.current[index] = el as HTMLDivElement | null }, style: imageBlockStyleA },
                    React.createElement("div", { style: imageBlockStyleB },
                        !loadedImages[index] && (React.createElement('div', { style: imageBlockStyleC },
                            React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 512", fill: 'currentColor' },
                                React.createElement('path', { fill: 'currentColor', d: 'M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z' })))),
                        React.createElement(NextImage, { src: typeof item === "string" ? item : item.src, alt: 'Gallery Image', fill: true, style: { objectFit: 'cover', transition: 'opacity 700ms ease-in-out', willChange: "opacity", opacity: loadedImages[index] ? 1 : 0 } }),
                        React.createElement("div", { ref: (el) => { sobreCapaRefs.current[index] = el as HTMLDivElement | null }, style: sobreCapaStyle })
                    )
                )
            });
    }, [imagenesLista, loadedImages, seleccionColor]);

    const visibleSelectores = useMemo(() => {
        return imagenesLista.map((_, index) => {
            const isCurrent = index === currentGalleryIndex;
            return React.createElement("span", { key: index, onClick: () => handleNavClick(index), style: { position: 'relative', margin: isLgScreen ? '0.5rem' : isMdScreen ? '0.375rem' : '0.375rem', display: 'inline-block', borderRadius: '9999px', overflow: 'hidden', height: isLgScreen ? '1rem' : isMdScreen ? '0.75rem' : '0.75rem', cursor: isCurrent ? 'default' : 'pointer', transition: 'all 300ms ease-in-out', width: isCurrent ? (isLgScreen ? '4rem' : isMdScreen ? '3rem' : '3rem' ) : (isLgScreen ? '1rem' : isMdScreen ? '0.75rem' : '0.75rem'), backgroundColor: 'rgba(0, 0, 0, 0.2)' } },
                                      React.createElement("span", { style: { willChange: "opacity", opacity: isCurrent ? '1': '0', pointerEvents: 'none', display: 'inline-block', position: 'absolute', left: '0', top: '0', width: isCurrent ? '100%' : (isLgScreen ? '1rem' : isMdScreen ? '0.75rem' : '0.75rem'), borderRadius: '9999px', height: isLgScreen ? '1rem' : isMdScreen ? '0.75rem' : '0.75rem', backgroundColor: seleccionColor, transition: 'width '+iteracionTiempo+'ms linear, opacity 700ms ease-in-out' } })
                                      ) } )
    }, [imagenesLista, currentGalleryIndex, isLgScreen, isMdScreen, seleccionColor, handleNavClick, iteracionTiempo]);

    if (!screenReady) return null;
    return React.createElement( "div", { style: { position: 'relative' } }, 
        React.createElement( "div", { style: { position: 'relative', maxWidth: '64rem', width: '100%', height: 'auto', marginLeft: 'auto', marginRight: 'auto' } },
            React.createElement( "div", { style: { transition: 'all 700ms ease-in-out', overflowY: 'visible', overflowX: 'hidden', width: '100%', position: 'relative', height: isXlScreen ? `${galAlturaXl}rem` : isLgScreen ? `${galAlturaLg}rem` : isMdScreen ? `${galAlturaMd}rem` : `${galAlturaSm}rem` } },
                !!imagenesLista.length && React.createElement("div", { style: {position: "relative", width: "100%", height: "100%", overflow: "hidden", transition: "all 700ms ease-in-out"} }, visibleImages ) ) ),
        React.createElement( "div", { style: { maxWidth: '64rem', width: '100%', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', paddingTop: '1.25rem', position: 'relative' } },
            !!imagenesLista.length && React.createElement( "div", null, visibleSelectores )
            )
        )
    }

export default ProntoVistaPrevGal;
