'use client'

import { HiOutlineNewspaper } from "react-icons/hi2";
import { FaBook } from "react-icons/fa6";
import { BsFillPeopleFill } from "react-icons/bs";
import AdminLayout from "../page";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";

export default function Home() {
    const [dataMember, setDataMember] = useState([])
    const [memberTransaction, setMemberTransaction] = useState([])
    const [booksData, setBooksData] = useState([])
    const { mutate: getMembers } = useMutation({
        mutationFn: async () => {
            const response = await axios.get('http://localhost:5000/member')
            return response
        },
        onSuccess: (res) => {
            setDataMember(res.data.data)
        },
        onError: (err) => {
            console.log(err)
        }
    })

    const { mutate: getLending } = useMutation({
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

    const { mutate: getBookList } = useMutation({
        mutationFn: async () => {
            const data = await axios.get('http://localhost:5000/books')
            return data
        },
        onSuccess: (res) => {
            setBooksData(res.data.data)
        }
    })

    useEffect(() => {
        getBookList()
        getMembers()
        getLending()
    }, [])

    return (
        <AdminLayout>
            <main className=" h-[85%] w-[80%] flex absolute right-0 bottom-0  p-10  ">
                <section className="flex flex-col w-full">
                    <div className="font-bold text-xl">HOME</div>
                    <div className="flex gap-10  w-full h-28 mt-8">
                        <Link href={'/admin/member'} className="border-4 border-blue-400 flex-1 gap-6 rounded-lg flex items-center justify-center"><BsFillPeopleFill size={80} color="#60a5fa" />
                            <div>
                                <div className="text-2xl text-blue-400 font-bold">Members</div>
                                <div className="text-xl text-blue-400">{dataMember.length}</div>
                            </div>
                        </Link>
                        <Link href={'/admin/lending'} className="border-4 border-blue-400 flex-1 gap-6 rounded-lg flex items-center justify-center"><HiOutlineNewspaper size={75} color="#60a5fa" />
                            <div>
                                <div className="text-2xl text-blue-400 font-bold">Lendings</div>
                                <div className="text-xl text-blue-400">{memberTransaction.length}</div>
                            </div>
                        </Link>
                        <Link href={'/admin/books'} className="border-4 border-blue-400 gap-6 flex-1 rounded-lg flex items-center justify-center"><FaBook size={70} color="#60a5fa" />
                            <div>
                                <div className="text-2xl text-blue-400 font-bold">Books</div>
                                <div className="text-xl text-blue-400">{booksData.length}</div>
                            </div>
                        </Link>
                    </div>
                </section>
            </main>
        </AdminLayout>
    )
}