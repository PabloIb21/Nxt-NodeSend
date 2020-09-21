import React from 'react';
import Head from 'next/head';
import Header from './Header';

const Layout = ({children}) => {
    return (
        <>
            <Head>
                <title>React NodeSend</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.8.8/tailwind.min.css" integrity="sha512-KO1h5ynYuqsFuEicc7DmOQc+S9m2xiCKYlC3zcZCSEw0RGDsxcMnppRaMZnb0DdzTDPaW22ID/gAGCZ9i+RT/w==" crossOrigin="anonymous" />
            </Head>

            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto">
                    <Header />
                    <main className="mt-20">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
};

export default Layout;