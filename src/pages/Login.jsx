import React, { useState } from 'react'
import Logo from '../assets/logo.png'
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(name, email, password, file);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            alert("User doesn't exist. Please register first!");
        }

        setEmail("");
        setPassword(""); 
    }

    return (
        <div className='flex items-center justify-center h-screen bg-[url(./assets/bg-img2.jpg)] bg-cover bg-no-repeat'>
            <div className='py-6 px-10 bg-white rounded-md lg:w-[30%]'>
                <div className='flex flex-col justify-center items-center'>
                    <img src={Logo} width={175} alt="logo" />
                    <span className='text-center font-medium text-lg underline'>Login here</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block mb-1 text-base font-medium text-gray-900">Your email</label>
                        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} name="email" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1 text-base font-medium text-gray-900">Password</label>
                        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} name="password" placeholder="Enter password here..." className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2 " required />
                    </div>

                    <button className="w-full my-4 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2 text-center">Login</button>
                    <hr />
                    <p className="text-base text-center font-normal text-gray-500">
                        Don't have an account? <Link to="/register" className="font-medium text-blue-600 hover:underline">Register here</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login