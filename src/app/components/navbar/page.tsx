import { Separator } from "@/components/ui/separator";
import UserButton from "@/components/user-Button";
import { SessionProvider } from "next-auth/react";

const Navbar = () => {

  return (
    <div className="flex items-center justify-end bg-white px-4 py-3 sticky z-40 top-0 shadow-md overflow-x-auto  ">
      {/* Icons */}
      <div className="flex items-center">
        <SessionProvider>
          <UserButton />
        </SessionProvider>
        <Separator
          orientation="vertical"
          className="ml-2 mr-5 hidden md:inline-block"
        />
      </div>
    </div>
  );
};

export default Navbar;
