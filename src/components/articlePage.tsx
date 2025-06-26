"use client";
import React, { useEffect, useState} from 'react';
import Header from "@/components/header";
import Footer from "@/components/footer";
import useIndividualStyling from "@/hooks/useindividualstyling";

const ArticlePage: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const { screenReady, nullBlockStyle, dynSzGttr } = useIndividualStyling();

    const [pageLoaded, setPageLoaded] = useState(false);
    useEffect(() => {
        if (!screenReady) return;
        const timeout = setTimeout(() => setPageLoaded(true), 500);
        return () => clearTimeout(timeout); }, [screenReady]);

    return React.createElement('div', { style: { position: 'relative', margin: '0', padding: '0', boxSizing: 'border-box', display: 'block', height:'auto', width: '100%', backgroundColor: 'white', background: 'linear-gradient( 54deg, white 15%, #fffaf4 38%, white)' } },
        React.createElement('div', { style: { position: 'relative', margin: '0', padding: '0', boxSizing: 'border-box', display: 'block', maxWidth: '64rem', height:'auto', width: '100%', } },
            React.createElement(Header, null),
            React.createElement('main', { style: { ...nullBlockStyle, padding: dynSzGttr( '5', '4.36', '3.72', '3.08', '2.44', '1.8') + 'rem 0 ' + dynSzGttr('5', '4.36', '3.72', '3.08', '2.44', '1.8') + 'rem 0', margin: 0, transition: 'opacity 500ms ease-in-out', opacity: pageLoaded ? 1 : 0, pointerEvents: pageLoaded ? 'auto' : 'none' } },
                children ),
            React.createElement(Footer, null) ) ) }

export default ArticlePage;

