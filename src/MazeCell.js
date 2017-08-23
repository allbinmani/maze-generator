
import Direction from './directions.js';

/** 
 * Class representing a Maze cell
 */
export default class MazeCell {

  constructor(x, y) {
    this._x = x;
    this._y = y;
    this._visited = false;
    this._walls = {};
    this.AddWall(Direction.LEFT);
    this.AddWall(Direction.RIGHT);
    this.AddWall(Direction.UP);
    this.AddWall(Direction.DOWN);
  }

  HasWall(dir) {
    return this.Walls[dir];
  }

  AddWall(dir) {
    this.Walls[dir] = true;
  }

  RemoveWall(dir) {
    this.Walls[dir] = false;
  }

  /**
     * Returns the cell encoded as an 5 bit integer 
     * Bit 0 - Visited
     * Bit 1 - Left wall
     * Bit 2 - Right wall
     * Bit 3 - Up wall
     * Bit 4 - Down wall
     */
  toNumber() {
    let keys = Direction.all;
    let set = keys.map(d => (this.Walls[d] === true ? 1 : 0));
    return set.reduce((a, v) => (a << 1) | v, this.Visited ? 0 : 1);
  }

  get Visited() {
    return this._visited;
  }

  set Visited(value) {
    this._visited = value;
  }

  get X() {
    return this._x;
  }

  get Y() {
    return this._y;
  }

  /**
     * @return {object} Object with ACTION -> bool mapping
     */
  get Walls() {
    return this._walls;
  }
}
