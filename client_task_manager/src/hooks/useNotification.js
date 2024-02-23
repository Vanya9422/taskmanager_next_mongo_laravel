import { useState, useEffect } from 'react';

// Custom hook для уведомлений
export const useNotification = (initialState = false, duration = 3000) => {
    const [isShown, setIsShown] = useState(initialState);

    useEffect(() => {
        let timer;
        if (isShown) {
            timer = setTimeout(() => setIsShown(false), duration);
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [isShown, duration]);

    return [isShown, setIsShown];
};
