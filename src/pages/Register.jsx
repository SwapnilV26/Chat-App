import React from 'react'
import Logo from '../assets/logo.png'

const Register = () => {
    return (
        <div className='flex items-center justify-center h-screen bg-slate-600'>
            <div className='py-6 px-10 bg-white rounded-md w-[30%]'>
                <div className='flex flex-col justify-center items-center'>
                    <img src={Logo} width={175} alt="logo" srcset="" />
                    <span className='text-center font-medium text-lg underline'>Register here</span>
                </div>
                <form action="">
                    <div>
                        <label htmlFor="name" className="block mb-1 text-base font-medium text-gray-900">Your Name</label>
                        <input type="text" name="name" id="name" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2" placeholder="Enter your name" required />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1 text-base font-medium text-gray-900">Your email</label>
                        <input type="email" name="email" id="email" className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2" placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1 text-base font-medium text-gray-900">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2 " required />
                    </div>

                    <div className='flex'>
                        <label htmlFor="" className="mt-4 text-base font-medium text-gray-900 w-1/3">Profile Pic :</label>
                        <input type="file" name="img" accept="image/*" className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-base rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-1" required />
                    </div>

                    <button type="submit" className="w-full my-4 text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2 text-center">Create an account</button>
                    <hr />
                    <p className="text-base text-center font-normal text-gray-500">
                        Already have an account? <a className="font-medium text-blue-600 hover:underline">Login here</a>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register