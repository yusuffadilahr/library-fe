import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    username: Yup.string().min(1).max(45).required('Username must be filled'),
    password: Yup.string().min(1).max(45).required('Password must be filled')
})