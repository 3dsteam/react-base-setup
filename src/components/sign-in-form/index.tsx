import React, {ReactElement, Reducer, useEffect, useReducer, useRef, useState} from "react";
import {FormValidator, TextBoxComponent} from "@syncfusion/ej2-react-inputs";
import {ButtonComponent} from "@syncfusion/ej2-react-buttons";
import {ProgressButtonComponent} from "@syncfusion/ej2-react-splitbuttons";
import {useTranslation} from "react-i18next";

interface DispatchData {
    username: string,
    password: string
}

interface Props {
    id?: string
    title?: string
    image?: string
    onSubmit: (data: DispatchData) => Promise<void>
    onForgotPassword: () => void
    cssClass?: string
}

export const SignInForm = ({id, title, image, onSubmit, onForgotPassword, cssClass}: Props): ReactElement => {

    const {i18n, t} = useTranslation();

    // Form
    const form = useRef<FormValidator | null>(null);
    const button = useRef<ProgressButtonComponent | null>(null);

    // States
    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    console.log({i18n});

    // Init form validator
    useEffect(() => {
        form.current = new FormValidator(`#${id || 'sign-in'}`, {
            locale: i18n.language.split('-')[0],
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true
                }
            }
        });
    }, []);

    const submit = async (args: any) => {
        args.preventDefault();
        // Reset error
        setError(null);
        // Validate form
        if (form.current?.validate()) {
            // Callback
            try {
                await onSubmit({
                    username: username!,
                    password: password!
                });
                // Reset form
                setUsername(null);
                setPassword(null);
            } catch (e: any) {
                // Feedback error
                setError(e.message);
            } finally {
                // Complete button
                button.current?.progressComplete();
            }
        } else {
            // Complete button
            button.current?.progressComplete();
        }
    }

    return (
        <form id={id || 'sign-in'} onSubmit={submit} className={`w-96 ${cssClass}`}>
            {/* Image */}
            {
                image
                    ? <img src={image} alt='Sign In' className='object-contain'/>
                    : <></>
            }
            {/* Content */}
            <div className='p-8 space-y-4'>
                {/* Title */}
                <h1 className="text-xl">{title}</h1>
                {/* Username */}
                <section>
                    <TextBoxComponent
                        name='username'
                        placeholder={t('Username')}
                        autocomplete='username'
                        floatLabelType='Auto'
                        value={username as any}
                        change={(args: any) => setUsername(args.value)}
                        data-msg-containerid='username-error'
                    />
                    <p id='username-error'></p>
                </section>
                {/* Password */}
                <section>
                    <TextBoxComponent
                        name='password'
                        type='password'
                        placeholder={t('Password')}
                        autocomplete='current-password'
                        floatLabelType='Auto'
                        value={password as any}
                        change={(args: any) => setPassword(args.value)}
                        data-msg-containerid='password-error'
                    />
                    <p id='password-error'></p>
                </section>
                {/* Error message */}
                <p className="bold text-red-500">{error}</p>
                {/* Submit */}
                <ProgressButtonComponent
                    ref={button}
                    type='submit'
                    content={t('Sign In')}
                    iconCss='fa-regular fa-right-to-bracket'
                    isPrimary={true}
                    cssClass='w-full h-10'
                    duration={import.meta.env.VITE_API_TIMEOUT}
                />
                <hr/>
                {/* Forgot password */}
                <ButtonComponent
                    type='button'
                    content={t('Forgot password? Click here')}
                    cssClass='e-link w-full'
                    onClick={onForgotPassword}
                />
            </div>
        </form>
    )
}