"use client";
import React from "react";
import {  useRef, useState, useEffect, useCallback } from 'react';
import NextImage, { StaticImageData } from 'next/image';

interface ProntoVistaPrevGalProps {
  imagenesLista: (string | StaticImageData)[];
  seleccionColor?: string;
  maxAltura?: number;
  iteracionTiempo?: number;
}

const DEFAULT_SCREEN_SIZE = 1024;

const ProntoVistaPrevGalTailwind: React.FC<ProntoVistaPrevGalProps> = ({ imagenesLista, seleccionColor = "#000", maxAltura = 32, iteracionTiempo = 4000 }) => {

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

    if (!screenReady) return null;
    
    return (
        <div className={` relative `}>
            <div className={` relative max-w-[64rem] w-full h-auto mx-auto`}>
                <div className={` transition-all duration-700 ease-in-out overflow-x-hidden  overflow-y-visible w-full relative `} style={{ height: isXlScreen ? `${galAlturaXl}rem` : isLgScreen ? `${galAlturaLg}rem` : isMdScreen ? `${galAlturaMd}rem` : `${galAlturaSm}rem` }}>
                    {!!imagenesLista.length && <div className={` relative w-full h-full overflow-hidden transition-all ease-in-out duration-700 `}>
                        {imagenesLista.map((item, index) => {
                            
                            const isCurrent = index === currentGalleryIndex;
                            const isBefore1 = index === getCircularIndex(currentGalleryIndex - 1);
                            const isBefore2 = index === getCircularIndex(currentGalleryIndex - 2);
                            const isAfter1 = index === getCircularIndex(currentGalleryIndex + 1);
                            const isAfter2 = index === getCircularIndex(currentGalleryIndex + 2);
                            const isSideImage = isBefore1 || isAfter1 || isBefore2 || isAfter2;

                            return (<div key={index} className={` absolute top-5 will-change-auto transition-all ease-in-out duration-700 h-[calc(100%-4rem)] w-auto aspect-square rounded-md overflow-hidden block
                                                                ${ (isSideImage || isCurrent) ? "opacity-100" : "opacity-0" } ${ isCurrent ? "z-50" : (isBefore1 || isAfter1) ? "z-40" : (isBefore2 || isAfter2) ? "z-30" : "z-10" } 
                                                                ${ isSideImage ? 'shadow-lg shadow-black/40' : isCurrent ? 'shadow-black/60 shadow-lg' : '' }
                                                                ${ isCurrent ? 'scale-110' : (isBefore1 || isAfter1) ? 'scale-105' : (isBefore2 || isAfter2) ? 'scale-95' : 'scale-50' }
                                                                ${ isBefore1 ? 'left-1/4 -translate-x-1/4' : isAfter1 ? 'left-3/4 -translate-x-3/4' : isBefore2 ? 'left-0' : isAfter2 ? 'left-full -translate-x-full' : 'left-1/2 -translate-x-1/2' } `}>
                                    <div className={` relative w-full h-full bg-white flex justify-center items-center `}>
                                        { !loadedImages[index] && <div className={` w-full h-auto transition-all duration-700 ease-in-out font-medium `} style={{ color: seleccionColor }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill='currentColor'>
                                                <path fill='currentColor' d='M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z' /></svg></div>}
                                        <NextImage src={typeof item === "string" ? item : item.src} alt='Gallery Image' fill className={` object-cover transition-opacity duration-700 ease-in-out will-change-auto ${ loadedImages[index] ? 'opacity-100' : 'opacity-0' } `} />
                                        <div className={` will-change-auto absolute inset-0 transition-all ease-in-out duration-700 backdrop-grayscale ${isCurrent || !(isBefore1 || isBefore2 || isAfter1 || isAfter2) ? 'opacity-0' : 'opacity-90 '} ${isCurrent || !(isBefore1 || isBefore2 || isAfter1 || isAfter2) ? 'bg-transparent' : isBefore1 || isAfter1 ? 'bg-white/30' : 'bg-white/70'} ${isCurrent || !(isBefore1 || isBefore2 || isAfter1 || isAfter2) ? "cursor-default" : "cursor-pointer"} `} {...( (isBefore1 || isBefore2 || isAfter1 || isAfter2) && { onClick: () => handleNavClick(index) })} />
                                    </div>
                                </div>)
                            })}
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default ProntoVistaPrevGalTailwind;
