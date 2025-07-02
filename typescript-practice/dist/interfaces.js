"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
const anmol = {
    dbId: 23242,
    username: "Anmol Singh",
    email: "anmol@gmail.com",
    password: "anmol123",
    gender: "male",
    isStarted: false,
    startTrial: ({ username }) => {
        return `Hey, ${username} Your tral has been started.`;
    },
    checkIsStarted: ({ isStarted }) => {
        return isStarted;
    }
};
console.log(anmol.startTrial(anmol));
console.log(anmol.checkIsStarted(anmol));
;
;
const myBox = {
    height: 88,
    width: 78,
};
const anmolSingh = {
    accountHolder: "Anmol Singh",
    fatherName: "abc",
    accountNumber: 3939929323,
    IFSCCode: "3ks7sd",
    balance: 10000,
};
console.log(anmolSingh);
