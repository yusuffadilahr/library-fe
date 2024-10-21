'use client'

import axios from "axios";
import AdminLayout from "../../page";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
    const [dataDetails, setDataDetails] = useState<any>({})
    const navigate = useRouter()
    const { details } = params

    const onGetDataDetails = async () => {
        try {
            const data = await axios.get(`http://localhost:5000/transaction/detail/${details}`)
            setDataDetails(data.data.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    const handleReturnBook = async () => {
        try {
            const result = await Swal.fire({
                title: "Apakah buku sudah selesai dipinjam?",
                text: "Pastikan data terdata dengan benar dan sesuai!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Ya, kembalikan!"
            })

            if (result.isConfirmed) {
                await axios.delete(`http://localhost:5000/transaction/detail/${details}`)
                Swal.fire({
                    title: "Pengembalian berhasil!",
                    text: "Terimakasih sudah mengembalikan buku",
                    icon: "success"
                });
                navigate.push('/admin/lending')
            }

        } catch (error) {
            console.log(error)
        }
    }

    console.log(dataDetails)
    useEffect(() => {
        onGetDataDetails()
    }, [])

    return (
        <AdminLayout>
            <main className="h-[85%] w-[80%] flex absolute right-0 bottom-0 px-10 flex-col gap-5">
                <section className="w-full h-fit flex flex-col">
                    <div className="w-full">
                        <h1>LENDING / NEW LENDING</h1>
                    </div>
                    <div className="w-full mt-5">
                        <h1 className="font-bold text-4xl">LENDING ID: {dataDetails.id ? dataDetails.id : 'xxx'}</h1>
                    </div>
                    <h1 className="mt-5 font-bold text-lg">Member Information</h1>
                    <div className="pl-10 flex flex-col mt-3">
                        <div className="flex gap-5">
                            <h1 className="font-bold">Member Id:</h1>
                            <h1>{dataDetails.members_id}</h1>
                        </div>
                        <div className="flex gap-5">
                            <h1 className="font-bold">First Name:</h1>
                            <h1>{dataDetails.first_name}</h1>
                        </div>
                        <div className="flex gap-5">
                            <h1 className="font-bold">Member Id:</h1>
                            <h1>{dataDetails.last_name}</h1>
                        </div>
                    </div>
                    <div className="overflow-x-auto my-5 pt-10">
                        <h1 className="mb-2 font-bold">List of Books</h1>
                        <table className="min-w-full bg-white border border-gray-200 text-center">
                            <thead>
                                <tr className="bg-gray-100 text-blue-500  uppercase text-sm ">
                                    <th className="py-3 px-4 border-b">Book Id</th>
                                    <th className="py-3 px-4 border-b">Name</th>
                                    <th className="py-3 px-4 border-b">Author</th>
                                    <th className="py-3 px-4 border-b">Publish Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* {booksData.length == 0 ? (
                                    <tr className="hover:bg-gray-50" >
                                        <td colSpan={4} className="py-3 px-4 border-b">Data tidak tersedia</td>
                                    </tr>
                                ) : ( */}
                                <tr className="hover:bg-gray-50">
                                    {/* {booksData.map((item, i) => ( */}
                                    <>
                                        <td className="py-3 px-4 border-b">{dataDetails.books_id}</td>
                                        <td className="py-3 px-4 border-b">{dataDetails.title}</td>
                                        <td className="py-3 px-4 border-b">{dataDetails.author}</td>
                                        <td className="py-3 px-4 border-b">{dataDetails.publish_year}</td>
                                    </>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-col font-bold text-red-500">
                        <h1>Penalty Charge</h1>
                        <h1 className="pl-4">Rp. {dataDetails.penalty_charge}, 00,-</h1>
                    </div>
                    <div className="w-full flex justify-center items-center mt-4">
                        <button onClick={handleReturnBook} className="py-2 rounded-lg w-full flex justify-center items-center text-white font-semibold text-sm hover:bg-blue-300 bg-blue-400">Complete Lending</button>
                    </div>
                </section>
            </main>
        </AdminLayout>
    );
}