'use client'
import { useState } from "react";
import AdminLayout from "../page";
import axios from "axios";
import { IBooks, IMember } from "@/features/new-lending/types";
import Link from "next/link";
import { toast } from "react-toastify";


export default function Page() {
    const [dataMember, setDataMember] = useState<IMember[]>([])
    const [findDataMember, setFindDataMember] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')
    const [inputTitleValue, setInputTitleValue] = useState<string>('')
    const [dataBooks, setDataBooks] = useState<IBooks[]>([])
    const [booksData, setBooksData] = useState<IBooks[]>([])
    const [idBooks, setIdBooks] = useState<number | null>(null)
    // const [idMember, setIdMember] = useState<number | null>(null)

    const searchDataMember = async (values: string) => {

        try {
            let url = 'http://localhost:5000/transaction/search-member'
            if (values) {
                url += `?member=${values}`
                const res = await axios.get(url)
                setDataMember(res.data.data)
            } else if (!values) {
                setDataMember([])
            }

        } catch (error) {
            setFindDataMember(true)
            console.log(error)
        }
    }

    const handleInputValue = (id: string) => {
        setInputValue(id)
        setDataMember([])
    }

    const searchDataBook = async (values: string) => {
        try {
            let url = `http://localhost:5000/transaction/search-books?`
            if (values) {
                url += `title=${values}`
                const res = await axios.get(url)
                setDataBooks(res.data.data)
            } else if (!values) {
                setDataBooks([])
                console.log('erorr senentara')
            }

        } catch (error) {
            console.log(error)
        }
    }

    const handleInputValueBooks = (title: string, item: IBooks, id: number) => {
        setInputTitleValue(title)
        setBooksData([item])
        setDataBooks([])
        setIdBooks(id)
    }

    const dataStaff = localStorage.getItem('id_users')
    console.log(typeof Number(dataStaff), '<--data staff')

    const onNewLending = async () => {
        try {
            // const data = {
            //     members_id: inputValue,
            //     books_id: Number(idBooks),
            //     staff_id: Number(dataStaff)
            // }

            const request = await axios.post('http://localhost:5000/transaction/new-data-lending', {
                members_id: inputValue,
                books_id: Number(idBooks),
                staff_id: Number(dataStaff)
            })


            if (request.data.error == false) {
                toast.success('Berhasil menambahkan data', {
                    position: 'top-center'
                })
            }

            console.log(request, '<-- request')
            return request
        } catch (error: any) {
            if (error.response.status == 409 || error.response.status == 404 || error.response.status == 400) {
                toast.error(error.response.data.message, {
                    position: 'top-center'
                })
            }
            console.log(error.response.status, '<-- cek response')
            console.log(error)
        }
    }

    console.log(inputValue, '<-- input value')
    console.log(booksData)
    console.log(idBooks)
    return (
        <AdminLayout>
            <main className=" h-[85%] w-[80%] flex absolute right-0 bottom-0  px-14 flex-col gap-5 ">
                <section className="text-xl">MEMBERS / CREATE MEMBER</section>
                <section className="text-2xl font-bold">{findDataMember ? 'Data tidak tersedia' : 'FORM LENDING'}</section>
                <section className="gap-10 h-fit">
                    <div className="relative">
                        <div className="text-blue-500 mb-2">Member ID</div>
                        <input
                            value={inputValue}
                            placeholder="Masukan member id"
                            onChange={(e) => {
                                setInputValue(e.target.value)
                                searchDataMember(e.target.value)
                            }}
                            className="border px-2 border-gray-400 w-full rounded-md h-16" type="text" />
                        {dataMember.length > 0 ?
                            <div className="w-full bg-white py-3 z-20 border rounded-xl h-44 absolute overflow-y-auto overflow-hidden">
                                {dataMember.map((item, i) => (
                                    <div key={i} className="px-2 flex flex-col py-1">
                                        <div className="cursor-pointer border-b pb-2" onClick={() => handleInputValue(item.id)}>
                                            <h1>{item.id}</h1>
                                        </div>
                                    </div>
                                ))}
                            </div> : ''
                        }
                    </div>
                    <div className="font-bold my-4">Member Information</div>

                    {/* Search Books */}
                    <div className="relative">
                        <div className="text-blue-500 mb-2">Book Author</div>
                        <input
                            value={inputTitleValue}
                            placeholder="Masukan member id"
                            onChange={(e) => {
                                setInputTitleValue(e.target.value)
                                searchDataBook(e.target.value)
                            }}
                            className="border px-2 border-gray-400 w-full rounded-md h-16" type="text" />
                        {dataBooks.length > 0 ?
                            <div className="w-full bg-white py-3 border rounded-xl h-44 absolute overflow-y-auto overflow-hidden">
                                {dataBooks.map((item, i) => (
                                    <div key={i} className="px-2 flex flex-col py-1">
                                        <div className="cursor-pointer border-b pb-2" onClick={() => handleInputValueBooks(item.author, item, item.id)}>
                                            <h1>{item.author}</h1>
                                        </div>
                                    </div>
                                ))}
                            </div> : ''
                        }
                    </div>


                    <div className="overflow-x-auto my-5">
                        <table className="min-w-full bg-white border border-gray-200 text-center">
                            <thead>
                                <tr className="bg-gray-100 text-blue-500  uppercase text-sm ">
                                    <th className="py-3 px-4 border-b">Book Id</th>
                                    <th className="py-3 px-4 border-b">Name</th>
                                    <th className="py-3 px-4 border-b">Author</th>
                                    <th className="py-3 px-4 border-b">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {booksData.length == 0 ? (
                                    <tr className="hover:bg-gray-50" >
                                        <td colSpan={4} className="py-3 px-4 border-b">Data tidak tersedia</td>
                                    </tr>
                                ) : (
                                    <tr className="hover:bg-gray-50">
                                        {booksData.map((item, i) => (
                                            <>
                                                <td key={i} className="py-3 px-4 border-b">{item.id}</td>
                                                <td className="py-3 px-4 border-b">{item.title}</td>
                                                <td className="py-3 px-4 border-b">{item.author}</td>
                                                <td className="py-3 px-4 border-b">
                                                    <Link href={`/admin/books/${item.id}`}>
                                                        <button className="text-blue-500">View Book</button>
                                                    </Link>
                                                </td>
                                            </>

                                        ))}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
                <section>
                    <button onClick={onNewLending} className="bg-blue-500 hover:bg-blue-400 font-semibold w-full h-14 rounded-md text-white">Submit</button>
                </section>
            </main>
        </AdminLayout >
    )
}