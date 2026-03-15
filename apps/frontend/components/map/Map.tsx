"use client";

import { useEffect, useState } from "react";
import styles from "./Map.module.css";
import Tile from "./tile/Tile";

export default function Map() {
  const [map, setMap] = useState<string[][]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/map")
      .then((res) => res.json())
      .then((data) => setMap(data.map));
  }, []);

  if (!map.length) return <p>Loading map...</p>;

  return (
    <div className={styles.mapWrapper}>
      <div
        className={styles.grid}
        style={{
          gridTemplateColumns: `repeat(${map[0].length}, 40px)`,
        }}
      >
        {map.map((row, y) =>
          row.map((cell, x) => (
            <Tile key={`${x}-${y}`} type={cell} x={x} y={y} />
          )),
        )}
      </div>
    </div>
  );
}
