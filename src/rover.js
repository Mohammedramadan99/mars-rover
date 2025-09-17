import { TURN_LEFT, TURN_RIGHT, MOVE_VECTOR } from "./directions.js";

class Rover {
  constructor(x, y, direction, obstacles = []) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.obstacles = new Set(obstacles.map(([ox, oy]) => `${ox},${oy}`));
    this.stopped = false;

    this.commands = {
      F: (state) => this.simulateMove(state, 1),
      B: (state) => this.simulateMove(state, -1),
      L: (state) => ({
        ...state,
        direction: TURN_LEFT[state.direction],
      }),
      R: (state) => ({
        ...state,
        direction: TURN_RIGHT[state.direction],
      }),
    };
  }

  // --- PART 1 & 2 ---
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
    const nextState = action(this);
    this.x = nextState.x;
    this.y = nextState.y;
    this.direction = nextState.direction;
    if (nextState.stopped) this.stopped = true;
  }

  simulateMove(state, step) {
    const vector = MOVE_VECTOR[state.direction];
    const nextX = state.x + vector.x * step;
    const nextY = state.y + vector.y * step;

    if (this.obstacles.has(`${nextX},${nextY}`)) {
      return { ...state, stopped: true };
    }

    return { ...state, x: nextX, y: nextY };
  }

  report() {
    const status = this.stopped ? " STOPPED" : "";
    return `(${this.x}, ${this.y}) ${this.direction}${status}`;
  }

  // --- PART 3: PATHFINDING ---
  findPathTo(targetX, targetY) {
    const startState = {
      x: this.x,
      y: this.y,
      direction: this.direction,
      stopped: false,
    };

    const queue = [{ state: startState, path: "" }];
    const visited = new Set([this.hashState(startState)]);
    while (queue.length > 0) {
      const { state, path } = queue.shift();

      if (state.x === targetX && state.y === targetY && !state.stopped) {
        return path;
      }

      for (let cmd of Object.keys(this.commands)) {
        const nextState = this.commands[cmd](state);
        if (nextState.stopped) continue;

        const key = this.hashState(nextState);
        if (!visited.has(key)) {
          visited.add(key);
          queue.push({ state: nextState, path: path + cmd });
        }
      }
    }

    return null;
  }

  hashState(state) {
    return `${state.x},${state.y},${state.direction}`;
  }
}

export default Rover;
