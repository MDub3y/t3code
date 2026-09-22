import { describe, expect, it } from "vite-plus/test";
import { pinSelectedTimelineRows } from "./useTimelineSelectionPin";

const rows = ["a", "b", "c", "d", "e"].map((id) => ({ id }));

describe("pinSelectedTimelineRows", () => {
  it("pins every row from the anchor down to the focus", () => {
    expect(pinSelectedTimelineRows(rows, { anchorRowId: "b", focusRowId: "d" }, undefined)).toEqual(
      { indices: [1, 2, 3] },
    );
  });

  it("pins the same span when the selection runs upward", () => {
    expect(pinSelectedTimelineRows(rows, { anchorRowId: "d", focusRowId: "b" }, undefined)).toEqual(
      { indices: [1, 2, 3] },
    );
  });

  it("keeps pins the list already has", () => {
    expect(
      pinSelectedTimelineRows(
        rows,
        { anchorRowId: "c", focusRowId: "c" },
        { indices: [0], keys: ["cited"] },
      ),
    ).toEqual({ indices: [0, 2], keys: ["cited"] });
  });

  it("leaves the list's pins alone without a selection or when its rows are gone", () => {
    const alwaysRender = { keys: ["cited"] };
    expect(pinSelectedTimelineRows(rows, null, alwaysRender)).toBe(alwaysRender);
    expect(
      pinSelectedTimelineRows(rows, { anchorRowId: "gone", focusRowId: "c" }, alwaysRender),
    ).toBe(alwaysRender);
  });
});
