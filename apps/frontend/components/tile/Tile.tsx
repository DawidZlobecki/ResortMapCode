import Image from "next/image";
import styles from "./Tile.module.css";
import { getPathRendering, isConnectable } from "../../utils/pathLogic";

interface Cabana {
  id: string;
  x: number;
  y: number;
  booked: boolean;
  room: string | null;
  guestName: string | null;
}

interface TileProps {
  type: string;
  x: number;
  y: number;
  map: string[][];
  cabanas: Cabana[];
  onCabanaClick?: (cabana: Cabana) => void;
}

export default function Tile({
  type,
  x,
  y,
  map,
  cabanas,
  onCabanaClick,
}: TileProps) {
  const isPath = type === "#";

  const up = isConnectable(map[y - 1]?.[x]);
  const down = isConnectable(map[y + 1]?.[x]);
  const left = isConnectable(map[y]?.[x - 1]);
  const right = isConnectable(map[y]?.[x + 1]);

  let icon: string | null = null;
  let rotation = 0;

  if (isPath) {
    const result = getPathRendering(up, down, left, right);
    icon = result.icon;
    rotation = result.rotation;
  } else {
    const icons: Record<string, string | null> = {
      W: "/assets/cabana.png",
      p: "/assets/pool.png",
      c: "/assets/houseChimney.png",
      ".": null,
    };
    icon = icons[type] ?? null;
  }

  const cabana = cabanas.find((c) => c.x === x && c.y === y);
  const isCabana = type === "W";
  const isBooked = cabana?.booked;

  const handleClick = () => {
    if (isCabana && cabana && onCabanaClick) {
      onCabanaClick(cabana);
    }
  };

  return (
    <div
      className={`${styles.tile} ${
        isCabana ? (isBooked ? styles.cabanaBooked : styles.cabanaFree) : ""
      } ${isCabana ? styles.cabana : ""}`}
      onClick={handleClick}
    >
      {icon && (
        <Image
          src={icon}
          alt={type}
          width={40}
          height={40}
          style={{ transform: `rotate(${rotation}deg)` }}
        />
      )}
    </div>
  );
}
