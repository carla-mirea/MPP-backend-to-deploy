export class User {
    private id: number;
    private name: string;
    private email: string;
    private password: string;

    constructor(id: number, name: string, email: string, password: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public getId(): number {
        return this.id;
    }

    public setId(newId: number): void {
        this.id = newId;
    }

    public getName(): string {
        return this.name;
    }

    public setName(newName: string): void {
        this.name = newName;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(newEmail: string): void {
        this.email = newEmail;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(newPassword: string): void {
        this.password = newPassword;
    }
}
