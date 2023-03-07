import { Outlet } from "react-router-dom";
import MainNavigation from "../../components/MainNavigation";
import "./style.css";

const RootLayout = () => {
  return (
    <div className="RootLayout">
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
