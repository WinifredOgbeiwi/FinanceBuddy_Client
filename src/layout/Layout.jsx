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
      <section className="bg-main w-[70px] md:w-[27%] min-h-screen p-2">
        <Sidebar />
      </section>
      <section className=" w-full bg-[#f0f8f4]">
        {!isSettingsPage && <Navbar />}
        <Outlet />
      </section>
    </div>
  );
};

export default Layout;
