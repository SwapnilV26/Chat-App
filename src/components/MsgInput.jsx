import React, { useContext, useState } from 'react'
import { IoMdAttach } from 'react-icons/io'
import { BiImageAdd } from 'react-icons/bi'
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

const MsgInput = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      await uploadBytesResumable(storageRef, img).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
              img: downloadURL
            })
          });
        });
      });
    } else {
      // Set the "messages" field of the chats 'chatId'
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        })
      });
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

    setText("");
    setImg(null);
  }

  return (
    <div className='bg-white h-14 p-3 flex justify-between items-center'>
      <input type="text" placeholder='Type something...' value={text} onChange={(e) => { setText(e.target.value) }} className='w-full mr-5 outline-none' />
      <div className='flex gap-3 items-center'>
        <IoMdAttach className='text-xl text-gray-500' />
        <input type="file" name="" id="file" className='hidden' onChange={(e) => { setImg(e.target.files[0]) }} />
        <label htmlFor="file">
          <BiImageAdd className={`text-2xl  cursor-pointer ${img ? "text-red-500": 'text-gray-500' }`} />
        </label>
        <button type="button" onClick={handleSend} className='bg-red-500 px-3 py-1 rounded'>Send</button>
      </div>
    </div>
  )
}

export default MsgInput;