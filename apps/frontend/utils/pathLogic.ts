export function isConnectable(tile: string | undefined) {
  return tile === "#" || tile === "c";
}

export function getPathRendering(
  up: boolean,
  down: boolean,
  left: boolean,
  right: boolean,
) {
  const count =
    (up ? 1 : 0) + (down ? 1 : 0) + (left ? 1 : 0) + (right ? 1 : 0);

  if (count === 4) {
    return { icon: "/assets/arrowcrossing.png", rotation: 0 };
  }

  if (count === 3) {
    if (!up) return { icon: "/assets/arrowsplit.png", rotation: 90 };
    if (!right) return { icon: "/assets/arrowsplit.png", rotation: 180 };
    if (!down) return { icon: "/assets/arrowsplit.png", rotation: 270 };
    if (!left) return { icon: "/assets/arrowsplit.png", rotation: 0 };
  }

  if (count === 1) {
    if (up) return { icon: "/assets/arrowend.png", rotation: 180 };
    if (right) return { icon: "/assets/arrowend.png", rotation: 270 };
    if (down) return { icon: "/assets/arrowend.png", rotation: 0 };
    if (left) return { icon: "/assets/arrowend.png", rotation: 90 };
  }

  if (up && right && !down && !left)
    return { icon: "/assets/arrowcornersquare.png", rotation: 0 };
  if (right && down && !up && !left)
    return { icon: "/assets/arrowcornersquare.png", rotation: 90 };
  if (down && left && !up && !right)
    return { icon: "/assets/arrowcornersquare.png", rotation: 180 };
  if (left && up && !right && !down)
    return { icon: "/assets/arrowcornersquare.png", rotation: 270 };

  if ((left || right) && !up && !down) {
    return { icon: "/assets/arrowstraight.png", rotation: 90 };
  }

  if ((up || down) && !left && !right) {
    return { icon: "/assets/arrowstraight.png", rotation: 0 };
  }

  return { icon: "/assets/arrowstraight.png", rotation: 0 };
}
