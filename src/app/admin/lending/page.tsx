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
    member_trc_id: number
    penalty_charge: number
    phone_number: string
    publish_year: string
    return_date: string
    staff_id: number
    title: string
}

export default function Lending() {
    const [entriesPerPage, setEntriesPerPage] = useState<number>(5)
    const [currentPage, setCurrentPage] = useState<number>(1)
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

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    useEffect(() => {
        getData()
    }, [])

    const paginatedData = dataMemberTransaction.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
    const totalPages = Math.ceil(dataMemberTransaction.length / entriesPerPage)

    const handleEntriesPerPage = (e) => {
        setEntriesPerPage(parseInt(e.target.value))
        setCurrentPage(1)
    }

    return (
        <AdminLayout>
            <main className=" h-[85%] w-[80%] flex absolute right-0 bottom-0 px-10 flex-col gap-5 ">
                <section className="text-xl font-bold">LENDING</section>
                <section className="flex h-12 gap-5">
                    <div className="relative w-[70%]">
                        <input className="border border-gray-400 w-full h-full rounded-xl pl-2" type="text" placeholder="Search..." />
                        <div className="absolute inset-y-0 right-0 pr-3  flex items-center  pointer-events-none">
                            <FaSearch />
                        </div>
                    </div>
                    <div className=" w-[30%] flex justify-center items-center">
                        <Link href={'/admin/new-landing'} className="hover:bg-blue-300 w-full h-full rounded-xl  bg-blue-400 text-white flex justify-center items-center font-semibold">New Lending</Link>
                    </div>
                </section>
                <section className="flex">
                    <span>Total</span>
                    <select onChange={handleEntriesPerPage} value={entriesPerPage} className="mx-2 border">
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                    </select>
                    <span>entries</span>
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
                                {paginatedData.map((item, i) => (
                                    <tr className="hover:bg-gray-50 " key={i}>
                                        <td className="py-3 px-4 border-b">{format(item.due_date, 'yyyy-MM-dd')}</td>
                                        <td className="py-3 px-4 border-b">{format(item.return_date, 'yyyy-MM-dd')}</td>
                                        <td className="py-3 px-4 border-b">{item.first_name}</td>
                                        <td className="py-3 px-4 border-b"><Link href={`/admin/lending/${item.member_trc_id}`} className="text-blue-500">View details transaction</Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
                <div className="flex w-full">
                    <div className="flex justify-start w-full">
                        <h1>Pages <span>{currentPage}</span> of {totalPages}</h1>
                    </div>
                    <div className="justify-end flex w-full gap-2">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage == 1} className="py-2 disabled:bg-gray-200 w-[20%] flex justify-center items-center h-full rounded-xl  bg-blue-400 hover:bg-blue-300 font-semibold text-white">Previous</button>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage == Math.ceil(dataMemberTransaction.length / entriesPerPage)} className=" py-2 disabled:bg-gray-200 w-[20%] flex justify-center items-center h-full rounded-xl  bg-blue-400 hover:bg-blue-300 font-semibold text-white">Next</button>
                    </div>
                </div>
            </main>
        </AdminLayout>
    )
}