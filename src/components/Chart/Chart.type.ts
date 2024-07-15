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
};
