import React, { useState, useEffect} from "react";
import Link from "next/link";
import IndividualLogo from "./individualLogo";
import useIndividualStyling from "@/hooks/useindividualstyling";

const HeaderSmall: React.FC = () => {
    const { screenReady, dynSzGttr } = useIndividualStyling();

    const [pageLoaded, setPageLoaded] = useState(false);
    useEffect(() => {
        if (!screenReady) return;
        const timeout = setTimeout(() => setPageLoaded(true), 500);
        return () => clearTimeout(timeout); }, [screenReady]);

    if (!screenReady) return null;

    return React.createElement("header", { style: { position: "relative", boxSizing: 'border-box', display: "block", transition: 'opacity 500ms ease-in-out', opacity: pageLoaded ? 1 : 0, pointerEvents: pageLoaded ? 'auto' : 'none' } },
        React.createElement("section", { style: { maxWidth: "64rem", whiteSpace: 'nowrap', position: "relative", boxSizing: 'border-box', zIndex: "20", paddingBottom: '0.3rem', display: "block", transition: "all 300ms ease-in-out", height: 'auto' } },
            React.createElement("div", { style: { display: 'block', position: "absolute", boxSizing: 'border-box', inset: "0", backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.005) 1rem, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.01) 0.3rem, rgba(0,0,0,0) 100%)", maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)' } } ),
            React.createElement("div", { style: { display: 'block', position: "absolute", boxSizing: 'border-box', inset: "0", backgroundImage: "linear-gradient(to bottom, #f1f5f9, transparent)", maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)' } }),
            React.createElement(Link, { href: '/', replace: false, prefetch: true, scroll: true, title: 'Inicio' },
                React.createElement("h1", { title: 'individual.cl', style: { position: 'relative', boxSizing: 'border-box', background: 'black', display: 'inline-block', width: '5rem', aspectRatio: 173 / 239, overflow: 'hidden', borderRadius: '0.2rem', transition: 'all 300ms ease-in-out',
                    boxShadow: '0 0.508rem 0.508rem 0.078rem rgba(0, 0, 0, 0.2), 0 0.313rem 0.313rem -0.195rem rgba(0, 0, 0, 0.6)',
                    margin: '1.5rem 0 -2.2rem ' + dynSzGttr('4.5','4.1','3.5','3.1','2.5','2') + 'rem' }}, 
                    React.createElement(IndividualLogo, null) ),

                ) ) ) };
export default HeaderSmall;

// import NextLogo from "./nextlogo";
// import ReactLogo from "./reactlogo";

        /*  React.createElement("h2", { style: { display: 'inline-block', boxSizing: 'border-box', position: "relative", fontFamily: "'Pangea Trial', sans-serif", color: "rgb(148, 163, 184)",  lineHeight: "1.15", marginLeft: '0.8rem' } },
                React.createElement("span", { style: { textTransform: "uppercase", transition: "all 300ms ease-in-out", fontSize: '1.15rem', fontWeight: "500", display: "inline-block", verticalAlign: "middle", marginRight: '0.25rem', marginBottom: dynSzGttr('0.05','0.05','0.05','0.05','0.05','-0.1') + 'rem' } }, "Componentes"),
                React.createElement('div', { style: { whiteSpace: 'nowrap', display: dynSzGttr('inline-block','inline-block','inline-block','inline-block','inline-block','block'), boxSizing: 'border-box', padding: '0', marginLeft: dynSzGttr('0','0','0','0','0','0.1') + 'rem' }},
                    React.createElement("span", { style: { transition: "all 300ms ease-in-out", color: "rgb(71,85,105)", width: '4rem', height: "auto", display: "inline-block", verticalAlign: 'middle' } },
                        React.createElement(NextLogo) ),
                    React.createElement("span", { style: { textTransform: 'none', color: "rgb(71,85,105)", transition: "all 300ms ease-in-out", fontSize: '1.15rem', fontWeight: "500", display: "inline-block", verticalAlign: "middle", margin: '0 0.25rem' } }, "React"),
                    React.createElement("span", { style: { transition: "all 300ms ease-in-out", color: "rgb(71,85,105)", width: '1.1rem', height: "auto", display: "inline-block", verticalAlign: "middle", marginTop: '0' } },
                        React.createElement(ReactLogo) ) ) ) */