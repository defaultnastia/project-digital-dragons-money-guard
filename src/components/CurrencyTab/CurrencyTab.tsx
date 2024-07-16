import React, { useEffect, useState } from "react";
import { CurrencyRate, getCurrencyRates } from "../../services/monobankApi";
import s from "./CurrencyTab.module.css";
import clsx from "clsx";

const CurrencyTab: React.FC = () => {
  const [currencyRates, setCurrencyRates] = useState<CurrencyRate[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const rates = await getCurrencyRates();
        if (rates) {
          setCurrencyRates(rates);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCurrencyName = (code: number): string => {
    switch (code) {
      case 840:
        return "USD";
      case 978:
        return "EUR";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="flex-col w-[336px] xl:w-[480px] bg-[rgba(74,86,226,0.1)] rounded-br-[8px] rounded-bl-[8px] xl:rounded-none overflow-hidden">
      {loading ? (
        <p className="flex items-center justify-center h-[109px]">Loading...</p>
      ) : error ? (
        <p className="flex items-center justify-center h-[109px]">
          Error fetching currency rates
        </p>
      ) : (
        <table className="text-[16px] w-full table-fixed xl:mb-[36px]">
          <thead className="text-[16px] bg-[rgba(255,255,255,0.20)] w-full">
            <tr>
              <th
                className="pt-[13px] pb-[13px] pl-[20px] xl:pl-[96px]"
                align="left"
              >
                Currency
              </th>
              <th className="pt-[13px] pb-[13px]" align="center">
                Purchase
              </th>
              <th
                className="pt-[13px] pb-[13px] pr-[20px] xl:pr-[96px]"
                align="right"
              >
                Sale
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="h-[8px] bg-transparent"></tr>
            {currencyRates?.map((rate, index) => (
              <tr key={index} className={index === 1 ? s.noPaddingBottom : ""}>
                <td
                  className={clsx("pb-[12px] pl-[20px] xl:pl-[96px]", {
                    [s.noBottomPadding]: index === 1,
                  })}
                  align="left"
                >
                  {getCurrencyName(rate.currencyCodeA)}
                </td>
                <td
                  className={clsx("pb-[12px]", {
                    [s.noBottomPadding]: index === 1,
                  })}
                  align="center"
                >
                  {rate.rateBuy.toFixed(2)}
                </td>
                <td
                  className={clsx("pb-[12px] pr-[20px] xl:pr-[96px]", {
                    [s.noBottomPadding]: index === 1,
                  })}
                  align="right"
                >
                  {rate.rateSell.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="h-[97px] xl:h-[192px]">
        <div className={s.chart}></div>
      </div>
    </div>
  );
};

export default CurrencyTab;
