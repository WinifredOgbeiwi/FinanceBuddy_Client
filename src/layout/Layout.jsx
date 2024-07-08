import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { PATH } from "../constants/util";

const Layout = () => {
  const location = useLocation();
  const isSettingsPage = location.pathname === PATH.SETTINGS;
  return (
    <div className="flex ">
      <section className="sidebar-bg w-[70px] md:w-[20%] min-h-screen p-2 bg-main ">
        <Sidebar />

      </section>
      <section className=" w-full  bg-gray pl-4">
        {!isSettingsPage && <Navbar />}
        <Outlet />
      </section>
    </div>
  );
};

export default Layout;
