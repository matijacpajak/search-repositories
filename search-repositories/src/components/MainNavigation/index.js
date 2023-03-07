import { NavLink } from "react-router-dom";
import { tabs } from "../../tabs";

import "./style.css";

const MainNavigation = () => {
  return (
    <header>
      <nav className="Nav">
        {tabs.map((tab) => (
          <NavLink
            key={tab.id}
            to={tab.route}
            className={({ isActive }) =>
              isActive ? "NavLinkActive" : "NavLink"
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default MainNavigation;
