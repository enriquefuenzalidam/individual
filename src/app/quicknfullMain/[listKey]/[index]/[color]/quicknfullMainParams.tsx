"use client";
import React from "react";
import { useParams } from "next/navigation";
import ProntoVistaMainGal from "@/components/quicknfull/quicknfullMain";
import ExampleImagesList from '@/components/quicknfull/exampleImagesList';

const imageLists: Record<string, { imagesList: typeof ExampleImagesList }> = {
    exampleImagesList: { imagesList: ExampleImagesList } };

const QuicknfullMainParams = () => {
  const params = useParams();
  const rawListKey = params.listKey;
  const listKey = Array.isArray(rawListKey) ? rawListKey[0] : rawListKey || "exampleImagesList";
  const { imagesList } = imageLists[listKey] || imageLists["exampleImagesList"];

  const indexStr = Array.isArray(params.index) ? params.index[0] : params.index || "0";
  const indice = parseInt(indexStr, 10);

  const colorStr = Array.isArray(params.color) ? params.color[0] : params.color || "white";
  const seleccColor = decodeURIComponent(colorStr);


  return React.createElement('main', {
    style: { display: 'block', background: 'black', position: 'absolute', inset: 0, zIndex: 70, overflow: 'hidden', boxSizing: 'border-box'  } },
        React.createElement(ProntoVistaMainGal, { imagesList, indice, seleccColor } ) ) }


export default QuicknfullMainParams;
