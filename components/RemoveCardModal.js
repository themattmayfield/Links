import React from "react";
import Modal from "./Modal";
import { FiTrash } from "react-icons/fi";
import { useCard } from "@/utils/cardContext";

function RemoveCardModal({ removeCardHandler }) {
  const { cardMode, removingModalHandler } = useCard();

  return (
    <Modal
      visible={cardMode === "remove"}
      closeModal={() => removingModalHandler(false)}
      title={"Delete this card?"}
      desc="Are you sure you want to delete this card? This cannot be undone."
    >
      <div className="flex w-full justify-between items-center space-x-2 mt-2">
        <button
          className="w-1/2 py-1.5 rounded focus:outline-none bg-black bg-opacity-50 text-white"
          onClick={() => removingModalHandler(false)}
        >
          Cancel
        </button>
        <button
          className="w-1/2 py-1.5 rounded focus:outline-none bg-red-600 text-white flex items-center justify-center"
          onClick={removeCardHandler}
        >
          <FiTrash className="w-4 h-4 mr-1.5" /> Delete
        </button>
      </div>
    </Modal>
  );
}

export default RemoveCardModal;
