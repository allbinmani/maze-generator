let dirs = {
    LEFT: Symbol("LEFT"),
    RIGHT: Symbol("RIGHT"),
    UP: Symbol("UP"),
    DOWN: Symbol("DOWN")
};
dirs.all = Object.values(dirs);

export default Object.freeze(dirs);
