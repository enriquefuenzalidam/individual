"use client";
import { useRef, useState, useEffect, useCallback } from 'react';
import Image, { StaticImageData } from 'next/image';


interface ImagenesSliderProps {
  imageneslista: (string | StaticImageData)[];
  seleccionColor?: string;
  alturaBase?: number;
  iteracionTiempo?: number;
}

const ImagenesSlider: React.FC<ImagenesSliderProps> = ({ imageneslista, seleccionColor = "#000", alturaBase = 22, iteracionTiempo = 4000 }) => {

    const imagenesLista = imageneslista;
    
    const alturaBaseSm = alturaBase+6;
    const [containerHeight, setContainerHeight] = useState(`${alturaBase}rem`);
    const [currentGalleryIndex, setCurrentGalleryIndex] = useState<number>(2);
    const galleryRef = useRef<HTMLDivElement | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const imageRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const setImageRef = (el: HTMLSpanElement | null, index: number) => {
        imageRefs.current[index] = el;  };

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth >= 640) {
            setContainerHeight(`${alturaBaseSm}rem`);
          } else {
            setContainerHeight(`${alturaBase}rem`);
          }
        };
    
        handleResize(); 
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, [alturaBase, alturaBaseSm]);

    const startInterval = useCallback(() => {
        intervalRef.current = setInterval(() => {
            setCurrentGalleryIndex((prevIndex) => (prevIndex + 1) % imagenesLista.length);
        }, iteracionTiempo);
    }, [imagenesLista.length]);

    const clearIntervalTimer = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, []);

    useEffect(() => {
        startInterval();
        return () => clearIntervalTimer();
    }, [startInterval, clearIntervalTimer]);

    const handleNavClick = (index: number) => {
        setCurrentGalleryIndex(index);
        clearIntervalTimer();
        startInterval();
    };

    const getCircularIndex = useCallback((index: number) => {
        const len = imageneslista.length;
        return (index + len) % len;
    }, [imageneslista.length]);

    useEffect(() => {
        imageRefs.current.forEach((imageEl, index) => {
          if (!imageEl) return;

          const imgEl = imageEl.querySelector("img") as HTMLImageElement | null; // ✅ Get <img>
          const overlayEl = imageEl.querySelector("span") as HTMLSpanElement | null; // ✅ Get <span> overlay
      
          const isCurrent = index === currentGalleryIndex;
          const isBefore1 = index === getCircularIndex(currentGalleryIndex - 1);
          const isBefore2 = index === getCircularIndex(currentGalleryIndex - 2);
          const isAfter1 = index === getCircularIndex(currentGalleryIndex + 1);
          const isAfter2 = index === getCircularIndex(currentGalleryIndex + 2);

          imageEl.style.transition = "all 700ms ease-in-out";
          imageEl.style.position = "absolute";
          imageEl.style.top = "1.25rem";
          imageEl.style.display = "block";
          imageEl.style.height = "calc(100% - 4rem)";
          imageEl.style.aspectRatio = "1 / 1";
          imageEl.style.borderRadius = "0.125rem";
          imageEl.style.overflow = "hidden";

          imageEl.style.opacity = "0";
          imageEl.style.transform = "scale(1)";
          imageEl.style.zIndex = "10";
          imageEl.style.left = "50%";
          imageEl.style.translate = "-50%";

          if (isCurrent) {
            imageEl.style.opacity = "1";
            imageEl.style.zIndex = "50";
            imageEl.style.transform = "scale(1.1)";
            imageEl.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -2px rgba(0, 0, 0, 0.6)";

          } else if (isBefore1 || isAfter1) {
            imageEl.style.opacity = "1";
            imageEl.style.zIndex = "40";
            imageEl.style.transform = "scale(1.05)";
            imageEl.style.left = isBefore1 ? "25%" : "75%";
            imageEl.style.translate = isBefore1 ? "-25%" : "-75%" ;
            imageEl.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.4)";
    
          } else if (isBefore2 || isAfter2) {
            imageEl.style.opacity = "1";
            imageEl.style.zIndex = "30";
            imageEl.style.transform = "scale(0.95)";
            imageEl.style.left = isBefore2 ? "0%" : "100%";
            imageEl.style.translate = isBefore2 ? "0%" : "-100%";
            imageEl.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.4)";

          }
          
          if (imgEl) {
            imgEl.style.width = "100%"; // w-full
            imgEl.style.height = "100%"; // h-full
            imgEl.style.objectFit = "cover"; // object-cover
            imgEl.style.objectPosition = "center"; // object-center
          }

          if (overlayEl) {
            overlayEl.style.position = "absolute";
            overlayEl.style.inset = "0";
            overlayEl.style.transition = "all 700ms ease-in-out";
            overlayEl.style.backdropFilter = "grayscale(100%)";
      
            if (isCurrent || !(isBefore1 || isBefore2 || isAfter1 || isAfter2)) {
              overlayEl.style.opacity = "0";
              overlayEl.style.backgroundColor = "transparent";
            } else if (isBefore1 || isAfter1) {
              overlayEl.style.opacity = "0.8";
              overlayEl.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
            } else if (isBefore2 || isAfter2) {
              overlayEl.style.opacity = "0.8";
              overlayEl.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
            }
          }
        });
      }, [currentGalleryIndex, getCircularIndex]);

    return (
        <div className={` relative `}>

            <div className={` relative max-w-5xl w-full mx-auto rounded-md h-auto `}>
                <div className={` relative w-full overflow-y-visible overflow-x-hidden transition-all ease-in-out duration-300 `}
                        style={{ height: containerHeight, }}>
                    {!!imagenesLista.length && (
                        <div ref={galleryRef} className={` relative w-full h-full transition-all ease-in-out duration-1000 overflow-hidden `}>
                            {imagenesLista.map((item, index) => (

                                <span key={index} ref={(el) => setImageRef(el, index)} >
                                    <Image src={item} alt='' />
                                    <span />
                                    {/*
                                    <Link className={` absolute inset-0 ${index === currentGalleryIndex ? `` : `hidden` } `} href={`./prontovista?index=${index}&imagenesListaNumero=${imagenesListaNumero} `} />
                                    */}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Discs selector */}
            <div className={` max-w-5xl w-full mx-auto text-center pt-5 relative `}>
                {!!imagenesLista.length && (
                    <div>
                        {imagenesLista.map((_, index) => (
                            <span key={index} onClick={() => handleNavClick(index)}
                                    className={` ${ index === currentGalleryIndex ? 'w-12 sm:w-16' : 'w-3 sm:w-4' } m-1.5 sm:m-2 inline-block rounded-full h-3 sm:h-4 cursor-pointer transition-all ease-in-out duration-300 `}
                                    style={{ backgroundColor: index === currentGalleryIndex ? seleccionColor : 'rgba(0, 0, 0, 0.2)' }} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImagenesSlider;