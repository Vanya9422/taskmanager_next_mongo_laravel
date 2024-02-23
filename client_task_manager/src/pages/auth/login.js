import LoginForm from "@~components/auth/LoginForm";
import {useRouter} from "next/router";
const LoginPage = () => {
    const router = useRouter();

    if (localStorage.getItem('token')) {
        router.push('/dashboard');
    }

    return (
        <>
            <h1 className="text-2xl font-bold">Вход В систему</h1>
            <div className="mx-auto p-4 text-center">
                <LoginForm />
            </div>
        </>
    );
};

export default LoginPage;
