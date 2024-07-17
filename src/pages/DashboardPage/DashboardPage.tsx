import { useMediaQuery } from "react-responsive";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import HomeTab from "../../components/HomeTab/HomeTab";
import StatisticsTab from "../../components/StatisticsTab/StatisticsTab";
import CurrencyTab from "../../components/CurrencyTab/CurrencyTab";
import Balance from "../../components/Balance/Balance";
import { useState } from "react";
import clsx from "clsx";

const DashboardPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const [activeTab, setActiveTab] = useState<string>("home");

  return (
    <div>
      <Header />
      <div
        className={clsx(
          "flex bg-custom-svg bg-[523B7E]",
          { "px-[32px]": isDesktop },
          {
            "flex-col": isTablet,
          },
          { "flex-col px-[20px]": isMobile }
        )}
      >
        <div
          className={clsx(
            "flex",
            {
              "flex-col gap-[32px] w-[480px] border-r-[1px] border-[rgba(255,255,255,0.6)] shadow-[1px_4px_1px_0_rgba(0,0,0,0.25)]":
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
          {(isDesktop || isTablet) && <CurrencyTab />}
        </div>
        <div>
          {activeTab === "home" && <HomeTab />}
          {activeTab === "statistics" && <StatisticsTab />}
          {isMobile && activeTab === "currency" && <CurrencyTab />}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
