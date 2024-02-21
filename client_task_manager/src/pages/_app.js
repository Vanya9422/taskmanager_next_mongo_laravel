// pages/_app.js
import React from 'react';
import { Provider } from 'react-redux';
import { useStore } from '@~store/storeHook';
import 'tailwindcss/tailwind.css';
import Layout from "@~components/Layout";

function MyApp({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState);

    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}
export default MyApp;
