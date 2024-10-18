import AdminLayout from "../page";


export default function NewLending() {
    return (
        <AdminLayout>
            <main className=" h-[85%] w-[80%] flex absolute right-0 bottom-0  p-10 flex-col gap-5 ">
                <section className="text-xl">MEMBERS / CREATE MEMBER</section>
                <section className="text-2xl font-bold">FORM MEMBER</section>
                <section className="gap-10 h-fit">
                    <div>
                        <div className="text-blue-500">Member ID</div>
                        <input className="border border-gray-400 w-full rounded-md h-16" type="text" />
                    </div>
                    <div className="font-bold my-7"> Member Information</div>
                    <div className="">
                        <div className="text-blue-500">Book Title / Author</div>
                        <input className="border border-gray-400 w-full rounded-md h-16" type="text" />
                    </div>


                    <div className="overflow-x-auto my-5">
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
                                <tr className="hover:bg-gray-50 ">
                                    <td className="py-3 px-4 border-b">1</td>
                                    <td className="py-3 px-4 border-b">John Doe</td>
                                    <td className="py-3 px-4 border-b">john@example.com</td>
                                    <td className="py-3 px-4 border-b"><button className="text-blue-500">Edit</button></td>
                                </tr>
                
                            </tbody>
                        </table>
                    </div>



                </section>
                <section>
                    <button className="bg-blue-500 w-full h-14 rounded-md text-white">Submit</button>
                </section>

            </main>
        </AdminLayout>
    )
}