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
    <div>
      {loading ? (
        <p className="flex items-center justify-center h-[214px] xl:h-[380px] w-[320px] md:w-[336px] xl:w-[480px]">
          Loading...
        </p>
      ) : error ? (
        <p className="flex items-center justify-center h-[214px] xl:h-[380px] w-[320px] md:w-[336px] xl:w-[480px]">
          Error fetching currency rates
        </p>
      ) : (
        <div className="flex-col w-[320px] md:w-[336px] xl:w-[480px] bg-[rgba(74,86,226,0.1)] rounded-br-[8px] rounded-bl-[8px] xl:rounded-none overflow-hidden mx-auto">
          <table className="text-[16px] w-full table-fixed xl:mb-[36px]">
            <thead className="text-[16px] bg-[rgba(255,255,255,0.20)] w-full">
              <tr>
                <th
                  className="pt-[12px] md:pt-[13px] xl:pt-[16px] pb-[12px] md:pb-[13px] xl:pb-[16px] pl-[20px] xl:pl-[96px]"
                  align="left"
                >
                  Currency
                </th>
                <th
                  className="pt-[12px] md:pt-[13px] xl:pt-[16px] pb-[12px] md:pb-[13px] xl:pb-[16px]"
                  align="center"
                >
                  Purchase
                </th>
                <th
                  className="pt-[12px] md:pt-[13px] xl:pt-[16px] pb-[12px] md:pb-[13px] xl:pb-[16px] pr-[20px] xl:pr-[96px]"
                  align="right"
                >
                  Sale
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-[8px] xl:h-[24px] bg-transparent"></tr>
              {currencyRates?.map((rate, index) => (
                <tr
                  key={index}
                  className={index === 1 ? s.noPaddingBottom : ""}
                >
                  <td
                    className={clsx(
                      "pb-[12px] xl:pb-[24px] pl-[20px] xl:pl-[96px]",
                      {
                        [s.noBottomPadding]: index === 1,
                      }
                    )}
                    align="left"
                  >
                    {getCurrencyName(rate.currencyCodeA)}
                  </td>
                  <td
                    className={clsx("pb-[12px] xl:pb-[24px]", {
                      [s.noBottomPadding]: index === 1,
                    })}
                    align="center"
                  >
                    {rate.rateBuy.toFixed(2)}
                  </td>
                  <td
                    className={clsx(
                      "pb-[12px] xl:pb-[24px] pr-[20px] xl:pr-[96px]",
                      {
                        [s.noBottomPadding]: index === 1,
                      }
                    )}
                    align="right"
                  >
                    {rate.rateSell.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="h-[97px] xl:h-[192px]">
            <div className={clsx("relative", s.chart)}>
              {currencyRates && currencyRates[0] && (
                <p className="hidden xl:block text-[#FF868D] text-[12px] absolute left-[47px] top-[12px]">
                  {currencyRates[0].rateBuy.toFixed(2)}
                </p>
              )}
              {currencyRates && currencyRates[1] && (
                <p className="hidden xl:block text-[#FF868D] text-[12px] absolute right-[96px] top-[-22px]">
                  {currencyRates[1].rateBuy.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyTab;
