"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let value1 = [true, false, false];
let value2 = ["string1", "string2"];
// if we want to create a reusable function which takes any parameter of any type like number or string etc. and should return same type of parameter from itself then we can't use these approaches: ->
function getValueOneFun(value) {
    // it will can take boolean and may return number or
    // it can take number and may return boolean which is not fine.
    return value;
}
function getValueTwoFun(value) {
    // it is also not good because it can take any type of parameter and return any type of parameter.
    return value;
}
// recommended appoach (generics) for these type of situation where we want that if function take number type of input then return number or vice versa: ->
function getValueThreeFun(value) {
    return value;
}
const myValue = getValueThreeFun(true);
console.log(getValueThreeFun({ type: "car", company: "BMW" }));
console.log(getValueThreeFun({
    username: "Anmol Singh Chehal",
    email: "anmol@gmail.com",
    password: "anmol123",
    age: 20,
    gender: "male",
}));
// more practice on generics
function getValueFourFun(array) {
    const index = 2;
    return array[index];
}
console.log(getValueFourFun(["one", "two", "three"]));
// In jsx there we use <Component/> this so that we can use our component since the genrics got same syntax like </> so jsx may think that <type> is component so to prevent it we use <type,>: ->
const getValueFiveFun = (array) => {
    return array[0];
};
// if we extends the interface, boolean, number or anything with type then we have to give the argument of type interface, boolean, number or whatever we given to function declaration otherwise it will give error if we give any other type other than the given type in function declaration.
// extending is not like the default type giving to the type like given below to y. so if we extends interface to the type then we have to follow its rule and it is must, no other option.
// and <x extends Database, can't come after the y=boolean> because if write it like <y = boolean, x extends Database> this so , in our sense if we donot want to provide to y type and think that it should take boolean and want to give database object to x type we do like: -> function<database>({something: "something"}); so, it will create confusion and the function thinks that <Database> type is given to first type which is <y=boolean> so <Database> goes to <y=boolean> and in this <y=boolean, Database> Database remains empty. that's why...
const getValueSixFun = (dataBaseDetails, isSuccess) => {
    return { dataBaseDetails, isSuccess: !isSuccess };
};
console.log(getValueSixFun({ connectionId: "h4h3h3", username: "Anmol Singh", password: "anmol123" }, false));
function getValueSevenFun(valueOne, valueTwo, valueThree, valueFour) {
    return { valueOne, valueTwo, valueThree, valueFour };
}
console.log(getValueSevenFun(89, true, { name: "Anmol Singh", age: 20, profession: "Engineer" }, { isSuccess: true }));
class library {
    constructor() {
        this.books = [];
    }
    checkIsAvaliable(bookName) {
        if (bookName) {
            let isAvailable = false;
            this.books.forEach(book => {
                if (book.name == bookName && book.isAvailable) {
                    isAvailable = true;
                }
            });
            if (isAvailable) {
                console.log("Book is available you can borrow.");
            }
            else {
                console.log("Book is not available, please try again tommorow.");
            }
        }
    }
    submitBook(bookDetails) {
        this.books.push(bookDetails);
        console.log("Book submitted.");
    }
}
const lib = new library();
lib.submitBook({ name: "Jungle Book", author: "Moglie", isAvailable: true });
lib.submitBook({ name: "Prince of Persia", author: "john Hattan", isAvailable: false });
lib.checkIsAvaliable("Jungle Book");
lib.checkIsAvaliable("Eat That Frog");
const variableOne = { key: "age", value: 20 };
// reusing: ->
const variableTwo = { key: 7, value: true };
const coordinates = [10, 20];
const admin = {
    id: "1",
    permissions: ["read", "write"],
};
function getValue(obj, key) {
    return obj[key];
}
const person = { name: "Anmol", age: 20 };
console.log(getValue(person, "age"));
function getLength(value) {
    console.log(value.length, value.toUpperCase());
}
// getLength only allows the content who have .length and .toUpperCase() function because of extends lengthy if we pass number(got error because no .length and .toUppercase), array(got error because have .length but no .toUppercase)
getLength("string");
// async function fetchData<T>(url: string): Promise<T> {
//     const response = await fetch(url);
//     return response.json();
// }
// interface appUser { name: string; }
// const user = await fetchData<appUser>("/api/user");
// some built-in utility types: ->
// Partial<T>, Required<T>, Pick<T>, Omit<T>, Record<K, V>
class Store {
    constructor(initialState) {
        this.state = initialState;
    }
    getState() {
        return this.state;
    }
    // Partial: It’s globally available in TypeScript—no need to import or define it. 
    // It takes a type T and creates a new type where all properties are optional (? modifier).
    // This means you can pass only some properties of T instead of all.
    update(partial) {
        this.state = Object.assign(Object.assign({}, this.state), partial);
    }
}
const userStore = new Store({ name: "", age: 0 });
userStore.update({ name: "Charlie" });
console.log(userStore.getState());
/* Equivalent to:
    {
    name?: string;
    age?: number;
    }
*/
const updateUser = { name: "Alice" }; // ✅ No error (age is optional)
/* Equivalent to:
    {
    id: number;
    mode: string;
    }
*/
const strictConfig = { id: 1, mode: "dark" }; // ✅
/* Equivalent to:
    {
    title: string;
    author: string;
    }
*/
const preview = { title: "TS Guide", author: "Alice" }; // ✅
/* Equivalent to:
    {
    title: string;
    director: string;
    }
*/
const movie = { title: "Inception", director: "Nolan" }; // ✅
/* Equivalent to:
   {
     Mon: string;
     Tue: string;
     Wed: string;
   }
*/
const schedule = {
    Mon: "Work",
    Tue: "Gym",
    Wed: "Meeting",
}; // ✅
