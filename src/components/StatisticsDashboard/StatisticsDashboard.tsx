import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { getTransactionsSummary } from "../../redux/transactions/operations";
import StyledSelect from "./StyledSelect";
import CustomDropdownIndicator from "../AddTransactionForm/CustomDropdownIndicator";

import { monthNames } from "../../helpers/statistics/month";

import css from "./StatisticsDashboard.module.css";

interface StatisticsDashboardProps {
  onFilterChange: (newFilter: ParametersMonthYear) => void;
}

const StatisticsDashboard = ({ onFilterChange }: StatisticsDashboardProps) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const dispatch = useAppDispatch();
  const minYear = 2020;

  const handleMonthChange = (values: (string | object)[]) => {
    const month = (values[0] as OptionType)?.value as number;
    setSelectedMonth(month);
    onFilterChange({ year: selectedYear, month });
  };

  const handleYearChange = (values: (string | object)[]) => {
    const year = (values[0] as OptionType)?.value as number;
    setSelectedYear(year);
    onFilterChange({ year, month: selectedMonth });
  };

  useEffect(() => {
    dispatch(
      getTransactionsSummary({ year: selectedYear, month: selectedMonth })
    );
  }, [selectedYear, selectedMonth, dispatch]);

  const optionsYear = Array.from(
    { length: new Date().getFullYear() - minYear + 1 },
    (_, i) => {
      const year = minYear + i;
      return {
        label: year.toString(),
        value: year,
      };
    }
  );

  const optionsMonth = monthNames.map((month) => ({
    label: month.label,
    value: parseInt(month.value, 10),
  }));

  return (
    <div className="flex flex-col min-[768px]:flex-row gap-5 min-[768px]:gap-4 min-[1280px]:gap-8 mb-5">
      <StyledSelect
        options={optionsMonth}
        values={[
          optionsMonth.find((option) => option.value === selectedMonth) || {
            label: "",
            value: selectedMonth,
          },
        ]}
        onChange={handleMonthChange}
        className={css.select}
        backspaceDelete={false}
        dropdownHandleRenderer={() => <CustomDropdownIndicator />}
        style={{
          boxShadow: "none",
        }}
      />

      <StyledSelect
        options={optionsYear}
        values={[
          optionsYear.find((option) => option.value === selectedYear) || {
            label: "",
            value: selectedYear,
          },
        ]}
        onChange={handleYearChange}
        className={css.select}
        backspaceDelete={false}
        dropdownHandleRenderer={() => <CustomDropdownIndicator />}
        style={{
          boxShadow: "none",
        }}
      />
    </div>
  );
};

export default StatisticsDashboard;
