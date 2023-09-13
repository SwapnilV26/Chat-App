import React, { useContext } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ChatContext } from "../context/ChatContext";

const DeleteModal = ({ handleClose }) => {
  const { data } = useContext(ChatContext);
  const handleClearChat = async () => {
    await updateDoc(doc(db, "chats", data.chatId), {
      messages: [],
    });
    handleClose();
  };
  return (
    // <div className="h-[93%] flex justify-center items-center bg-transparent">
    <div className="bg-white w-80 rounded-md shadow-lg py-6 px-4">
      <h3 className="font-semibold text-xl">Are you sure ?</h3>
      <p className="text-gray-700 text-sm">
        Message will be deleted permanately but contact will remain in your chat
        list
      </p>
      <div className="inline-flex justify-end w-full text-sm mt-6">
        <button
          type="button"
          onClick={handleClose}
          className="text-indigo-600 border border-main shadow-md hover:bg-indigo-50 shadow-indigo-500/50 font-medium rounded-md px-5 py-1.5 mr-2"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleClearChat}
          className="text-white bg-gradient-to-r from-main via-indigo-600 to-indigo-700 hover:bg-gradient-to-br shadow-md shadow-indigo-500/50 font-medium rounded-md px-5 py-1.5"
        >
          Delete
        </button>
      </div>
    </div>
    // </div>
  );
};

export default DeleteModal;
