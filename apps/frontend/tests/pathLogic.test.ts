import { describe, expect, it } from "vitest";

import { getPathRendering, isConnectable } from "../utils/pathLogic";

describe("isConnectable", () => {
  it("returns true for # and c", () => {
    expect(isConnectable("#")).toBe(true);
    expect(isConnectable("c")).toBe(true);
  });

  it("returns false for other values", () => {
    expect(isConnectable(".")).toBe(false);
    expect(isConnectable(undefined)).toBe(false);
  });
});

describe("getPathRendering", () => {
  it("returns straight arrow for vertical paths", () => {
    expect(getPathRendering(true, true, false, false)).toEqual({
      icon: "/assets/arrowstraight.png",
      rotation: 0,
    });
  });

  it("returns end arrow for single direction", () => {
    expect(getPathRendering(true, false, false, false)).toEqual({
      icon: "/assets/arrowend.png",
      rotation: 180,
    });
  });

  it("returns cross for all directions", () => {
    expect(getPathRendering(true, true, true, true)).toEqual({
      icon: "/assets/arrowcrossing.png",
      rotation: 0,
    });
  });
});
