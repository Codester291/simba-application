import React, { useState } from 'react'
import 'tailwindcss/tailwind.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'


const Transfer = () => {

    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const router = useRouter();

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const body = { email, amount, fromCurrency, toCurrency };
            await axios.post('/api/transfer', body);

            await router.push('/transactions');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Head>
                <title>Transfer</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="flex flex-nowrap justify-Center p-12 max-w-lg text-center">
                <h3 className="font-semibold text-2xl text-gray-500 cursor-pointer font-comforter">Simba Finance</h3>
            </div>
            <div className="h-screen flex bg-gray-bg1 justify-center p-12">
                <form className="max-w-xl p-8" onSubmit={submitData}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Recipient Email
                            </label>
                            <input
                                className="appearance-none block w-full text-xs font-bold bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-password"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="xyz@gmail.com"
                                value={email} />
                            {email === "" &&
                                <p className="text-red-600 text-xs italic animate-pulse">email cannot be empty</p>
                            }
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Your Currency
                            </label>
                            <div className="relative">
                                <select
                                    className="block appearance-none w-full text-xs font-bold bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-state"
                                    onChange={(e) => setFromCurrency(e.target.value)}
                                    value={fromCurrency}

                                >
                                    <option value="">Your Currency</option>
                                    <option>EUR</option>
                                    <option>USD</option>
                                    <option>NGN</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Recipient Currency
                            </label>
                            <div className="relative">
                                <select
                                    className="block appearance-none w-full text-xs font-bold bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="grid-state"
                                    onChange={(e) => setToCurrency(e.target.value)}
                                    value={toCurrency}

                                >
                                    <option value="">To Currency</option>
                                    <option>EUR</option>
                                    <option>USD</option>
                                    <option>NGN</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Amount
                            </label>
                            <input 
                            className="appearance-none text-xs font-bold block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                             type="number"
                             onChange={(e) => setAmount(e.target.value)}
                             placeholder="¢0.00"
                             value={amount}
                              />
                        </div>
                        <div className="w-full px-3">
                            <br />
                            <br />
                            <button
                                className="text-xs font-bold rounded outline-none block w-full bg-indigo-600 text-white border uppercase py-3 px-4 mb-3"
                                id="grid-password"
                                type="submit">Transfer</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Transfer;