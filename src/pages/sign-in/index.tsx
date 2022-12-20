import React, {ReactElement, useState} from "react";
import {SignInForm} from "@components/sign-in-form";
import DemoImage from "@assets/logo.png";
import {rest} from "@api/rest";
import {useStoreDispatch} from "@store/index";
import {authenticate} from "@store/auth";
import {ForgotPassword} from "@components/forgot-password";
import {useTranslation} from "react-i18next";

export const SignIn = (): ReactElement => {

    const dispatch = useStoreDispatch();

    const { t } = useTranslation();

    // State
    const [forgotPassword, setForgotPassword] = useState<boolean>(false);

    const onSignIn = async (data: { username: string, password: string }) => {
        try {
            // Call REST API
            const response = await rest.post('/sign-in', data);
            // Authenticate session
            dispatch(
                authenticate({
                    token: response.data.token,
                    user: response.data.user
                })
            )
        } catch (e) {
            console.error(e);
            // Throw error
            throw e;
        }
    }

    const onForgotPassword = async (email: string) => {
        try {
            // Call REST API
            await rest.post('/forgot-password', {email});
        } catch (e) {
            console.error(e);
            // Throw error
            throw e;
        }
    }

    return (
        <div className='flex justify-center items-center w-full h-full bg-gray-100'>
            {/* Form */}
            <SignInForm
                title={t('Sign In')}
                image={DemoImage}
                onSubmit={onSignIn}
                onForgotPassword={() => setForgotPassword(true)}
                cssClass='bg-white border rounded'
            />
            {/* Forgot password */}
            <ForgotPassword
                visible={forgotPassword}
                onSubmit={onForgotPassword}
                onOpen={() => setForgotPassword(true)}
                onClose={() => setForgotPassword(false)}
            />
        </div>
    )
}