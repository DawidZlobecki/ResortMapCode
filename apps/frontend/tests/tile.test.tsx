import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import Tile from "../components/tile/Tile";

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe("Tile component", () => {
  it("renders a path tile with correct icon and rotation", () => {
    const map = [
      ["#", "#"],
      ["#", "#"],
    ];

    render(
      <Tile
        type="#"
        x={0}
        y={0}
        map={map}
        cabanas={[]}
        onCabanaClick={() => undefined}
      />,
    );

    const img = screen.getByAltText("#");
    expect(img.getAttribute("src")).toBe("/assets/arrowcornersquare.png");
  });

  it("calls onCabanaClick when clicking a booked cabana tile", async () => {
    const cabana = {
      id: "1",
      x: 0,
      y: 0,
      booked: true,
      room: "101",
      guestName: "A",
    };
    const onCabanaClick = vi.fn();

    const map = [["W"]];

    render(
      <Tile
        type="W"
        x={0}
        y={0}
        map={map}
        cabanas={[cabana]}
        onCabanaClick={onCabanaClick}
      />,
    );

    const cabanaImg = screen.getByAltText("W");
    cabanaImg.parentElement?.click();

    expect(onCabanaClick).toHaveBeenCalledWith(cabana);
  });
});
