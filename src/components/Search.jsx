import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  const { currentUser } = useContext(AuthContext);

  useEffect(()=>{
    if(username.trim() === ""){
      setUser(null);
    }
  }, [username])

  const handleSearch = async () => {
    if (username.trim() === "") {
      setUser(null);
      return;
    }
    const q = query(
      collection(db, "users"),
      where("displayName", ">=", username.toLocaleLowerCase()),
      where("displayName", "<=", username.toLocaleLowerCase()+'\uf8ff'),
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });

      // if(user === null){
      //   alert("ehhh")
      // }
    } catch (error) {
      console.log("Seach", error);
    }

    
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  // console.log(user)  

  const handleSelect = async () => {
    //check whether the chat group(chats in firestore) exists, if not then create new group
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      //if chat collection doesn't exists in a pair then create
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // create user chats
        if (user.photoURL) {
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        } else {
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }

        if (currentUser.photoURL) {
          await updateDoc(doc(db, "userChats", user.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        } else {
          await updateDoc(doc(db, "userChats", user.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }
      }
      setUser(null);
      setUsername("");
    } catch (error) {}
  };

  return (
    <div className="border-b-[1px] border-slate-300">
      {/* searchForm */}
      <div className="m-3 relative rounded-md flex gap-2">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <BsSearch className="text-violet-500" />
        </div>
        <input
          type="search"
          placeholder="Find a user to chat..."
          value={username}
          onKeyDown={handleKey}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          className="placeholder:text-gray-400 rounded p-1.5 bg-slate-200 outline-violet-500 pl-10 w-full text-sm"
        />
        <button
        className="bg-main px-4 rounded shadow-md"
          onClick={() => {
            handleSearch();
          }}
        >
          <BsSearch className="text-gray-50" />
        </button>
      </div>

      {/* userChat */}
      {user && (
        <div
          onClick={handleSelect}
          className="flex items-center gap-2 text-gray-900 pl-3 py-1.5 cursor-pointer hover:bg-side"
        >
          <img
            src={user.photoURL}
            className="rounded-full w-12 h-12 border-2 object-cover"
            alt=""
          />
          <div>
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
