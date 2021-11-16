import { useState } from "react";
import { useAuth } from "@/utils/auth";
import _ from "lodash";
import {
  AuthLayout,
  AuthInput,
  AuthSubmit,
  AuthInputContainer,
  AuthRedirect,
  AuthTitle,
} from "@/components/Auth/AuthPageUtils";

export default function AuthForgot() {
  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    if (email) {
      forgotPassword(email);
    }
  };
  return (
    <AuthLayout>
      <div>
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <AuthTitle title="Forgot Password" />
      </div>
      <form className="mt-8 space-y-6" onSubmit={onSubmit}>
        <AuthInputContainer>
          <AuthInput
            title="Email"
            name="email"
            type="email"
            value={email}
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            id="email-address"
            required
            htmlFor="email-address"
            placeholder="Email address"
            single
          />
        </AuthInputContainer>

        <AuthSubmit title="Send Reset Link" disabled={!email} />
        <div className="flex items-center justify-center">
          <AuthRedirect
            text={
              <p className="font-medium text-trustBlue hover:text-trustBlue cursor-pointer">
                Remember your password?{" "}
                <span className="font-bold hover:text-black">Login</span>
              </p>
            }
            link="/login"
          />
        </div>
      </form>
    </AuthLayout>
  );
}
