export function getRandomLightColor(): string {
    "worklet";
    const r = Math.floor(200 + Math.random() * 55); // 200-255 for light shades
    const g = Math.floor(200 + Math.random() * 55);
    const b = Math.floor(200 + Math.random() * 55);
  
    return `rgb(${r}, ${g}, ${b})`;
  }