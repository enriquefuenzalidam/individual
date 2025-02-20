"use client";
import ImagenesSlider from '@/components/imagenesslider';
import PexelsRandomImageList from '@/components/pexelsrandomimageslist';

export default function Home() {

  return (
      <main className={` relative w-full `}>
        <div className={` relative max-w-[64rem]`}>

          <section className={` relative p-[0.5rem] sm:p-[1.875rem] md:p-[2.25rem] lg:p-[3rem] `}>
            <h3 className={` text-left font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-500 mt-3 sm:mt-6 md:mt-9 lg:mt-12 mb-1 sm:mb-2 md:mb-4 lg:mb-6 ml-4 md:ml-5 lg:ml-6 transition-all ease-in-out duration-300`}>ProntoVista</h3>
            <p className={` font-light text-slate-700/60 text-left text-lg sm:text-xl md:text-2xl lg:text-3xl leading-normal sm:leading-normal md:leading-normal lg:leading-normal indent-4 md:indent-5 lg:indent-6 my-2 md:my-3 lg:my-4 mx-2 md:mx-3 lg:mx-4 `}>Componente formado por una galería de previsualización para cinco imágenes, más una galería principal para navegar a través de la lista de imágenes y verlas en alta definición. Su objetivo es ser un recurso fácil de implementar, con algunos ajustes personalizables y estar contenida en un bloque cuyas dimensiones se adapten a la situación. </p>
            <p className={` font-light text-slate-700/60 text-left text-lg sm:text-xl md:text-2xl lg:text-3xl leading-normal sm:leading-normal md:leading-normal lg:leading-normal indent-4 md:indent-5 lg:indent-6 my-2 md:my-3 lg:my-4 mx-2 md:mx-3 lg:mx-4 `}>En desarrollo. 40% de avance. </p>

            <div className={` relative bg-gradient-to-r from-white to-transparent block p-6 rounded-tl-md overflow-hidden mt-5 md:mt-6 lg:mt-7 `} >

              <div className={` absolute fade-mask-to-right inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.005)_2rem,rgba(0,0,0,0)_100%),_linear-gradient(to_bottom,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.01)_0.3rem,rgba(0,0,0,0)_100%)] `} />
              <div className={` absolute fade-mask-to-bottom inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.005)_2rem,rgba(0,0,0,0)_100%),_linear-gradient(to_right,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.01)_0.3rem,rgba(0,0,0,0)_100%)] `} />

              <ImagenesSlider
                imageneslista={PexelsRandomImageList}
                seleccionColor='rgb(51,65,85)'
                alturaBase={24}
                iteracionTiempo={6000} />

            </div>
          </section>

        </div>
      </main>
  );

}

            /*
          
          */
