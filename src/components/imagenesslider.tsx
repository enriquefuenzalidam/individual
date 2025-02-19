"use client";
import React from "react";
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
    const [currentGalleryIndex, setCurrentGalleryIndex] = useState<number>(2);

    const galleryRef = useRef<HTMLDivElement | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const setImageRef = (el: HTMLDivElement | null, index: number) => {
        imageRefs.current[index] = el;  };

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

    useEffect(() => {
        const galleryEl = galleryRef.current;
        if (!galleryEl) return;

        galleryEl.style.position = "relative";
        galleryEl.style.width = "100%";
        galleryEl.style.height = "100%";
        galleryEl.style.overflow = "hidden";
        galleryEl.style.transition = "all 700ms ease-in-out";

        imageRefs.current.forEach((imageEl, index) => {
          if (!imageEl) return;

          const imgEl = imageEl.querySelector("img") as HTMLImageElement | null;
          const overlayEl = imageEl.querySelector("div") as HTMLDivElement | null;
      
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
            imgEl.style.width = "100%";
            imgEl.style.height = "100%";
            imgEl.style.objectFit = "cover";
            imgEl.style.objectPosition = "center";
          }

          if (overlayEl) {
            overlayEl.style.position = "absolute";
            overlayEl.style.inset = "0";
            overlayEl.style.transition = "all 700ms ease-in-out";
            overlayEl.style.backdropFilter = "grayscale(100%)";
      
            if (isCurrent || !(isBefore1 || isBefore2 || isAfter1 || isAfter2)) {
              overlayEl.style.opacity = "0";
              overlayEl.style.backgroundColor = "transparent";
              overlayEl.style.cursor = "default";
            }
            else {
              overlayEl.onclick = () => handleNavClick(index);
              overlayEl.style.cursor = "pointer";
              overlayEl.style.opacity = "0.8";
              if (isBefore1 || isAfter1) overlayEl.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
              else if (isBefore2 || isAfter2) overlayEl.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
            }
          }

        });
      }, [currentGalleryIndex, getCircularIndex, handleNavClick]);

      const mainContainer = useRef<HTMLDivElement | null>(null);
      const sliderContainer = useRef<HTMLDivElement | null>(null);
      const innerSliderContainer = useRef<HTMLDivElement | null>(null);

      useEffect(() => {

        const maincont = mainContainer.current;
        const slidercont = sliderContainer.current;
        const innerslidercont = innerSliderContainer.current;

        if (!maincont || !slidercont || !innerslidercont ) return;

        maincont.style.position = 'relative';

        slidercont.style.position = 'relative';
        slidercont.style.maxWidth = '64rem';
        slidercont.style.width = '100%';
        slidercont.style.height = 'auto';
        slidercont.style.marginLeft = 'auto';
        slidercont.style.marginRight = 'auto';
        slidercont.style.borderRadius = '0.375rem';

        innerslidercont.style.transition = 'all 700ms ease-in-out' ;
        innerslidercont.style.overflowY = 'visible' ;
        innerslidercont.style.overflowX = 'hidden' ;
        innerslidercont.style.width = '100%' ;
        innerslidercont.style.position = 'relative' ;
        innerslidercont.style.height = isLargeScreen ? `${alturaBaseSm}rem` : `${alturaBase}rem`;

      }, [isLargeScreen, alturaBase, alturaBaseSm]);

      const discosSelector = useRef<HTMLDivElement | null>(null);
      const discosRefs = useRef<(HTMLSpanElement | null)[]>([]);
      const setDiscosRef = (el: HTMLSpanElement | null, index: number) => {
        discosRefs.current[index] = el;  };

      const applyDiscoStyles = useCallback(() => {

        const discselector = discosSelector.current;
        if (!discselector) return;

        discselector.style.maxWidth = '64rem';
        discselector.style.width = '100%';
        discselector.style.marginLeft = 'auto';
        discselector.style.marginRight = 'auto';
        discselector.style.textAlign = 'center';
        discselector.style.paddingTop = '1.25rem';
        discselector.style.position = 'relative';

        discosRefs.current.forEach((discoEl, index) => {
          if (!discoEl) return;
          const isCurrent = index === currentGalleryIndex;

          discoEl.style.margin = isLargeScreen ? '0.5rem' : '0.375rem';
          discoEl.style.display = 'inline-block';
          discoEl.style.borderRadius = '9999px';
          discoEl.style.height = isLargeScreen ? '1rem' : '0.75rem';
          discoEl.style.cursor = 'pointer';
          discoEl.style.transition = 'all 300ms ease-in-out';
          discoEl.onclick = () => handleNavClick(index);

          discoEl.style.width = isCurrent ? (isLargeScreen ? '4rem' : '3rem') : (isLargeScreen ? '1rem' : '0.75rem');
          discoEl.style.backgroundColor = isCurrent ? seleccionColor : 'rgba(0, 0, 0, 0.2)';

        });
      }, [isLargeScreen, currentGalleryIndex, seleccionColor, handleNavClick]);

      useEffect(() =>{
        applyDiscoStyles();
        window.addEventListener("resize", applyDiscoStyles);
        return () => window.removeEventListener("resize", applyDiscoStyles);
      }, [applyDiscoStyles]);

      return React.createElement(
        "div",
        { ref: mainContainer },
        React.createElement(
            "div",
            { ref: sliderContainer },
            React.createElement(
                "div",
                { ref: innerSliderContainer },
                !!imagenesLista.length &&
                    React.createElement(
                        "div",
                        { ref: galleryRef },
                        imagenesLista.map((item, index) =>
                            React.createElement(
                                "div",
                                { key: index, ref: (el: HTMLDivElement | null) => setImageRef(el, index) },
                                React.createElement(Image, { src: item, alt: "" }),
                                React.createElement("div", null)
                            )
                        )
                    )
            )
        ),
        React.createElement(
            "div",
            { ref: discosSelector },
            !!imagenesLista.length &&
                React.createElement(
                    "div",
                    null,
                    imagenesLista.map((_, index) =>
                        React.createElement("span", { key: index, ref: (el: HTMLSpanElement | null) => setDiscosRef(el, index) })
                    )
                )
        )
    );
    };

export default ImagenesSlider;