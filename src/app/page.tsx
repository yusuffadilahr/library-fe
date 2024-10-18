'use client'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "@/features/login/schemas/loginSchema";
import { useMutateLogin } from "@/features/login/hooks/mutateAuthLoginHook";

export default function Home() {
  const { mutationLogin } = useMutateLogin()


  return (
    <>
      <main className="h-screen w-screen flex justify-center items-center">
        <section className="flex flex-col gap-5 w-[30%]">
          <div className="text-2xl flex justify-center">
            <span>Welcome</span><span className="font-bold">, Back!</span>
          </div>
          <Formik
            initialValues={{
              username: '',
              password: ''
            }}

            validationSchema={loginSchema}

            onSubmit={(values) => {
              mutationLogin(values)
            }}
          >
            <Form>
              <div className="flex flex-col">
                <label className="text-blue-500 text-xl"> Username *</label>
                <Field name="username" type="text" className="p-2 border h-10 rounded-md border-blue-300" />
                <ErrorMessage component={`div`} className="text-red-600 font-bold" name="username" />
                <label className="text-blue-500 mt-5 text-xl"> Password *</label>
                <Field name="password" type="password" className="p-2 border h-10 rounded-md border-blue-300" />
                <ErrorMessage component={`div`} className="text-red-600 font-bold" name="password" />
                <button type="submit" className="h-12 mt-5 bg-blue-400 text-white rounded-md font-bold"> Sign In</button>
              </div>
            </Form>
          </Formik>
        </section>
      </main>
    </>
  );
}
