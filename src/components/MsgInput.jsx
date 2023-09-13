import React, { useContext, useState } from "react";
import { MdSend, MdDelete } from "react-icons/md";
import { BiImageAdd } from "react-icons/bi";
import { BsEmojiSunglasses } from "react-icons/bs";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { toast } from "react-toastify";
import Picker from "emoji-picker-react";

const MsgInput = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (file) {
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              file: downloadURL,
            }),
          });
        });
      });
      setText("");
    } else if (text.trim() !== "") {
      // Set the "messages" field of the chats 'chatId'
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
      setText("");
    } else {
      toast.error("Please write a message first!");
      return;
    }

    // last msg for sidebar
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    
    setShowEmoji(false);
    setFile(null);
  };

  return (
    <section className="h-14 w-[100%] absolute bottom-0 flex justify-between items-center">
      <div
        onKeyDown={(e) => {
          e.code === "Enter" && handleSend();
        }}
        className="bg-white flex items-center justify-between mx-3 w-full rounded-full border-[1px] border-gray-400 p-2"
      >
        {showEmoji && (
          <div className="absolute bottom-[100%] left-1 md:left-auto mr-5">
            <Picker
              onEmojiClick={(emojiObject)=> setText((prev)=> prev + emojiObject.emoji)}
            />
          </div>
        )}
        <span>
          <BsEmojiSunglasses
            onClick={() => {
              setShowEmoji(!showEmoji);
            }}
            className={`ml-1 cursor-pointer ${
              showEmoji ? "text-main" : "text-gray-400"
            }`}
            size={25}
          />
        </span>
        <input
          type="text"
          placeholder="Type something..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="w-full mx-3 outline-none"
        />
      </div>

      {file ? (
        <div>
          <MdDelete
            size={38}
            onClick={() => {
              setFile(null);
            }}
            className="text-2xl mr-2 -ml-1 cursor-pointer text-red-500"
          />
        </div>
      ) : (
        <div>
          <input
            type="file"
            name=""
            id="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <label htmlFor="file">
            <BiImageAdd
              size={38}
              className="text-2xl mr-2 cursor-pointer text-gray-500"
            />
          </label>
        </div>
      )}

      <button
        type="button"
        onClick={handleSend}
        className="bg-main text-white px-3 py-1.5 text-[25px] rounded-md mr-3"
      >
        <MdSend />
      </button>
    </section>
  );
};

export default MsgInput;
