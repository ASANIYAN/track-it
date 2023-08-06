export type LoginFormValues = {
    email: string,
    password: string
}

export type ForgotPasswordFormValues = {
    email: string
}

export type ForgetPasswordViews = 'InitialView' | 'FinalView';

export type ForgetPasswordViewsProp = {
    setView: React.Dispatch<React.SetStateAction<ForgetPasswordViews>>
}