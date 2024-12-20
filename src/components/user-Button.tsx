import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const UserButton = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const avatarFallback = session?.user?.name?.charAt(0).toUpperCase();
  const handleSignOut = async () => {
    await signOut({
      redirect: false,
    });
    router.push("/");
  };

  return (
    <nav>
      {session ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="outline-none relative float-right p-4">
            <div className="flex gap-4 items-center">
              <span>{session.user?.name}</span>
              <Avatar className="size-10 hover:opacity-75 transition">
                <AvatarImage
                  className="size-10 hover:opacity-75 transition"
                  src={session.user?.image || undefined}
                />
                <AvatarFallback className="bg-sky-900 text-white">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" side="bottom" className="w-50">
            <DropdownMenuItem className="h-10" onClick={() => handleSignOut()}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex justify-end p-4 gap-4">
          <Button>
            <Link href="sign-in">Sign in</Link>
          </Button>
          <Button>
            <Link href="sign-up">Sign up</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default UserButton;
