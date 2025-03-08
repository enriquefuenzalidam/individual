"use client";
import React, {useRef, useState, useEffect} from "react";
import NextImage, { StaticImageData } from "next/image";

interface ProntoVistaFullProps {
    imagenesLista: (string | StaticImageData)[];
    indice: number;
    seleccColor?: string; }

const isValidColor = (color: string) => {
    const s = new Option().style;
    s.color = color;
    return s.color !== ""; };

const ProntoVistaFull: React.FC<ProntoVistaFullProps> = ({ imagenesLista, indice, seleccColor }) => {

    const [seleccionColor, setSeleccionColor] = useState<string>("white");
    useEffect(() => {
        if (seleccColor && isValidColor(seleccColor)) {
            setSeleccionColor(seleccColor); } }, [seleccColor]);

    const [screenReady, setScreenReady] = useState(false);
    const [xlScreen, setXlScreen] = useState(false);
    const [lgScreen, setLgScreen] = useState(false);
    const [mdScreen, setMdScreen] = useState(false);
    const [smScreen, setSmScreen] = useState(false);
    const [tnScreen, setTnScreen] = useState(false);

    const [loadedImages, setLoadedImages] = useState<boolean[]>(new Array(imagenesLista.length).fill(false));
    const [currentIndex, setCurrentIndex] = useState<number>(indice || 0);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const handleImageLoad = (index: number) => {
        setLoadedImages((prev) => {
            if (prev[index]) return prev;
            const updated = [...prev];
            updated[index] = true;
            return updated; });
    };

    useEffect(() => {

        if (typeof window === "undefined") return;
    
        const container = containerRef.current;
        const targetElement = container?.children[currentIndex] as HTMLElement;
    
        const allImagesLoaded = loadedImages.every((loaded) => loaded);

        const smoothScroll = (element: HTMLElement, targetElement: HTMLElement, duration: number) => {

            if (typeof window === "undefined") return;

            const startScroll = element.scrollLeft;
            const startTime = performance.now();

            const elementWidth = targetElement.offsetWidth;
            const parentWidth = element.offsetWidth;
            const targetScroll = targetElement.offsetLeft - parentWidth / 2 + elementWidth / 2; 

            const animateScroll = (currentTime: number) => {

                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1); // Ensures it stops at 1 (100%)

                const easeInOut = progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                element.scrollLeft = startScroll + (targetScroll - startScroll) * easeInOut;

                if (elapsedTime < duration) requestAnimationFrame(animateScroll);

            };
        
            requestAnimationFrame(animateScroll);
        };
    
        if (container && targetElement && allImagesLoaded) smoothScroll(container, targetElement, 600);

    }, [currentIndex, loadedImages]); 

    useEffect(() => {

        if (typeof window === "undefined") return;

        const handleResize = () => {

            const width = window.innerWidth;

            setXlScreen(width >= 1280);
            setLgScreen(width >= 1024 && width < 1280);
            setMdScreen(width >= 768 && width < 1024);
            setSmScreen(width >= 640 && width < 768);
            setTnScreen(width < 640);

        };

        handleResize();
        window.addEventListener("resize", handleResize);
        setScreenReady(true);

        return () => window.removeEventListener("resize", handleResize);

    }, []);

    if (!screenReady ) return;

    return React.createElement('main', { style: { display: 'block', position: 'absolute', inset: '0', zIndex: 70, overflow: 'hidden'  }},

                React.createElement('section', { style: { display: 'block', position: 'absolute', inset: '0', background: 'black' }},
                    imagenesLista?.map((item, index) => 
                        React.createElement('div', {key: index, style: { display: 'block', position: 'absolute', inset: '0', background: 'transparent', opacity: currentIndex === index ? '1' : '0', transition: 'opacity 0.5s ease-in-out' } },
                            React.createElement(NextImage, { key: index, onLoad: () => handleImageLoad(index), src: item, alt: 'Gallery Image', style: { width: '100%', height: '100%', objectFit: 'contain', opacity: loadedImages[index] ? '1': '0' } } ) ) ) ),

                React.createElement('section', { style: { display: 'block', position: 'absolute', bottom: '0', left: '0', width: '100%', height: tnScreen ? '6rem' : smScreen ? '7rem' : mdScreen ? '8rem' : lgScreen ? '9rem' : xlScreen ? '10rem' : '10rem', overflow: 'hidden', maskImage: 'linear-gradient( to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 13%, rgba(0,0,0,1) 87%, rgba(0,0,0,0) 100%)', transition: 'height 300ms ease-in-out' } },
                    React.createElement('div', { ref: containerRef, style: { display: 'block', position: 'relative', width: 'auto', height: '100%', padding: '1rem 0', whiteSpace: 'nowrap', overflowX: 'scroll', overflowY: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' } },
                        imagenesLista?.map((item, index) => React.createElement('div', { key: index, onClick: () => { setCurrentIndex(index) }, style: { display: 'inline-block', position: 'relative', borderWidth: currentIndex !== index ? '0' : tnScreen ? '0.3rem' : mdScreen ? '0.4rem' : lgScreen ? '0.4rem' : xlScreen ? '0.4rem' :'0.4rem', borderStyle: 'solid', borderColor: seleccionColor, height: '100%', background: 'black', aspectRatio: '1 / 1', boxShadow: currentIndex !== index ? '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.8)' : '0 10px 12px -3px rgba(0, 0, 0, 0.6), 0 4px 3px -2px rgba(0, 0, 0, 1)', zIndex: currentIndex === index ? '65' : '62', transform: currentIndex === index ? 'scale(1.2)' : '', overflow: 'hidden', margin: index === 0 ? '0 0.15rem 0 50%' : index === imagenesLista.length-1 ? '0 50% 0 0.15rem': '0 0.15rem', cursor: 'pointer', borderRadius: '0.25rem', transition: 'transform 300ms ease-in-out, border 300ms ease-in-out'  } },
                            React.createElement(NextImage, { key: index, onLoad: () => handleImageLoad(index), src: item, alt: 'Gallery Image', sizes: '20vw ', style: { width: '100%', height: '100%', objectFit: 'cover', opacity: currentIndex === index ? '1' : '0.6'  } } ) ) ) ) )

            )
}

export default ProntoVistaFull;