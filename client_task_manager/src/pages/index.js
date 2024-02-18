// index.js
import React from 'react';
import { Provider } from 'react-redux';
import { useStore } from '@~store/storeHook';
import App from "@~App";

const HomePage = () => {
    const store = useStore(); // Инициализируйте ваш Redux store здесь

    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

export default HomePage;
