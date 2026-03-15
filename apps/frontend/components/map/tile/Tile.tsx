import Image from "next/image";
import styles from "./Tile.module.css";

interface TileProps {
  type: string;
  x: number;
  y: number;
}

export default function Tile({ type, x, y }: TileProps) {
  const icons: Record<string, string | null> = {
    W: "/assets/cabana.png",
    p: "/assets/pool.png",
    c: "/assets/houseChimney.png",
    "#": "/assets/arrowStraight.png",
    ".": null,
  };

  const icon = icons[type];
  const isCabana = type === "W";

  const handleClick = () => {
    if (isCabana) {
      console.log(`Clicked cabana at ${x}, ${y}`);
    }
  };

  return (
    <div
      className={`${styles.tile} ${isCabana ? styles.cabana : ""}`}
      onClick={handleClick}
    >
      {icon && <Image src={icon} alt={type} width={40} height={40} />}
    </div>
  );
}
