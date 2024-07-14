// === USER ===

// to be used when state is required
export interface UserState {
  user: {
    username: string;
    email: string;
    id: string;
    balance: number | null;
  };
  token: string | null;
  loading: boolean;
  errorCode: string | null;
}

// to be used when user enters credentials
export interface UserCredentials {
  username: string;
  email: string;
  password: string;
}

// === TRANSACTIONS ===

// to validate type of transaction
export type TransactionType = "INCOME" | "EXPENSE";

// to validate type of range for the statistics
export interface RangeType {
  month?: number;
  year: number;
}

// to validate state of new/updated transaction
export interface UserTransaction {
  transactionDate: string;
  type: TransactionType;
  categoryId: string;
  comment: string;
  amount: number;
  id?: string;
}

// to validate state of existing transaction
export interface Transaction {
  id: string;
  transactionDate: string;
  type: TransactionType;
  categoryId: string;
  userId?: string;
  comment: string;
  amount: number;
  balanceAfter?: number;
}

export interface Categories {
  id: string;
  name: string;
  type: TransactionType;
}
[];

export interface CategorySummary {
  name: string;
  type: TransactionType;
  total: number;
}

export interface Statistics {
  categoriesSummary: CategorySummary[];
}

export interface TransactionsState {
  transactions: Transaction[] | [];
  categories: Categories | [];
  loading: boolean;
  errorCode: string | null;
}

export interface PatchData {
  updTransaction: Omit<Transaction, "id">;
  transId: string;
}

// === MONO (currencies) ===
