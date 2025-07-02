"use strict";
// This function gives error in the line of return because we are returning value +3 and value could be of type string so we have to use some type gaurds and type safety checks so that it ensures that which value is we returning with +3 is definitely a number.
// function detectType(value: number|string){
//     return value+3;
// }
// this does not gives error because of type gaurds safety.
function detectType(value) {
    if (typeof value == "number") {
        return value + 3;
    }
    return value.toUpperCase();
}
function giveData(id) {
    if (!id) {
        console.log("Kindly provide id.");
        return;
    }
    return id.toUpperCase();
}
// javascript have weird behaviour it gives the typeof {name:"anmol"} -> object, typeof [1,2,3] -> object
function printValue(value) {
    if (value) {
        if (typeof value == "string") {
            console.log("This is a string.");
        }
        else if (typeof value == "object") {
            console.log("This is string array.");
        }
    }
}
function isAdminAccount(account) {
    if ("isAdmin" in account) {
        return account.isAdmin;
    }
    else {
        return account.name;
    }
}
const myDate = new Date();
class Library {
    constructor() {
        this.books = ["Typescript", "Python"];
    }
}
const lib = new Library();
function logValue(value) {
    if (value instanceof Date) {
        console.log(value.toDateString());
    }
    else {
        console.log(value.books);
    }
}
logValue(myDate);
function isShark(animal) {
    return animal.swim !== undefined;
}
function getFood(animal) {
    if (isShark(animal)) {
        animal.swim();
        return "Get Shark Food.";
    }
    else {
        animal.climb();
        return "Get Monkey Food";
    }
}
const MonkeyObj = {
    climb() {
        console.log("Monkey is climbing...");
    },
};
const SharkObj = {
    swim() {
        console.log("Shark is swimming...");
    },
};
const result = getFood(MonkeyObj);
console.log(result);
function getAreaOneFun(shape) {
    if (shape.kind === "circle") {
        return Math.PI * shape.radius ** 2;
    }
    // this gives error when we add Rectangle. So, it is fine but this function is not good practice for every case check, switch case is the best relevant, readable and recommended approach and there is chance that you can forgot the cases without _exhaustive check but ...
    // return shape.side * shape.side;
}
function getAreaTwoFun(shape) {
    // ... but before exhaustive check it was not giving error when we add Rectangle in the type Shape so that's why to give error to us so that we gotta know that the new stuff is added in shape and we have to add new case for it we used exhaustive case
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.side * shape.side;
        case "rectangle":
            return shape.length * shape.width;
        default:
            const _exhaustiveCheck = shape;
            return _exhaustiveCheck;
    }
}
const circleOne = {
    kind: "circle",
    radius: 8,
};
const squareOne = {
    kind: "square",
    side: 5,
};
const rectangleOne = {
    kind: "rectangle",
    length: 8,
    width: 10,
};
console.log(getAreaOneFun(circleOne));
console.log(getAreaTwoFun(squareOne));
console.log(getAreaTwoFun(rectangleOne));
