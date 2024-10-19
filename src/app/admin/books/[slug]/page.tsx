'use client'

import AdminLayout from "../../page";

export default function Page({ params }: { params: { slug: string } }) {
    const { slug } = params
    console.log(params)
    return (
        <AdminLayout>
            <main className="h-[85%] w-[80%] flex absolute right-0 bottom-0  p-10 ">
                Data Slug: {slug}
            </main>
        </AdminLayout>
    );
}