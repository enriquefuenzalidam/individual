import { useState, useEffect } from "react";

const usePantallaTamagnos = () => {
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
        lgScreen: screenSize !== null && screenSize >= 1024,
        mdScreen: screenSize !== null && (screenSize >= 768 && screenSize < 1024),
        smScreen: screenSize !== null && (screenSize >= 640 && screenSize < 768),
        tnScreen: screenSize !== null && screenSize < 640,
    }
}

export default usePantallaTamagnos;