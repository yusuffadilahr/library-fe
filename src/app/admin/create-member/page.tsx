import { Field, Formik } from "formik";
import AdminLayout from "../page";


export default function CreateMember() {
    return (
        <AdminLayout>
            <main className=" h-[85%] w-[80%] flex absolute right-0 bottom-0  p-10 flex-col gap-5 ">
                <section className="text-xl">MEMBERS / CREATE MEMBER</section>
                <section className="text-2xl font-bold">FORM MEMBER</section>
                <Formik
                    initialValues={{
                        firstname: '',
                        lastname: '',
                        email: '',
                        phone_number: '',
                        address: '',
                        id_card: ''
                    }}
                schema
                
                >
                    <section className="columns-2 gap-10 h-fit">
                        <div>
                            <div className="text-blue-500">First Name</div>
                            <Field name='firstname' className="border border-gray-400 w-full rounded-md h-12" type="text" />
                        </div>
                        <div className="my-10">
                            <div className="text-blue-500">Last name</div>
                            <Field name='lastname' className="border border-gray-400 w-full rounded-md h-12" type="text" />
                        </div>
                        <div>
                            <div className="text-blue-500">Email</div>
                            <Field name='email' className="border border-gray-400 w-full rounded-md h-12" type="text" />
                        </div>
                        <div>
                            <div className="text-blue-500">Phone Number</div>
                            <Field name='phone_number' className="border border-gray-400 w-full rounded-md h-12" type="text" />
                        </div>
                        <div className="my-10">
                            <div className="text-blue-500">Address</div>
                            <Field name='address' className="border border-gray-400 w-full rounded-md h-12" type="text" />
                        </div>
                        <div>
                            <div className="text-blue-500">ID Card (KTP)</div>
                            <Field name='id_card' className="border border-gray-400 w-full rounded-md h-12" type="text" />
                        </div>
                    </section>
                    <section>
                        <button className="bg-blue-500 w-full h-14 rounded-md text-white">Submit</button>
                    </section>
                </Formik>

            </main>
        </AdminLayout>
    )
}