'use client'

import { FaSearch } from "react-icons/fa";
import AdminLayout from "../page";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Link from "next/link";

interface IBook {
    address: string
    author: string
    books_id: number
    description: string
    due_date: string
    email: string
    first_name: string
    id: number
    id_card_number: string
    last_name: string
    members_id: string
    penalty_charge: number
    phone_number: string
    publish_year: string
    return_date: string
    staff_id: number
    title: string
}

export default function Lending() {
    const [dataMemberTransaction, setMemberTransaction] = useState<IBook[]>([])
    const { mutate: getData } = useMutation({
        mutationFn: async () => {
            const res = await axios.get('http://localhost:5000/transaction')
            return res
        },
        onSuccess: (res) => {
            console.log(res)
            setMemberTransaction(res.data.data)
        },
        onError: (err) => {
            console.log(err)
        }
    })

    useEffect(() => {
        getData()
    }, [])

    return (
        <AdminLayout>
            <main className=" h-[85%] w-[80%] flex absolute right-0 bottom-0  p-10 flex-col gap-5 ">
                <section className="text-xl">LENDING</section>
                <section className="flex h-12 gap-5">
                    <div className="relative w-[70%]">
                        <input className="border border-gray-400 w-full h-full rounded-xl" type="text" />
                        <div className="absolute inset-y-0 right-0 pr-3  flex items-center  pointer-events-none">
                            <FaSearch />
                        </div>
                    </div>
                    <div className=" w-[30%] flex justify-center items-center">
                        <Link href={'/admin/new-landing'} className="hover:bg-blue-300 w-full h-full rounded-xl  bg-blue-400 text-white flex justify-center items-center font-semibold">New Lending</Link>
                    </div>

                </section>
                <section className="bg-red-500 w-full">

                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 text-center">
                            <thead>
                                <tr className="bg-gray-100 text-blue-500 uppercase text-sm ">
                                    <th className="py-3 px-4 border-b">Borrow Date</th>
                                    <th className="py-3 px-4 border-b">Due Date</th>
                                    <th className="py-3 px-4 border-b">First Name</th>
                                    <th className="py-3 px-4 border-b">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataMemberTransaction.map((item, i) => (
                                    <tr className="hover:bg-gray-50 " key={i}>
                                        <td className="py-3 px-4 border-b">{format(item.due_date, 'yyyy-MM-dd')}</td>
                                        <td className="py-3 px-4 border-b">{format(item.return_date, 'yyyy-MM-dd')}</td>
                                        <td className="py-3 px-4 border-b">{item.first_name}</td>
                                        <td className="py-3 px-4 border-b"><button className="text-blue-500">Edit</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                </section>

            </main>
        </AdminLayout>
    )
}