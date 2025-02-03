export type Wallet = {
    id: number;
    name: string;
    initialBalance: number;
    currentBalance: number;
    currency: string;
    userId: number;
};

export interface WalletExpense {
    id: number;
    amount: number;
    date: string;
    note: string;
    type: ExpenseType;
    category: ExpenseCategory;
    walletId: number;
}

export type ExpenseCategory =
    | 'WORK'
    | 'FAMILY'
    | 'GIFT'
    | 'SHOPPING'
    | 'HOME'
    | 'CAR'
    | 'FOOD'
    | 'TRAVEL'
    | 'TRANSPORT'
    | 'OTHER'
    | 'SALARY'
    | 'LOAN'
    | 'EXTRA_INCOME';

export type ExpenseType = 'INCOME' | 'EXPENSE';
