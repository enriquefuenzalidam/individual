import { useState, useEffect } from "react";

const DEFAULT_SCREEN_SIZE = 1024;

const usePantallaTamagnos = () => {
    const [screenSize, setScreenSize] = useState<number | null>(null);
    const [screenReady, setScreenReady] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") {
            setScreenSize(DEFAULT_SCREEN_SIZE); // Set default for SSR
            setScreenReady(true);
            return;
        }
        const handleResize = () => setScreenSize(window.innerWidth);
        handleResize();
        window.addEventListener("resize", handleResize);
        setScreenReady(true);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const safeScreenSize = screenSize ?? DEFAULT_SCREEN_SIZE;

    return {
        screenReady,
        screenSize: safeScreenSize,
        lgScreen: screenSize !== null && screenSize >= 1024,
        mdScreen: screenSize !== null && screenSize >= 768,
        smScreen: screenSize !== null && screenSize >= 640,
        tnScreen: screenSize !== null && screenSize >= 320,
    }
}

export default usePantallaTamagnos;