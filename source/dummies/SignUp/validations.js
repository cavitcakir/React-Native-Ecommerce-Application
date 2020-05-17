import * as Yup from "yup";

const validations = Yup.object().shape({
    username: Yup.string()
        .required(),
    email: Yup.string().email().required().matches(/[a-zA-Z0-9]/, 'Use only Latin letters.'),
    password: Yup.string()
        .required('No password provided.')
        .min(2, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters.'),
    passwordConfirm: Yup
        .string()
        .oneOf([Yup.ref('password')], 'Passwords not matched.')
        .required(),

});

module.exports = validations;
