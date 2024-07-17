import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Icon } from "../Icon/Icon";
import s from "./Navigation.module.css";
import clsx from "clsx";

interface NavigationProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
}

const Navigation: React.FC<NavigationProps> = ({ setActiveTab, activeTab }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <nav>
      <ul
        className={clsx(
          {
            "pt-[40px] pl-[16px]": isDesktop || isTablet,
          },
          { "flex flex-row gap-[32px] justify-center py-[12px]": isMobile }
        )}
      >
        <li
          onClick={() => setActiveTab("home")}
          className={clsx(activeTab === "home" && s.active, s.defaultLink)}
        >
          <Icon
            name="home"
            size={24}
            className={clsx({ "size-[44px]": isMobile })}
          />
          <NavLink
            to="/dashboard/home"
            className={clsx({
              "text-[18px] ml-[20px] mb-[12px]": isDesktop || isTablet,
            })}
          >
            {(isDesktop || isTablet) && "Home"}
          </NavLink>
        </li>
        <li
          className={clsx(
            activeTab === "statistics" && s.active,
            s.defaultLink
          )}
          onClick={() => setActiveTab("statistics")}
        >
          <Icon
            name="timeline"
            size={24}
            className={clsx({ "size-[44px]": isMobile })}
          />
          <NavLink
            to="/dashboard/statistics"
            className={clsx({
              "text-[18px] ml-[20px]": isDesktop || isTablet,
            })}
          >
            {(isDesktop || isTablet) && "Statistics"}
          </NavLink>
        </li>
        {isMobile && (
          <li
            className={clsx(
              activeTab === "currency" && s.active,
              s.defaultLink
            )}
            onClick={() => setActiveTab("currency")}
          >
            <NavLink to="/dashboard/currency">
              <Icon name="home" size={44} />
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
