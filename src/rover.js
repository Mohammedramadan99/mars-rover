import { TURN_LEFT, TURN_RIGHT, MOVE_VECTOR } from "./directions.js";

class Rover {
  constructor(x, y, direction, obstacles = []) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.obstacles = new Set(obstacles.map(([ox, oy]) => `${ox},${oy}`));
    this.stopped = false;

    this.commands = {
      F: () => this.move(1),
      B: () => this.move(-1),
      L: () => (this.direction = TURN_LEFT[this.direction]),
      R: () => (this.direction = TURN_RIGHT[this.direction]),
    };
  }

  executeCommands(commands) {
    for (let cmd of commands) {
      if (this.stopped) break;
      this.executeCommand(cmd);
    }
    return this.report();
  }

  executeCommand(cmd) {
    const action = this.commands[cmd];
    if (!action) throw new Error(`Invalid command: ${cmd}`);
    action();
  }

  move(step) {
    const vector = MOVE_VECTOR[this.direction];
    const nextX = this.x + vector.x * step;
    const nextY = this.y + vector.y * step;

    if (this.obstacles.has(`${nextX},${nextY}`)) {
      this.stopped = true;
      return;
    }

    this.x = nextX;
    this.y = nextY;
  }

  report() {
    const status = this.stopped ? " STOPPED" : "";
    return `(${this.x}, ${this.y}) ${this.direction}${status}`;
  }
}

export default Rover;
