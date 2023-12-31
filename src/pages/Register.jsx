import React, { useState } from 'react'
import Logo from '../assets/logo.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// import ProfilePic from '../assets/Profile Icon.png'

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, email, password, file);

        if(name.length < 3){
            toast.error("Name must contain atleast 3 characters!");
            return;
        } else if(password.length < 6){
            toast.error("Password must contain atleast 6 characters!");
            return;
        }

        try {
            //create user
            const res = await createUserWithEmailAndPassword(auth, email, password);

            if(file){
                const storageRef = ref(storage, name);
                uploadBytesResumable(storageRef, file).then(()=>{
                    getDownloadURL(storageRef).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName: name,
                            photoURL: downloadURL
                        });
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName: name.toLocaleLowerCase(),
                            email,
                            photoURL: downloadURL,
                        })
                    });
                });
                toast.success("Registed Successfully");
            } else {
                await updateProfile(res.user, {
                    displayName: name
                });
                await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName: name.toLocaleLowerCase(),
                    email
                })
                toast.success("Registed Successfully");
            }
           
            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});

            //make form empty
            setName("");
            setEmail("");
            setPassword("");
            setFile(null);

            navigate("/");

            console.log(res.user)
        } catch (error) {
            console.error("Error getting download URL:", error);
            toast.error("User already exist");
        }
    }

    return (
        <div className='flex items-center justify-center h-screen bg-[url(./assets/bg-img3.jpg)] bg-cover bg-no-repeat'>
            <div className='py-6 px-8 bg-white rounded-md m-2 lg:w-[30%]'>
                <div className='flex flex-col justify-center items-center'>
                    <img src={Logo} width={175} alt="logo" />
                    <span className='text-center font-medium text-lg underline'>Register here</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block mb-1 text-base font-medium text-gray-900">Your Name</label>
                        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} name="name" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2" placeholder="Enter your name" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1 text-base font-medium text-gray-900">Your email</label>
                        <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} name="email" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1 text-base font-medium text-gray-900">Password</label>
                        <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} name="password" placeholder="Enter password here..." className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2" required />
                    </div>

                    <div className='flex'>
                        <label htmlFor="file" className="mt-4 text-base font-medium text-gray-900 w-1/3">Profile Pic :</label>
                        <input type="file" onChange={(e)=>{setFile(e.target.files[0])}} name="img" accept="image/*" className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-1" />
                    </div>

                    <button type="submit" className="w-full my-4 text-white bg-main hover:bg-indigo-600 font-medium rounded-lg text-base px-5 py-2 text-center">Create an account</button>
                    <hr />
                    <p className="text-base text-center font-normal text-gray-500">
                        Already have an account? <Link to="/login" className="font-medium text-main hover:underline">Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register