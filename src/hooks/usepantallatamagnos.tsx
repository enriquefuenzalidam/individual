import { useState, useEffect } from "react";

const usePantallaTamagnos = () => {

    const [screenSize, setScreenSize] = useState<number | null>(null);
    const [screenReady, setScreenReady] = useState<boolean | false>(false);

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
        lgScreen: screenSize !== null && (screenSize >= 1024),
        mdScreen: screenSize !== null && (screenSize >= 768),
        smScreen: screenSize !== null && (screenSize >= 640),
        tnScreen: screenSize !== null && screenSize < 640,
        xtScreen: screenSize !== null && screenSize < 480, } }

export default usePantallaTamagnos;
