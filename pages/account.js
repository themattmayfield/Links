import Layout from "@/components/Layout";
import { useState, useEffect } from "react";
import Router from "next/router";
// import { TrustButton } from "@/components/pageUtils";
import _ from "lodash";
import { useAuth } from "@/utils/auth";
import { FaInfinity } from "react-icons/fa";
import { goToBillingPortal, createCheckoutSession } from "@/utils/db";

export default function Settings() {
  const { user, signout } = useAuth();

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  return (
    <Layout>
      <div className="max-w-[650px] mx-auto w-full px-6">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-12 ">
          <div className="flex items-center justify-between px-6 bg-[#F7FAFC] py-5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            <p>Account</p>
            <span className="inline-block rounded bg-[#ceedff] p-0.5 text-[#153f75] font-bold">
              {user?.stripeRole}
            </span>
          </div>
          <div className="px-6 py-6 bg-white ">
            <div className="flex items-center justify-between mb-6">
              <Stats title="Themes" info="Unlimited Themes" />
              <Stats title="Themes" info="Unlimited Themes" />
              <div></div>
            </div>
            <p className="text-base font-light mb-8">
              Dangle uses Stripe to update, change, or cancel your account. You
              can also update card information and billing addresses through the
              secure portal.
            </p>
            <div className="flex items-center justify-end space-x-6">
              <p onClick={() => signout()} className="text-base cursor-pointer">
                Log Out
              </p>
              <button
                disabled={buttonDisabled}
                onClick={() => {
                  setLoading(true);
                  user?.stripeRole === "Pro"
                    ? goToBillingPortal(user)
                    : createCheckoutSession(user);
                  setLoading(false);
                }}
                className={`px-4 py-2 rounded-lg shadow-sm focus:outline-none text-white text-sm flex items-center justify-center bg-trustBlue h-10`}
              >
                {user?.stripeRole === "Pro"
                  ? "Manage Billing"
                  : "Upgrade to Pro"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const Stats = ({ title, info }) => (
  <div className="flex flex-col space-y-2">
    <p className="font-medium">{title}</p>
    <FaInfinity className="text-xl" />
    <p className="text-gray-500">{info}</p>
  </div>
);
