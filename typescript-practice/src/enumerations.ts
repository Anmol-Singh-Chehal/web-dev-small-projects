const enum Direction {
    up, down, left, right
};

let move: Direction = Direction.up;
move = Direction.down;

const enum Another {
    one = 11, two, three = 21, four
};

const enum more {
    first = "This is first",
    second = "This is second",
    third = "This is third",
    fourth = "This is fourth"
};

let myValue:more = more.first;
console.log(myValue);

export {};