import { useState } from "react";
import { useAuth } from "@/utils/auth";
import _ from "lodash";
import {
  AuthError,
  AuthLayout,
  AuthInput,
  AuthShowPassword,
  AuthSubmit,
  AuthInputContainer,
  AuthTitle,
  AuthRedirect,
} from "@/components/Auth/AuthPageUtils";

export default function Register() {
  const { setError, error, signup } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();

    if (password !== passwordTwo) {
      setError("Password do not match");
      return true;
    }

    signup(email, password);
  };

  return (
    <AuthLayout>
      <form onSubmit={onSubmit}>
        <AuthTitle title="Register" />
        <AuthInputContainer>
          <AuthInput
            title="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            name="email"
            id="signUpEmail"
          />
          <AuthInput
            title="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            id="signUpPassword"
          />
          <AuthInput
            title="Confirm Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={passwordTwo}
            onChange={(event) => setPasswordTwo(event.target.value)}
            id="signUpPassword2"
          />
        </AuthInputContainer>
        <div className="px-8 space-y-6 pt-4">
          <AuthShowPassword
            onClick={() => setShowPassword((prevState) => !prevState)}
            showPassword={showPassword}
          />

          <AuthSubmit
            title="Create Account"
            disabled={!email || !password || !passwordTwo}
          />
          <AuthError error={error} />
          <AuthRedirect
            text="Already have an account?"
            link="/"
            linkText="Login"
          />
        </div>
      </form>
    </AuthLayout>
  );
}
