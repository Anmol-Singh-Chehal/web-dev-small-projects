let value1:Array<boolean> = [true, false, false];
let value2:Array<string> = ["string1", "string2"];

// if we want to create a reusable function which takes any parameter of any type like number or string etc. and should return same type of parameter from itself then we can't use these approaches: ->

function getValueOneFun(value: boolean | number):boolean | number {
    // it will can take boolean and may return number or
    // it can take number and may return boolean which is not fine.
    return value;
}

function getValueTwoFun(value: any):any {
    // it is also not good because it can take any type of parameter and return any type of parameter.
    return value;
}

// recommended appoach (generics) for these type of situation where we want that if function take number type of input then return number or vice versa: ->
function getValueThreeFun<type>(value:type):type {
    return value;
}
const myValue = getValueThreeFun(true);

// can use getValueThreeFun with interface type.
interface Vehicle{
    type: "car" | "bike" | "truck" | "train" | "plane";
    company: string;
}
type User = {
    username: string;
    email: string;
    password: string;
    age: number;
    gender: "male" | "female" | "other";
}
console.log(getValueThreeFun<Vehicle>({type:"car", company:"BMW"}));
console.log(getValueThreeFun<User>({
    username:"Anmol Singh Chehal",
    email: "anmol@gmail.com",
    password: "anmol123",
    age: 20,
    gender: "male",
}));

// more practice on generics
function getValueFourFun<x>(array: x[]):x {
    const index = 2;
    return array[index];
}
console.log(getValueFourFun<string>(["one", "two", "three"]));

// In jsx there we use <Component/> this so that we can use our component since the genrics got same syntax like </> so jsx may think that <type> is component so to prevent it we use <type,>: ->
const getValueFiveFun = <x,>(array: x[]):x => {
    return array[0];
}

// use of extends keyword in genrics: ->
interface Database{
    connectionId: string,
    username: string,
    password: string,
}
// if we extends the interface, boolean, number or anything with type then we have to give the argument of type interface, boolean, number or whatever we given to function declaration otherwise it will give error if we give any other type other than the given type in function declaration.
// extending is not like the default type giving to the type like given below to y. so if we extends interface to the type then we have to follow its rule and it is must, no other option.
// and <x extends Database, can't come after the y=boolean> because if write it like <y = boolean, x extends Database> this so , in our sense if we donot want to provide to y type and think that it should take boolean and want to give database object to x type we do like: -> function<database>({something: "something"}); so, it will create confusion and the function thinks that <Database> type is given to first type which is <y=boolean> so <Database> goes to <y=boolean> and in this <y=boolean, Database> Database remains empty. that's why...
const getValueSixFun = <x extends Database, y = boolean>(dataBaseDetails:x, isSuccess:y):object => { 
    return { dataBaseDetails, isSuccess: !isSuccess };
}
console.log(getValueSixFun<Database, boolean>(
    {connectionId:"h4h3h3", username: "Anmol Singh", password:"anmol123"},
    false
));

// using type, extends, pipline operator or union with generics: ->
type Person = {
    name: string,
    age: number,
    profession: string,
}
function getValueSevenFun
<w extends string | number, x extends boolean, y extends Person, z>
(valueOne:w, valueTwo:x, valueThree:y, valueFour:z):
{"valueOne": w, "valueTwo": x, "valueThree": y, "valueFour": z} {
    return {valueOne, valueTwo, valueThree, valueFour};
}
console.log(getValueSevenFun<number, boolean, Person, object>(
    89,
    true,
    {name:"Anmol Singh", age:20, profession:"Engineer"},
    {isSuccess: true},
));

//using generics with the classes: ->
interface BookInfo{
    name: string,
    author: string,
    isAvailable: boolean,
}

class library<x extends BookInfo, y>{
    private books: x[] = []
    checkIsAvaliable(bookName:y):void {
        if(bookName){
            let isAvailable = false;
            this.books.forEach(book => {
                if(book.name == bookName && book.isAvailable){
                    isAvailable = true;
                }
            });
            if(isAvailable){
                console.log("Book is available you can borrow.");
            } else {
                console.log("Book is not available, please try again tommorow.");
            }
        }
    }

