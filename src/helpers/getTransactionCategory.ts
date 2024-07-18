import { Category } from "../redux/data.types";

export const getTransactionCategory = (
  categories: Category[],
  id: string
): Category | undefined => {
  const category: Category | undefined = categories.find(
    (category) => category.id === id
  );

  return category;
};
