import React, { useState } from 'react';
import 'tailwindcss/tailwind.css'
import Link from 'next/link';
import Router from 'next/router';
import { getCsrfToken, useSession, signIn } from 'next-auth/client';
import Head from 'next/head'

export async function getServerSideProps(context) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}

const Login = ({ csrfToken }) => {
    const [session] = useSession();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitData = (event) => {
        event.preventDefault();
        event.stopPropagation();

        signIn("credentials", {
            email, password
        });

        if (session) {
            Router.push("/transactions")
        }
    }

    return (
        <div>
            <Head>
                <title>Login</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className='h-screen flex bg-gray-bg1'>
                <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                    <h1 className='text-lg text-center text-primary'> Simba Finance App</h1>
                    <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                        Log in to your account 🔐
                    </h1>

                    <form onSubmit={submitData}>
                        <div>
                            <label htmlFor='email'>Email</label>
                            {
                                email == '' &&
                                <small className="animate-pulse text-xs text-red-600"><br />Email Cannot be empty</small>
                            }
                            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
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
                            {
                                password == '' &&
                                <small className="animate-pulse text-xs text-red-600"><br />Password Cannot be empty</small>
                            }
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
                            {/* <Link href="/transactions"> */}
                            <button
                                type="submit"
                                className="bg-indigo-500 mr-6 py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark"
                            >
                                Login
                            </button>
                            {/* </Link> */}
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
        </div>
    );
};

export default Login;