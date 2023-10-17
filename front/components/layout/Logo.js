const Example = () => (
  <svg width="50" height="50">
    {/* Aquí va tu código SVG */}
  </svg>
);

import React from "react";

export default function Logo({
  measures}) {
/*   console.log(measures) */
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1072.2 1051.94"
      fill="#27187e"
      height={`${measures}px`}
      width={`${measures}px`}
    >
      <title>PROJUNITY</title>
      <g id="Capa_2" data-name="Capa 2">
        <g id="Capa_1-2" data-name="Capa 1">
          <circle className="cls-1" cx="144.49" cy="144.49" r="144.49" />
          <circle className="cls-1" cx="536.1" cy="144.49" r="144.49" />
          <circle className="cls-1" cx="536.1" cy="907.45" r="144.49" />
          <circle className="cls-1" cx="536.1" cy="525.97" r="144.49" />
          <circle className="cls-1" cx="144.49" cy="522.82" r="144.49" />
          <circle className="cls-1" cx="927.71" cy="522.82" r="144.49" />
          <circle className="cls-1" cx="927.71" cy="907.45" r="144.49" />
        </g>
      </g>
    </svg>
  );
}
