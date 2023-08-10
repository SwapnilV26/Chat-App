import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Chats = () => {
  const [chats, setChats] = useState([])
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      // firebase functions to get realtime chat
      const unsub = onSnapshot(
        doc(db, "userChats", currentUser.uid), (doc) => {
          setChats(doc.data());
        });

      return () => unsub();
    }

    // if there is user then get chats
    currentUser.uid && getChats();
  }, [currentUser.uid])

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  }

  return (
    <>
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)} className="border-b-[1px] border-slate-300 flex items-center gap-2 pl-3 py-1.5 cursor-pointer hover:bg-side-dark">
          <img src={chat[1].userInfo.photoURL} className='rounded-full w-12 h-12 border-2 border-side object-cover' alt="" />
          <div className='h-12 overflow-hidden'>
            <span className='text-lg text-gray-900 font-medium'>{chat[1].userInfo.displayName}</span>
            <p className='text-sm text-gray-500'>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </>
  )
}

export default Chats