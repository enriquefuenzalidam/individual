import React, { Suspense } from "react";
import ProntoVistaMGParams from "./prontoVistaMainGalParams";

export const metadata = {
    title: "ProntoVista Galería Principal" };

const Page: React.FC = () => {
    return React.createElement(Suspense, { fallback: null },
                React.createElement(ProntoVistaMGParams, null) ) };

export default Page;
