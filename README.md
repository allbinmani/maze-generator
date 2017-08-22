
# node-maze-generator

Generates random mazes using back-tracking search.


## Usage

Simply create an instance of `MazeGenerator` and call `.generate()`, as many 
times as you wish.

    import MazeGenerator from 'node-maze-generator';
    
    let mg = new MazeGenerator(10, 10, [5,5]);
    let maze = mg.generate();

The `generate` method returns an array of size `width`x`height` `MazeCell` 
class instances.


## Random seeding

This package relies on the `Math.random` random number generator, which can not
be specifically seeded. If you need repeatable behaviour, try out the 
(mathrandom)[https://www.npmjs.com/package/seedrandom] package