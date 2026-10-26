import DottedMap from "dotted-map";

type Props = {
  lat: number;
  lng: number;
  /** ISO 3166-1 alpha-3 country codes to draw */
  countries: string[];
  className?: string;
};

// Grid density: rows of dots from top to bottom of the country.
const ROWS = 34;

/**
 * A country drawn as a dot matrix with a red pin. Rendered on the server, so
 * the map data never ships to the browser. A ripple of light spreads out from
 * the pin across the dots (CSS only; disabled under reduced motion).
 */
export function DotMap({ lat, lng, countries, className }: Props) {
  const map = new DottedMap({ height: ROWS, grid: "diagonal", countries });
  const pin = map.addPin({ lat, lng });
  const dots = map.getPoints().filter((p) => p !== pin && !p.svgOptions);
  const { width, height } = map.image;

  return (
    <svg
      viewBox={`-1 -1 ${width + 2} ${height + 2}`}
      className={className}
      role="img"
      aria-label={`Dot map with a pin at ${lat.toFixed(2)}, ${lng.toFixed(2)}`}
    >
      {dots.map((dot) => {
        const distance = Math.hypot(dot.x - pin.x, dot.y - pin.y);
        return (
          <circle
            key={`${dot.x}-${dot.y}`}
            cx={dot.x}
            cy={dot.y}
            r={0.36}
            className="map-dot fill-current"
            style={{ "--d": `${(distance * 0.07).toFixed(2)}s` } as React.CSSProperties}
          />
        );
      })}
      <circle cx={pin.x} cy={pin.y} r={0.7} className="fill-brand">
        <animate attributeName="r" values="0.7;0.9;0.7" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle
        cx={pin.x}
        cy={pin.y}
        r={0.7}
        className="fill-none stroke-brand motion-reduce:hidden"
        strokeWidth={0.18}
      >
        <animate attributeName="r" values="0.7;3.2" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}
