import Link from "next/link";
import { useAuth } from "@/utils/auth";
import { createCheckoutSession } from "@/utils/db";
import Router from "next/router";

function Header() {
  const { authUser, user } = useAuth();

  const navItems = [
    {
      key: "0",
      id: "0",
      label: "Links",
      link: () => Router.push("/"),
    },
    {
      key: "1",
      id: "1",
      label: "Themes",
      link: () => Router.push("/themes"),
    },
    // {
    //   id: "2",
    //   label: "Settings",
    // },
    user?.stripeRole != "Pro" && {
      key: "3",
      id: "3",
      label: "PRO",
      link: () => createCheckoutSession(user),
    },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="border-t-[5px] border-trustBlue" />
      <div className="px-4 2xl:px-0  max-w-6xl mx-auto flex items-center justify-between h-[60px] -mb-px">
        {/* Header: Left side */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          {/* Logo */}
          <Link exact href="/">
            <div className="w-7 h-7 rounded-full bg-trustBlue cursor-pointer" />
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
            onClick={() => Router.push("/account")}
            className="xs:hidden w-7 h-7 rounded-full bg-trustBlue cursor-pointer grid place-items-center text-white"
          >
            {authUser?.email[0]}
          </div>
          <p
            onClick={() => Router.push("/account")}
            className="text-xs hidden xs:block"
          >
            {authUser?.email}
          </p>
        </div>
        {/* </Link> */}
      </div>
    </header>
  );
}

export default Header;
