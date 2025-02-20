import React, { JSX } from "react";

const Footer: React.FC = ({ }): JSX.Element => {
    return React.createElement ('p', { className: 'relative block border-t-3 border-t-solid border-t-black p-[0.5rem] sm:p-[1.875rem] md:p-[2.25rem] lg:p-[3rem] font-normal text-slate-700/60 text-left text-sm sm:text-base md:text-lg lg:text-xl leading-normal sm:leading-normal md:leading-normal lg:leading-normal indent-4 md:indent-5 lg:indent-6 my-2 md:my-3 lg:my-4 mx-2 md:mx-3 lg:mx-4'  },
        '© 2025 individual.cl. Distribuido bajo ', React.createElement('a', { style: { position: 'relative', fontWeight: 'bold' }, href: '/license.txt'} , 'Licencia MIT'), '.') }

export default Footer;