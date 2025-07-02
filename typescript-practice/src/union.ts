let value: string | number = 90;

type User = {
    username: string;
    userId: number;
};

type Admin = {
    adminName: string;
    adminId: number;
};

let anmol: User | Admin = {
    "userId": 9373,
    "username": "Anmol Singh"
};

console.log(anmol);

const myFunction = (value:string | number): string | number => {
    return 90;
}
let myValue = myFunction("89");

let myArray: (string | number)[] = [1, 89.83, "great"];

let gender: "male" | "female" | "other";
gender = "male";

export {}
