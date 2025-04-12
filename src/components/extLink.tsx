import React from "react";

const ExtLink: React.FC = () => {
    return React.createElement('svg', {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "currentColor",
        viewBox: "0 0 24 24" },
            React.createElement('path', { d: "M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3z"} ),
            React.createElement('path', { d: "M5 5h5V3H3v7h2V5zm14 14h-5v2h7v-7h-2v5zM5 19v-5H3v7h7v-2H5z"} ) ) }
export default ExtLink;
