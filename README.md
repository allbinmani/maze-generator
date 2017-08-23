
# node-maze-generator

Generates random mazes using back-tracking search.

## Purpose

Generate unique, abstract, mazes of any rectangular size suitable for games.


## Features

- Has a clean ES6 imlementation and simple, abstract API
- Small package (5KB)
- Mazes can be compacted as integers, for storage or learning purposes
- Can be used as a plain script or as a Node/AMD module

## Usage

To generate a maze, create an instance of [`MazeGenerator`](src/MazeGenerator.js)
and call `.generate()` (as many times as you wish).

The constructor for [`MazeGenerator`](src/MazeGenerator.js) needs the `width` and `height` of the maze to generate, and has 
an optional `start` position argument, which defaults to `0,0` (top left).

    import MazeGenerator from 'node-maze-generator';

    const WIDTH = 10;
    const HEIGHT = 10;
    let mg = new MazeGenerator(WIDTH, HEIGHT, [WIDTH-1, 0]);
    let maze = mg.generate();

The `generate` method returns an array of size `width`x`height` [`MazeCell`](src/MazeCell.js) 
class instances.


## Random seeding

This package relies on the `Math.random` random number generator, which can not
be specifically seeded. If you need repeatable behaviour, try out the 
[seedrandom](https://www.npmjs.com/package/seedrandom) package, which worked well
during development.

