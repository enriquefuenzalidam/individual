"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { StaticImageData } from "next/image";
import ProntoVistaMainGal from "@/components/prontoVistaMainGal";
// import ProntoVistaImages from '@/data/prontoVistaImages.json';
import { ImportedImages } from '@/components/prontoVistaImgsLists';

const imagenesListaMainSize = ImportedImages.map(item => item.mainSize);
const imagenesListaSmSize = ImportedImages.map(item => item.smSize);

const imageLists: Record<string, {
    full: (string | StaticImageData)[];
    thumbs: (string | StaticImageData)[]; }> = {

    default: {
        full: imagenesListaMainSize,
        thumbs: imagenesListaSmSize } };

const ProntoVistaMGParams: React.FC = () => {

    const searchParams = useSearchParams();
    const listKey = searchParams.get("list") || "default";
    const { full: imagenesLista, thumbs: thumbnailsLista } = imageLists[listKey] || imageLists["default"];
    const indice = parseInt(searchParams.get("index") || "0", 10);
    const seleccColor = searchParams.get("color") || "white";

    return React.createElement('main', {
        style: { display: 'block', background: 'black', position: 'absolute', inset: 0, zIndex: 70, overflow: 'hidden', boxSizing: 'border-box'  } },
            React.createElement(ProntoVistaMainGal, { imagenesLista, thumbnailsLista, indice, seleccColor } ) ) }

export default ProntoVistaMGParams;