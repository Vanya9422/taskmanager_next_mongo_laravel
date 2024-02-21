import {useEffect, useRef, useState} from 'react';
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '@~modules/tasks/reducer';
import authReducer from '@~modules/auth/reducer';
import axios from "axios";

// Глобальный store для хранения состояния.
let store;

// Функция настройки store с начальным состоянием.
const initStore = (preloadedState) => {
    return configureStore({
        reducer: {
            tasks: tasksReducer,
            auth: authReducer,
        },
        preloadedState,
    });
};

// Инициализирует или возвращает существующий store.
export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState);

    // Обновление store с объединенным состоянием после гидратации.
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        });
        store = undefined;
    }

    // Создание нового store для серверного рендеринга.
    if (typeof window === 'undefined') return _store;
    // Установка store в браузере при первом рендере.
    if (!store) store = _store;

    return _store;
};

// Хук для доступа к store в компонентах.
export function useStore(initialState) {
    const storeRef = useRef();

    // Устанавливает store, если он ещё не был установлен.
    if (!storeRef.current) {
        storeRef.current = initializeStore(initialState);
    }

    // Возвращает ссылку на текущий store.
    return storeRef.current;
}
