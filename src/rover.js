import { TURN_LEFT, TURN_RIGHT, MOVE_VECTOR } from "./directions.js";

class Rover {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;

    this.commands = {
      F: () => this.move(1),
      B: () => this.move(-1),
      L: () => (this.direction = TURN_LEFT[this.direction]),
      R: () => (this.direction = TURN_RIGHT[this.direction]),
    };
  }

  executeCommands(commands) {
    for (let cmd of commands) {
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
    this.x += vector.x * step;
    this.y += vector.y * step;
  }

  report() {
    return `(${this.x}, ${this.y}) ${this.direction}`;
  }
}

export default Rover;
