import React, {ReactElement, useEffect, useMemo, useRef, useState} from 'react';
import {L10n, loadCldr, setCulture} from '@syncfusion/ej2-base';
import locales, {IT} from './locales';
import i18n from "i18next";
import {useStoreSelector} from '@store/index';
import {FeedbackType} from "@store/feedback";
import {ToastComponent} from '@syncfusion/ej2-react-notifications';
import {Pages} from "@pages/index";
import {getLocalStorage} from "./utils/local-storage";
import I18NextHttpBackend from "i18next-http-backend";
import {initReactI18next} from "react-i18next";
import {Loading} from "@pages/loading";

export const App = (): ReactElement => {

    // Store
    const feedback = useStoreSelector(state => state.feedback);

    // Toast
    const toast = useRef<ToastComponent | null>(null);

    // Ready state
    const [ready, setReady] = useState(false);

    // Init application
    useEffect(() => {
        // Load locales
        L10n.load({
            it: IT.locale
        });
        loadCldr(
            locales.numberingSystems,
            locales.currencyData,
            // ITALIAN
            IT.caGregorian,
            IT.numbers,
            IT.timeZoneNames,
            IT.currencies
        );
        // Get language from session and browser
        const _local = getLocalStorage('language');
        // Init i18n
        i18n.use(I18NextHttpBackend)
            .use(initReactI18next)
            .init({
                lng: _local || navigator.language,
                fallbackLng: 'en',
                debug: import.meta.env.DEV,
                interpolation: {
                    escapeValue: false // react already safes from xss
                }
            }).then(() => {
            // Set default
            setCulture(i18n.language.split('-')[0]);
            // Ready
            setReady(true);
        });
    }, []);

    // Feedback event listener
    useEffect(() => {
        // Check if there is any feedback
        if (feedback.data) {
            // Show feedback toast
            toast.current?.show({
                title: feedback.data.title,
                content: feedback.data.content || '',
                cssClass: feedback.data.type || FeedbackType.INFO,
                timeOut: feedback.data.timeout || 3500,
                position: {X: 'Right', Y: 'Top'},
                showCloseButton: true,
                showProgressBar: true
            });
        }
    }, [feedback]);

    // Routes
    const RoutesMemo = useMemo(() => (
        ready ? <Pages/> : <Loading/>
    ), [ready]);

    return (
        <div id='app' className='w-screen h-screen overflow-auto'>
            {/* Routes */}
            {RoutesMemo}
            {/* Feedback toast */}
            <ToastComponent ref={toast} target='#app'/>
        </div>
    )
}