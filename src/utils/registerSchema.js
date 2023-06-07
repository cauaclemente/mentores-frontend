import * as yup from 'yup'

const registerSchema = yup.object({
    name:yup
    .string()
    .required('O nome é obrigatório')
    ,
    email:yup
    .string()
    .email('E-mail inválido')
    .required('O email é obrigatório')
    .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, 'E-mail inválido'),
    confirmEmail:yup
    .string()
    .oneOf([yup.ref('email'), null], 'Os campos informados não coincidem')
    .required('Confirme seu e-mail'),
    password:yup
    .string()
    .required('A senha é obrigatória')
    .matches( /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    'Senha inválida'),
    confirmPassword:yup
    .string()
    .oneOf([yup.ref('password'),null], 'Os campos informados não coincidem')
    .required('Confirme a sua senha')

})

export default registerSchema