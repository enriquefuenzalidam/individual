"use client";
import { useRef, useState, useEffect, useCallback } from 'react';
import Image, { StaticImageData } from 'next/image';


interface ImagenesSliderProps {
  imageneslista: (string | StaticImageData)[];
  seleccionColor?: string;
  alturaBase?: number;
}

const ImagenesSlider: React.FC<ImagenesSliderProps> = ({ imageneslista, seleccionColor = "#000", alturaBase = 22 }) => {

    const imagenesLista = imageneslista;
    const alturaBaseSm = alturaBase+6;
    const [containerHeight, setContainerHeight] = useState(`${alturaBase}rem`);

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

    const [currentGalleryIndex, setCurrentGalleryIndex] = useState<number>(2);
    const galleryRef = useRef<HTMLDivElement | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startInterval = useCallback(() => {
        intervalRef.current = setInterval(() => {
            setCurrentGalleryIndex((prevIndex) => (prevIndex + 1) % imagenesLista.length);
        }, 4000);
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

    const getCircularIndex = (index: number) => {
        const len = imageneslista.length;
        return (index + len) % len;
    };
    
    return (
        <div className={` relative `}>

            <div className={` relative max-w-5xl w-full mx-auto rounded-md h-auto `}>
                <div className={` relative w-full overflow-y-visible overflow-x-hidden transition-all ease-in-out duration-300 `}
                        style={{ height: containerHeight, }}>
                    {!!imagenesLista.length && (
                        <div ref={galleryRef} className={` relative w-full h-full transition-all ease-in-out duration-1000 overflow-hidden `}>
                            {imagenesLista.map((item, index) => {

                                const isCurrent = index === currentGalleryIndex;
                                const isBefore1 = index === getCircularIndex(currentGalleryIndex - 1);
                                const isBefore2 = index === getCircularIndex(currentGalleryIndex - 2);
                                const isAfter1 = index === getCircularIndex(currentGalleryIndex + 1);
                                const isAfter2 = index === getCircularIndex(currentGalleryIndex + 2);

                            return (
                                /* The positioning conditionals */
                                <span key={index}
                                    className={` absolute top-5 block h-[calc(100%-4rem)] aspect-square shadow-lg rounded-sm overflow-hidden transition-all ease-in-out duration-700 
                                    ${isCurrent ? ` left-1/2 -translate-x-1/2 z-50 scale-105 sm:scale-110 shadow-black/60 ` : ` shadow-black/40` }
                                    ${ !(isCurrent || isBefore1 || isBefore2 || isAfter1 || isAfter2) ? 'opacity-0 ' : '' }
                                    ${ isBefore2 ? 'z-30 left-1 scale-90 sm:scale-95 ' : '' }
                                    ${ isBefore1 ? 'z-40 left-1/4 -translate-x-1/4 ' : '' }
                                    ${ isAfter1 ? 'z-40 left-3/4 -translate-x-3/4 ' : '' }
                                    ${ isAfter2 ? 'z-30 left-[calc(100%-0.25rem)] -translate-x-full scale-90 sm:scale-95 ' : '' } `} >
                                    <Image className={` w-full h-full object-center object-cover `} src={item} alt='' />
                                    <div className={` absolute inset-0 backdrop-grayscale transition-all ease-in-out duration-700 ${index === currentGalleryIndex ? `opacity-0` : `opacity-80 bg-white/40` } `} />
                                    {/*
                                    <Link className={` absolute inset-0 ${index === currentGalleryIndex ? `` : `hidden` } `} href={`./prontovista?index=${index}&imagenesListaNumero=${imagenesListaNumero} `} />
                                    */}
                                </span>
                            )
                            })}
                        </div>
                    )}
                </div>
            </div>

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