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
    query: "(min-width: 768px) and (max-width: 1279px)",
  });
  const isDesktop = useMediaQuery({ query: "(min-width: 1280px)" });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

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
        <li>
          <NavLink
            onClick={() => handleTabChange("home")}
            to="/dashboard/home"
            className={clsx(
              {
                "text-[18px] mb-[12px]": isDesktop || isTablet,
              },
              activeTab === "home" && s.active,
              s.defaultLink
            )}
          >
            <Icon
              name="home"
              size={24}
              fill="#6D54EB"
              className={clsx(
                { "size-[44px]": isMobile },
                "bg-[rgba(255,255,255,0.6)] rounded-[8px]"
              )}
            />
            {(isDesktop || isTablet) && "Home"}
          </NavLink>
        </li>
        <li onClick={() => handleTabChange("statistics")}>
          <NavLink
            to="/dashboard/statistics"
            className={clsx(
              {
                "text-[18px]": isDesktop || isTablet,
              },
              activeTab === "statistics" && s.active,
              s.defaultLink
            )}
          >
            <Icon
              name="timeline"
              size={24}
              fill="#6D54EB"
              className={clsx(
                { "size-[44px]": isMobile },
                "bg-[rgba(255,255,255,0.6)] rounded-[8px]"
              )}
            />
            {(isDesktop || isTablet) && "Statistics"}
          </NavLink>
        </li>
        {isMobile && (
          <li
            className={clsx(
              activeTab === "currency" && s.active,
              s.defaultLink
            )}
            onClick={() => handleTabChange("currency")}
          >
            <NavLink to="/dashboard/currency">
              <Icon
                name="dollar"
                size={44}
                fill="#6D54EB"
                className="bg-[rgba(255,255,255,0.6)] rounded-[8px]"
              />
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
