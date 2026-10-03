"use client";

import SideBar from "@/template/Profile/SideBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Container from "components/layout/Container";
import AuthProvider from "components/partials/providers/AuthProvider";

const queryClient = new QueryClient();

function ProfileLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Container className="pb-10.25 border-b border-b-[#00000040] lg:flex  lg:gap-8 lg:pb-39.25">
          <SideBar className="mb-5.75  border-b border-b-[#00000040] lg:border-none" />
          <div className="lg:w-full">{children}</div>
        </Container>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default ProfileLayout;
