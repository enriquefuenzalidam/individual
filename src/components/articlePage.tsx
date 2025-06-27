"use client";
import React, { useEffect, useState} from 'react';
import Header from '@/components/header';
import HeaderSmall from "@/components/headerSmall";
import Footer from "@/components/footer";
import useIndividualStyling from "@/hooks/useindividualstyling";

interface ArticlePageProps {
  smallheader?: boolean;
  children?: React.ReactNode; }

const ArticlePage = (props: ArticlePageProps) => {

    const { smallheader = false, children } = props;
    const { screenReady, nullBlockStyle, dynSzGttr } = useIndividualStyling();

    const [pageLoaded, setPageLoaded] = useState(false);
    useEffect(() => {
        if (!screenReady) return;
        const timeout = setTimeout(() => setPageLoaded(true), 500);
        return () => clearTimeout(timeout); }, [screenReady]);

    return React.createElement('div', { style: { position: 'relative', margin: '0', padding: '0', boxSizing: 'border-box', display: 'block', height:'auto', width: '100%', /*'linear-gradient( 54deg, white 15%, #fffaf4 38%, white)'*/ } },
        React.createElement('div', { style: { display: 'block', position: 'absolute', boxSizing: 'border-box',top: '0', left: '0', width: '100%', height: '100%', padding: '0', margin: '0', backgroundColor: 'white', backgroundImage: `url('/bb.jpg')`, backgroundPosition: 'top left', backgroundAttachment: 'scroll', backgroundRepeat: 'repeat', opacity: 0.3 } }),
        React.createElement('div', { style: { position: 'relative', margin: '0', padding: '0', boxSizing: 'border-box', display: 'block', maxWidth: '64rem', height:'auto', width: '100%', } },
            React.createElement( smallheader ? HeaderSmall : Header, null),
            React.createElement('main', { style: { ...nullBlockStyle, padding: dynSzGttr( '6.5', '5.84', '5.18', '4.52', '3.86', '3.2') + 'rem 0 ' + dynSzGttr('5', '4.36', '3.72', '3.08', '2.44', '1.8') + 'rem 0', margin: 0, transition: 'opacity 500ms ease-in-out', opacity: pageLoaded ? 1 : 0, pointerEvents: pageLoaded ? 'auto' : 'none' } },
                children ),
            React.createElement(Footer, null) ) ) }

export default ArticlePage;

