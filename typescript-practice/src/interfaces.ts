interface User{
    readonly dbId: number;
    username: string,
    email: string;
    password: string;
    gender?: "male" | "female" | "other";
    isStarted: boolean;
    startTrial({username}:{username:string}): string;
    checkIsStarted: ({isStarted}:{isStarted:boolean}) => boolean;
};

const anmol:User = {
    dbId: 23242,
    username: "Anmol Singh",
    email: "anmol@gmail.com",
    password: "anmol123",
    gender: "male",
    isStarted: false,
    startTrial: ({username}:{username:string}) => {
        return `Hey, ${username} Your tral has been started.`;
    },
    checkIsStarted: ({isStarted}:{isStarted:boolean}) => {
        return isStarted;
    }
};

console.log(anmol.startTrial(anmol));
console.log(anmol.checkIsStarted(anmol));

interface Box{
    height: number;
};

interface Box{
    width: number;
};

const myBox: Box = {
    height: 88,
    width: 78,
};

interface balanceDetails{
    balance: number;
}
interface bankDetials{
    accountHolder: string,
    accountNumber: number;
    IFSCCode: string;
}
interface fullBankDetails extends balanceDetails, bankDetials{
    fatherName: string;
}

const anmolSingh:fullBankDetails = {
    accountHolder: "Anmol Singh",
    fatherName: "abc",
    accountNumber: 3939929323,
    IFSCCode: "3ks7sd",
    balance: 10000,
}
console.log(anmolSingh);

export {};