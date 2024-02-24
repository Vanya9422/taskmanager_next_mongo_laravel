// middleware.js
import { NextResponse } from 'next/server';

export async function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get('token').value;

    const isLoginPage = pathname.startsWith('/auth/login');

    // Если пользователь авторизован (токен действителен) и пытается перейти на страницу логина,
    // перенаправляем его на страницу дашборда
    if (token && isLoginPage && await verifyToken(token)) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // Массив путей, которые доступны без аутентификации
    const publicPaths = ['/', '/tasks/*', '/auth*'];
    const isPublicPath = publicPaths.some(path =>
        pathname === path ||
        (path.endsWith('/*') && pathname.startsWith(path.replace('/*', '')))
    );

    if (isPublicPath) return NextResponse.next();

    if (!token || !(await verifyToken(token))) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    return NextResponse.next();
}

// Функция для проверки валидности токена
async function verifyToken(token) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        if (response.ok) {
            const data = await response.json();

            // Обработайте данные ответа
            return true;
        }
        return false;
    } catch (error) {
        console.error('Ошибка при проверке токена:', error);
        return false;
    }
}

export const config = {
    // Применять Middleware также к пути логина для перенаправления
    matcher: ['/dashboard/:path*', '/auth/login'],
};
