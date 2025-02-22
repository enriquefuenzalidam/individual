"use client";
import React from "react";
import NextLogo from "./nextlogo";
import usePantallaTamagnos from "@/hooks/usepantallatamagnos";

const Header: React.FC = () => {
    const { screenReady, lgScreen, mdScreen, smScreen } = usePantallaTamagnos();
    if (!screenReady) return null;
    return React.createElement("header", { style: { position: "relative", display: "block" } },
        React.createElement("section", { style: { maxWidth: "64rem", position: "relative", zIndex: "20", paddingTop: smScreen ? "1.875rem" : "1.5rem", paddingLeft: lgScreen ? "3rem" : mdScreen ? "2.25rem" : smScreen ? "1.875rem" : "1.5rem", paddingRight: lgScreen ? "3rem" : mdScreen ? "2.25rem" : smScreen ? "1.875rem" : "1.5rem", paddingBottom: lgScreen ? "1.2rem" : mdScreen ? "1rem" : smScreen ? "0.8rem" : "0.65rem", display: "block", transition: "all 300ms ease-in-out" } },
            React.createElement("div", { style: { position: "absolute", inset: "0", backgroundImage: "linear-gradient(to bottom, #f1f5f9, transparent)", maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)' } }),
            React.createElement("div", { style: { position: "absolute", inset: "0", backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.005) 1rem, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.01) 0.3rem, rgba(0,0,0,0) 100%)", maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)' } } ),
            React.createElement("h1", { style: { position: "relative", fontWeight: "700", fontFamily: "'Pangea Trial', sans-serif", lineHeight: "1" } },
                React.createElement("span", { style: { transition: "all 300ms ease-in-out", fontSize: lgScreen ? "6rem" : mdScreen ? "4.5rem" : smScreen ? "3.75rem" : "3rem", color: "rgb(71, 85, 105)" } }, "individual"),
                React.createElement("span", { style: { transition: "all 300ms ease-in-out", fontSize: lgScreen ? "3rem" : mdScreen ? "2.25rem" : smScreen ? "1.85rem" : "1.5rem", color: "rgb(30, 41, 59)" } }, ".cl") ),
            React.createElement("h2", { style: { position: "relative", fontFamily: "'Pangea Trial', serif", color: "rgb(148, 163, 184)", marginTop: lgScreen ? "-0.75rem" : mdScreen ? "-0.5rem" : smScreen ? "-0.3rem" : "-0.3rem", lineHeight: "1.15" } },
                React.createElement("span", { style: { textTransform: "uppercase", transition: "all 300ms ease-in-out", fontSize: lgScreen ? "2.25rem" : mdScreen ? "1.875rem" : smScreen ? "1.5rem" : "1.25rem", fontWeight: "500", display: "inline-block", verticalAlign: "middle", marginRight: lgScreen ? "0.5rem" : mdScreen ? "0.5rem" : smScreen ? "0.25rem" : "0.25rem" } }, "Componentes"),
                React.createElement("span", { style: { transition: "all 300ms ease-in-out", color: "rgb(71,85,105)", width: lgScreen ? "7.9rem": mdScreen ? "5.925rem" : smScreen ? "4.938rem" : "3.95rem", height: "auto", display: "inline-block", verticalAlign: "middle", marginTop: lgScreen ? "0.15rem" : mdScreen ? "0.075rem" : smScreen ? "0.063rem" : "0.050rem" }},
                    React.createElement(NextLogo) ) ) ) ) };
export default Header;
