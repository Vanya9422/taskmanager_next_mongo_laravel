// components/Navbar.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import {useDispatch, useSelector} from 'react-redux';
import { logout } from '@~modules/auth/actions';
import { selectIsAuthenticated } from "@~modules/auth/selectors";

export default function Navbar() {
    const dispatch = useDispatch();
    const router = useRouter();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    const handleLogout = () => {
        dispatch(logout());

        router.push('/auth/login');
    };

    return (
        <nav className="bg-blue-500 p-4 text-white">
            <ul className="flex space-x-4 justify-center">
                <li>
                    <Link href="/" className="hover:underline">
                        Главная
                    </Link>
                </li>
                <li>
                    <Link href="/tasks/create" className="hover:underline">
                        Создать задачу
                    </Link>
                </li>
                {!isAuthenticated && (
                    <li>
                        <Link href="/auth/login" className="hover:underline">
                            Вход
                        </Link>
                    </li>
                )}
                { isAuthenticated && (
                    <li>
                        <button onClick={handleLogout}>Выйти</button>
                    </li>
                )}
            </ul>
        </nav>
    );
}
