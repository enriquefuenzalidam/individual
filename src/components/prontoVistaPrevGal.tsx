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
            setCurrentGalleryIndex((prevIndex) => (prevIndex + 1) % imagenesLista.length);
        }, iteracionTiempo);
    }, [imagenesLista.length, iteracionTiempo]);

    const clearIntervalTimer = useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        startInterval();
        return () => clearIntervalTimer();
    }, [startInterval, clearIntervalTimer]);

    const handleNavClick = useCallback((index: number) => {
        setCurrentGalleryIndex(index);
        clearIntervalTimer();
        startInterval();
    }, [clearIntervalTimer, startInterval]);

    const getCircularIndex = useCallback((index: number) => {
        const len = imagenesLista.length;
        return (index + len) % len;
    }, [imagenesLista.length]);

    const visibleImages = useMemo(() => {
        return imagenesLista.map((item, index) => {

            const isCurrent = index === currentGalleryIndex;
            const isBefore1 = index === getCircularIndex(currentGalleryIndex - 1);
            const isBefore2 = index === getCircularIndex(currentGalleryIndex - 2);
            const isAfter1 = index === getCircularIndex(currentGalleryIndex + 1);
            const isAfter2 = index === getCircularIndex(currentGalleryIndex + 2);
            const isSideImage = isBefore1 || isAfter1 || isBefore2 || isAfter2;

            const imageBlockStyleA = {
                transition: "all 700ms ease-in-out", position: "absolute", top: "1.25rem", height: "calc(100% - 4rem)", aspectRatio: "1 / 1", borderRadius: "0.125rem", overflow: "hidden", boxShadow: isSideImage ? "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.4)" : isCurrent ? "0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.6)" : "none", display: "block", opacity: isSideImage || isCurrent ? "1" : "0", zIndex: isCurrent ? "50" : isBefore1 || isAfter1 ? "40" : isBefore2 || isAfter2 ? "30" : "10", transform: isCurrent  ? "scale(1.1)" : isBefore1 || isAfter1 ? "scale(1.05)" : isBefore2 || isAfter2 ? "scale(0.95)" : "scale(0.25)", left: isSideImage ? isBefore1 ? "25%" : isAfter1 ? "75%" : isBefore2 ? "0%" : "100%" : "50%", translate: isSideImage ? isBefore1 ? "-25%" : isAfter1 ? "-75%" : isBefore2 ? "0%" : "-100%" : "-50%"
            }
            const sobreCapaStyle = {
                position: 'absolute', inset: '0', transition: "all 700ms ease-in-out", backdropFilter: "grayscale(100%)", opacity: isCurrent || !(isBefore1 || isBefore2 || isAfter1 || isAfter2) ? 0 : 0.9, backgroundColor: isCurrent || !(isBefore1 || isBefore2 || isAfter1 || isAfter2) ? "transparent" : isBefore1 || isAfter1 ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.7)", cursor: isCurrent || !(isBefore1 || isBefore2 || isAfter1 || isAfter2) ? "default" : "pointer"
            }
            const imageBlockStyleB = {
                position: 'relative', width: '100%', height: '100%', backgroundColor: "white", display: 'flex', justifyContent: 'center', alignItems: 'center'
            }
            const imageBlockStyleC = {
                width: '10%', height: 'auto', transition: 'all 700ms ease-in-out', fontWeight: '500', color: seleccionColor
            }

            return React.createElement( "div", { key: index, style: imageBlockStyleA },
                        React.createElement( "div", { style: imageBlockStyleB },
                            !loadedImages[index] && ( React.createElement( 'div', { style: imageBlockStyleC },
                                React.createElement( 'svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 512", fill: 'currentColor' },
                                    React.createElement('path', { fill: 'currentColor', d: 'M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z'} ) ) ) ),
                            React.createElement( NextImage, { src: typeof item === "string" ? item : item.src, alt: 'Gallery Image', fill: true, style: { objectFit: 'cover', transition: 'all 700ms ease-in-out', opacity: loadedImages[index] ? 1 : 0 } }),
                            React.createElement( "div", { style: sobreCapaStyle, onClick: isCurrent || !(isBefore1 || isBefore2 || isAfter1 || isAfter2) ? undefined : ()=> handleNavClick(index) } ) 
                        )
                    )
        });
    }, [imagenesLista, loadedImages, currentGalleryIndex, seleccionColor, handleNavClick, getCircularIndex]);

    const visibleSelectores = useMemo(() => {
        return imagenesLista.map((_, index) => {
            const isCurrent = index === currentGalleryIndex;
            return React.createElement("span", { key: index, onClick: () => handleNavClick(index), style: { position: 'relative', margin: isLgScreen ? '0.5rem' : isMdScreen ? '0.375rem' : '0.375rem', display: 'inline-block', borderRadius: '9999px', overflow: 'hidden', height: isLgScreen ? '1rem' : isMdScreen ? '0.75rem' : '0.75rem', cursor: isCurrent ? 'default' : 'pointer', transition: 'all 300ms ease-in-out', width: isCurrent ? (isLgScreen ? '4rem' : isMdScreen ? '3rem' : '3rem' ) : (isLgScreen ? '1rem' : isMdScreen ? '0.75rem' : '0.75rem'), backgroundColor: 'rgba(0, 0, 0, 0.2)' } },
                                      React.createElement("span", { style: { opacity: isCurrent ? '1': '0', pointerEvents: 'none', display: 'inline-block', position: 'absolute', left: '0', top: '0', width: isCurrent ? '100%' : (isLgScreen ? '1rem' : isMdScreen ? '0.75rem' : '0.75rem'), borderRadius: '9999px', height: isLgScreen ? '1rem' : isMdScreen ? '0.75rem' : '0.75rem', backgroundColor: seleccionColor, transition: 'width '+iteracionTiempo+'ms linear, opacity 700ms ease-in-out' } })
                                      ) } )
    }, [imagenesLista, currentGalleryIndex, isLgScreen, isMdScreen, seleccionColor, handleNavClick, iteracionTiempo]);

    if (!screenReady) return null;
    return React.createElement( "div", { style: { position: 'relative' } }, 
        React.createElement( "div", { style: { position: 'relative', maxWidth: '64rem', width: '100%', height: 'auto', marginLeft: 'auto', marginRight: 'auto', borderRadius: '0.375rem' } },
            React.createElement( "div", { style: { transition: 'all 700ms ease-in-out', overflowY: 'visible', overflowX: 'hidden', width: '100%', position: 'relative', height: isXlScreen ? `${galAlturaXl}rem` : isLgScreen ? `${galAlturaLg}rem` : isMdScreen ? `${galAlturaMd}rem` : `${galAlturaSm}rem` } },
                !!imagenesLista.length &&
                    React.createElement( "div", { style: {position: "relative", width: "100%", height: "100%", overflow: "hidden", transition: "all 700ms ease-in-out" } },
                        visibleImages ) ) ),
        React.createElement( "div", { style: { maxWidth: '64rem', width: '100%', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', paddingTop: '1.25rem', position: 'relative' } },
            !!imagenesLista.length &&
                React.createElement( "div", null, visibleSelectores )
            )
        )
    }

export default ProntoVistaPrevGal;
