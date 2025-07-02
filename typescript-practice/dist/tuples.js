"use strict";
let userData;
userData = ["Anmol Singh", 20, true];
let anotherData;
anotherData = ["Anmol Singh", false];
let studentQuizData = ["Anmol Singh", true, false, true];
studentQuizData[0] = "Anmol Singh Chehal";
const readOnlyTuple = ["Anmol Singh", 89];
console.log(readOnlyTuple);
let [red, green, blue] = [255, 34, 255];
let response = [200, "OK"];
const getUser = (name) => {
    return [name, 200];
};
console.log(getUser("Anmol Singh"));
// weird behaviour of typescript: happened same like seen in tutorial
let tuple = ["Anmol Singh", 13];
// tuple = ["Anmol Singh Chehal", 89, 67]; -> gives error
console.log(tuple, tuple.length);
tuple.push("Great");
console.log(tuple, tuple.length);
