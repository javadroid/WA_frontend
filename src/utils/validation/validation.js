import * as Yup from 'yup'

export const signupSchema=Yup.object({
    name:Yup.string()
    .required("Full name is required.")
    .matches(/^[a-zA-Z_ ]*$/,"No special character allowed.")
    .min(2,"Name must be between 2 and 16 character.")
    .max(16,"Name must be between 2 and 16 character."),
    email:Yup.string()
    .required("Email address is required.")
    .email("Invalid email address"),
    status:Yup.string()
    .max(64,"Status must be less tha 64 character."),
    password:Yup.string()
    .required("Password is required.")
    .min(6,"Password must contain atleast 6 characters.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/,"Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least one number.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/,"Password must contain at least one character."),
})

export const signinSchema=Yup.object({
  
    email:Yup.string()
    .required("Email address is required.")
    .email("Invalid email address"),
   
    password:Yup.string()
    .required("Password is required.")
    .min(6,"Password must contain atleast 6 characters.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/,"Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least one number.")
    .matches(/[!@#$%^&*(),.?":{}|<>]/,"Password must contain at least one character."),
})