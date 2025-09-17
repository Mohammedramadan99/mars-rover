import Rover from "../src/rover.js";

describe("Part I – Basic Movement & Rotation", () => {
  test("moves forward facing EAST", () => {
    const rover = new Rover(0, 0, "EAST");
    expect(rover.executeCommands("F")).toBe("(1, 0) EAST");
  });

  test("moves backward facing NORTH", () => {
    const rover = new Rover(0, 0, "NORTH");
    expect(rover.executeCommands("B")).toBe("(0, -1) NORTH");
  });

  test("rotates left from NORTH to WEST", () => {
    const rover = new Rover(0, 0, "NORTH");
    expect(rover.executeCommands("L")).toBe("(0, 0) WEST");
  });

  test("rotates right from NORTH to EAST", () => {
    const rover = new Rover(0, 0, "NORTH");
    expect(rover.executeCommands("R")).toBe("(0, 0) EAST");
  });

  test("full rotation returns to NORTH", () => {
    const rover = new Rover(0, 0, "NORTH");
    expect(rover.executeCommands("LLLL")).toBe("(0, 0) NORTH");
  });

  test("executes a complex command sequence", () => {
    const rover = new Rover(0, 0, "NORTH");
    expect(rover.executeCommands("FLFFFRFLB")).toBe("(-2, 2) WEST");
  });

  test("handles empty command string", () => {
    const rover = new Rover(0, 0, "NORTH");
    expect(rover.executeCommands("")).toBe("(0, 0) NORTH");
  });

  test("throws error on invalid command", () => {
    const rover = new Rover(0, 0, "NORTH");
    expect(() => rover.executeCommands("X")).toThrow("Invalid command");
  });
});

describe("Part II – Obstacles", () => {
  test("stops immediately when obstacle is directly ahead", () => {
    const rover = new Rover(0, 0, "EAST", [[1, 0]]);
    expect(rover.executeCommands("F")).toBe("(0, 0) EAST STOPPED");
  });

  test("stops mid-sequence when encountering an obstacle", () => {
    const rover = new Rover(0, 0, "EAST", [[2, 0]]);
    expect(rover.executeCommands("FF")).toBe("(1, 0) EAST STOPPED");
  });

  test("ignores irrelevant obstacles", () => {
    const rover = new Rover(0, 0, "EAST", [[5, 5]]);
    expect(rover.executeCommands("F")).toBe("(1, 0) EAST");
  });
  test("stops when moving backward into obstacle", () => {
    const rover = new Rover(0, 0, "NORTH", [[0, -1]]);
    expect(rover.executeCommands("B")).toBe("(0, 0) NORTH STOPPED");
  });
});

describe("Part III – Pathfinding", () => {
  test("finds a straight path to target", () => {
    const rover = new Rover(0, 0, "EAST");
    const path = rover.findPathTo(3, 0);
    expect(path).toBe("FFF");
    expect(rover.executeCommands(path).startsWith("(3, 0)")).toBe(true);
  });

  test("finds a path around a single obstacle", () => {
    const rover = new Rover(0, 0, "EAST", [[1, 0]]);
    const path = rover.findPathTo(2, 0);
    expect(path).not.toBeNull();
    expect(rover.executeCommands(path).startsWith("(2, 0)")).toBe(true);
  });

  test("finds a path around multiple obstacles", () => {
    const rover = new Rover(0, 0, "EAST", [
      [1, 0],
      [2, 0],
    ]);
    const path = rover.findPathTo(3, 0);
    expect(path).not.toBeNull();
    expect(rover.executeCommands(path).startsWith("(3, 0)")).toBe(true);
  });
  test("returns null if target is unreachable", () => {
    const rover = new Rover(0, 0, "NORTH", [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ]);
    expect(rover.findPathTo(2, 2)).toBeNull();
  });

  test("navigates around diagonal wall of obstacles", () => {
    const rover = new Rover(0, 0, "EAST", [
      [1, 1],
      [2, 2],
      [3, 3],
    ]);
    const path = rover.findPathTo(4, 0);
    expect(path).not.toBeNull();
    expect(rover.executeCommands(path).startsWith("(4, 0)")).toBe(true);
  });
});
