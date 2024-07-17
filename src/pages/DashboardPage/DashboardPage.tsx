import { useMediaQuery } from "react-responsive";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import HomeTab from "../../components/HomeTab/HomeTab";
import StatisticsTab from "../../components/StatisticsTab/StatisticsTab";
import CurrencyTab from "../../components/CurrencyTab/CurrencyTab";
import Balance from "../../components/Balance/Balance";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useAppDispatch } from "../../redux/hooks";
import { getTransactionsCategories } from "../../redux/transactions/operations";
import s from "./DashboardPage.module.css";

const DashboardPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const [activeTab, setActiveTab] = useState<string>("home");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTransactionsCategories());
  }, [dispatch]);

  return (
    <div className="min-h-[100vh]">
      <Header />
      <div
        className={clsx(
          "flex",
          s.background,
          (isTablet && activeTab === "home") ||
            ((isMobile || isTablet) && activeTab === "currency") ||
            ((isMobile || isTablet) && activeTab === "statistics")
            ? s.height
            : "",
          isMobile && activeTab === "currency" && "px-0",
          { "": isDesktop },
          {
            "flex-col px-[32px]": isTablet,
          },
          { "flex-col px-[20px]": isMobile }
        )}
      >
        <div
          className={clsx(
            s.sidebar,
            "flex",
            {
              "flex-col gap-[32px] w-[480px] border-r-[1px] border-[rgba(255,255,255,0.6)] shadow-[1px_4px_1px_0_rgba(0,0,0,0.25)],":
                isDesktop,
            },
            {
              "flex-row gap-[32px] border-none shadow-none mb-[20px]": isTablet,
            },
            { "flex-col": isMobile }
          )}
        >
          <div
            className={clsx(
              {
                "flex flex-col gap-[28px] w-[336px]": isTablet,
              },
              { "flex flex-col gap-[28px]": isDesktop }
            )}
          >
            <Navigation setActiveTab={setActiveTab} activeTab={activeTab} />
            {(isDesktop || isTablet) && <Balance />}
          </div>
          {(isDesktop || isTablet) && (
            <div className="mt-auto">
              <CurrencyTab />
            </div>
          )}
        </div>
        <div
          className={clsx({
            "pl-[69px] pt-[46px] flex-1 pr-[16px] h-[100%]": isDesktop,
          })}
        >
          {activeTab === "home" && <HomeTab />}
          {activeTab === "statistics" && <StatisticsTab />}
          {isMobile && activeTab === "currency" && <CurrencyTab />}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
