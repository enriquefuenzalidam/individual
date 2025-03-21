"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import ProntoVistaMainGalFull from "@/components/prontoVistaMainGalFull";
import { ProntoVistaImgsList, ProntoVistaImgsListMainGalMin } from "@/components/prontoVistaImgsLists";
import { StaticImageData } from "next/image";

const imageLists: Record<string, {
    full: (string | StaticImageData)[];
    thumbs: (string | StaticImageData)[];
}> = {
    default: {
        full: ProntoVistaImgsList,
        thumbs: ProntoVistaImgsListMainGalMin
    }
};

const Page: React.FC = () => {
    return React.createElement(Suspense, { fallback: null }, React.createElement(PageContent));
};

const PageContent: React.FC = () =>{
    const searchParams = useSearchParams();

    const listKey = searchParams.get("list") || "default";
    const { full: imagenesLista, thumbs: thumbnailsLista } = imageLists[listKey] || imageLists["default"];

    const indice = parseInt(searchParams.get("index") || "0", 10);
    const seleccColor = searchParams.get("color") || "white";

    return React.createElement('div', {
        style: { display: 'block', position: 'absolute', inset: 0, zIndex: 70, overflow: 'hidden', boxSizing: 'border-box'  } },
            React.createElement(ProntoVistaMainGalFull,{ imagenesLista, thumbnailsLista, indice, seleccColor } ) ) }

export default Page;