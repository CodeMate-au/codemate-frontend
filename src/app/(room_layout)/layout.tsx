"use client";
import "@/styles/globals.css";

import Sidebar from "../components/layout/Sidebar";


const DashboardLayout = ({ children , username}: { children: React.ReactNode; }) => {

  return (
    <Sidebar children={children}></Sidebar>
  );
};

export default DashboardLayout;
