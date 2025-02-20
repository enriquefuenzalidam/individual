"use client";
import ImagenesSlider from '@/components/imagenesslider';
import PexelsRandomImageList from '@/components/pexelsrandomimageslist';

export default function Home() {

  return (
    <>
      <main className={` relative w-full `}>
        <div className={` relative max-w-[64rem]`}>

          <section className={` relative p-[0.5rem] sm:p-[1.875rem] md:p-[2.25rem] lg:p-[3rem] `}>
            <h3 className={` text-left font-light text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-500 mt-3 sm:mt-6 md:mt-9 lg:mt-12 mb-1 sm:mb-2 md:mb-4 lg:mb-6 ml-[1.875rem] md:ml-[2rem] lg:ml-[2.25rem] transition-all ease-in-out duration-300`}>ProntoVista</h3>

            <div className={` relative bg-gradient-to-r from-white to-transparent block p-6 rounded-tl-md overflow-hidden `} >

              <div className={` absolute fade-mask-to-right inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.01)_2rem,rgba(0,0,0,0)_100%),_linear-gradient(to_bottom,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.01)_0.5rem,rgba(0,0,0,0)_100%)] `} />

              <div className={` absolute fade-mask-to-bottom inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.01)_2rem,rgba(0,0,0,0)_100%),_linear-gradient(to_right,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.01)_0.5rem,rgba(0,0,0,0)_100%)] `} />

              <ImagenesSlider
                imageneslista={PexelsRandomImageList}
                seleccionColor='rgb(51,65,85)'
                alturaBase={24}
                iteracionTiempo={6000} />

            </div>
          </section>

        </div>
      </main>
    </>
  );

}

            /*
          
          */
