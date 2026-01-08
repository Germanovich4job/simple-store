'use client';

import Head from 'next/head';
import ProductList from '@/components/ProductList';
import { Provider } from 'react-redux';
import { setupStore } from '@/store/store';

export default function Home() {
  const store = setupStore();
  return (
      <div className="container">
        <Head>
          <title>My Simple Store</title>
          <meta name="description" content="A simple e-commerce application." />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
        </main>
      </div>
  );
}
