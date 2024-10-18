import { FaSearch } from "react-icons/fa";
import AdminLayout from "../page";


export default function Lending() {
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
                    <div className=" w-[30%]">
                        <button className=" w-full h-full rounded-xl  bg-blue-400 text-white">New Lending</button>
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
                                <tr className="hover:bg-gray-50 ">
                                    <td className="py-3 px-4 border-b">1</td>
                                    <td className="py-3 px-4 border-b">John Doe</td>
                                    <td className="py-3 px-4 border-b">john@example.com</td>
                                    <td className="py-3 px-4 border-b"><button className="text-blue-500">Edit</button></td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="py-3 px-4 border-b">2</td>
                                    <td className="py-3 px-4 border-b">Jane Smith</td>
                                    <td className="py-3 px-4 border-b">jane@example.com</td>
                                    <td className="py-3 px-4 border-b"><button className="text-blue-500">Edit</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                </section>

            </main>
        </AdminLayout>
    )
}