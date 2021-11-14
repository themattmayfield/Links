import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FiTrash } from "react-icons/fi";
import { useCard } from "@/utils/cardContext";
export default function Modal() {
  const { cardMode, removingModalHandler, removeCardHandler } = useCard();

  return (
    <>
      <Transition appear show={cardMode === "remove"} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => removingModalHandler(false)}
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
              <Dialog.Overlay className="fixed inset-0" />
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Delete this card?
                </Dialog.Title>

                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this card? This cannot be
                    undone.
                  </p>
                </div>
                <div className="flex w-full justify-between items-center space-x-2 mt-2">
                  <button
                    className="w-1/2 py-1.5 rounded focus:outline-none bg-black bg-opacity-50 text-white"
                    onClick={() => removingModalHandler(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="w-1/2 py-1.5 rounded focus:outline-none bg-red-600 text-white flex items-center justify-center"
                    onClick={() => removeCardHandler()}
                  >
                    <FiTrash className="w-4 h-4 mr-1.5" /> Delete
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
