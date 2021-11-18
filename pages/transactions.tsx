import React, { useState } from 'react'
import prisma from '../lib/prisma'
import 'tailwindcss/tailwind.css'
import { GetStaticProps, GetServerSideProps } from 'next'
import Link from 'next/link'

export const getServerSideProps: GetServerSideProps = async () => {
    const feed = await prisma.transaction.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    email: true
                }
            }
        }
    })
    return {
        props: {
            feed
        }
    }
}

const Transactions = ({ feed }) => {
    return (
        <div>
            <Link href="/">
            <h3 className="font-semibold text-base text-red-500 p-12 cursor-pointer">Logout</h3>
            </Link>
            <section className="py-1 bg-blueGray-50">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0">
                            <div className="flex flex-wrap items-center">
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                    <h3 className="font-semibold text-base text-blueGray-700">Transactions</h3>
                                </div>
                                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                    <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">New Transactions</button>
                                </div>
                            </div>
                        </div>

                        <div className="block w-full overflow-x-auto">
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                    <tr>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                            s/n
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                            Sender
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                            Amount
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                            Currency
                                        </th>
                                        <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                                            Email
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
                                    {feed.map((transaction) => (
                                        // <div key={transaction.id}>
                                        <tr>
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-normal p-4 text-center text-blueGray-700 ">
                                                {transaction?.id}
                                            </th>
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-center text-blueGray-700 ">
                                                {transaction?.user?.name}
                                            </th>
                                            
                                            {/* {transaction.currency === '' && */}
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-normal p-4 text-center">
                                                {JSON.stringify(transaction?.amount)}
                                                </td>
                                            {/* } */}
                                            
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-normal p-4 text-center">
                                                {transaction?.currency}
                                            </td>
                                            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-normal p-4 text-center">
                                                {transaction?.user?.email}
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

export default Transactions
