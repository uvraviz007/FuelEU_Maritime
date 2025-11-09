export class BankAccount {
  constructor(
    public id: number,
    public bankName: string,
    public encryptedAccountNumber: string,
    public balance: number,
    public userId: number,
    public createdAt?: Date
  ) {}
}
