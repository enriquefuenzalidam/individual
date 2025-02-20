import React, { JSX } from "react";
import NextLogo from "./nextlogo";

const Header: React.FC = ({ }): JSX.Element => {
    return (
        <header className={` relative block `}>
            <section className={` max-w-[64rem] relative z-20 pt-[1.5rem] sm:pt-[1.875rem] px-[1.5rem] sm:px-[1.875rem] md:px-[2.25rem] lg:px-[3rem] pb-2 sm:pb-3 md:pb-4 lg:pb-5 block transition-all ease-in-out duration-300 `}>
                
                <div className={` absolute inset-0 fade-mask-header bg-gradient-to-b to-transparent from-[#f1f5f9] `} />
                <div className={` absolute inset-0 fade-mask-header bg-[linear-gradient(to_top,_rgba(0,0,0,0.1)_0%,_rgba(0,0,0,0.005)_1rem,_rgba(0,0,0,0)_100%),_linear-gradient(to_top,_rgba(0,0,0,0.2)_0%,_rgba(0,0,0,0.01)_0.3rem,_rgba(0,0,0,0)_100%)] `} />

                <h1 className={` relative font-pangea font-bold `}>
                    <span className={` transition-all ease-in-out duration-300 text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-slate-600 `}>individual</span>
                    <span className={` transition-all ease-in-out duration-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-950 `}>.cl</span></h1>
                <h2 className={` relative font-pangea text-slate-400 -mt-2 md:-mt-3 `}>
                    <span className={` tracking-normal transition-all ease-in-out duration-300 uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium inline-block align-middle mr-1 sm:mr-1 md:mr-2 lg:mr-2 `}>Componentes</span>
                    <NextLogo className={` transition-all ease-in-out duration-300 text-slate-600 w-[3.95rem] sm:w-[4.938rem] md:w-[5.925rem] lg:w-[7.9rem] h-auto inline-block mt-[0.050rem] sm:mt-[0.063rem] md:mt-[0.075rem] lg:mt-[0.1rem] `} /></h2>

            </section>
        </header>)
};
export default Header;