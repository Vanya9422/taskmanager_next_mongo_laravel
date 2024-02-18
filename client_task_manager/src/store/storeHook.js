// src/store/storeHook.js

import { useMemo } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '@~modules/tasks/reducer';

let store;

const initStore = (preloadedState) => {
    return configureStore({
        reducer: {
            tasks: tasksReducer,
        },
        preloadedState,
    });
};

export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState);

    // После гидратации на клиенте, используйте store из памяти
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        });
        // Сбросить store
        store = undefined;
    }

    // Для SSG и SSR всегда создавать новый store
    if (typeof window === 'undefined') return _store;
    // Создать store один раз в браузере
    if (!store) store = _store;

    return _store;
};

export function useStore(initialState) {
    store = useMemo(() => initializeStore(initialState), [initialState]);

    return store;
}
