import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider as ReduxProvider} from "react-redux";
import {store} from "@store/index";
import {HashRouter} from "react-router-dom";
import {registerLicense} from '@syncfusion/ej2-base';
import {ApolloProvider} from "@apollo/client";
import {graphql} from "@api/graphql";
import {App} from "./App";
import './index.scss';

// Registering Syncfusion license key
registerLicense(import.meta.env.VITE_SYNCFUSION_KEY || '');

// Check if GraphQL is enabled
if (import.meta.env.VITE_GRAPHQL_ENABLED === 'true') {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <ReduxProvider store={store}>
            <HashRouter>
                {/* Apollo GraphQL */}
                <ApolloProvider client={graphql}>
                    <App/>
                </ApolloProvider>
            </HashRouter>
        </ReduxProvider>
    )
} else {
    // Rest API
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <ReduxProvider store={store}>
            <HashRouter>
                <App/>
            </HashRouter>
        </ReduxProvider>
    )
}

