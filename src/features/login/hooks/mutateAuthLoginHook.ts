import { mutateAuthLogin } from "../api/mutateAuthLogin"

export const useMutateLogin = () => {
    const { mutationLogin } = mutateAuthLogin()

    return {
        mutationLogin
    }
}