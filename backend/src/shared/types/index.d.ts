// Global type declarations for the FuelEU Maritime backend

// --------------
// Route type
// --------------
export interface IRoute {
  id: number;
  name: string;
  fromPort: string;
  toPort: string;
  distanceNm: number;
  fuelType: string;
  emissionsCO2Ton: number;
  operator: string;
  createdAt?: Date;
}

// --------------
// Compliance Balance (CB) Transaction type
// --------------
export interface ICBTransaction {
  id: number;
  operator: string;
  type: "credit" | "debit" | "purchase" | "sell";
  quantity: number;
  pricePerUnit?: number;
  totalValue?: number;
  createdAt?: Date;
}

// --------------
// Bank Account type
// --------------
export interface IBankAccount {
  id: number;
  bankName: string;
  encryptedAccountNumber: string;
  balance: number;
  operator: string;
  createdAt?: Date;
}

// --------------
// Express type augmentation (optional, for future use)
// --------------

// You can uncomment this if you plan to attach custom fields to req object
// (e.g., for operator info extracted from headers)

// declare global {
//   namespace Express {
//     interface Request {
//       operator?: string;
//     }
//   }
// }

export {};
