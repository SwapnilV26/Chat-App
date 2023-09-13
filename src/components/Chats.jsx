import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import ProfilePic from "../assets/Profile Icon.png";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser, setShow } = useContext(AuthContext);
  const { data, dispatch, setSelected } = useContext(ChatContext);
 
  useEffect(() => {
    const getChats = () => {
      // firebase functions to get realtime chat
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => unsub();
    };

    // if there is user then get chats
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
    setShow(false);
    setSelected(true);
  };

  return (
    <>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            key={chat[0]}
            onClick={() => handleSelect(chat[1]?.userInfo)}
            className={`border-b-[1px] group border-slate-300 flex items-center gap-2 pl-3 py-1.5 cursor-pointer hover:bg-side ${
              data.chatId === chat[0] && "bg-side"
            }`}
          >
            <img
              src={
                chat[1]?.userInfo?.photoURL
                  ? chat[1]?.userInfo?.photoURL
                  : ProfilePic
              }
              className={`rounded-full w-12 h-12 border-2 group-hover:border-white object-cover ${
                data.chatId === chat[0] ? "bg-side" : "border-side"
              }`}
              alt=""
            />
            <div className="h-12 overflow-hidden">
              <span
                className={`text-lg  font-medium group-hover:text-white ${
                  data.chatId === chat[0] ? "text-white" : "text-gray-900"
                }`}
              >
                {chat[1]?.userInfo?.displayName}
              </span>
              <p
                className={`text-sm group-hover:text-gray-200 line-clamp-1 ${
                  data.chatId === chat[0] ? "text-gray-200" : "text-gray-500"
                }`}
              >
                {chat[1].lastMessage?.text}
              </p>
            </div>
          </div>
        ))}
    </>
  );
};

export default Chats;
