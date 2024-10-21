'use client'
import { FaLocationDot } from "react-icons/fa6";



export default function Topbar() {
    const branchLocation = localStorage.getItem('branch')

    return (
        <>
            <main className={`absolute w-screen flex`}>
                <section className="w-[20%]"></section>
                <section className="w-[80%] m-10 bg-gray-300 rounded-lg p-3 flex justify-end items-center font-semibold">
                    {branchLocation ? branchLocation : 'Admin'}
                    <FaLocationDot className="ml-2"/>
                </section>
            </main>
        </>
    );
}