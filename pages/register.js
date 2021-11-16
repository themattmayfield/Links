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
import { Toast } from "@/components/pageUtils";

export default function Register() {
  const { signup } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    if (password !== passwordTwo) {
      Toast("error", "Password do not match");
      return true;
    }

    signup(email, password);
  };

  return (
    <AuthLayout>
      <div>
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <AuthTitle title="Create Account" />
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
            top
            required
            htmlFor="email-address"
            placeholder="Email address"
          />
          <AuthInput
            title="Password"
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            id="password"
            required
            placeholder="Password"
          />
          <AuthInput
            title="Confirm Password"
            type="password"
            name="password2"
            bottom
            value={passwordTwo}
            onChange={(event) => setPasswordTwo(event.target.value)}
            id="password2"
            bottom
            required
            placeholder="Confirm Password"
          />
        </AuthInputContainer>

        <AuthSubmit
          title="Sign Up"
          disabled={!email || !password || !passwordTwo}
        />
        <div className="flex items-center justify-center">
          <AuthRedirect
            text={
              <p className="font-medium text-trustBlue hover:text-trustBlue cursor-pointer">
                Already have an account?{" "}
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
