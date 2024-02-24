import LoginForm from "@~components/auth/LoginForm";
const LoginPage = () => {

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
