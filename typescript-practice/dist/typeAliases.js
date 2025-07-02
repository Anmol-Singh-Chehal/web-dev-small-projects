"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createUser(user) {
    console.log(`Hey ${user.name}, Your account has been created.`);
}
const userObject = {
    _id: "ffegaad-ddk3432-32d3ns3",
    name: "Anmol Singh Chehal",
    password: "anmol123",
    gender: "male",
    age: 20
};
const user = createUser(userObject);
const myArray = ["string", 90, "string"];
const bankObject = {
    accountNumber: 3243334433,
    IFSC_code: "3fs323",
    isJoint: false,
    fatherName: "Abc",
    branchName: "something",
    bankBalance: 1000
};
