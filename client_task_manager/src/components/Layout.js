// components/Layout.js
import React from 'react';
import Head from 'next/head'; // Для добавления элементов в <head>
import Navbar from "@~components/common/Navbar";

export default function Layout({ children, csrfToken }) {
    return (
        <>
            <Head>
                <meta name="csrf-token" content={csrfToken} />
            </Head>
            <Navbar />
            <main className="container mx-auto mt-10">
                {children}
            </main>
        </>
    );
}
