import { deleteField, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import ProfilePic from "../assets/Profile Icon.png";
import { BsThreeDotsVertical } from "react-icons/bs";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { currentUser, setShow } = useContext(AuthContext);
  const { data, dispatch, setSelected } = useContext(ChatContext);
  const [toggle, setToggle] = useState(true)

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

  // delete chats.nflKgTA8e8Z71SMLlzuxfvSZLQy1EkNPOi9dZeZ9z43Fq0u64eeQ9Pw1
  const handleHideChat = async (chatId) => {
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      chatId: deleteField()
    });
  }

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
           
            <div
              onMouseLeave={()=>{setToggle(true)}}
              className={`ml-auto mr-2 p-2.5 relative rounded-full group-hover:block hover:bg-indigo-400 ${
                data.chatId === chat[0] ? "block" : "hidden"
              }`}
            >
              <BsThreeDotsVertical
                onMouseOver={()=>{setToggle(false)}}
                className="text-gray-100"
              />
              <div
                className={`z-10 absolute bg-white divide-y divide-gray-100 rounded-lg w-36 shadow-md ${toggle && "hidden"} `}
              >
                <ul
                  className="py-2 text-sm text-gray-700"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <p onClick={()=>{handleHideChat(chat[0])}} className="block px-4 py-2 hover:bg-gray-100">
                      Hide chat
                    </p>
                  </li>
                  <li>
                    <p className="block px-4 py-2 hover:bg-gray-100">
                      Delete chat
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Chats;
