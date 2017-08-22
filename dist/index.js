'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _MazeCell = require('./MazeCell');

var _MazeCell2 = _interopRequireDefault(_MazeCell);

var _directions = require('./directions.js');

var _directions2 = _interopRequireDefault(_directions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MazeGenerator = function () {
    function MazeGenerator(width, height) {
        var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [0, 0];

        _classCallCheck(this, MazeGenerator);

        this._width = width;
        this._height = height;
        this._maze = [];
        this._stack = [];
        this._start = start;
    }

    _createClass(MazeGenerator, [{
        key: 'getNeighbour',


        /**
         * @param x {int} Horizontal position
         * @param y {int} Vertical position
         * @param direction {direction} Direction
         * @return {MazeCell} Neighbouring cell or null
         * @throws {Error} If an invalid direction is specified
         */
        value: function getNeighbour(x, y, direction) {
            switch (direction) {
                case _directions2.default.LEFT:
                    return x > 0 ? this.getCell(x - 1, y) : null;
                case _directions2.default.RIGHT:
                    return x < this.Width - 1 ? this.getCell(x + 1, y) : null;
                case _directions2.default.UP:
                    return y > 0 ? this.getCell(x, y - 1) : null;
                case _directions2.default.DOWN:
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

    }, {
        key: 'getCell',
        value: function getCell(x, y) {
            if (x < 0 || y < 0 || x > this.Width - 1 || y > this.Height - 1) {
                return null;
            }
            var cell = this._maze[y * this.Width + x];
            if (!cell) {
                cell = new _MazeCell2.default(x, y);
                this._setCell(x, y, cell);
            }
            return cell;
        }

        /**
         * Generates the maze, given a seed.
         * @returns {array} Array of MazeCell instances
         */

    }, {
        key: 'generate',
        value: function generate() {
            this._stack = [];
            this._maze = [];
            var currentCell = this.getCell(this.Start[0], this.Start[1]);
            currentCell.Visited = true;
            this._gen_next(currentCell);
            return this.Maze;
        }

        /**
         * Returns the opposing direction for given direction
         */

    }, {
        key: 'opposingDir',
        value: function opposingDir(dir) {
            switch (dir) {
                case _directions2.default.LEFT:
                    return _directions2.default.RIGHT;
                case _directions2.default.RIGHT:
                    return _directions2.default.LEFT;
                case _directions2.default.UP:
                    return _directions2.default.DOWN;
                case _directions2.default.DOWN:
                    return _directions2.default.UP;
            }
        }

        /**
         * Returns true if moving in a certain direction from a cell is possible.
         * @param cell {MazeCell} The cell
         * @param dir {direction} Any of DIR_LEFT, DIR_RIGHT, DIR_UP or DIR_DOWN
         */

    }, {
        key: 'cellDirectionOpen',
        value: function cellDirectionOpen(cell, dir) {
            if (!cell.HasWall(dir)) {
                var neigh = this.getNeighbour(cell.X, cell.Y, dir);
                if (neigh === null) {
                    console.log("no cell neigh", cell);
                    return false; // "out of bounds"
                }
                var odir = this.opposingDir(dir);
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

    }, {
        key: '_gen_next',
        value: function _gen_next(currentCell) {
            var picked = this._pickNeighbour(currentCell);
            if (picked) {
                this._stack.push(currentCell);
                currentCell.RemoveWall(picked.dir);
                picked.neigh.RemoveWall(this.opposingDir(picked.dir));
                picked.neigh.Visited = true;
                this._gen_next(picked.neigh);
            } else {
                picked = this._stack.pop();
                if (picked) {
                    this._gen_next(picked);
                } // else stack empty == Done!
            }
        }

        /**
         * @private
         */

    }, {
        key: '_setCell',
        value: function _setCell(x, y, cell) {
            this._maze[y * this.Width + x] = cell;
            return cell;
        }

        /**
         * @private
         */

    }, {
        key: '_pickNeighbour',
        value: function _pickNeighbour(cell) {
            var _this = this;

            var allDirs = _directions2.default.ALL;
            var canPick = allDirs.map(function (d) {
                return {
                    dir: d,
                    neigh: _this.getNeighbour(cell.X, cell.Y, d)
                };
            }).filter(function (n) {
                return n.neigh !== null;
            }).filter(function (n) {
                return !n.neigh.Visited;
            });

            if (canPick.length === 0) {
                return null;
            }
            var pickDir = ~~(Math.random() * canPick.length);
            var picked = canPick[pickDir];
            return picked;
        }
    }, {
        key: 'Width',
        get: function get() {
            return this._width;
        }
    }, {
        key: 'Height',
        get: function get() {
            return this._height;
        }
    }, {
        key: 'Start',
        get: function get() {
            return this._start;
        },
        set: function set(x) {
            this._start = [x[0], x[1]];
        }

        /**
         * @return {array} Array of length Width*Height with MazeCell instances
         */

    }, {
        key: 'Maze',
        get: function get() {
            return this._maze;
        }
    }]);

    return MazeGenerator;
}();

//# sourceMappingURL=index.js.map