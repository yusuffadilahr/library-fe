'use client'
import { FaSearch } from "react-icons/fa";
import AdminLayout from "../page";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { IMember } from "@/features/member/types";
import Link from "next/link";

export default function Member() {
    const [entriesPerPage, setEntriesPerPage] = useState<number>(6)
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

    const paginatedData = dataMember.slice((currentPage - 1) * entriesPerPage, entriesPerPage - currentPage)

    useEffect(() => {
        getMembers()
    }, [])

    return (
        <AdminLayout>
            <main className=" h-[85%] w-[80%] flex absolute right-0 bottom-0  p-10 flex-col gap-5 ">
                <section className="text-xl">MEMBERS</section>
                <section className="flex h-12 gap-5">
                    <div className="relative w-[70%]">
                        <input className="border border-gray-400 w-full h-full rounded-xl" type="text" />
                        <div className="absolute inset-y-0 right-0 pr-3  flex items-center  pointer-events-none">
                            <FaSearch />
                        </div>
                    </div>
                    <div className=" w-[50%] flex justify-center items-center">
                        <Link href={'/admin/create-member'} className=" w-full flex justify-center items-center h-full rounded-xl  bg-blue-400 hover:bg-blue-300 font-semibold text-white">Create Member</Link>
                    </div>

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

            </main>
        </AdminLayout>
    )
}