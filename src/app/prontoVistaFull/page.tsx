"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import ProntoVistaMainGal from "@/components/prontoVistaMainGal";
import { ProntoVistaImgsList } from "@/components/prontoVistaImgsLists";
import { StaticImageData } from "next/image";

const imageLists: Record<string, (string | StaticImageData)[]> = {
    default: ProntoVistaImgsList
};

const Page: React.FC = () => {
    return React.createElement(Suspense, { fallback: null }, React.createElement(PageContent));
};

const PageContent: React.FC = () =>{
    const searchParams = useSearchParams();

    const listKey = searchParams.get("list") || "default";
    const imagenesLista = imageLists[listKey] || ProntoVistaImgsList;
    const indice = parseInt(searchParams.get("index") || "0", 10);
    const seleccColor = searchParams.get("color") || "white";

    return React.createElement('div', { style: { display: 'block', position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: 70, overflow: 'hidden', boxSizing: 'border-box'  }},
            React.createElement(ProntoVistaMainGal,{ imagenesLista, indice, seleccColor } ) ) }

export default Page;