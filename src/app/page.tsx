
const NextLogo = ({ styleClassName = "" }) => {
  return (
    <svg className={styleClassName} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 394 80"><path fill="currentColor" d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z" /><path fill="currentColor" d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z" /></svg>
  );
};

{/*
  <span className={` transition-all ease-in-out duration-300 uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light inline-block align-middle tracking-wide `}>Mi</span>
  */}

export default function Home() {

  return (
    <div className={` relative flex flex-col bg-gradient-to-b from-[#fffaf4] to-white min-w-[36rem] w-full min-h-screen h-full `}>
      <header className={` relative block [filter:_drop-shadow(0_0.3rem_0.8rem_rgb(0,0,0,0.2))] `}>
        <div className={` relative z-10 block h-[1.5rem] sm:h-[1.875rem] bg-white transition-all ease-in-out duration-300 w-full `} />
        <div className={` relative z-20 px-[1.5rem] sm:px-[1.875rem] md:px-[2.25rem] lg:px-[3rem] pb-[0.25rem] sm:pb-[0.313rem] md:pb-[0.375rem] lg:pb-[0.5rem] bg-gradient-to-b from-white to-slate-100 block w-[36rem] sm:w-[40rem] md:w-[48rem] lg:w-[64rem] [clip-path:_polygon(0_0,100%_0,50%_100%,0_100%)] transition-all ease-in-out duration-300 `}>
          <h1 className={` font-pangea font-bold `}><span className={` transition-all ease-in-out duration-300 text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-slate-600 `}>individual</span><span className={` transition-all ease-in-out duration-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-slate-950 `}>.cl</span></h1>
          <h2 className={` text-slate-400 `}><span className={` tracking-normal transition-all ease-in-out duration-300 uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium inline-block align-middle mr-[0.125rem] sm:mr-[0.156rem] md:mr-[0.188rem] lg:mr-[0.250rem] `}>Componentes</span> <NextLogo styleClassName={` transition-all ease-in-out duration-300 text-slate-600 w-[3.95rem] sm:w-[4.938rem] md:w-[5.925rem] lg:w-[7.9rem] h-auto inline-block mt-[0.050rem] sm:mt-[0.063rem] md:mt-[0.075rem] lg:mt-[0.1rem] `} /></h2>
        </div>
      </header>
      <main className={` relative `}>
      </main>
    </div>
  );
}
