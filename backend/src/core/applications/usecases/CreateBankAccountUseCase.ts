import { BankRepository } from "../../ports/BankRepository";
import CryptoJS from "crypto-js";

export class CreateBankAccountUseCase {
  constructor(private bankRepo: BankRepository) {}

  async execute(data: { bankName: string; accountNumber: string; userId: number; initialBalance?: number }) {
    const encrypted = CryptoJS.AES.encrypt(data.accountNumber, process.env.ENCRYPT_KEY as string).toString();
    return this.bankRepo.create({
      bankName: data.bankName,
      encryptedAccountNumber: encrypted,
      balance: data.initialBalance ?? 0,
      userId: data.userId,
      id: 0,
      createdAt: undefined,
    });
  }
}
