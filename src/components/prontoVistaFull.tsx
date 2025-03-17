import React, {useRef, useState, useEffect, useCallback, useMemo} from "react";
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

    const [currentIndex, setCurrentIndex] = useState<number>(indice || 0);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [loadedImages, setLoadedImages] = useState<boolean[]>(new Array(imagenesLista.length).fill(false));
    const handleImageLoad = (index: number) => {
        setLoadedImages((prev) => {
            if (prev[index]) return prev;
            const updated = [...prev];
            updated[index] = true;
            return updated; }); };

    const thumbnailSize = useMemo(() => {
        return tnScreen ? 6 : smScreen ? 7 : mdScreen ? 8 : lgScreen ? 9 : xlScreen ? 10 : 10;
    }, [tnScreen, smScreen, mdScreen, lgScreen, xlScreen]);

    useEffect(() => {

        if (typeof window === "undefined") return;
    
        const container = containerRef.current;
        
        const targetElement = container?.children[currentIndex] as HTMLElement;
    
        const smoothScroll = (element: HTMLElement, targetIndex: number, duration: number) => {

            if (typeof window === "undefined") return;

            const startScroll = element.scrollLeft;
            const startTime = performance.now();

            const paddingSize = 1;
            const resultingThumbnailSize =  thumbnailSize - ( paddingSize * 2 );

            const thumbnailSizePx = 16 * resultingThumbnailSize;
            const marginSizePx = 0.15 * 16;

            const thumbnailAndMarginsSize = ( marginSizePx * 2 ) + thumbnailSizePx;
            
            const targetScroll = thumbnailAndMarginsSize * targetIndex;

            const animateScroll = (currentTime: number) => {

                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);

                const easeInOut = progress < 0.5
                    ? 4 * progress * progress * progress
                    : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                element.scrollLeft = startScroll + (targetScroll - startScroll) * easeInOut;

                if (elapsedTime < duration) requestAnimationFrame(animateScroll);

            };

            requestAnimationFrame(animateScroll);
        };

        if (container && targetElement) smoothScroll(container, currentIndex, 600);

    }, [thumbnailSize, currentIndex, xlScreen, lgScreen, mdScreen, smScreen, tnScreen ]); 

    const mainRef = useRef<HTMLDivElement | null>(null);
    const mainRefCurrent = mainRef?.current;
    useEffect(() => {

        const handleResize = () => {

            if (!mainRefCurrent) return;

            const width = mainRefCurrent.offsetWidth;

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

    }, [mainRefCurrent]);

    const loadingImage = useCallback(({ color = seleccionColor, alto = 24, fondo = 'black' }) => {
        return React.createElement('div', { style: { color: color, position: 'absolute', inset: '0', display: 'flex', alignContent: 'center', justifyContent: 'center', background: fondo, transition: 'all 300ms ease-in-out' } },
            React.createElement('svg', { style: { width: alto+'%', height: 'auto' }, xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 512", fill: 'currentColor' },
                React.createElement('path', { fill: 'currentColor', d: 'M54.2 202.9C123.2 136.7 216.8 96 320 96s196.8 40.7 265.8 106.9c12.8 12.2 33 11.8 45.2-.9s11.8-33-.9-45.2C549.7 79.5 440.4 32 320 32S90.3 79.5 9.8 156.7C-2.9 169-3.3 189.2 8.9 202s32.5 13.2 45.2 .9zM320 256c56.8 0 108.6 21.1 148.2 56c13.3 11.7 33.5 10.4 45.2-2.8s10.4-33.5-2.8-45.2C459.8 219.2 393 192 320 192s-139.8 27.2-190.5 72c-13.3 11.7-14.5 31.9-2.8 45.2s31.9 14.5 45.2 2.8c39.5-34.9 91.3-56 148.2-56zm64 160a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z' } ) ) )
    }, [seleccionColor])

    const loadingImageThumbnail = useMemo(()  => loadingImage({ alto: 24, fondo: 'linear-gradient(0deg, rgba(187,187,187,1) 0%, rgba(245,245,245,1) 100%)' }), [loadingImage]);
    const loadingImageFullImage = useMemo(()  => loadingImage({ alto: 9, color: 'rgba(255,255,255,0.3)' }), [loadingImage])


    if (!screenReady ) return;

    return React.createElement('div', {ref: mainRef, style: { position: 'relative', height: '100%'} },

                React.createElement('section', { role: "region", "aria-label": "Full-size Image",  style: { display: 'block', position: 'absolute', inset: '0', background: 'black' }},
                    imagenesLista?.map((item, index) => React.createElement('div', {key: index, style: { display: 'block', position: 'absolute', inset: '0', background: 'transparent', opacity: currentIndex === index ? '1' : '0', transition: 'opacity 0.5s ease-in-out' } },
                        !loadedImages[currentIndex]  && loadingImageFullImage, //!(loadedImages.every((loaded) => loaded))
                        React.createElement(NextImage, { key: index, onLoad: () => handleImageLoad(index), src: item, alt: 'Gallery Image', style: { width: '100%', height: '100%', objectFit: 'contain', opacity: loadedImages[index] ? 1 : 0 } } ) ) ) ),

                React.createElement('section', { role: "region", "aria-label": "Image Thumbnails", style: { display: 'block', position: 'absolute', bottom: '0', left: '0', width: '100%', height: tnScreen ? '6rem' : smScreen ? '7rem' : mdScreen ? '8rem' : lgScreen ? '9rem' : xlScreen ? '10rem' : '10rem', overflow: 'hidden', maskImage: 'linear-gradient( to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 13%, rgba(0,0,0,1) 87%, rgba(0,0,0,0) 100%)', transition: 'height 300ms ease-in-out' } },
                    React.createElement('div', { ref: containerRef, style: { display: 'block', position: 'relative', width: 'auto', height: '100%', padding: '1rem 0', whiteSpace: 'nowrap', overflowX: 'scroll', overflowY: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' } },
                        imagenesLista?.map((item, index) => React.createElement('div', { key: index, role: "listitem", "aria-label": `Thumbnail ${index + 1}`, onClick: () => { setCurrentIndex(index) }, style: { display: 'inline-block', position: 'relative', borderWidth: currentIndex !== index ? '0' : tnScreen ? '0.3rem' : mdScreen ? '0.4rem' : lgScreen ? '0.4rem' : xlScreen ? '0.4rem' :'0.4rem', borderStyle: 'solid', borderColor: seleccionColor, height: '100%', background: 'black', aspectRatio: '1 / 1', boxShadow: currentIndex !== index ? '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.8)' : '0 10px 12px -3px rgba(0, 0, 0, 0.6), 0 4px 3px -2px rgba(0, 0, 0, 1)', zIndex: currentIndex === index ? '65' : '62', transform: currentIndex === index ? 'scale(1.16)' : '', overflow: 'hidden', margin: index === 0 ? ` 0 0.15rem 0 calc(50% - ${ tnScreen ? '2rem' : smScreen ? '2.5rem' : mdScreen ? '3rem' : lgScreen ? '3.5rem' : xlScreen ? '4rem' : '4rem' } )` : index === imagenesLista.length-1 ? ` 0 calc(50% - ${ tnScreen ? '2rem' : smScreen ? '2.5rem' : mdScreen ? '3rem' : lgScreen ? '3.5rem' : xlScreen ? '4rem' : '4rem' } ) 0 0.15rem` : `0 0.15rem`, cursor: 'pointer', borderRadius: '0.25rem', transition: 'transform 300ms ease-in-out, border 300ms ease-in-out'  } },
                            !loadedImages[index] && loadingImageThumbnail,
                            React.createElement(NextImage, { key: index, onLoad: () => handleImageLoad(index), src: item, alt: 'Gallery Image', sizes: '10vw ', style: { width: '100%', height: '100%', objectFit: 'cover', opacity: loadedImages[index] ? currentIndex === index ? '1' : '0.6' : '0', transition: 'opacity 300ms ease-in-out'  } } ) ) ) ) )

    ) }

export default ProntoVistaFull;