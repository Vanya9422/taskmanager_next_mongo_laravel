import { useState } from 'react';
import {useDispatch} from 'react-redux';
import { login } from '@~modules/auth/actions';
import {useRouter} from "next/router";

export default function LoginForm() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [credentials, setCredentials] = useState({
        name: '',
        password: '',
    });

    const validateForm = () => {
        const newErrors = {};

        if (!credentials.name) {
            newErrors.name = 'Имя пользователя обязательно.';
        }

        if (!credentials.password) {
            newErrors.password = 'Пароль обязателен.';
        } else if (credentials.password.length < 3) {
            newErrors.password = 'Пароль должен быть длиной не менее 6 символов.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await dispatch(login(credentials));

            router.push('/dashboard');
        } catch (error) {
            alert(error)
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form className="max-w-md w-full space-y-8" onSubmit={handleSubmit}>
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label htmlFor="name" className="sr-only">Имя пользователя</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Имя пользователя"
                            onChange={handleChange}
                        />
                        {errors.name && <div className="text-red-500">{errors.name}</div>}
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Пароль</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Пароль"
                            onChange={handleChange}
                        />
                        {errors.password && <div className="text-red-500">{errors.password}</div>}
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Войти
                    </button>
                </div>
            </form>
        </div>
    );
}
