import Link from "next/link";
import { useAuth } from "@/utils/auth";
import { createCheckoutSession } from "@/utils/db";

function Header() {
  const { authUser, signout, user } = useAuth();

  const navItems = [
    {
      id: "0",
      label: "Links",
    },
    {
      id: "1",
      label: "Themes",
    },
    // {
    //   id: "2",
    //   label: "Settings",
    // },
    {
      id: "3",
      label: "PRO",
      link: () => createCheckoutSession(user),
    },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="border-t-[5px] border-trustBlue" />
      <div className="px-8 2xl:px-0  max-w-6xl mx-auto flex items-center justify-between h-[60px] -mb-px">
        {/* Header: Left side */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          {/* Logo */}
          <Link exact href="/">
            <div className="w-7 h-7 mr-2 rounded-full bg-trustBlue cursor-pointer" />
          </Link>
          {navItems.map((item) => (
            <p
              onClick={() => item.link()}
              key={item.id}
              className="text-base font-light hover:underline text-black cursor-pointer"
            >
              {item.label}
            </p>
          ))}
        </div>
        {/* Header: Right side */}
        {/* Default */}
        {/* <Link exact href="/account"> */}
        <div className="text-black cursor-pointer">
          <div
            onClick={() => signout()}
            className="xs:hidden w-7 h-7 mr-2 rounded-full bg-trustBlue cursor-pointer grid place-items-center text-white"
          >
            {authUser?.email[0]}
          </div>
          <p onClick={() => signout()} className="text-xs hidden xs:block">
            {authUser?.email}
          </p>
        </div>
        {/* </Link> */}
      </div>
    </header>
  );
}

export default Header;
