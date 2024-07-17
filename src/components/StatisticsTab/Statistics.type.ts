type Data = {
  color?: string;
  name?: string;
  type?: string;
  total?: number;
  id?: string;
  categoryId?: string;
  date?: string;
};

type ColorSchema = {
  color: string;
  name?: string;
  id?: string;
  categoryId?: string;
  date?: string;
};

type DateTransaction = {
  [key: string]: any;
};

type Transaction = {
  id?: string;
  type?: string;
  transactionDate?: string;
  categoryId?: string;
  date?: string;
  name?: string;
  total?: number;
};

type OptionYear = {
  value?: string;
  label?: string;
};

type FilterState = {
  dataTransaction: Data[];
  selectedMonth: string;
  selectedYear: string;
};

type OptionType = {label: string | undefined; value: number | string | undefined};

type ParametersMonthYear = {
  month: number;
  year: number;
};

type FilterChange = {
  setFilter: (newFilter: ParametersMonthYear) => void;
};

type StatisticsDashboardProps = {
  onFilterChange: (newFilter: ParametersMonthYear) => void;
};

type TransactionType = "INCOME" | "EXPENSE";

type CategorySummary = {
  name: string;
  type: TransactionType;
  total: number;
  id?: string;
};

interface Statistics {
  categoriesSummary?: CategorySummary[];
  expenseSummary?: number;
  incomeSummary?: number;
}

type ChartProps = {
  dataTransaction?: Statistics | null;
  balance: number | null;
};
