"use client";
import NextLogo from '@/components/nextlogo';
import ImagenesSlider from '@/components/imagenesslider';
import PexelsRandomImageList from '@/components/pexelsrandomimageslist';

export default function Home() {

  return (
    <>
    <header className={` relative block [filter:_drop-shadow(0_0.3rem_0.8rem_rgb(0,0,0,0.2))] overflow-x-hidden pb-6 `}>
      <div className={` relative z-10 block h-[1.5rem] sm:h-[1.875rem] bg-white transition-all ease-in-out duration-300 w-full `} />
      <div className={` relative z-20 px-[1.5rem] sm:px-[1.875rem] md:px-[2.25rem] lg:px-[3rem] pb-[0.25rem] sm:pb-[0.313rem] md:pb-[0.375rem] lg:pb-[0.5rem] bg-gradient-to-b from-white to-slate-100 block w-[36rem] sm:w-[40rem] md:w-[48rem] lg:w-[64rem] [clip-path:_polygon(0_0,100%_0,50%_100%,0_100%)] transition-all ease-in-out duration-300 `}>
        <h1 className={` font-pangea font-bold `}><span className={` transition-all ease-in-out duration-300 text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-slate-600 `}>individual</span><span className={` transition-all ease-in-out duration-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-950 `}>.cl</span></h1>
        <h2 className={` text-slate-400 `}><span className={` tracking-normal transition-all ease-in-out duration-300 uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium inline-block align-middle mr-[0.125rem] sm:mr-[0.156rem] md:mr-[0.188rem] lg:mr-[0.250rem] `}>Componentes</span> <NextLogo className={` transition-all ease-in-out duration-300 text-slate-600 w-[3.95rem] sm:w-[4.938rem] md:w-[5.925rem] lg:w-[7.9rem] h-auto inline-block mt-[0.050rem] sm:mt-[0.063rem] md:mt-[0.075rem] lg:mt-[0.1rem] `} /></h2>
      </div>
    </header>
    <div className={` relative flex flex-col w-full min-h-screen h-full `}>
      <main className={` relative max-w-[64rem]`}>
        <div className={` relative p-[0.5rem] sm:p-[1.875rem] md:p-[2.25rem] lg:p-[3rem] `}>
          <h3 className={` text-left font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-500 mt-3 sm:mt-6 md:mt-9 lg:mt-12 mb-1 sm:mb-2 md:mb-4 lg:mb-6 ml-[1.875rem] md:ml-[2rem] lg:ml-[2.25rem] transition-all ease-in-out duration-300`}>ProntoVista</h3>

          {/*
          <div className={` absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15)_0%,rgba(0,0,0,0.05)_2rem,rgba(0,0,0,0.02)_calc(100%_-_2rem),rgba(0,0,0,0.15)_100%)] `} />
          */}

          <div className={` p-6 bg-white block rounded-md shadow-inner shadow-black/40 `} >
          
          <ImagenesSlider 
            imageneslista={PexelsRandomImageList}
            seleccionColor='rgb(51,65,85)'
            alturaBase={22}
            iteracionTiempo={3000} />

          </div>
        </div>
      </main>
    </div>
    </>
  );

}
