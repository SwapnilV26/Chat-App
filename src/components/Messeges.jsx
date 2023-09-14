import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import Messege from "./Messege";

const Messeges = ({searchText}) => {
  const [messages, setMessages] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      //callback function
      unSub();
    };
  }, [data.chatId]);

  useEffect(() => {
    if(searchText.length > 0){
      const debounce = setTimeout(()=>{
        const newMsg = messages.filter((m) => {
          return m.text.toLowerCase().includes(searchText.toLowerCase());
        });
        setSearchResult(newMsg);
      }, 700);
      
      return ()=>{
        clearTimeout(debounce);
      }
    } else {
      setSearchResult([])
    }
    
  }, [searchText]);

  return (
    <section className="p-2 h-[85%] md:h-[88%] lg:h-[83%] overflow-y-scroll">
      {searchResult.length > 0
        ? searchResult.map((msg) => <Messege msg={msg} key={msg.id} />)
        : messages.map((msg) => <Messege msg={msg} key={msg.id} />)
      }
    </section>
  );
};

export default Messeges;
