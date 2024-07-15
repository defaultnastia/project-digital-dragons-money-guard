import React, { useEffect, useState } from "react";
import { CurrencyRate, getCurrencyRates } from "../../services/monobankApi";

const CurrencyTab: React.FC = () => {
  const [currencyRates, setCurrencyRates] = useState<CurrencyRate[] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const rates = await getCurrencyRates();
        if (rates) {
          setCurrencyRates(rates);
        } else {
          setError("Unable to fetch currency rates");
        }
      } catch (error) {
        setError("Error fetching currency rates");
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
    <div className="flex-col w-full md:w-[336px] xl:w-full bg-[rgba(74,86,226,0.10)]">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table className="text-[16px] w-full pl-[20px] pr-[20px] flex-col">
          <thead className="text-[16px] bg-[rgba(255,255,255,0.20)] w-full">
            <tr>
              <th scope="col" className="pt-[13px] pb-[13px]">
                Currency
              </th>
              <th scope="col" className="pt-[13px] pb-[13px]">
                Purchase
              </th>
              <th scope="col" className="pt-[13px] pb-[13px]">
                Sale
              </th>
            </tr>
          </thead>
          <tbody className="flex-col">
            {currencyRates?.map((rate, index) => (
              <tr key={index}>
                <td className="">{getCurrencyName(rate.currencyCodeA)}</td>
                <td className="">{rate.rateBuy}</td>
                <td className="">{rate.rateSell}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        <img src="" alt="graph" className="w-[100%]" />
      </div>
    </div>
  );
};

export default CurrencyTab;
