import Link from "next/link";
import { useAuth } from "@/utils/auth";
import { errorCodes } from "@/utils/errorCodes";

export const AuthError = ({ error }) => {
  const { sendVerificationEmail } = useAuth();
  // console.log(authUser);
  return (
    <div className="flex flex-col items-center space-y-3 justify-center">
      <p className="text-negativeRed text-center">{error}</p>
      {errorCodes["auth/account-not-verified"] == error && (
        // {error == "You have not verified your account." && (
        <button
          onClick={() => sendVerificationEmail()}
          className="bg-successGreen text-white px-2 py-1"
        >
          Resend Link
        </button>
      )}
    </div>
  );
};

export const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="sm:max-w-2xl m-auto w-full">{children}</div>
    </div>
  );
};

export const AuthTitle = ({ title }) => (
  <div className="flex items-center justify-center pt-16 pb-8">
    <p className="font-medium text-2xl">{title}</p>
  </div>
);

export const AuthInputContainer = ({ children }) => (
  <div className="px-8 space-y-6">{children}</div>
);

export const AuthInput = (props) => (
  <div>
    <p className="text-disabledGrey text-sm">{props.title}</p>
    <input {...props} className="border rounded w-full h-9 px-2" />
  </div>
);

export const AuthShowPassword = ({ onClick, showPassword }) => (
  <div className="flex items-center space-x-2">
    <p className="text-disabledGrey text-xs">Show Password</p>
    <div
      className={`${
        showPassword ? "bg-successGreen" : "bg-transparent"
      } border border-successGreen h-3.5 w-3.5 cursor-pointer`}
      type="checkbox"
      onClick={onClick}
    />
  </div>
);

export const AuthSubmit = ({ title, disabled }) => (
  <button
    disabled={disabled}
    className={`bg-successGreen rounded w-full text-center text-white h-12 ${
      disabled && "bg-disabledGrey cursor-not-allowed"
    } `}
  >
    {title}
  </button>
);

export const AuthRedirect = ({ text, link, linkText }) => (
  <p className="text-center text-sm text-disabledGrey">
    {text}
    <Link href={link} className="text-successGreen">
      <a className="text-successGreen"> {linkText}</a>
    </Link>
  </p>
);