    submitBook(bookDetails:x):void {
        this.books.push(
            bookDetails
        );
        console.log("Book submitted.");
    }
}   

const lib = new library<BookInfo, string>();
lib.submitBook({name: "Jungle Book", author: "Moglie", isAvailable: true});
lib.submitBook({name: "Prince of Persia", author: "john Hattan", isAvailable: false});
lib.checkIsAvaliable("Jungle Book");
lib.checkIsAvaliable("Eat That Frog");

// using genrics on type: ->
type KeyValue<x, y> = {key:x, value:y};
const variableOne: KeyValue<string, number> = {key:"age", value:20};
// reusing: ->
const variableTwo: KeyValue<number, boolean> = {key:7, value:true};

// another usage examples: ->
type Pair<T, U> = [T, U];
const coordinates: Pair<number, number> = [10, 20];

interface user {
    id: string;
}
interface Admin<T> extends user {
    permissions: T;
}
const admin: Admin<string[]> = {
    id: "1",
    permissions: ["read", "write"],
};

function getValue<x, y extends keyof x>(obj:x, key:y):x[y] {
    return obj[key];
}
const person = {name: "Anmol", age: 20};
console.log(getValue(person, "age"));

// extraodinary usage
interface lengthy{
    length: number,
    toUpperCase: () => string,
}
function getLength<x extends lengthy>(value:x):void {
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
class Store<T> {
    private state: T;
    constructor(initialState: T) {
        this.state = initialState;
    }
    getState(): T {
        return this.state;
    }

    // Partial: It’s globally available in TypeScript—no need to import or define it. 
    // It takes a type T and creates a new type where all properties are optional (? modifier).
    // This means you can pass only some properties of T instead of all.
    update(partial: Partial<T>) {
        this.state = { ...this.state, ...partial };
    }

    // same as this one but no reusability.
    //update(partial: { name?: string; age?: number }) {
    //      this.state = { ...this.state, ...partial 
    // };
}

const userStore = new Store({ name: "", age: 0 });
userStore.update({ name: "Charlie" });
console.log(userStore.getState());

// Partial:
interface userTwo {
    name: string;
    age: number;
}

// All properties become optional
type PartialUser = Partial<userTwo>;
/* Equivalent to:
    { 
    name?: string; 
    age?: number; 
    }
*/

const updateUser: PartialUser = { name: "Alice" }; // ✅ No error (age is optional)

// Required:
interface Config {
    id?: number;
    mode?: string;
}

// All properties become required
type RequiredConfig = Required<Config>;
/* Equivalent to:
    { 
    id: number; 
    mode: string; 
    }
*/

const strictConfig: RequiredConfig = { id: 1, mode: "dark" }; // ✅
// const invalidConfig: RequiredConfig = { id: 1 }; // ❌ Error (missing `mode`)

// Pick: 
interface Book {
    title: string;
    author: string;
    pages: number;
  }
  
  // Only pick 'title' and 'author'
type BookPreview = Pick<Book, "title" | "author">;
/* Equivalent to:
    { 
    title: string; 
    author: string; 
    }
*/

const preview: BookPreview = { title: "TS Guide", author: "Alice" }; // ✅
// const invalid: BookPreview = { title: "TS Guide" }; // ❌ (missing `author`)

// Omit:
interface Movie {
    title: string;
    director: string;
    year: number;
}

// Remove 'year'
type MovieWithoutYear = Omit<Movie, "year">;
/* Equivalent to:
    { 
    title: string; 
    director: string; 
    }
*/

const movie: MovieWithoutYear = { title: "Inception", director: "Nolan" }; // ✅
// const invalid: MovieWithoutYear = { title: "Inception", year: 2010 }; // ❌

// Record:
type Weekday = "Mon" | "Tue" | "Wed";
type Schedule = Record<Weekday, string>;
/* Equivalent to:
   {
     Mon: string;
     Tue: string;
     Wed: string;
   }
*/

const schedule: Schedule = {
  Mon: "Work",
  Tue: "Gym",
  Wed: "Meeting",
}; // ✅
// const invalid: Schedule = { Mon: "Work" }; // ❌ (missing Tue/Wed)
export {};