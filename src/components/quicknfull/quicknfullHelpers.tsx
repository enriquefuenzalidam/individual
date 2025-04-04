
export const isValidColor = (color: string) => {
    const s = new Option().style;
    s.color = color;
    return s.color !== ""; };

export const toHexColor = (color: string): string => {
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return "000000"; 
    ctx.fillStyle = color;
    const computed = ctx.fillStyle;
    return computed.replace(/^#/, ""); };

