"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import ProntoVistaMainGal from "@/components/quicknfull/quicknfullMain";
import ExampleImagesList from '@/components/quicknfull/exampleImagesList';

const imageLists: Record<string, { imagesList: typeof ExampleImagesList }> = {
    default: { imagesList: ExampleImagesList } };

const QuicknfullMainParams: React.FC = () => {

    const searchParams = useSearchParams();
    const listKey = searchParams.get("list") || "default";
    const { imagesList } = imageLists[listKey] || imageLists["default"];
    const indice = parseInt(searchParams.get("index") || "0", 10);
    const seleccColor = searchParams.get("color") || "white";

    return React.createElement('main', {
        style: { display: 'block', background: 'black', position: 'absolute', inset: 0, zIndex: 70, overflow: 'hidden', boxSizing: 'border-box'  } },
            React.createElement(ProntoVistaMainGal, { imagesList, indice, seleccColor } ) ) }

export default QuicknfullMainParams;