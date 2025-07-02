"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(name, email, userId) {
        this.messages = [];
        this.email = email;
        this.name = name;
        this.userId = userId;
    }
    get getEmail() {
        return this.email;
    }
    set updateEmailId(email) {
        this.email = email;
    }
    sendMessage(message) {
        this.messages.push(message);
    }
    fetchApi(url) {
        // doing some fetching operations internally.
    }
    getHello() {
        return "Hello, I am Anmol Singh.";
    }
    static incrementStaticVariable() {
        this.appUsingDays += 1;
    }
}
User.appUsingDays = 0;
;
class person extends User {
    constructor(members, name, email, userId) {
        super(name, email, userId);
        this.membersInFamily = 0;
        this.membersInFamily = members;
    }
    getHello() {
        return "Hello, I am Anmol Singh and a good person.";
    }
    useSuperFunctionGetHello() {
        const value = super.getHello();
        return value;
    }
}
const anmol = new person(4, "Anmol Singh", "anmol@gmail.com", 8933);
console.log(anmol.useSuperFunctionGetHello());
console.log(anmol.getHello());
class BankProtocols {
    constructor() {
        this.bankAccountNumber = 0;
        this.IFSCCode = "";
        this.bankName = "UNKNOWN";
    }
    set setBankAccountNumber(bankAccountNumber) {
        this.bankAccountNumber = bankAccountNumber;
    }
    set setIFSCCODE(IFSCCode) {
        this.IFSCCode = IFSCCode;
    }
    set setBankName(bankName) {
        this.bankName = bankName;
    }
    get getBankAccountNumber() {
        return this.bankAccountNumber;
    }
    get getIFSCCode() {
        return this.IFSCCode;
    }
    bankInfo() {
        console.log("This is simple function.");
    }
}
class CreateAccount extends BankProtocols {
    constructor() {
        super(...arguments);
        this.bankHolder = "";
        this.bankBalance = 0;
    }
    set setbankHolder(bankHolder) {
        this.bankHolder = bankHolder;
    }
    set setBankBalance(bankBalance) {
        this.bankBalance = bankBalance;
    }
    getAccountDetials() {
        return `This is ${this.bankHolder}'s bank account and bank balance is ${this.bankBalance}.`;
    }
    bankInfo() {
        console.log("This is overriden function.");
    }
}
const anmolSingh = new CreateAccount();
anmolSingh.setBankAccountNumber = 99293932;
anmolSingh.setBankBalance = 30000;
anmolSingh.setBankName = "SBI";
anmolSingh.setIFSCCODE = "78df3d";
anmolSingh.setbankHolder = "Anmol Singh Chehal";
console.log(anmolSingh.getAccountDetials());
console.log(anmolSingh.getBankAccountNumber);
console.log(anmolSingh.getIFSCCode);
