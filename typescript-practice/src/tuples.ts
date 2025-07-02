let userData: [string, number, boolean];
userData = ["Anmol Singh", 20, true];

let anotherData: [string, boolean, number?];
anotherData = ["Anmol Singh", false];

let studentQuizData: [string, ...boolean[]] = ["Anmol Singh", true, false, true];
studentQuizData[0] = "Anmol Singh Chehal";

const readOnlyTuple: readonly [string, number] = ["Anmol Singh", 89];
console.log(readOnlyTuple);

type RGB = [number, number, number];
let [red, green, blue]:RGB = [255,34,255]; 

type httpResponse = [status: number, body: string];
let response: httpResponse = [200, "OK"];

const getUser = (name:string):[string, number] => {
    return [name, 200];
}
console.log(getUser("Anmol Singh"));

// weird behaviour of typescript: happened same like seen in tutorial
let tuple: [string, number] = ["Anmol Singh", 13];
// tuple = ["Anmol Singh Chehal", 89, 67]; -> gives error
console.log(tuple, tuple.length);
tuple.push("Great");
console.log(tuple, tuple.length);

