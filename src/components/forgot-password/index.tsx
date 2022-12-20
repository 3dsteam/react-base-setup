import React, {ReactElement, useEffect, useRef, useState} from "react";
import {DialogComponent} from "@syncfusion/ej2-react-popups";
import {FormValidator, TextBoxComponent} from "@syncfusion/ej2-react-inputs";
import {ButtonComponent} from "@syncfusion/ej2-react-buttons";
import {ProgressButtonComponent} from "@syncfusion/ej2-react-splitbuttons";
import {useTranslation} from "react-i18next";

interface Props {
    id?: string
    visible: boolean
    onSubmit: (email: string) => Promise<void>
    onOpen: () => void
    onClose: () => void
}

export const ForgotPassword = ({id, visible, onSubmit, onOpen, onClose}: Props): ReactElement => {

    const {i18n, t} = useTranslation();

    // Form
    const form = useRef<FormValidator | null>(null);
    const button = useRef<ProgressButtonComponent | null>(null);

    // State
    const [email, setEmail] = useState<string | null>(null);
    const [isDone, setIsDone] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Init form validator
    useEffect(() => {
        form.current = new FormValidator(`#${id || 'forgot-password'}`, {
            locale: i18n.language.split('-')[0],
            rules: {
                email: {
                    required: true,
                    email: true
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
                await onSubmit(email!);
                // Reset form
                setEmail(null);
                // Set done
                setIsDone(true);
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
        <DialogComponent
            target='#app'
            width='400px'
            header={t('Forgot password')}
            isModal={true}
            showCloseIcon={true}
            visible={visible}
            open={(args) => {
                args.preventFocus = true;
                // Callback
                onOpen()
            }}
            close={() => onClose()}
        >
            <div>
                {
                    isDone
                        ? <div>
                            <p className="text-lg">{t('Email has been sent')}</p>
                            <p>{t('Check your inbox')}</p>
                            <ButtonComponent
                                content={t('I got it!')}
                                iconCss='fa-regular fa-circle-check'
                                isPrimary={true}
                                cssClass='w-full mt-4'
                                onClick={() => onClose()}
                            />
                        </div>
                        : <form id={id || 'forgot-password'} onSubmit={submit} className="space-y-4">
                            <div>{t('Enter your email address to reset your password')}</div>
                            {/* Email input */}
                            <div>
                                <TextBoxComponent
                                    name='email'
                                    placeholder={t('Enter email address')}
                                    floatLabelType='Auto'
                                    value={email as any}
                                    change={(args: any) => setEmail(args.value)}
                                    data-msg-containerid='email-error'
                                />
                                <p id='email-error'></p>
                            </div>
                            {/* Error message */}
                            <p className="bold text-red-500">{error}</p>
                            {/* Button */}
                            <div className="flex justify-between">
                                <ButtonComponent
                                    type='button'
                                    content={t('Cancel')}
                                    onClick={() => onClose()}
                                />
                                <ProgressButtonComponent
                                    ref={button}
                                    type='submit'
                                    content={t('Send request')}
                                    iconCss='fa-regular fa-paper-plane'
                                    isPrimary={true}
                                    duration={import.meta.env.VITE_API_TIMEOUT}
                                />
                            </div>
                        </form>
                }
            </div>
        </DialogComponent>
    )
}