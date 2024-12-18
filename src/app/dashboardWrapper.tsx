"use client";
import Navbar from "./components/navbar/page";
import Sidebar from "./components/sidebar/page";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      {/* sidebar */}
      <div className="w-[310px]">
        <Sidebar />
      </div>
      <main className={"flex w-full flex-col bg-gray-50"}>
        {/*navbar*/}
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
      <DashboardLayout>{children}</DashboardLayout>
  );
};

export default DashboardWrapper;
