# Mars Rover Simulation

This project implements a Mars Rover simulation in JavaScript. The rover can move on a 2D grid, rotate, detect obstacles, and compute paths to target coordinates. The application includes three parts:

1. **Basic Movement** – execute commands to move and rotate the rover.
2. **Obstacles** – simulate the rover’s movement while avoiding obstacles.
3. **Pathfinding** – compute a path from the current position to a target coordinate, considering obstacles.

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Mohammedramadan99/mars-rover.git
cd mars-rover
npm install
```

---

## Running the Demo

The demo script is located in `demo.js`. You can run it using npm:

```bash
npm run demo
```

Running without arguments will execute all parts with default values.

---

## Usage

You can run each part separately by specifying the part name and its arguments.

### Part I – Basic Movement

```bash
npm run demo part1 <commands>
```

* `<commands>`: A string of commands consisting of:

  * `F` = move forward
  * `B` = move backward
  * `L` = turn left
  * `R` = turn right

**Example:**

```bash
npm run demo part1 FFRFF
```

Output:

```
=== Part I – Basic Movement ===
Start: (0, 0) NORTH
After commands "FFRFF": (2, 2) EAST
```

---

### Part II – Obstacles

```bash
npm run demo part2 <commands> [obstacles]
```

* `<commands>`: Command string (same format as Part I).
* `[obstacles]`: Optional JSON array of coordinates representing obstacles.

**Example:**

```bash
npm run demo part2 FFRF '[[1,2],[3,4],[5,3]]'
```

Output:

```
=== Part II – Obstacles ===
Start: (0, 0) NORTH
After commands "FFRF": (0, 2) EAST STOPPED
```

---

### Part III – Pathfinding

```bash
npm run demo part3 <targetX> <targetY> [obstacles]
```

* `<targetX>`: X-coordinate of the destination.
* `<targetY>`: Y-coordinate of the destination.
* `[obstacles]`: Optional JSON array of obstacles.

**Example:**

```bash
npm run demo part3 8 5 '[[1,4],[3,5],[7,4]]'
```

Output:

```
=== Part III – Pathfinding ===
Find path to (8, 5): FFRFFLFFF...
```

---

## Default Behavior

If you run the demo without arguments:

```bash
npm run demo
```

It will execute all three parts with default values:

* Part I with commands `FFRFF`
* Part II with commands `FFFFF` and default obstacles
* Part III with target `(8, 5)` and default obstacles

---

## Testing

This project includes automated tests written with **Jest**.
To run the tests:

```bash
npm test
```