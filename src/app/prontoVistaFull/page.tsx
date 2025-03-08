"use client";

import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import ProntoVistaFull from "@/app/prontoVistaFull/prontoVistaFull";
import { ProntoVistaImgsList } from "@/components/prontoVistaImgsLists";
import { StaticImageData } from "next/image";

const imageLists: Record<string, (string | StaticImageData)[]> = {
    default: ProntoVistaImgsList
};

// ✅ Wrap in a Suspense component
const Page: React.FC = () => {
    return React.createElement(Suspense, { fallback: null }, React.createElement(PageContent));
};

const PageContent: React.FC = () =>{
    const searchParams = useSearchParams();

    const listKey = searchParams.get("list") || "default";
    const imagenesLista = imageLists[listKey] || ProntoVistaImgsList;
    const indice = parseInt(searchParams.get("index") || "0", 10);
    const seleccColor = searchParams.get("color") || "white";

    return React.createElement('main', { style: { display: 'block', position: 'absolute', inset: '0', zIndex: 70, overflow: 'hidden'  }},
            React.createElement(ProntoVistaFull,{ imagenesLista, indice, seleccColor } ) ) }

export default Page;