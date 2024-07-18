type OptionType = {label: string | undefined; value: number | string | undefined};

type ParametersMonthYear = {
  month: number;
  year: number;
};

type TransactionType = "INCOME" | "EXPENSE";

interface CategorySummary {
  name: string;
  type: TransactionType;
  total: number;
  id?: string;
}

interface Statistics {
  categoriesSummary?: CategorySummary[];
  expenseSummary?: number;
  incomeSummary?: number;
}
