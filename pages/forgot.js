import { useState } from "react";
import { useAuth } from "@/utils/auth";
import _ from "lodash";
import {
  AuthError,
  AuthLayout,
  AuthInput,
  AuthSubmit,
  AuthInputContainer,
  AuthTitle,
  AuthRedirect,
} from "@/components/Auth/AuthPageUtils";

export default function AuthForgot() {
  const auth = useAuth();

  const [email, setEmail] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    if (email) {
      auth.sendPasswordReset(email);
    } else auth.setError("Please enter email");
  };
  return (
    <AuthLayout>
      <form onSubmit={onSubmit}>
        <AuthTitle title="Forgot Passsword" />
        <AuthInputContainer>
          <AuthInput
            title="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            name="email"
            id="forgotPasswordEmail"
          />
        </AuthInputContainer>
        <div className="px-8 space-y-6 pt-4">
          <AuthSubmit title="Send Reset Link" disabled={!email} />
          <AuthError error={auth.error} />
          <AuthRedirect text="Remembered?" link="/" linkText="Login" />
        </div>
      </form>
    </AuthLayout>
  );
}
