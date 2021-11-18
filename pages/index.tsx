import React, { useState } from 'react';
import 'tailwindcss/tailwind.css'
import Link from 'next/link';
import Router from 'next/router';

const Login: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const body = { email, password };
            await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            await Router.push('/transactions');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='h-screen flex bg-gray-bg1'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-lg text-center text-primary'> Simba Finance App</h1>
                <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                    Log in to your account 🔐
                </h1>

                <form>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='email'
                            placeholder='Your Email'
                            value={email}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='password'
                            placeholder='Your Password'
                            value={password}
                        />
                    </div>

                    <div className='flex justify-center items-center mt-6'>
                            <button
                                onClick={submitData}
                                type="button"
                                className="bg-indigo-500 mr-6 py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark"
                            >
                                Login
                            </button>
                        <Link href='/signup'>
                            <button
                                className="bg-primary py-2 px-4 text-sm text-black rounded border border-green focus:outline-none focus:border-green-dark"
                            >
                                Sign up
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;