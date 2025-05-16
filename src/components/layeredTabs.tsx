import React, { useEffect, useState, useCallback, ReactElement, isValidElement, useMemo } from "react";
import { StaticImageData } from "next/image";

interface LayeredTabsParams {
    fondoBarColor: string | StaticImageData;
    ptgnBarColor: string | StaticImageData;
    fondoColor: string | StaticImageData;
    slcPptgnColor: string | StaticImageData;
    tabBarPosition?: number;
    maxSize: string | StaticImageData;
    children?: React.ReactNode;
 };

export interface TabProps {
  title?: string;
  titleLang?: string;
  independentBgColor?: string;
  independentTxColor?: string;
  children?: string | React.ReactNode;
}

const Tab: React.FC<TabProps> = ({ children } ) =>
  React.createElement(React.Fragment, null, children);

Tab.displayName = "LayeredTabs.Tab";

type LayeredTabsComponent = React.FC<LayeredTabsParams> & {
  Tab: React.FC<TabProps>;
};

const LayeredTabs: LayeredTabsComponent = ({ fondoBarColor = "FFFFFF", ptgnBarColor = "FFFFFF", fondoColor = "transparent", slcPptgnColor = "FFFFFF", tabBarPosition = 0, maxSize = "xl", children }) => {

const tabElements = React.Children.toArray(children).filter(
  (child): child is ReactElement<TabProps> =>
  isValidElement(child) &&
  typeof child.type !== "string" &&
  'displayName' in child.type && (child.type as { displayName: string }).displayName === "LayeredTabs.Tab" );

const tabsTitleList = tabElements.map(el => el.props.title);
const tabsTitleLangList = tabElements.map(el => el.props.titleLang);
const tabsColorsList = tabElements.map(el => el.props.independentBgColor);
const tabsTextList = tabElements.map(el => el.props.independentTxColor);
const tabsContentList = tabElements.map(el => el.props.children);


const UsePantallaTamagnos = () => {
    const [screenSize, setScreenSize] = useState<number | null>(null);
    const [screenReady, setScreenReady] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const handleResize = () => setScreenSize(window.innerWidth);
        handleResize();
        window.addEventListener("resize", handleResize);
        setScreenReady(true);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return {
        screenReady,
        screenSize: screenSize ?? 1024,
        xlScreen: screenSize !== null && screenSize >= 1280,
        lgScreen: screenSize !== null && screenSize >= 1024,
        mdScreen: screenSize !== null && screenSize >= 768,
        smScreen: screenSize !== null && screenSize >= 640
    }

}

  const { screenReady, xlScreen, lgScreen, mdScreen, smScreen } = UsePantallaTamagnos();
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    if (!screenReady) return;
    if (!pageLoaded) return;
    const timeout = setTimeout(() => setPageLoaded(true), 500);
    return () => clearTimeout(timeout);
  }, [screenReady, pageLoaded]);

  const tabShoulder = "polygon(76.901% 0.074%,76.901% 0.074%,73.551% 0.145%,70.366% 0.248%,67.343% 0.384%,64.479% 0.552%,61.773% 0.754%,59.222% 0.988%,56.826% 1.256%,54.581% 1.558%,52.485% 1.892%,50.537% 2.261%,50.537% 2.261%,49.096% 2.58%,47.729% 2.926%,46.439% 3.299%,45.228% 3.697%,44.099% 4.12%,43.054% 4.567%,42.096% 5.037%,41.228% 5.529%,40.452% 6.041%,39.77% 6.575%,39.77% 6.575%,39.026% 7.256%,38.377% 7.967%,37.81% 8.743%,37.311% 9.614%,36.87% 10.613%,36.472% 11.774%,36.105% 13.127%,35.757% 14.707%,35.414% 16.545%,35.063% 18.674%,35.063% 18.674%,34.705% 21.056%,34.277% 24.081%,33.791% 27.641%,33.263% 31.624%,32.707% 35.922%,32.136% 40.424%,31.564% 45.02%,31.007% 49.601%,30.476% 54.057%,29.988% 58.277%,29.988% 58.277%,29.394% 63.447%,28.835% 68.215%,28.312% 72.575%,27.826% 76.521%,27.376% 80.046%,26.965% 83.145%,26.593% 85.812%,26.26% 88.039%,25.968% 89.821%,25.717% 91.151%,25.717% 91.151%,25.548% 91.908%,25.368% 92.586%,25.171% 93.193%,24.954% 93.738%,24.712% 94.229%,24.44% 94.674%,24.133% 95.083%,23.788% 95.463%,23.399% 95.823%,22.961% 96.171%,22.961% 96.171%,22.115% 96.722%,21.125% 97.226%,19.985% 97.683%,18.688% 98.095%,17.23% 98.463%,15.604% 98.789%,13.804% 99.073%,11.826% 99.317%,9.662% 99.523%,7.308% 99.69%,7.308% 99.69%,6.713% 99.725%,6.039% 99.759%,5.303% 99.792%,4.524% 99.824%,3.722% 99.854%,2.916% 99.882%,2.123% 99.906%,1.363% 99.926%,0.654% 99.942%,0.016% 99.953%,0.016% 99.953%,0.476% 99.957%,2.207% 99.961%,5.105% 99.965%,9.066% 99.969%,13.989% 99.972%,19.768% 99.976%,26.3% 99.979%,33.482% 99.982%,41.211% 99.984%,49.382% 99.987%,100.016% 100%,100.016% 50%,100.016% 0%,90.007% 0.013%,90.007% 0.013%,88.346% 0.016%,86.69% 0.02%,85.066% 0.024%,83.501% 0.03%,82.023% 0.036%,80.659% 0.043%,79.437% 0.05%,78.385% 0.058%,77.531% 0.066%,76.901% 0.074%)";

    const dinamicSize = useCallback((value: number) => {
      if (maxSize === "xl") return xlScreen ? value * 1.4118 : lgScreen ? value * 1.2941 : mdScreen ? value * 1.1765 : smScreen ? value * 1.1176 : value;
      else if (maxSize === "lg") return xlScreen || lgScreen ? value * 1.2941 : mdScreen ? value * 1.1765 : smScreen ? value * 1.1176 : value;
      else if (maxSize === "md") return xlScreen || lgScreen || mdScreen ? value * 1.1765 : smScreen ? value * 1.1176 : value;
      else if (maxSize === "sm") return xlScreen || lgScreen || mdScreen || smScreen ? value * 1.1176 : value;
      else return value;
    }, [maxSize, xlScreen, lgScreen, mdScreen, smScreen])
  
  const shoulderHeight = dinamicSize(2.125);
  const shoulderWidth = shoulderHeight * 0.7104;

  const [currentTab, setCurrentTab] = useState(0);

  const zIndexMax = tabsTitleList.length + 10;
  const getZIndex = (index: number, currentTab: number, topZIndex: number) => topZIndex - Math.abs(index - currentTab);

  const shortenTitle = (title: string, language: string, maxChars: number): string => {
    if (title.length <= maxChars) return title;

    const vowelMap: { [key: string]: string } = {
      en: 'aeiouy',
      es: 'aeiouáéíóúü',
      fr: 'aeiouyâêîôûéèëïüù',
      de: 'aeiouyäöü',
      it: 'aeiouàèéìòù',
      pt: 'aeiouáâãàéêíóôõúü',
      la: 'aeiouy',
      default: 'aeiou'
    };

    const vowels = vowelMap[language] || vowelMap.default;
    const regex = new RegExp(`[^${vowels}]*[${vowels}]+`, 'gi');
    const matches = title.matchAll(regex);

    let result = '';
    // let lastIndex = 0;

    for (const match of matches) {
      const end = (match.index || 0) + match[0].length;
      if (end > maxChars) break;
      result = title.slice(0, end);
      // lastIndex = end;
    }

    return result.length < title.length ? result.trim() + '…' : title;
  };

  const shortenedTitles = useMemo(() =>
    tabsTitleList.map((title, index) => {
      const shortened = shortenTitle(title as string, tabsTitleLangList[index] ? tabsTitleLangList[index] : 'en', 11);
      const longShortened = shortenTitle(title as string, tabsTitleLangList[index] ? tabsTitleLangList[index] : 'en', 34);
      return {
        original: title,
        shortened,
        longShortened,
        isShortened: shortened !== title
      };
    }),
    [tabsTitleList, tabsTitleLangList]
  );

  const [currentMouseOverTag, setCurrentMouseOverTag] = useState<number | null>(null);

