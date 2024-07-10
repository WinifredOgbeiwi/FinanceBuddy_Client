import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { PATH } from "../constants/util";

const Layout = () => {
  const location = useLocation();
  const isSettingsPage = location.pathname === PATH.SETTINGS;
  return (
    <div className="flex h-screen">
        <section className="w-16 md:w-48 pl-4 pt-3 bg-main text-white fixed h-full">
        <Sidebar />

      </section>
      <section className="ml-16 md:ml-48 w-full overflow-auto">
        {!isSettingsPage && <Navbar />}
        <Outlet />
      </section>
    </div>
  );
};

export default Layout;
