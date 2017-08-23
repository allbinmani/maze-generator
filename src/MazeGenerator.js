import MazeCell from './MazeCell';
import Direction from './directions.js';

export default class MazeGenerator {
    constructor(width, height, start = [0, 0]) {
        this._width = width;
        this._height = height;
        this._maze = [];
        this._stack = [];
        this._start = start;
    }

    get Width() {
        return this._width;
    }

    get Height() {
        return this._height;
    }

    get Start() {
        return this._start;
    }

    set Start(x) {
        this._start = [x[0], x[1]];
    }

    /**
     * @return {array} Array of length Width*Height with MazeCell instances
     */
    get Maze() {
        return this._maze;
    }

    /**
     * @param x {int} Horizontal position
     * @param y {int} Vertical position
     * @param direction {direction} Direction
     * @return {MazeCell} Neighbouring cell or null
     * @throws {Error} If an invalid direction is specified
     */
    getNeighbour(x, y, direction) {
        switch (direction) {
            case Direction.LEFT:
                return x > 0 ? this.getCell(x - 1, y) : null;
            case Direction.RIGHT:
                return x < this.Width - 1 ? this.getCell(x + 1, y) : null;
            case Direction.UP:
                return y > 0 ? this.getCell(x, y - 1) : null;
            case Direction.DOWN:
                return y < this.Height - 1 ? this.getCell(x, y + 1) : null;
            default:
                throw new Error("No such direction:" + direction);
        }
    }

    /**
     * @param x {int} Horizontal position
     * @param y {int} Vertical position
     * @return {MazeCell} The maze cell located at x,y
     */
    getCell(x, y) {
        if (x < 0 || y < 0 || x > this.Width - 1 || y > this.Height - 1) {
            return null;
        }
        let cell = this._maze[y * this.Width + x];
        if (!cell) {
            cell = new MazeCell(x, y);
            this._setCell(x, y, cell);
        }
        return cell;
    }

    /**
     * Generates the maze, given a seed.
     * @returns {array} Array of MazeCell instances
     */
    generate() {
        this._stack = [];
        this._maze = [];
        let currentCell = this.getCell(this.Start[0], this.Start[1]);
        currentCell.Visited = true;
        this._gen_next(currentCell);
        return this.Maze;
    }


    /**
     * Returns the opposing direction for given direction
     */
    opposingDir(dir) {
        switch (dir) {
            case Direction.LEFT:
                return Direction.RIGHT;
            case Direction.RIGHT:
                return Direction.LEFT;
            case Direction.UP:
                return Direction.DOWN;
            case Direction.DOWN:
                return Direction.UP;
        }
    }

    /**
     * Returns true if moving in a certain direction from a cell is possible.
     * @param cell {MazeCell} The cell
     * @param dir {direction} Any of DIR_LEFT, DIR_RIGHT, DIR_UP or DIR_DOWN
     */
    cellDirectionOpen(cell, dir) {
        if (!cell.HasWall(dir)) {
            let neigh = this.getNeighbour(cell.X, cell.Y, dir);
            if (neigh === null) {
                console.log("no cell neigh", cell);
                return false; // "out of bounds"
            }
            let odir = this.opposingDir(dir);
            //console.log('dir,odir',dir,odir);
            if (neigh.HasWall(odir)) {
                throw new Error("Should not be possible");
            }
            return true;
        }
        return false;
    }

    /**
     * @private
     */
    _gen_next(currentCell) {
        let picked = this._pickNeighbour(currentCell);
        if (picked) {
            this._stack.push(currentCell);
            currentCell.RemoveWall(picked.dir);
            picked.neigh.RemoveWall(this.opposingDir(picked.dir));
            picked.neigh.Visited = true;
            this._gen_next(picked.neigh);
        }
        else {
            picked = this._stack.pop();
            if (picked) {
                this._gen_next(picked);
            } // else stack empty == Done!
        }
    }

    /**
     * @private
     */
    _setCell(x, y, cell) {
        this._maze[y * this.Width + x] = cell;
        return cell;
    }

    /**
     * @private
     */
    _pickNeighbour(cell) {
        const allDirs = Direction.ALL;
        let canPick = allDirs
            .map(d => {
                return {
                    dir: d,
                    neigh: this.getNeighbour(cell.X, cell.Y, d)
                };
            })
            .filter(n => {
                return n.neigh !== null;
            })
            .filter(n => {
                return !n.neigh.Visited;
            });

        if (canPick.length === 0) {
            return null;
        }
        let pickDir = ~~(Math.random() * canPick.length);
        let picked = canPick[pickDir];
        return picked;
    }
}
