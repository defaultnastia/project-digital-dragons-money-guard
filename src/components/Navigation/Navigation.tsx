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
    <div className="">
      <nav>
        <ul className="pt-[40px] pl-[16px]">
          <li
            onClick={() => setActiveTab("home")}
            className={clsx(activeTab === "home" && s.active, s.defaultLink)}
          >
            <Icon name="home" size={24} fill="rgba(255,255,255,0.4)" />
            <NavLink
              to="/dashboard/home"
              className="text-[18px] ml-[20px] mb-[12px]"
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
            <Icon name="timeline" size={24} fill="rgba(255,255,255,0.4)" />
            <NavLink
              to="/dashboard/statistics"
              className="text-[18px] ml-[20px]"
            >
              {(isDesktop || isTablet) && "Statistics"}
            </NavLink>
          </li>
          {isMobile && (
            <li>
              <NavLink to="/currency">
                <Icon name="" size={24} fill="rgba(255,255,255,0.4)" />
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
