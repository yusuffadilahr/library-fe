'use client'
import { FaSearch } from "react-icons/fa";
import AdminLayout from "../page";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { IMember } from "@/features/member/types";
import Link from "next/link";

export default function Member() {
    const [entriesPerPage, setEntriesPerPage] = useState<number>(5)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [dataMember, setDataMember] = useState<IMember[]>([])

    const { mutate: getMembers } = useMutation({
        mutationFn: async () => {
            const response = await axios.get('http://localhost:5000/member')
            return response
        },
        onSuccess: (res) => {
            console.log(res.data.data)
            setDataMember(res.data.data)
        },
        onError: (err) => {
            console.log(err)
        }
    })

    const totalPages = Math.ceil(dataMember.length / entriesPerPage)
    const paginatedData = dataMember.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
    const handlePageChange = (page:number) => {
        setCurrentPage(page)
    }

    const handleEntriesPerPage = (e) => {
        setEntriesPerPage(parseInt(e.target.value))
        setCurrentPage(1)
    }

    useEffect(() => {
        getMembers()
    }, [])

    return (
        <AdminLayout>
            <main className=" h-[85%] w-[80%] flex absolute right-0 bottom-0 px-10 flex-col gap-5 ">
                <section className="text-xl font-bold">MEMBERS</section>
                <section className="flex h-12 gap-5">
                    <div className="relative w-[70%]">
                        <input className="border border-gray-400 w-full h-full rounded-xl pl-2" type="text" placeholder="Search..." />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <FaSearch />
                        </div>
                    </div>
                    <div className=" w-[30%] flex justify-center items-center">
                        <Link href={'/admin/create-member'} className=" w-full flex justify-center items-center h-full rounded-xl  bg-blue-400 hover:bg-blue-300 font-semibold text-white">Create Member</Link>
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
                                <tr className="bg-gray-100 text-blue-500  uppercase text-sm ">
                                    <th className="py-3 px-4 border-b">Member Id</th>
                                    <th className="py-3 px-4 border-b">Name</th>
                                    <th className="py-3 px-4 border-b">Email</th>
                                    <th className="py-3 px-4 border-b">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((item, i) => (
                                    <tr className="hover:bg-gray-50 " key={i}>
                                        <td className="py-3 px-4 border-b">{item.id}</td>
                                        <td className="py-3 px-4 border-b">{item.first_name} {item.last_name}</td>
                                        <td className="py-3 px-4 border-b">{item.email}</td>
                                        <td className="py-3 px-4 border-b"><button className="text-blue-500">View</button></td>
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
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage == Math.ceil(dataMember.length / entriesPerPage)} className=" py-2 disabled:bg-gray-200 w-[20%] flex justify-center items-center h-full rounded-xl  bg-blue-400 hover:bg-blue-300 font-semibold text-white">Next</button>
                    </div>
                </div>
            </main>
        </AdminLayout>
    )
}