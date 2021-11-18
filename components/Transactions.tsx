import React from "react";
import Router from "next/router";
import 'tailwindcss/tailwind.css'
import { Decimal } from "@prisma/client/runtime";

export type TransactionProps = {
  id: number;
  user: {
    name: string;
    email: string;
  },
  amount: number;
  createdAt: Date;
  updatedAt: Date;
};

const Transaction: React.FC<{ transaction: TransactionProps }> = ({ transaction }) => {
  const user = transaction?.user?.name ? transaction.user?.name : "Unknown Sender";
  return (
    // <tbody>
    // <tr>
    //   <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
    //     {transaction?.user?.name} asdasd
    //   </th>
    //   <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
    //     {transaction?.amount}d das
    //   </td>
    //   <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
    //     {transaction?.user?.email} adsdas
    //   </td>
    //   <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
    //     <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
    //     46,53%
    //   </td>
    // </tr>
    // </tbody>
  );
};

export default Transaction;
