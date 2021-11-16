import { useState } from "react";
import { useAuth } from "@/utils/auth";
import {
  AuthLayout,
  AuthInput,
  AuthSubmit,
  AuthInputContainer,
  AuthRedirect,
  AuthTitle,
} from "@/components/Auth/AuthPageUtils";
import Loading from "@/components/Loading";

export default function Login() {
  const { loading, signin, emailAuthProv } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    const credential = emailAuthProv(email, password);
    signin(credential);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <AuthLayout>
      <div>
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <AuthTitle title="Sign in to your account" />
      </div>
      <form className="mt-8 space-y-6" onSubmit={onSubmit}>
        <input type="hidden" name="remember" defaultValue="true" />
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
            bottom
            required
            placeholder="Password"
          />
        </AuthInputContainer>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-trustBlue focus:ring-trustBlue border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>

          <AuthRedirect text="Forgot your password?" link="/forgot" />
        </div>

        <AuthSubmit title="Login" disabled={!email || !password} />
        <div className="flex items-center justify-center">
          <AuthRedirect
            text={
              <p className="font-medium text-trustBlue hover:text-trustBlue cursor-pointer">
                Don't have an account?{" "}
                <span className="font-bold hover:text-black">Sign up</span>
              </p>
            }
            link="/register"
          />
        </div>
      </form>
    </AuthLayout>
  );
}
