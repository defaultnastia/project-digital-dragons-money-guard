import React, {useEffect, useState} from "react";
import Select from "react-dropdown-select";
import {useAppDispatch} from "../../redux/hooks";
import {getTransactionsSummary} from "../../redux/transactions/operations";
import {monthNames} from "../../helpers/statistics/month";
import css from "./StatisticsDashboard.module.css";

const StatisticsDashboard = ({onFilterChange}: StatisticsDashboardProps) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const dispatch = useAppDispatch();
  const minYear = 2010;

  const handleMonthChange = (values: OptionType[]) => {
    const month = values[0]?.value as number;
    setSelectedMonth(month);
    onFilterChange({year: selectedYear, month});
  };

  const handleYearChange = (values: OptionType[]) => {
    const year = values[0]?.value as number;
    setSelectedYear(year);
    onFilterChange({year, month: selectedMonth});
  };

  useEffect(() => {
    dispatch(getTransactionsSummary({year: selectedYear, month: selectedMonth}));
  }, [selectedYear, selectedMonth, dispatch]);

  const optionsYear = Array.from({length: new Date().getFullYear() - minYear + 1}, (_, i) => {
    const year = minYear + i;
    return {
      label: year.toString(),
      value: year,
    };
  });

  const optionsMonth = monthNames.map((month) => ({
    label: month.label,
    value: parseInt(month.value, 10),
  }));

  return (
    <div className="flex flex-col min-[768px]:flex-row gap-5 min-[768px]:gap-4 min-[1280px]:gap-8 mb-5">
      <Select
        options={optionsMonth}
        values={[
          optionsMonth.find((option) => option.value === selectedMonth) || {
            label: "",
            value: selectedMonth,
          },
        ]}
        onChange={handleMonthChange}
        className={css.select}
      />

      <Select
        options={optionsYear}
        values={[
          optionsYear.find((option) => option.value === selectedYear) || {
            label: "",
            value: selectedYear,
          },
        ]}
        onChange={handleYearChange}
        className={css.select}
      />
    </div>
  );
};

export default StatisticsDashboard;
