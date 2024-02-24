// pages/_app.js
import React, {useEffect} from 'react';
import { Provider } from 'react-redux';
import { useStore } from '@~store/storeHook';
import 'tailwindcss/tailwind.css';
import Layout from "@~components/Layout";
import { setupInterceptors } from "@~utils/interceptorsSetup";

function MyApp({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState);

    useEffect(() => {
        setupInterceptors(store); // Вызываем здесь
    }, []);

    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}
export default MyApp;
