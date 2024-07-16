<<<<<<< HEAD
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
      <div className="flex bg-custom-svg bg-[523B7E]">
        <div
          className={clsx(
            "flex",
            { "flex-col gap-[32px]": isDesktop },
            { "grid grid-cols-3 gap-[28px]": isTablet },
            " w-[480px] border-r-[1px] border-[rgba(255,255,255,0.6)] shadow-[1px_4px_1px_0_rgba(0,0,0,0.25)]"
          )}
        >
          <Navigation setActiveTab={setActiveTab} activeTab={activeTab} />
          <Balance />
          <CurrencyTab />
        </div>
        <div>
          {activeTab === "home" && <HomeTab />}
          {activeTab === "statistics" && <StatisticsTab />}
          {isMobile && <CurrencyTab />}
        </div>
      </div>
    </div>
=======
import TransactionsTab from "../../components/TransactionsTab/TransactionsTab";

const DashboardPage = () => {
  return (
    <>
      <div className="text-3xl font-bold underline">DashboardPage</div>

      {/* Uncomment the code below for testing */}
      {/* <TransactionsTab /> */}
      {/* End of comment */}
    </>
>>>>>>> main
  );
};

export default DashboardPage;
