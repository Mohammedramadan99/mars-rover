import Rover from "./src/rover.js";

const [, , part, ...args] = process.argv;

const defaultObstacles = [
  [1, 4],
  [3, 5],
  [7, 4],
];

function parseObstacles(input) {
  if (!input) return defaultObstacles;
  try {
    return JSON.parse(input);
  } catch {
    console.error("Invalid obstacles format. Use JSON, e.g. '[[1,4],[3,5]]'");
    process.exit(1);
  }
}

function validateCommands(cmd = "") {
  const validChars = /^[FBLR]*$/i;
  if (!validChars.test(cmd)) {
    console.error(`Invalid commands: "${cmd}".`);
    console.log("Commands must only contain: F (forward), B (backward), L (turn left), R (turn right).");
    process.exit(1);
  }
  return cmd.toUpperCase();
}

function runPart1(commands = "FFRFF") {
  console.log("=== Part I – Basic Movement ===");
  const rover = new Rover(0, 0, "NORTH");
  console.log("Start:", rover.report(), "Obstacles: none");
  rover.executeCommands(validateCommands(commands));
  console.log(`After commands "${commands}":`, rover.report());
  console.log();
}

function runPart2(commands = "FFFFF", obstacles) {
  console.log("=== Part II – Obstacles ===");
  obstacles = parseObstacles(obstacles);
  const rover = new Rover(0, 0, "NORTH", obstacles);
  console.log("Start:", rover.report(), "Obstacles:", JSON.stringify(obstacles));
  rover.executeCommands(validateCommands(commands));
  console.log(`After commands "${commands}":`, rover.report());
  console.log();
}

function runPart3(targetX = 8, targetY = 5, obstacles) {
  console.log("=== Part III – Pathfinding ===");
  obstacles = parseObstacles(obstacles);
  const rover = new Rover(0, 0, "NORTH", obstacles);
  console.log("Start:", rover.report(), "Obstacles:", JSON.stringify(obstacles));
  const path = rover.findPathTo(targetX, targetY);
  console.log(`Find path to (${targetX}, ${targetY}):`, path);
  console.log();
}

if (!part) {
  runPart1();
  runPart2();
  runPart3();
} else {
  switch (part.toLowerCase()) {
    case "part1":
      runPart1(args[0]);
      break;
    case "part2":
      runPart2(args[0], args[1]);
      break;
    case "part3": {
      if (args.length < 2) {
        console.error("Error: Part3 requires <targetX> and <targetY> arguments.");
        console.log("Usage: node demo.js part3 <targetX> <targetY> [obstacles]");
        process.exit(1);
      }
      const targetX = parseInt(args[0], 10);
      const targetY = parseInt(args[1], 10);
      if (isNaN(targetX) || isNaN(targetY)) {
        console.error("Error: <targetX> and <targetY> must be numbers.");
        console.log("Usage: node demo.js part3 <targetX> <targetY> [obstacles]");
        process.exit(1);
      }
      runPart3(targetX, targetY, args[2]);
      break;
    }
    default:
      console.log("Usage:");
      console.log("  node demo.js part1 <commands>");
      console.log("  node demo.js part2 <commands> [obstacles]");
      console.log("  node demo.js part3 <targetX> <targetY> [obstacles]");
      console.log("Or run without arguments to execute all parts with default values.");
      break;
  }
}
