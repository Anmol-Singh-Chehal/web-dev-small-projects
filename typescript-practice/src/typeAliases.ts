type User = {
    readonly _id: string;
    name: string;
    password: string;
    gender: "male" | "female" | "other";
    age: number;
    isAppUsedBefore?: boolean;
};

type arrayType = [string, number, string];

function createUser(user: User):void {
    console.log(`Hey ${user.name}, Your account has been created.`);
}

const userObject: User = {
    _id: "ffegaad-ddk3432-32d3ns3",
    name: "Anmol Singh Chehal",
    password: "anmol123",
    gender: "male",
    age: 20
};

const user = createUser(userObject);
const myArray: arrayType = ["string", 90, "string"];

type BankInfo = {
    accountNumber: number;
    IFSC_code: string;
    isJoint: boolean;
};

type BalanceInfo = {
    bankBalance: number;
}

type fullBankDetails = BankInfo & BalanceInfo & {
    fatherName: string;
    branchName: string;
}

const bankObject:fullBankDetails = {
    accountNumber: 3243334433,
    IFSC_code: "3fs323",
    isJoint: false,
    fatherName: "Abc",
    branchName: "something",
    bankBalance: 1000
}

export {};