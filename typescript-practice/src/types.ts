let greetings:string = "hello everyone";
let myNumber = 89.89;

let myValue;
const getValue = () => {
  return "This is the value";
}
myValue = getValue();
myValue = 9;
myValue = false;

let signIn = (username:string, password:string): boolean => {
  // after signing in.
  return true;
}
const isSignIn = signIn("Anmol Singh", "anmol123");
console.log(isSignIn);

const marvelHeroes = ["iron-man", "hulk", "thor", "captain-america"];
const marvelFunction = (marvelHeroes: string[]):void => {
  let newStrings = marvelHeroes.map((marvelHero):string => {
    return `Marvel's hero is ${marvelHero}`;
  });
  console.log(newStrings);
}
marvelFunction(marvelHeroes);

function fetchData(url: string):never {
  // after tying to fetching user details got error.
  // :never return type function can only have the unreachable stuff in it like, infinite loops, throw new Error.
  // throw new Error("Got error while fetching data.");
  while(true){
    console.log("This is not gonna stop.");
  }
}
// fetchData("api/user"); // -> makes code unreachable;
// console.log("After calling the fetchData");

const getObject = ({username, password}: {username:string, password:string}):
{username: string, isSignedIn: boolean } => {
  return { username: "Hello "+username, isSignedIn:true }
}
const myObject = {
  username: "Anmol Singh Chehal",
  password: "anmol123"
};
console.log(getObject(myObject));

//trying weird behaviour of typescript : happen like described in tutorial
function createUser({username, password}: {username:string, password:string}):void {
  console.log(`Hey ${username}, Your account has been created.`);
}
const user = {username:"Anmol Singh Chehal", password: "anmol123", gender: "male" };
createUser(user);
// createUser({username:"Anmol Singh Chehal", password: "anmol123", gender: "male" });

export {};
