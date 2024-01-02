
import "@/styles/globals.css";
import React, { use } from "react";


import Sidebar from "@src/app/components/layout/Sidebar";
import { getUser } from "@src/app/api/actions";

const DashboardLayout = ({ children, modal, roomMembers }: { children: React.ReactNode, modal: React.ReactNode, roomMembers: React.ReactNode }) => {
  const username = use(getUser());
  console.log(username)
  return (
    <Sidebar userName={username.name} userAvatar={username.avatar} userGithub={username.githubId} roomMembers={roomMembers}> {modal} {children}
    </Sidebar>
  );
};

export default DashboardLayout;
