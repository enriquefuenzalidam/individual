"use client";
import React from "react";
import { useRef, useState, useEffect, useCallback } from 'react';
import { StaticImageData } from 'next/image';

interface ImagenesSliderProps {
  imageneslista: (string | StaticImageData)[];
  seleccionColor?: string;
  alturaBase?: number;
  iteracionTiempo?: number;
}

const ImagenesSlider: React.FC<ImagenesSliderProps> = ({ imageneslista, seleccionColor = "#000", alturaBase = 22, iteracionTiempo = 4000 }) => {

    const imagenesLista = imageneslista;
    const alturaBaseSm = alturaBase+6;
    const [currentGalleryIndex, setCurrentGalleryIndex] = useState<number>(2);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

    useEffect(() => {
          const handleResize = () => setIsLargeScreen(window.innerWidth >= 640);
          handleResize();
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
        const len = imageneslista.length;
        return (index + len) % len;
    }, [imageneslista.length]);

      return React.createElement( "div", { style: { position: 'relative' } }, 
        React.createElement( "div", { style: { position: 'relative', maxWidth: '64rem', width: '100%', height: 'auto', marginLeft: 'auto', marginRight: 'auto', borderRadius: '0.375rem' } },
            React.createElement( "div", { style: { transition: 'all 700ms ease-in-out', overflowY: 'visible', overflowX: 'hidden', width: '100%', position: 'relative', height: isLargeScreen ? `${alturaBaseSm}rem` : `${alturaBase}rem` } },
                !!imagenesLista.length &&
                    React.createElement( "div", { style: {position: "relative", width: "100%", height: "100%", overflow: "hidden", transition: "all 700ms ease-in-out" } },
                        imagenesLista.map((item, index) => {
                          const isCurrent = index === currentGalleryIndex;
                          const isBefore1 = index === getCircularIndex(currentGalleryIndex - 1);
                          const isBefore2 = index === getCircularIndex(currentGalleryIndex - 2);
                          const isAfter1 = index === getCircularIndex(currentGalleryIndex + 1);
                          const isAfter2 = index === getCircularIndex(currentGalleryIndex + 2);
                          const isSideImage = isBefore1 || isAfter1 || isBefore2 || isAfter2;
                          return React.createElement( "div", { key: index, style: { backgroundColor: "#fff", transition: "all 700ms ease-in-out", position: "absolute", top: "1.25rem", display: "block", height: "calc(100% - 4rem)", aspectRatio: "1 / 1", borderRadius: "0.125rem", overflow: "hidden", boxShadow: isSideImage ? "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.4)" : isCurrent ? "0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.6)" : "none", opacity: isSideImage || isCurrent ? "1" : "0", zIndex: isCurrent ? "50" : isBefore1 || isAfter1 ? "40" : isBefore2 || isAfter2 ? "30" : "10", transform: isCurrent  ? "scale(1.1)" : isBefore1 || isAfter1 ? "scale(1.05)" : isBefore2 || isAfter2 ? "scale(0.95)" : "scale(0.25)", left: isSideImage ? isBefore1 ? "25%" : isAfter1 ? "75%" : isBefore2 ? "0%" : "100%" : "50%", translate: isSideImage ? isBefore1 ? "-25%" : isAfter1 ? "-75%" : isBefore2 ? "0%" : "-100%" : "-50%"} },
                                React.createElement( "div", { style: { width: "100%", height: "100%", backgroundImage: `url(${typeof item === "string" ? item : item.src})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" } }),
                                React.createElement( "div", { style: { position: "absolute", inset: "0", transition: "all 700ms ease-in-out", backdropFilter: "grayscale(100%)", opacity: isCurrent || !(isBefore1 || isBefore2 || isAfter1 || isAfter2) ? "0" : "0.8", backgroundColor: isCurrent || !(isBefore1 || isBefore2 || isAfter1 || isAfter2) ? "transparent" : isBefore1 || isAfter1 ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.7)", cursor: isCurrent || !(isBefore1 || isBefore2 || isAfter1 || isAfter2) ? "default" : "pointer" }, onClick: isCurrent || !(isBefore1 || isBefore2 || isAfter1 || isAfter2) ? undefined : ()=> handleNavClick(index)} ) ) }) ) ) ),
        React.createElement( "div", { style: { maxWidth: '64rem', width: '100%', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', paddingTop: '1.25rem', position: 'relative' } },
            !!imagenesLista.length &&
                React.createElement( "div", null,
                    imagenesLista.map((_, index) => {
                      const isCurrent = index === currentGalleryIndex;
                      return React.createElement("span", { key: index,   onClick: () => handleNavClick(index), style: { position: 'relative', margin: isLargeScreen ? '0.5rem' : '0.375rem', display: 'inline-block', borderRadius: '9999px', overflow: 'hidden', height: isLargeScreen ? '1rem' : '0.75rem', cursor: isCurrent ? 'default' : 'pointer', transition: 'all 300ms ease-in-out', width: isCurrent ? (isLargeScreen ? '4rem' : '3rem') : (isLargeScreen ? '1rem' : '0.75rem'), backgroundColor: 'rgba(0, 0, 0, 0.2)' } },
                                                React.createElement("span", { style: { opacity: isCurrent ? '1': '0', pointerEvents: 'none', display: 'inline-block', position: 'absolute', left: '0', top: '0', width: isCurrent ? '100%' : (isLargeScreen ? '1rem' : '0.75rem'), borderRadius: '9999px', height: isLargeScreen ? '1rem' : '0.75rem', backgroundColor: seleccionColor, transition: 'width '+iteracionTiempo+'ms linear, opacity 700ms ease-in-out' } })
                                                ) }) ) )
      )
}

export default ImagenesSlider;