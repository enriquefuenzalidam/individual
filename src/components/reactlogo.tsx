import React from "react";

const ReactLogo: React.FC = () => {
    return React.createElement('svg', { viewBox: "-10.5 -9.45 21 18.9", xmlns: "http://www.w3.org/2000/svg" },
        React.createElement('circle', { cx: "0", cy: "0", r: "2", fill: "currentColor" } ),
        React.createElement('g', { stroke: "currentColor", strokeWidth: "1", fill: "none" },
            React.createElement('ellipse', {  rx: "10", ry: "4.5" } ),
            React.createElement('ellipse', {  rx: "10", ry: "4.5", transform: "rotate(60)" } ),
            React.createElement('ellipse', {  rx: "10", ry: "4.5", transform: "rotate(120)" } ),
        )
    )
}
export default ReactLogo;