/*
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tabTitleTip, setTabTitleTip] = useState(false);

  tabTitleTip && React.createElement('div', { style: { display: 'inline-block', boxSizing: 'border-box', position: 'fixed', top: `${mousePos.y + 12}px`, left: `${mousePos.x + 12}px`, pointerEvents: 'none', zIndex: 9999 } } , 
    React.createElement('p', { style: { boxShadow: '0 ' + dinamicSize(0.05) + 'rem ' + dinamicSize(0.1) + 'rem rgba(0,0,0,0.3), 0 ' +  + dinamicSize(0.3) + 'rem ' + dinamicSize(0.5) + 'rem rgba(0,0,0,0.2)', color: 'white', background: `rgba(51,65,85,${currentTab === currentMouseOverTag ? '1' : '0.7'})`, transition: 'all 150ms ease-in-out', display: 'block', position: 'relative', boxSizing: 'border-box', hyphens: 'auto', textAlign: 'left',  fontSize: dinamicSize(0.86) + 'rem', fontWeight: 600, lineHeight: 1.625, padding: dinamicSize(0.24)+ 'rem ' + dinamicSize(0.77) + 'rem', margin: '0', borderRadius: dinamicSize(0.24) + 'rem' } }, currentMouseOverTag === null ? tabsTitleList[0] : tabsTitleList[currentMouseOverTag]) ),

  onMouseOver: () => shortenedTitles[index].isShortened ? ( setCurrentMouseOverTag(index), setTabTitleTip(true) ) : null, onMouseOut: () => { setTabTitleTip(false), setCurrentMouseOverTag(null) }, onMouseMove: (e) => shortenedTitles[index].isShortened ? setMousePos( { x: e.clientX, y: e.clientY } ) : null, 

*/

        
        if (!screenReady) return null;

        return React.createElement('div', { style: { borderRadius: '0.38rem', overflow: 'hidden', display: 'block', padding: '0', margin: xlScreen || lgScreen ? '3.5rem 0 0 0' : mdScreen ? '2.5rem 0 0 0' : smScreen ? '2rem 0 0 0' : '2rem 0 0 0', position: 'relative', boxSizing: 'border-box', width: `100%`, height: `auto`, background: fondoColor === 'transparent' ? 'transparent' : '#' + fondoColor } },

          React.createElement('div', { style: { display: 'block', padding: '0', margin: '0', position: 'relative', boxSizing: 'border-box', width: `100%`, height: `auto` } },

              // maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 9%, rgba(0,0,0,1) 91%, rgba(0,0,0,0) 100%)',
            ( tabBarPosition === 2 || tabBarPosition === 3 ) && React.createElement('section', { style: { zIndex: 10, height: dinamicSize(21) + 'rem', overflowY: 'scroll',  display: 'block', background: tabsColorsList[currentTab] ? '#' + tabsColorsList[currentTab] : fondoColor === 'transparent' ? 'transparent' : '#' + fondoColor, padding: '0', margin: '0', position: 'relative', boxSizing: 'border-box', width: `100%` } },
              typeof tabsContentList[currentTab] === 'string' ? React.createElement('p', { style: { transition: 'all 150ms ease-in-out', display: 'block', position: 'relative', boxSizing: 'border-box', hyphens: 'auto', textAlign: 'justify', textIndent: dinamicSize(1) + 'rem', fontSize: dinamicSize(1.125) + 'rem', fontWeight: 400, color: tabsTextList[currentTab] ? '#' + tabsTextList[currentTab] : 'rgba(51,65,85,0.6)', lineHeight: 1.625, padding: dinamicSize(1.3)+ 'rem ' + dinamicSize(1.5) + 'rem', margin: '0' } }, tabsContentList[currentTab] ) : tabsContentList[currentTab] ?? null ),

            React.createElement('div', { style: { overflowY: 'hidden', display: 'block', padding: '0', position: 'relative', boxSizing: 'border-box', width: `100%`, height: dinamicSize(2.125) + dinamicSize(1.4164) + 'rem', /* maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 9%, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 91%, rgba(0,0,0,0) 100%)' */ margin: tabBarPosition === 0 ? '0 0 -' + dinamicSize(1.4164) + 'rem  0' : tabBarPosition === 3 ? '-' + dinamicSize(1.4164) + 'rem 0 0 0' : '0' } },

                React.createElement("div", { style: { zIndex: zIndexMax, display: 'block', position: "absolute", boxSizing: 'border-box', inset: "0", pointerEvents: 'none', backgroundImage: tabBarPosition === 0 || tabBarPosition === 2 ? "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.005) 5%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.01) 21%, rgba(0,0,0,0) 100%)" : "linear-gradient(to top, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.005) 5%, rgba(0,0,0,0) 100%), linear-gradient(to top, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.01) 21%, rgba(0,0,0,0) 100%)" } } ),

                React.createElement("div", { style: { transition: 'all 150ms ease-in-out', display: 'block', margin: `0`, boxSizing: 'border-box', position: 'relative', width: 'auto', height: '100%', whiteSpace: 'nowrap', overflowX: 'scroll', overflowY: 'hidden', scrollbarWidth: 'none', padding: tabBarPosition === 0 || tabBarPosition === 2 ? `0 ${dinamicSize(2.5)}rem ${dinamicSize(1.4164)}rem ${dinamicSize(2.5)}rem` : `${dinamicSize(1.4164)}rem ${dinamicSize(2.5)}rem 0 ${dinamicSize(2.5)}rem`, background: fondoBarColor === 'transparent' ? 'transparent' : '#' + fondoBarColor } },
                    tabsTitleList.map((title, index: number) => React.createElement('div', { key: index, onMouseOver: () => setCurrentMouseOverTag(index), onMouseOut: () => setCurrentMouseOverTag(null), onClick: () => currentTab === index ? null : setCurrentTab(index), style: { transition: 'all 150ms ease-in-out', transform: `translateX(calc(-${shoulderWidth * index}rem))`, cursor: currentTab === index ? 'default' : 'pointer', zIndex: getZIndex(index,currentTab,zIndexMax),  display: 'inline-block', padding: '0', margin: '0', position: 'relative', boxSizing: 'border-box', width: `auto`, height: `100%`, filter: tabBarPosition === 0 || tabBarPosition === 2 ? `drop-shadow(${ index === currentTab ? 0 : index < currentTab ? -0.3 : 0.3 }rem ${dinamicSize(0.5)}rem ${dinamicSize(0.6)}rem rgba(0,0,0,${currentTab === index ? 0.06 : 0.05}))` : `drop-shadow(${ index === currentTab ? 0 : index < currentTab ? -0.3 : 0.3 }rem -${dinamicSize(0.5)}rem ${dinamicSize(0.6)}rem rgba(0,0,0,${currentTab === index ? 0.06 : 0.05}))` } },
                        React.createElement('div', { style: { transition: 'all 150ms ease-in-out', display: 'block', whiteSpace: 'nowrap', padding: '0', margin: '0', position: 'relative', boxSizing: 'border-box', width: `100%`, height: `100%`, filter: tabBarPosition === 0 ? `drop-shadow(${ index === currentTab ? 0 : index < currentTab ? -0.15 : 0.15 }rem  ${dinamicSize(0.1)}em ${dinamicSize(0.1)}rem rgba(0,0,0,${currentTab === index ? 0.35 : 0.2}))` : tabBarPosition === 1 ? `drop-shadow(${ index === currentTab ? 0 : index < currentTab ? -0.15 : 0.15 }rem -${dinamicSize(0.05)}em ${dinamicSize(0.1)}rem rgba(0,0,0,${currentTab === index ? 0.3 : 0.15}))` : tabBarPosition === 2 ? `drop-shadow(${ index === currentTab ? 0 : index < currentTab ? -0.15 : 0.15 }rem  ${dinamicSize(0.1)}em ${dinamicSize(0.1)}rem rgba(0,0,0,${currentTab === index ? 0.35 : 0.2}))` : `drop-shadow(${ index === currentTab ? 0 : index < currentTab ? -0.15 : 0.15 }rem -${dinamicSize(0.05)}em ${dinamicSize(0.1)}rem rgba(0,0,0,${currentTab === index ? 0.3 : 0.2} ) )` } },
                            React.createElement('div', { style: { transition: 'all 150ms ease-in-out', display: 'inline-block', background: tabsColorsList[index] ? '#' + tabsColorsList[index] : currentTab === index ? slcPptgnColor === 'transparent' ? 'transparent' : '#' + slcPptgnColor : ptgnBarColor === 'transparent' ? 'transparent' : '#' + ptgnBarColor, padding: '0', margin: '0', position: 'relative', boxSizing: 'border-box', height: `100%`, aspectRatio: '1056 / 1486', clipPath: tabShoulder, transform: tabBarPosition === 0 || tabBarPosition === 2 ? "scale(1,-1)" : "none" } } ),
                            React.createElement('div', { style: { transition: 'all 150ms ease-in-out', transform: 'translateX(-0.05rem)', display: 'inline-block', background: tabsColorsList[index] ? '#' + tabsColorsList[index] : currentTab === index ? slcPptgnColor === 'transparent' ? 'transparent' : '#' + slcPptgnColor : ptgnBarColor === 'transparent' ? 'transparent' : '#' + ptgnBarColor, padding: '0', margin: '0', position: 'relative', boxSizing: 'border-box', height: `100%`, width: dinamicSize(8) + 'rem', textAlign: 'center', verticalAlign: 'top', alignContent: 'end', overflow: 'hidden' } },
                                React.createElement('span', { style: { transition: 'all 150ms ease-in-out', display: 'inline-block', padding: `0 ${dinamicSize(0.25)}rem`, margin: '0', boxSizing: 'border-box', fontWeight: '600', fontSize: `${dinamicSize(1.125)}rem`, color: tabsTextList[index] ? '#' + tabsTextList[index] : index === currentTab ? '#' + tabsTextList[index] : 'rgba(51,65,85,1)', opacity: currentTab === index ? 1 : 0.3,  } },
                                    typeof title === "string" ? shortenedTitles[index].isShortened ? shortenedTitles[index].shortened : title : null ) ),
                            React.createElement('div', { style: { transition: 'all 150ms ease-in-out', display: 'inline-block', background: tabsColorsList[index] ? '#' + tabsColorsList[index] : currentTab === index ? slcPptgnColor === 'transparent' ? 'transparent' : '#' + slcPptgnColor : ptgnBarColor === 'transparent' ? 'transparent' : '#' + ptgnBarColor, padding: '0', margin: '0', position: 'relative', boxSizing: 'border-box', height: `100%`, aspectRatio: '1056 / 1486', clipPath: tabShoulder, transform: tabBarPosition === 0 || tabBarPosition === 2 ? "translateX(-0.1rem) scale(-1,-1)" : "translateX(-0.1rem) scaleX(-1)" } } ) ) ) ) ) ),

              // dinamicSize(1.3)+ 'rem ' + dinamicSize(1.5) + 'rem'
              // maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 9%, rgba(0,0,0,1) 91%, rgba(0,0,0,0) 100%)',
            ( tabBarPosition === 0 || tabBarPosition === 1 ) && React.createElement('section', { style: { zIndex: 10, height: dinamicSize(21) + 'rem', overflowY: 'scroll', display: 'block', background: tabsColorsList[currentTab] ? '#' + tabsColorsList[currentTab] : fondoColor === 'transparent' ? 'transparent' : '#' + fondoColor, padding: '0', margin: '0', position: 'relative', boxSizing: 'border-box', width: `100%` } },
              typeof tabsContentList[currentTab] === 'string' ? React.createElement('p', { style: { transition: 'all 150ms ease-in-out', display: 'block', position: 'relative', boxSizing: 'border-box', hyphens: 'auto', textAlign: 'justify', textIndent: dinamicSize(1) + 'rem', fontSize: dinamicSize(1.125) + 'rem', fontWeight: 400, color: tabsTextList[currentTab] ? '#' + tabsTextList[currentTab] : 'rgba(51,65,85,0.6)', lineHeight: 1.625, padding: dinamicSize(1.3)+ 'rem ' + dinamicSize(1.5) + 'rem', margin: '0' } }, tabsContentList[currentTab] ) : tabsContentList[currentTab] ?? null ),

          ),

          React.createElement('div', { style: { zIndex: 200, display: 'block', padding: '0', margin: '0', boxSizing: 'border-box', position: 'absolute', inset: 0, boxShadow: 'inset 0 0.1rem 0.6rem rgba(0, 0, 0, 0.15)', pointerEvents: 'none' } } )

        )
    };

LayeredTabs.Tab = Tab;

export default LayeredTabs;
