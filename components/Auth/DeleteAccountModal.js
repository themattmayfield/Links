import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { AuthInput, AuthError, AuthShowPassword } from "./AuthPageUtils";
import { CgSpinner } from "react-icons/cg";
import { useAuth } from "@/utils/auth";

const DeleteAccountModal = ({ deleteModalIsOpen, deleteModalHandler }) => {
  const { user, error, setError, deleteAccount, emailAuthProv } = useAuth();

  const [disableDeleteButton, setDisableDeleteButton] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const permanentlyDeleteAccountHandler = () => {
    setDisableDeleteButton(true);
    if (!password) {
      setError("Enter password to delete account");
      setDisableDeleteButton(false);
      return true;
    }
    const credential = emailAuthProv(user?.email, password);
    setPassword("");
    deleteAccount(credential);
  };

  return (
    <Transition appear show={deleteModalIsOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={deleteModalHandler}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-opacity-60 bg-black opacity-70" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-lightBackgroundColor shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Delete Account?
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this account? This cannot be
                  undone!
                </p>
              </div>
              <div className="pt-2">
                <AuthInput
                  title="Password"
                  type={showPassword ? "text" : "password"}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  id="password"
                />
                <AuthError error={error} />
              </div>
              <div className="pt-2">
                <AuthShowPassword
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  showPassword={showPassword}
                />
              </div>
              <div className="mt-4 sm:flex items-center sm:justify-end sm:space-x-2 space-y-2 sm:space-y-0">
                <div>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center px-4 py-2 text-sm font-medium text-white bg-successGreen border border-transparent rounded-md hover:bg-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={deleteModalHandler}
                  >
                    Cancel
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    disabled={disableDeleteButton}
                    className="flex items-center w-full justify-center px-4 py-2 text-sm font-medium text-white bg-negativeRed border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={permanentlyDeleteAccountHandler}
                  >
                    {disableDeleteButton && !error && (
                      <CgSpinner className="text-lg animate-spin mr-1" />
                    )}
                    Permanently Delete Account
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteAccountModal;
