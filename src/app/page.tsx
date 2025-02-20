"use client";
import ProntoVistaPrevGal from '@/components/prontoVistaPrevGal';
import ProntoVistaImgsList from '@/components/prontoVistaImgsList';

export default function Home() {

  return (
      <main className={` relative w-full `}>
        <div className={` relative max-w-[64rem]`}>

          <section className={` relative px-[0.5rem] sm:px-[1.875rem] md:px-[2.25rem] lg:px-[3rem] py-[0.2rem] sm:py-[1.575rem] md:py-[1.95rem] lg:py-[2.7rem]`}>
            <h3 className={` text-left font-normal text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-500  mb-1 sm:mb-2 md:mb-4 lg:mb-6 ml-4 md:ml-5 lg:ml-6 transition-all ease-in-out duration-300 mt-6 `}>ProntoVista</h3>
            <p className={` font-light text-slate-700/60 text-left text-lg sm:text-xl md:text-2xl  leading-normal sm:leading-normal md:leading-normal lg:leading-normal indent-4 md:indent-5 lg:indent-6 my-2 md:my-3 lg:my-4 mx-2 md:mx-3 lg:mx-4 `}>Componente formado por una galería de previsualización para cinco imágenes, más una galería principal para navegar a través de la lista de imágenes y verlas en formato completo. Su propósito es ser un recurso fácil de implementar, con algunos ajustes personalizables y estar contenida en un bloque cuyas dimensiones se adapten a la situación. </p>
            <p className={` font-light text-slate-700/60 text-left text-lg sm:text-xl md:text-2xl  leading-normal sm:leading-normal md:leading-normal lg:leading-normal indent-4 md:indent-5 lg:indent-6 my-2 md:my-3 lg:my-4 mx-2 md:mx-3 lg:mx-4 `}>En desarrollo. 40% de avance. </p>

            <div className={` relative  block p-6 rounded-tl-lg overflow-hidden mt-5 md:mt-6 lg:mt-7 `} >

              <div className={` absolute fade-mask-toright inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.005)_2rem,rgba(0,0,0,0)_100%),_linear-gradient(to_bottom,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.01)_0.4rem,rgba(0,0,0,0)_100%)] `} />
              <div className={` absolute fade-mask-tobottom inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.005)_2rem,rgba(0,0,0,0)_100%),_linear-gradient(to_right,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.01)_0.4rem,rgba(0,0,0,0)_100%)] `} />

              <ProntoVistaPrevGal
                imageneslista={ProntoVistaImgsList}
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
