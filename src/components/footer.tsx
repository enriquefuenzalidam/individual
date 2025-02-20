import React, { JSX } from "react";

const Footer: React.FC = ({ }): JSX.Element => {
    return React.createElement ('p', { className: ' font-base text-slate-700/60 pt-6 pl-6'  }, '© 2025 individual.cl. Distribuido bajo ', React.createElement('a', { style: { fontWeight: 'bold' }, href: '/license.txt'} , 'Licencia MIT'), '.') }

export default Footer;