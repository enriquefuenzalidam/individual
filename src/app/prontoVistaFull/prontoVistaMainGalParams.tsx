"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import ProntoVistaMainGal from "@/components/prontoVistaMainGal";
import { ImportedImages } from '@/components/prontoVistaImgsLists';

const imageLists: Record<string, { imgsTamgnos: typeof ImportedImages }> = {
    default: { imgsTamgnos: ImportedImages } };

const ProntoVistaMGParams: React.FC = () => {

    const searchParams = useSearchParams();
    const listKey = searchParams.get("list") || "default";
    const { imgsTamgnos } = imageLists[listKey] || imageLists["default"];
    const indice = parseInt(searchParams.get("index") || "0", 10);
    const seleccColor = searchParams.get("color") || "white";

    return React.createElement('main', {
        style: { display: 'block', background: 'black', position: 'absolute', inset: 0, zIndex: 70, overflow: 'hidden', boxSizing: 'border-box'  } },
            React.createElement(ProntoVistaMainGal, { imgsTamgnos, indice, seleccColor } ) ) }

export default ProntoVistaMGParams;