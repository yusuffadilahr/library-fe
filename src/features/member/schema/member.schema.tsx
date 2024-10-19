import * as Yup from 'yup'

export const createMemberSchema = Yup.object().shape({
    first_name: Yup.string().required('first name must be filled'),
    last_name: Yup.string().required('last name must be filled'),
    email: Yup.string().required('email must be filled'),
    phone_number: Yup.string().required('phone number must be filled'),
    address: Yup.string().required('address must be filled'),
    id_card_number: Yup.string().min(16,'please enter minimum 16 number').required('first name must be filled')

})