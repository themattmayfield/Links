import { useState } from "react";
import { useAuth } from "@/utils/auth";
import _ from "lodash";
import {
  AuthError,
  AuthInput,
  AuthShowPassword,
  AuthSubmit,
} from "@/components/Auth/AuthPageUtils";
import Layout from "@/components/Layout";
import { PageContainer } from "@/components/pageUtils";
import Router from "next/router";

export default function AuthReset() {
  const { user, error, setError, emailAuthProv, passwordReset } = useAuth();

  const [oldPassword, setOldPassword] = useState("");
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();

    if (!oldPassword) {
      setError("Please enter current password");
      return true;
    }
    if (passwordOne !== passwordTwo) {
      setError("Password do not match");
      return true;
    }
    const credential = emailAuthProv(user?.email, oldPassword);
    passwordReset(credential, passwordOne);
  };

  return (
    <Layout>
      <PageContainer className="max-w-xl mx-auto">
        <form onSubmit={onSubmit}>
          <div className="space-y-6">
            <div className="flex items-center  text-successGreen">
              <button onClick={() => Router.push("/settings")}>Back</button>
            </div>
            <AuthInput
              title="Old Password"
              type={showPassword ? "text" : "password"}
              name="oldPassword"
              value={oldPassword}
              onChange={(event) => setOldPassword(event.target.value)}
              id="resetOldPassword"
            />
            <AuthInput
              title="New Password"
              type={showPassword ? "text" : "password"}
              name="passwordOne"
              value={passwordOne}
              onChange={(event) => setPasswordOne(event.target.value)}
              id="resetNewPassword1"
            />
            <AuthInput
              title="Confirm New Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={passwordTwo}
              onChange={(event) => setPasswordTwo(event.target.value)}
              id="resetNewPassword2"
            />
          </div>

          <div className="space-y-6 pt-4">
            <AuthShowPassword
              onClick={() => setShowPassword((prevState) => !prevState)}
              showPassword={showPassword}
            />

            <AuthSubmit
              title="Reset"
              disabled={!oldPassword || !passwordOne || !passwordTwo}
            />
            <AuthError error={error} />
          </div>
        </form>
      </PageContainer>
    </Layout>
  );
}
