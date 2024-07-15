import { NavLink } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Navigation = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/statistics">Statistics</NavLink>
        </li>
        {isMobile && (
          <li>
            <NavLink to="/currency">Currency</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
