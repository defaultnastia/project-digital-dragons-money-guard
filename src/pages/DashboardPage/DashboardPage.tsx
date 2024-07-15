import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { selectUserData } from "../../redux/user/selectors";
import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import HomeTab from "../../components/HomeTab/HomeTab";
import StatisticsTab from "../../components/StatisticsTab/StatisticsTab";
import CurrencyTab from "../../components/CurrencyTab/CurrencyTab";

const DashboardPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });
  const user = useSelector(selectUserData);

  return (
    <div>
      <Header username={user.username} />
      <div>
        <Navigation />
        {/* <Balance /> */}
        <CurrencyTab />
      </div>
      <div>
        {/* {isDesktopOrLaptop && <div>Desktop content</div>}
        {isTablet && <div>Tablet content</div>}
        {isMobile && <div>Mobile content</div>} */}
        <HomeTab />
        <StatisticsTab />
        {isMobile && <CurrencyTab />}
      </div>
    </div>
  );
};

export default DashboardPage;
