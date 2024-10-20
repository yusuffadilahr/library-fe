import { setBranchName } from "@/redux/slice/branch.slice"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

export const mutateAuthLogin = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { mutate: mutationLogin } = useMutation({
        mutationFn: async (values: any) => {
            const data = await axios.post('http://localhost:5000/auth/login', {
                username: values.username,
                password: values.password
            })
            return data
        },
        onSuccess: (res) => {
            console.log(res)
            const dataLocation = res.data.data[0].location
            const first_name = res.data.data[0].firstname
            const id_users = res.data.data[0].id
            dispatch(setBranchName(res.data.data[0]))
            localStorage.setItem('id_users', id_users)
            localStorage.setItem("branch", dataLocation)
            localStorage.setItem("user_admin", first_name)

            toast.success("Login Success!", {
                position: "top-center"
            })
            router.push('/admin/home')
        },
        onError: (err) => {
            console.log(err)
            toast.error("username/password anda salah", {
                position: "top-center"
            })
        }
    })

    return {
        mutationLogin
    }
}