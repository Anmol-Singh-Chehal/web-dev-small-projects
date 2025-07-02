interface UserDetails{
    name: string;
    messages: string[];
    sendMessage: (message:string) => void;
    getHello: () => string;
}

class User implements UserDetails{
    static appUsingDays:number = 0;
    public name:string;
    private userId:number;
    protected email:string;
    public messages: string[] = [];

    constructor(name:string, email:string, userId:number){
        this.email = email;
        this.name = name;
        this.userId = userId;
    }

    get getEmail():string {
        return this.email;
    }

    set updateEmailId(email:string){
        this.email = email;
    }

    public sendMessage(message: string): void {
        this.messages.push(message);
    }

    private fetchApi(url:string):void {
        // doing some fetching operations internally.
    }

    public getHello(): string{
        return "Hello, I am Anmol Singh.";
    }

    static incrementStaticVariable(){
        this.appUsingDays += 1;
    }
};

class person extends User{
    public membersInFamily: number = 0;
    constructor(members:number, name:string, email:string, userId:number){
        super(name, email, userId);
        this.membersInFamily = members;
    }

    public override getHello(): string{
        return "Hello, I am Anmol Singh and a good person.";
    }

    public useSuperFunctionGetHello(): string{
        const value = super.getHello();
        return value;
    }
}

const anmol = new person(4, "Anmol Singh", "anmol@gmail.com", 8933);
console.log(anmol.useSuperFunctionGetHello());
console.log(anmol.getHello());

abstract class BankProtocols{
    protected bankAccountNumber:number = 0;
    protected IFSCCode:string = "";
    public bankName: "SBI" | "PNB" | "ICICI" | "UNKNOWN" = "UNKNOWN";

    set setBankAccountNumber(bankAccountNumber:number){
        this.bankAccountNumber = bankAccountNumber;
    }
    
    set setIFSCCODE(IFSCCode:string){
        this.IFSCCode = IFSCCode;
    }
    set setBankName(bankName:"SBI" | "PNB" | "ICICI" | "UNKNOWN"){
        this.bankName = bankName;
    }

    get getBankAccountNumber():number{
        return this.bankAccountNumber;
    }
    get getIFSCCode():string{
        return this.IFSCCode;
    }
    
    abstract getAccountDetials():string;

    bankInfo():void{
        console.log("This is simple function.");
    }
}

class CreateAccount extends BankProtocols{
    private bankHolder:string = "";
    private bankBalance:number = 0;

    set setbankHolder(bankHolder:string){
        this.bankHolder = bankHolder;
    }
    set setBankBalance(bankBalance:number){
        this.bankBalance = bankBalance;
    }

    getAccountDetials(): string {
        return `This is ${this.bankHolder}'s bank account and bank balance is ${this.bankBalance}.`;
    }

    override bankInfo(): void {
        console.log("This is overriden function.")
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

export {};