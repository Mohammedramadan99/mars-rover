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
