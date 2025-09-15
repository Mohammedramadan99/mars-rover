const DIRECTIONS = ["NORTH", "EAST", "SOUTH", "WEST"];

const TURN_LEFT = {
  NORTH: "WEST",
  WEST: "SOUTH",
  SOUTH: "EAST",
  EAST: "NORTH",
};

const TURN_RIGHT = {
  NORTH: "EAST",
  EAST: "SOUTH",
  SOUTH: "WEST",
  WEST: "NORTH",
};

const MOVE_VECTOR = {
  NORTH: { x: 0, y: 1 },
  SOUTH: { x: 0, y: -1 },
  EAST: { x: 1, y: 0 },
  WEST: { x: -1, y: 0 },
};

export { DIRECTIONS, TURN_LEFT, TURN_RIGHT, MOVE_VECTOR };