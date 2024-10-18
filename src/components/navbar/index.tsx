'use client'

import { GoHome } from "react-icons/go";
import { GoPerson } from "react-icons/go";
import { FiBook } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";



export default function Navbar() {
    const router = useRouter()
    const dataName = localStorage.getItem('user_admin')
    if (!dataName) {
        router.push('/')
    }

    return (
        <>
            <main className={`fixed h-screen w-[20%]`}>
                <div className="relative h-full bg-white flex flex-col gap-20 p-10">
                    <section className="pl-4">
                        <div className="text-blue-600 text-2xl">
                            Hello,
                        </div>
                        <div className="text-blue-600 text-2xl font-bold">
                            {dataName ? dataName : 'Admin'}
                        </div>
                    </section>

                    <section className="space-y-11 pl-8 text-xl text-black">
                        <div>
                            <Link className="flex items-center gap-3 font-bold" href="/admin/home">
                                <GoHome /> Home
                            </Link>
                        </div>
                        <div>
                            <Link className="flex items-center gap-3 font-bold" href="/admin/member">
                                <GoPerson /> Member
                            </Link>
                        </div>
                        <div>
                            <Link className="flex items-center gap-3 font-bold" href="/admin/lending">
                                <FiBook /> Lending
                            </Link>
                        </div>
                    </section>

                    <div className="absolute right-0 top-0 bottom-0 mt-8 mb-8 w-[2px] bg-gray-300"></div>
                </div>
            </main>
        </>
    );
}