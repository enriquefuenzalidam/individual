import { useState, useEffect } from "react";

const usePantallaTamagnos = () => {
    const [screenSize, setScreenSize] = useState<number | null>(null);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return {
        screenSize,
        lgScreen: screenSize !== null && screenSize >= 1024,
        mdScreen: screenSize !== null && screenSize >= 768,
        smScreen: screenSize !== null && screenSize >= 640,
        tnScreen: screenSize !== null && screenSize >= 320,
    }
}

export default usePantallaTamagnos;