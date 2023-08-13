export type LoginFormValues = {
    email: string,
    password: string
}

export type SignUpFormValues = {
    email: string,
    password: string,
    confirmPassword: string
}

export type ForgotPasswordFormValues = {
    email: string
}

export type FinalPageSignUpFormValue = {
    firstProject: string
}

export type ForgetPasswordViews = 'InitialView' | 'FinalView';

export type ForgetPasswordViewsProp = {
    setView: React.Dispatch<React.SetStateAction<ForgetPasswordViews>>
}

export type SignUpViews = 'SignUpView' | 'SetUpView';

export type SignUpViewsProp = {
    setView: React.Dispatch<React.SetStateAction<SignUpViews>>
}

export type ResetPasswordValues = {
    password: string,
    confirmPassword: string
}

export type SearchBarProps = {
    width?: string
}
