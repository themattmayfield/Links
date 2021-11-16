import Link from "next/link";
import { useAuth } from "@/utils/auth";
import Router from "next/router";
import { LockClosedIcon } from "@heroicons/react/solid";
import _ from "lodash";
import { classNames } from "@/components/pageUtils";

export const AuthLayout = ({ children }) => {
  const { authUser } = useAuth();
  if (authUser) {
    Router.push("/");
    return true;
  }
  return (
    <div className="flex h-screen m-auto w-full">
      <div className="m-auto w-full">
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export const AuthTitle = ({ title }) => (
  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
    {title}
  </h2>
);

export const AuthInputContainer = ({ children }) => (
  <div className="rounded-md shadow-sm -space-y-px">{children}</div>
);

export const AuthInput = (props) => {
  const omitPosition = _.omit(props, ["bottom", "top", "single"]);
  return (
    <div>
      <label htmlFor={props.for} className="sr-only">
        {props.title}
      </label>
      <input
        {...omitPosition}
        className={classNames(
          "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-trustBlue focus:border-trustBlue focus:z-10 sm:text-sm",
          props?.top ? "rounded-t-md" : "",
          props?.bottom ? "rounded-b-md" : "",
          props?.single ? "rounded-b-md rounded-t-md" : ""
        )}
      />
    </div>
  );
};

export const AuthSubmit = ({ title, disabled }) => (
  <div>
    <button
      type="submit"
      disabled={disabled}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-trustBlue hover:bg-trustBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-trustBlue"
    >
      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
        <LockClosedIcon
          className="h-5 w-5 text-trustBlue group-hover:text-indigo-400"
          aria-hidden="true"
        />
      </span>
      {title}
    </button>
  </div>
);

export const AuthRedirect = ({ link, text }) => (
  <div className="text-sm">
    <Link
      href={link}
      className="font-medium text-trustBlue hover:text-trustBlue cursor:pointer"
    >
      {text}
    </Link>
  </div>
);
