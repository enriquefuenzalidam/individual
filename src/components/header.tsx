import React, { useState, useEffect} from "react";
import NextLogo from "./nextlogo";
import ReactLogo from "./reactlogo";
import IndividualLogo from "./individualLogo";
import usePantallaTamagnos from "@/hooks/usepantallatamagnos";

const Header: React.FC = () => {
    const { screenReady, xlScreen, lgScreen, mdScreen, smScreen } = usePantallaTamagnos();

    const [pageLoaded, setPageLoaded] = useState(false);
    useEffect(() => {
        if (!screenReady) return;
        const timeout = setTimeout(() => setPageLoaded(true), 100);
        return () => clearTimeout(timeout); }, [screenReady]);
      
    if (!screenReady) return null;
    return React.createElement("header", { style: { position: "relative", boxSizing: 'border-box', display: "block", transition: 'opacity 400ms ease-in-out', opacity: pageLoaded ? 1 : 0, pointerEvents: pageLoaded ? 'auto' : 'none' } },
        React.createElement("section", { style: { maxWidth: "64rem", position: "relative", boxSizing: 'border-box', zIndex: "20", paddingBottom: lgScreen || xlScreen ? "0.4rem" : mdScreen ? "0.3rem" : smScreen ? "0.3rem" : "0.3rem", display: "block", transition: "all 300ms ease-in-out", height: 'auto' } },
            React.createElement("div", { style: { display: 'block', position: "absolute", boxSizing: 'border-box', inset: "0", backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.005) 1rem, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.01) 0.3rem, rgba(0,0,0,0) 100%)", maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)' } } ),
            React.createElement("div", { style: { display: 'block', position: "absolute", boxSizing: 'border-box', inset: "0", backgroundImage: "linear-gradient(to bottom, #f1f5f9, transparent)", maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)' } }),
            React.createElement("h1", { title: 'individual.cl', style: { position: 'relative', boxSizing: 'border-box', background: 'black', display: 'inline-block', width: lgScreen || xlScreen ? '8rem' : mdScreen ? '6.5rem' : smScreen ? '5.9rem' : '5rem', aspectRatio: 173 / 239, overflow: 'hidden', borderRadius: lgScreen || xlScreen ? '0.3rem' : mdScreen ? '0.25rem' : smScreen ? '0.2rem' : '0.2rem', transition: 'all 300ms ease-in-out',
                boxShadow: lgScreen || xlScreen ? '0 0.813rem 0.813rem 0.125rem rgba(0, 0, 0, 0.2), 0 0.5rem 0.5rem -0.313rem rgba(0, 0, 0, 0.6)'
                : mdScreen ? '0 0.659rem 0.659rem 0.102rem rgba(0, 0, 0, 0.2), 0 0.406rem 0.406rem -0.254rem rgba(0, 0, 0, 0.6)'
                : smScreen ? '0 0.598rem 0.598rem 0.092rem rgba(0, 0, 0, 0.2), 0 0.369rem 0.369rem -0.230rem rgba(0, 0, 0, 0.6)'
                : '0 0.508rem 0.508rem 0.078rem rgba(0, 0, 0, 0.2), 0 0.313rem 0.313rem -0.195rem rgba(0, 0, 0, 0.6)',
                margin: lgScreen || xlScreen ? '1.5rem 0 -3.8rem 4.5rem' : mdScreen ? '1.5rem 0 -3.1rem 3.7rem' : smScreen ? '1.875rem 0 -2.7rem 3.4rem' : '1.5rem 0 -2.2rem 2.1rem' }}, 
                React.createElement(IndividualLogo, null) ),
            React.createElement("h2", { style: { display: 'inline-block', boxSizing: 'border-box', position: "relative", fontFamily: "'Pangea Trial', sans-serif", color: "rgb(148, 163, 184)",  lineHeight: "1.15", marginLeft: lgScreen || xlScreen ? '1rem' : mdScreen ? '0.9rem' : smScreen ? '0.8rem' : '0.8rem' } },
                React.createElement("span", { style: { textTransform: "uppercase", transition: "all 300ms ease-in-out", fontSize: lgScreen || xlScreen ? "1.5rem" : mdScreen ? "1.3rem" : smScreen ? "1.15rem" : "1.15rem", fontWeight: "500", display: "inline-block", verticalAlign: "middle", marginRight: lgScreen || xlScreen ? "0.23rem" : mdScreen ? "0.2rem" : smScreen ? "0.2rem" : "0.25rem" } }, "Componentes"),
                React.createElement("span", { style: { transition: "all 300ms ease-in-out", color: "rgb(71,85,105)", width: lgScreen || xlScreen ? "5.31rem": mdScreen ? "4.7rem" : smScreen ? "4rem" : "4rem", height: "auto", display: "inline-block", verticalAlign: "middle", marginTop: lgScreen || xlScreen ? "0.05rem" : mdScreen ? "0.03rem" : smScreen ? "0" : "0" } },
                    React.createElement(NextLogo) ),
                React.createElement("span", { style: { textTransform: 'none', color: "rgb(71,85,105)", transition: "all 300ms ease-in-out", fontSize: lgScreen || xlScreen ? "1.5rem" : mdScreen ? "1.3rem" : smScreen ? "1.15rem" : "1.15rem", fontWeight: "500", display: "inline-block", verticalAlign: "middle", margin: lgScreen || xlScreen ? "0 0.23rem" : mdScreen ? "0 0.2rem" : smScreen ? "0 0.2rem" : "0 0.25rem" } }, "React"),
                React.createElement("span", { style: { transition: "all 300ms ease-in-out", color: "rgb(71,85,105)", width: lgScreen || xlScreen ? "1.5rem": mdScreen ? "1.3rem" : smScreen ? "1.2rem" : "1.1rem", height: "auto", display: "inline-block", verticalAlign: "middle", marginTop: lgScreen || xlScreen ? "0.05rem" : mdScreen ? "0.03rem" : smScreen ? "0rem" : "0rem" } },
                    React.createElement(ReactLogo) ) )
                ) ) };
export default Header;
