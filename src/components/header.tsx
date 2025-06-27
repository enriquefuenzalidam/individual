import React, { useState, useEffect} from "react";
import NextLogo from "./nextlogo";
import ReactLogo from "./reactlogo";
import IndividualLogo from "./individualLogo";
import useIndividualStyling from "@/hooks/useindividualstyling";

const Header: React.FC = () => {
    const { screenReady, dynSzGttr } = useIndividualStyling();

    const [pageLoaded, setPageLoaded] = useState(false);
    useEffect(() => {
        if (!screenReady) return;
        const timeout = setTimeout(() => setPageLoaded(true), 500);
        return () => clearTimeout(timeout); }, [screenReady]);

    if (!screenReady) return null;

    return React.createElement("header", { style: { position: "relative", boxSizing: 'border-box', display: "block", transition: 'opacity 500ms ease-in-out', opacity: pageLoaded ? 1 : 0, pointerEvents: pageLoaded ? 'auto' : 'none' } },
        React.createElement("section", { style: { maxWidth: "64rem", whiteSpace: 'nowrap', position: "relative", boxSizing: 'border-box', zIndex: "20", paddingBottom: '0.' + dynSzGttr('4','4','3','3','3','3') + 'rem', display: "block", transition: "all 300ms ease-in-out", height: 'auto' } },
            React.createElement("div", { style: { display: 'block', position: "absolute", boxSizing: 'border-box', inset: "0", backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.005) 1rem, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.01) 0.3rem, rgba(0,0,0,0) 100%)", maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 45%, rgba(0,0,0,0) 100%)' } } ),
            React.createElement("div", { style: { display: 'block', position: "absolute", boxSizing: 'border-box', inset: "0", backgroundImage: "linear-gradient(to bottom, #f1f5f9, transparent)", maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 100%)' } }),
            React.createElement("h1", { title: 'individual.cl', style: { position: 'relative', boxSizing: 'border-box', background: 'black', display: 'inline-block', width: dynSzGttr('8','8','6.5','5.9','5','5') + 'rem', aspectRatio: 173 / 239, overflow: 'hidden', borderRadius: '0.' + dynSzGttr('3','3','25','2','2','2') + 'rem', transition: 'all 300ms ease-in-out',
                boxShadow: '0 0.' + dynSzGttr('813','813','659','598','508','508') + 'rem 0.' + dynSzGttr('813','813','659','598','508','508') + 'rem 0.' + dynSzGttr('125','125','102','092','078','078') + 'rem rgba(0, 0, 0, 0.2), 0 0.' + dynSzGttr('5','5','406','369','313','313') + 'rem 0.' + dynSzGttr('5','5','406','369','313','313') + 'rem -0.' + dynSzGttr('313','313','254','230','195','195') + 'rem rgba(0, 0, 0, 0.6)',
                margin: '1.5rem 0 -' + dynSzGttr('3.8','3.8','3.1','2.7','2.2','2.2') + 'rem ' + dynSzGttr('4.5','4.1','3.5','3.1','2.5','2') + 'rem' }}, 
                React.createElement(IndividualLogo, null) ),
            React.createElement("h2", { style: { display: 'inline-block', boxSizing: 'border-box', position: "relative", fontFamily: "'Pangea Trial', sans-serif", color: "rgb(148, 163, 184)",  lineHeight: "1.15", marginLeft: dynSzGttr('1','1','0.9','0.8','0.8','0.8') + 'rem' } },
                React.createElement("span", { style: { textTransform: "uppercase", transition: "all 300ms ease-in-out", fontSize: '1.' + dynSzGttr('5','5','3','15','15','15') + 'rem', fontWeight: "500", display: "inline-block", verticalAlign: "middle", marginRight: '0.' + dynSzGttr('23','23','2','2','25','25') + 'rem', marginBottom: dynSzGttr('-0.045','-0.045','0.005','0.045','0.05','-0.1') + 'rem' } }, "Componentes"),
                React.createElement('div', { style: { whiteSpace: 'nowrap', display: dynSzGttr('inline-block','inline-block','inline-block','inline-block','inline-block','block'), boxSizing: 'border-box', padding: '0', margin: dynSzGttr('-0.15rem','-0.15rem','0','0','0','0') + ' 0 0 ' + dynSzGttr('0','0','0','0','0','0.1') + 'rem' }},
                    React.createElement("span", { style: { transition: "all 300ms ease-in-out", color: "rgb(71,85,105)", width: dynSzGttr('5.31','5.31','4.7','4','4','4') + 'rem', height: "auto", display: "inline-block", verticalAlign: 'middle', marginTop: dynSzGttr('0.05','0.05','0.03','0','0','0') + 'rem', marginLeft: '0' } },
                        React.createElement(NextLogo) ),
                    React.createElement("span", { style: { textTransform: 'none', color: "rgb(71,85,105)", transition: "all 300ms ease-in-out", fontSize: dynSzGttr('1.5','1.5','1.3','1.15','1.15','1.15') + 'rem', fontWeight: "500", display: "inline-block", verticalAlign: "middle", margin: '0 0.' + dynSzGttr('23','23','2','2','25','25') + 'rem' } }, "React"),
                    React.createElement("span", { style: { transition: "all 300ms ease-in-out", color: "rgb(71,85,105)", width: '1.' + dynSzGttr('5','5','3','2','1','1') + 'rem', height: "auto", display: "inline-block", verticalAlign: "middle", marginTop: '0.0' + dynSzGttr('5','5','3','0','0','0') + 'rem' } },
                        React.createElement(ReactLogo) ) ) )
                ) ) };
export default Header;
