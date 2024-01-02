
import "@/styles/globals.css";
import {use} from "react";


import Sidebar from "@src/app/components/layout/Sidebar";
import { getUser } from "@src/app/api/actions";

const DashboardLayout = ({ children, modal }: { children: React.ReactNode, modal: React.ReactNode }) => {
  const username = use(getUser());
  console.log(username)
  return (
    <Sidebar userName={username.name} userAvatar={username.avatar} userGithub={username.githubId} >{modal}{children}</Sidebar>
  );
};

export default DashboardLayout;
