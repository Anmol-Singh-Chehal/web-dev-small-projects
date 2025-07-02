// This function gives error in the line of return because we are returning value +3 and value could be of type string so we have to use some type gaurds and type safety checks so that it ensures that which value is we returning with +3 is definitely a number.

// function detectType(value: number|string){
//     return value+3;
// }

// this does not gives error because of type gaurds safety.
function detectType(value:number | string){
    if(typeof value == "number"){
        return value+3;
    }
    return value.toUpperCase();
}

function giveData(id: string | null){
    if(!id){
        console.log("Kindly provide id.");
        return;
    }
    return id.toUpperCase();
}

// javascript have weird behaviour it gives the typeof {name:"anmol"} -> object, typeof [1,2,3] -> object
function printValue(value:string|string[]|null){
    if(value){
        if(typeof value == "string"){
            console.log("This is a string.");
        } else if(typeof value == "object"){
            console.log("This is string array.");
        }
    }
}

interface User {
    name: string,
    email: string
}

interface Admin{
    name: string,
    email: string,
    isAdmin: boolean
}

function isAdminAccount(account: User | Admin){
    if("isAdmin" in account){
        return account.isAdmin;
    } else {
        return account.name;
    }
}

const myDate = new Date();
class Library{
    public books:string[] = ["Typescript", "Python"];
}
const lib = new Library();

function logValue(value: Date | Library){
    if(value instanceof Date){
        console.log(value.toDateString());
    } else {
        console.log(value.books);
    }
}
logValue(myDate);

type Monkey = {climb: () => void};
type Shark = {swim: () => void};
function isShark(animal: Monkey | Shark): animal is Shark {
    return (animal as Shark).swim !== undefined;
}
function getFood(animal: Shark | Monkey){
    if(isShark(animal)){
        animal.swim();
        return "Get Shark Food.";
    } else {
        animal.climb();
        return "Get Monkey Food";
    }
}
const MonkeyObj:Monkey = {
    climb() {
        console.log("Monkey is climbing...");
    },
}
const SharkObj:Shark = {
    swim() {
        console.log("Shark is swimming...");
    },
}
const result = getFood(MonkeyObj);
console.log(result);

interface Circle{
    kind: "circle",
    radius: number;
}
interface Square{
    kind: "square",
    side: number;
}
interface Rectangle{
    kind: "rectangle",
    length: number,
    width: number,
}
// before it was only Circle | Square
type Shape = Circle | Square | Rectangle;
function getAreaOneFun(shape: Shape){
    if(shape.kind === "circle"){
        return Math.PI * shape.radius ** 2;
    }
    // this gives error when we add Rectangle. So, it is fine but this function is not good practice for every case check, switch case is the best relevant, readable and recommended approach and there is chance that you can forgot the cases without _exhaustive check but ...
    // return shape.side * shape.side;
}
function getAreaTwoFun(shape: Shape){
    // ... but before exhaustive check it was not giving error when we add Rectangle in the type Shape so that's why to give error to us so that we gotta know that the new stuff is added in shape and we have to add new case for it we used exhaustive case
    switch(shape.kind){
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.side * shape.side;
        case "rectangle":
            return shape.length * shape.width;
        
        default:
            const _exhaustiveCheck:never = shape;
            return _exhaustiveCheck;
    }
}
const circleOne: Circle = {
    kind: "circle",
    radius: 8,
}
const squareOne: Square = {
    kind: "square",
    side: 5,
}
const rectangleOne: Rectangle = {
    kind: "rectangle",
    length: 8,
    width: 10,
}
console.log(getAreaOneFun(circleOne));
console.log(getAreaTwoFun(squareOne));
console.log(getAreaTwoFun(rectangleOne));
