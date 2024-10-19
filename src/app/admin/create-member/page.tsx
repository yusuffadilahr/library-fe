'use client'
import { ErrorMessage, Field, Form, Formik } from "formik";
import AdminLayout from "../page";
import { createMemberSchema } from "@/features/member/schema/member.schema";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface CreateMemberFormValues {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address: string;
    id_card_number: string;
}

export default function CreateMember() {
    const router = useRouter()
    const { mutate: onCreateData } = useMutation({
        mutationFn: async (values: CreateMemberFormValues) => {
            return await axios.post('http://localhost:5000/member', {
                first_name: values.first_name,
                last_name: values.last_name,
                email: values.email,
                phone_number: values.phone_number,
                address: values.address,
                id_card_number: values.id_card_number
            })
        },
        onSuccess: (res) => {
            console.log(res)
            toast.success(res.data.message)
            router.push('/admin/member')
        },
        onError: (err) => {
            console.log(err)
            toast.error('Gagal membuat data member')
        }
    })

    return (
        <AdminLayout>
            <main className=" h-[85%] w-[80%] flex absolute right-0 bottom-0  p-10 flex-col gap-5 ">
                <section className="text-xl">MEMBERS / CREATE MEMBER</section>
                <section className="text-2xl font-bold">FORM MEMBER</section>
                <Formik
                    initialValues={{
                        first_name: '',
                        last_name: '',
                        email: '',
                        phone_number: '',
                        address: '',
                        id_card_number: ''
                    }}

                    validationSchema={createMemberSchema}
                    onSubmit={(values) => {
                        onCreateData(values)
                    }}

                >
                    <Form>
                        <section className="columns-2 gap-10 h-fit">
                            <div>
                                <div className="text-blue-500">First Name</div>
                                <Field name="first_name" className="border border-gray-400 w-full rounded-md h-12" type="text" />
                                <ErrorMessage name="first_name" component={'div'} className="text-red-500" />
                            </div>
                            <div className="my-10">
                                <div className="text-blue-500">Last name</div>
                                <Field name="last_name" className="border border-gray-400 w-full rounded-md h-12" type="text" />
                                <ErrorMessage name="last_name" component={'div'} className="text-red-500" />
                            </div>
                            <div>
                                <div className="text-blue-500">Email</div>
                                <Field name="email" className="border border-gray-400 w-full rounded-md h-12" type="text" />
                                <ErrorMessage name="email" component={'div'} className="text-red-500" />
                            </div>
                            <div>
                                <div className="text-blue-500">Phone Number</div>
                                <Field name="phone_number" className="border border-gray-400 w-full rounded-md h-12" type="text" />
                                <ErrorMessage name="phone_number" component={'div'} className="text-red-500" />
                            </div>
                            <div className="my-10">
                                <div className="text-blue-500">Address</div>
                                <Field name="address" className="border border-gray-400 w-full rounded-md h-12" type="text" />
                                <ErrorMessage name="address" component={'div'} className="text-red-500" />
                            </div>
                            <div>
                                <div className="text-blue-500">ID Card (KTP)</div>
                                <Field name="id_card_number" className="border border-gray-400 w-full rounded-md h-12" type="text" />
                                <ErrorMessage name="id_card_number" component={'div'} className="text-red-500" />
                            </div>
                        </section>
                        <section className="mt-5">
                            <button type="submit" className="bg-blue-500 w-full h-14 rounded-md text-white">Submit</button>
                        </section>
                    </Form>
                </Formik>

            </main>
        </AdminLayout>
    )
}