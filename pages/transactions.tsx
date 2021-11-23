import React, { useState } from 'react'
import prisma from '../lib/prisma'
import 'tailwindcss/tailwind.css'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import { signOut } from 'next-auth/client'
import Head from 'next/head'
import { useRouter } from 'next/router'
import currencyFormatter from 'currency-formatter';


export const getServerSideProps: GetServerSideProps = async (context) => {

    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        },
        include: {
            transactions: true
        }
    })
    console.log(`User: ${user.email}`)
    const transactions = await prisma.transaction.findMany({
        where: {
            userId: user.id
        }
    })

    return {
        props: { session, transactions, user }
    }
}

const Transactions = ({ session, transactions, user }) => {
    const [recipient] = transactions;
    console.log(`RecipientServerSide: ${JSON.stringify(recipient)}`)
    const router = useRouter();
    const goToTransferPage = () => {
        router.push("/transferpage")
    }
    return (
        <div>
            <Head>
                <title>Transactions</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className="flex flex-nowrap justify-between p-12">
                <h3 className="font-semibold text-base text-red-500 cursor-pointer" onClick={() => signOut()}>Logout</h3>
                <h3 className="font-semibold text-2xl text-gray-500 cursor-pointer font-comforter">Simba Finance</h3>
                <small className="font-semibold text-2xl text-gray-500 cursor-pointer"><small className="font-semibold text-xs text-indigo-500 cursor-pointer">Balance: </small>{currencyFormatter.format(user?.balance, {code: "NGN"})}</small>
            </div>
            <section className="py-1 bg-blueGray-50">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">Transactions</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={goToTransferPage}>New Transactions</button>
                                </div>
                            </div>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse">
                                <thead>
                                    <tr>
                                        {/* <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                            s/n
                                        </th> */}
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                            Recipient
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                            Amount
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                            Currency
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                            Sent By
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                            Created At
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                            Updated At
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {transactions.map((transaction) => (
                                        // <div key={transaction.id}>

                                        <tr key={transaction.id}>
                                            {/* <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-normal p-4 text-center text-blueGray-700 ">
                                                {transaction?.id}
                                            </th> */}
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-normal p-4 text-center text-blueGray-700 ">
                                                {transaction?.recipient}
                                            </th>

                                            {transaction.currency === 'USD' &&
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-normal p-4 text-center">
                                                    {currencyFormatter.format(transaction?.amount, {code: transaction?.currency})}
                                                </td>
                                            }

                                            {transaction.currency === 'NGN' &&
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-normal p-4 text-center">
                                                    {currencyFormatter.format(transaction?.amount, {code: transaction?.currency})}
                                                </td>
                                            }

                                            {transaction.currency === 'EUR' &&
                                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-normal p-4 text-center">
                                                    {currencyFormatter.format(transaction?.amount, {code: transaction?.currency})}
                                                </td>
                                            }

                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-normal p-4 text-center">
                                                {transaction?.currency}
                                            </td>
                                            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-normal p-4 text-center">
                                                You
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-normal p-4 text-center">
                                                <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                                {transaction.createdAt.toLocaleString()}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-normal p-4 text-center">
                                                <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                                {transaction.updatedAt.toLocaleString()}
                                            </td>
                                        </tr>
                                        // </div>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </section>
            {/* <main className="p-10">
                {feed.map((transaction) => (
                    <div key={transaction.id}>
                        <Transaction transaction={transaction} />
                    </div>
                ))}
            </main> */}
        </div>

    )
}

export default Transactions;
