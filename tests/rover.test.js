import Rover from "../src/rover";

describe("Rover Movement", () => {
  test("moves forward facing EAST", () => {
    const rover = new Rover(0, 0, "EAST");
    rover.executeCommands("F");
    expect(rover.report()).toBe("(1, 0) EAST");
  });

  test("moves backward facing EAST", () => {
    const rover = new Rover(0, 0, "EAST");
    rover.executeCommands("B");
    expect(rover.report()).toBe("(-1, 0) EAST");
  });

  test("moves forward facing NORTH", () => {
    const rover = new Rover(0, 0, "NORTH");
    rover.executeCommands("F");
    expect(rover.report()).toBe("(0, 1) NORTH");
  });
});

describe("Rover Rotation", () => {
  test("turns left from NORTH", () => {
    const rover = new Rover(0, 0, "NORTH");
    rover.executeCommands("L");
    expect(rover.report()).toBe("(0, 0) WEST");
  });

  test("turns right from NORTH", () => {
    const rover = new Rover(0, 0, "NORTH");
    rover.executeCommands("R");
    expect(rover.report()).toBe("(0, 0) EAST");
  });

  test("full rotation returns to same direction", () => {
    const rover = new Rover(0, 0, "NORTH");
    rover.executeCommands("RRRR");
    expect(rover.report()).toBe("(0, 0) NORTH");
  });
});

describe("Rover Complex Sequences", () => {
  test("executes a long command sequence correctly", () => {
    const rover = new Rover(4, 2, "EAST");
    rover.executeCommands("FLFFFRFLB");
    expect(rover.report()).toBe("(6, 4) NORTH");
  });

  test("handles empty command string", () => {
    const rover = new Rover(1, 1, "SOUTH");
    rover.executeCommands("");
    expect(rover.report()).toBe("(1, 1) SOUTH");
  });
});

describe("Rover with obstacles", () => {
  test("stops when moving into an obstacle", () => {
    const rover = new Rover(0, 0, "EAST", [[1, 0]]);
    rover.executeCommands("F");
    expect(rover.report()).toBe("(0, 0) EAST STOPPED");
  });

  test("stops mid-sequence due to obstacle", () => {
    const rover = new Rover(0, 0, "EAST", [[2, 0]]);
    rover.executeCommands("FFRFF");
    expect(rover.report()).toBe("(1, 0) EAST STOPPED");
  });

  test("ignores obstacles not on path", () => {
    const rover = new Rover(0, 0, "NORTH", [[1, 0]]);
    rover.executeCommands("F");
    expect(rover.report()).toBe("(0, 1) NORTH");
  });
});

describe("Mars Rover - Part III Pathfinding", () => {
  test("finds a straight path with no obstacles", () => {
    const rover = new Rover(0, 0, "NORTH");
    const path = rover.findPathTo(0, 3);
    expect(path).toBe("FFF");
  });

  test("finds a path around a single obstacle", () => {
    const rover = new Rover(0, 0, "NORTH", [[0, 2]]);
    const path = rover.findPathTo(0, 3);
    expect(path).toMatch(/[LRFB]+/);
    expect(path.length).toBeGreaterThan(3);
  });

  test("navigates around multiple obstacles to reach target", () => {
    const obstacles = [
      [1, 4],
      [3, 5],
      [7, 4],
    ];
    const rover = new Rover(0, 0, "NORTH", obstacles);
    const path = rover.findPathTo(8, 5);
    expect(typeof path).toBe("string");
    expect(path).toContain("F");
  });

  test("returns null if target is completely blocked", () => {
    const obstacles = [
      [0, 1],
      [1, 0],
      [-1, 0],
      [0, -1],
    ];
    const rover = new Rover(0, 0, "NORTH", obstacles);
    const path = rover.findPathTo(2, 2);
    expect(path).toBeNull();
  });

  test("preserves initial rover state after pathfinding", () => {
    const rover = new Rover(0, 0, "NORTH", [[1, 1]]);
    rover.findPathTo(2, 2);
    expect(rover.report()).toBe("(0, 0) NORTH");
  });
});