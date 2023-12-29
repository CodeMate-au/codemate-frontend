import "@/styles/globals.css";

import Sidebar from "@src/app/components/layout/Sidebar";


const DashboardLayout = ({ children, modal }: { children: React.ReactNode, modal: React.ReactNode }) => {

  return (
    <Sidebar>{modal}{children}</Sidebar>
  );
};

export default DashboardLayout;
