import React, { useContext } from "react";
import { BsCameraVideoFill } from "react-icons/bs";
import { FiArrowLeft, FiMoreHorizontal } from "react-icons/fi";
import Messeges from "./Messeges";
import MsgInput from "./MsgInput";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import ProfilePic from "../assets/Profile Icon.png";

const ChatSection = () => {
  const { data, selected } = useContext(ChatContext);
  const { chatWidth, setShow } = useContext(AuthContext);
  console.log(chatWidth);

  return (
    <main
      className={`w-[100%] h-[100%] md:w-[60%] lg:w-[65%] bg-main-light relative`}
    >
      {selected ? (
        <>
          {/* Chat info  */}
          <section className="flex justify-between items-center h-14 p-3 bg-main">
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  setShow(true);
                }}
                className="md:hidden"
              >
                <FiArrowLeft size={22} className="text-slate-100" />
              </button>
              <img
                src={data.user?.photoURL ? data.user.photoURL : ProfilePic}
                alt="Profile Pic"
                className="rounded-full w-9 h-9 object-cover"
              />
              <span className="font-medium text-white text-lg">
                {data.user?.displayName}
              </span>
            </div>
            <div className="flex gap-3 text-xl">
              <BsCameraVideoFill className="text-slate-100" />
              <FiMoreHorizontal className="text-slate-100" />
            </div>
          </section>

          <Messeges />
          <MsgInput />
        </>
      ) : (
        <section className="bg-main-light flex justify-center items-center h-full">
          <div className="ml-5 text-lg font-medium text-gray-600">
            <p>Follow these steps to initiate chatting:</p>
            <ol className="ml-8 text-base list-decimal">
              <li className="md:hidden">Click on start button given below</li>
              <li>Click on the search bar</li>
              <li>Find the user by typing their name and HIT_ENTER</li>
              <li>Select the user and Enjoy your chatting</li>
            </ol>
            <p className="mt-2 text-base hidden md:block">
              <span className="text-gray-800 text-lg">Note:</span> To delete the
              chat, hover on the message and you will get delete button
            </p>
            <p className="mt-2 text-base md:hidden">
              <span className="text-gray-800 text-lg">Note:</span> To delete the
              chat, click on the message and you will get delete button
            </p>
            <button
              type="button"
              onClick={()=>{setShow(true)}}
              className="md:hidden ml-[35%] mt-5 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br shadow-lg shadow-purple-500/50 font-medium rounded-lg px-5 py-2 text-center mr-2 mb-2"
            >
              Start
            </button>
          </div>
        </section>
      )}
    </main>
  );
};

export default ChatSection;
