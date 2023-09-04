import React, { useContext, useState } from 'react'
import { MdSend } from 'react-icons/md'
import { RiAttachment2 } from 'react-icons/ri'
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { v4 as uuid } from 'uuid'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

const MsgInput = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (text.trim() === "") {
      alert("Please write a message first!");
      return;
    }

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
              file: downloadURL
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
    setFile(null);
  }

  return (
    <section className='h-14 w-[100%] absolute bottom-0 flex justify-between items-center'>
      <div
        onKeyDown={(e) => { e.code === "Enter" && handleSend() }}
        className='bg-white flex items-center justify-between mx-3 w-full rounded-full border-[1px] border-gray-400 p-2'
      >
        <input type="text" placeholder='Type something...' value={text} onChange={(e) => { setText(e.target.value) }} className='w-full mx-3 outline-none' />
        <input type="file" name="" id="file" accept='image/*' className='hidden' onChange={(e) => { setFile(e.target.files[0]) }} />
        <label htmlFor="file">
          <RiAttachment2 className={`text-2xl mr-2 cursor-pointer ${file ? "text-red-500" : 'text-gray-500'}`} />
        </label>
      </div>
      <button type="button"
        onClick={handleSend}
        className='bg-main text-white px-3 py-1.5 text-[25px] rounded-md mr-3'
      >
        <MdSend />
      </button>
    </section>
  )
}

export default MsgInput;