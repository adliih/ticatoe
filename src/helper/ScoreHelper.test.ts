import { describe, expect, it } from "vitest";
import { findWinningPlayerValue } from "./ScoreHelper";
import { initGrid } from "./GridHelper";

describe("findWinningPlayerValue", () => {
  it("should return undefined on empty clicked tiles", () => {
    const result = findWinningPlayerValue(initGrid(3), 3);
    expect(result).toBeUndefined();
  });
  it("should return value when some row are having the same value", () => {
    const result = findWinningPlayerValue([["X", "X", "X"], [], []], 3);
    expect(result).toBe("X");
  });
  it("should return value when some col are having the same value", () => {
    const result = findWinningPlayerValue(
      [
        ["X", undefined, undefined],
        ["X", undefined, undefined],
        ["X", undefined, undefined],
      ],
      3
    );
    expect(result).toBe("X");
  });
  it("should return value when diagonal top-left to bottom-right are having the same value", () => {
    const result = findWinningPlayerValue(
      [
        ["X", undefined, undefined],
        [undefined, "X", undefined],
        [undefined, undefined, "X"],
      ],
      3
    );
    expect(result).toBe("X");
  });
  it("should return value when some diagonal bottom-left to top-right are having the same value", () => {
    const result = findWinningPlayerValue(
      [
        [undefined, undefined, "X"],
        [undefined, "X", undefined],
        ["X", undefined, undefined],
      ],
      3
    );
    expect(result).toBe("X");
  });
  it("should return undefined when there's only partially same valued in a certain row", () => {
    const result = findWinningPlayerValue(
      [
        ["X", "X", undefined],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
      ],
      3
    );
    expect(result).toBeUndefined();
  });
  it("should return undefined when a row is occupied by multiple values", () => {
    const result = findWinningPlayerValue(
      [
        ["X", "X", "O"],
        [undefined, undefined, undefined],
        [undefined, undefined, undefined],
      ],
      3
    );
    expect(result).toBeUndefined();
  });
});
