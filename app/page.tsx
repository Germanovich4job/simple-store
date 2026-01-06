import Head from 'next/head';
import AuthForm from '../components/AuthForm';
import ProductList from '@/components/ProductList';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>My Simple Store</title>
        <meta name="description" content="A simple e-commerce application." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AuthForm mode="register" />
        <br />
        <AuthForm mode="login" />
        <ProductList />

      </main>
    </div>
  );
}