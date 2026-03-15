"use client";

import { useEffect, useState } from "react";
import styles from "./Map.module.css";
import Tile from "../tile/Tile";
import BookingModal from "../bookingModal/BookingModal";

interface Cabana {
  id: string;
  x: number;
  y: number;
  booked: boolean;
  room: string | null;
  guestName: string | null;
}

export default function Map() {
  const [map, setMap] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);
  const [cabanas, setCabanas] = useState<Cabana[]>([]);
  const [selectedCabana, setSelectedCabana] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(0);

  const width = map[0]?.length ?? 0;

  async function fetchCabanas() {
    const res = await fetch("http://localhost:4000/api/cabanas");
    const data = await res.json();
    setCabanas(data);
  }

  async function fetchMap() {
    try {
      const res = await fetch("http://localhost:4000/api/map");
      const data = await res.json();
      setMap(data.map);
    } catch (err) {
      console.error("Failed to fetch map", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMap();
    fetchCabanas();
  }, [refresh]);

  function handleTileClick(x: number, y: number, type: string) {
    if (type === "W") {
      const cabana = cabanas.find((c) => c.x === x && c.y === y);
      if (cabana) {
        setSelectedCabana(cabana.id);
      }
    }
  }

  return (
    <div className={styles.mapWrapper}>
      {loading && <p>Loading map...</p>}

      {!loading && (
        <div
          className={styles.mapGrid}
          style={{ "--cols": width } as React.CSSProperties}
        >
          {map.map((row, y) =>
            row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                onClick={() => handleTileClick(x, y, cell)}
              >
                <Tile type={cell} x={x} y={y} map={map} cabanas={cabanas} />
              </div>
            )),
          )}
        </div>
      )}

      {selectedCabana && (
        <BookingModal
          cabanaId={selectedCabana}
          onClose={() => setSelectedCabana(null)}
          onSuccess={() => setRefresh(refresh + 1)}
        />
      )}
    </div>
  );
}
